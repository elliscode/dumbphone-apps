# Preventable reminders

`/preventable-reminders/` schedules SMS reminders that the user can head off by pressing SKIP before they go out. Reminders can be one-time, daily, weekly, monthly or yearly. All times are interpreted in `America/New_York` and stored in UTC.

## How it works

The code is `lambda/dumbphoneapps-monolith/dumbphoneapps/reminders.py`. Routes are registered in `lambda_function.py`.

The older `/scheduler/set` route points an EventBridge schedule straight at the SMS SQS queue, so nothing can stop it once it's scheduled. Preventable reminders instead schedule **one occurrence at a time**. Each schedule invokes the `dumbphoneapps-prod` Lambda directly, and the Lambda checks DynamoDB before it sends anything.

1. **Create**: the reminder is written to DynamoDB (`key1 = reminder_<phone>`, `key2 = <32 char id>`) and a one-time schedule is created for its first occurrence.
2. **The schedule fires**: EventBridge Scheduler invokes the Lambda with `{"reminder_dispatch": {"key1", "key2", "occurrence"}}`. `lambda_handler` sends this to `dispatch_reminder_event` before the usual API Gateway handling.
3. **Dispatch**:
   - If the reminder is gone, or its `next_send_at` no longer equals `occurrence`, the event is stale and is dropped.
   - Otherwise it claims the occurrence with a conditional write (`active → sending`), puts the SMS on the existing queue, then:
     - **recurring**: schedules the next occurrence and moves back to `active`
     - **one-time, or a recurring reminder that just used its last execution**: moves to `completed`
4. **SKIP** and **DEFER** only succeed while the reminder is `active` and its `next_send_at` still equals the value the page showed:
   - **SKIP on a one-time reminder, or on the last execution**: the reminder and its schedule are deleted
   - **otherwise**: `next_send_at` moves forward one occurrence and a new schedule is created
   - DEFER isn't allowed on one-time reminders, because there's no later occurrence to move to.
5. **DELETE** removes the reminder and its pending schedule, whatever the frequency.

### Number of reminders

A recurring reminder can have an optional limit (`remaining`, with the original value in `executions_total`). Without one it repeats forever. Records created before this field existed have no limit.

| Action | Moves next send forward | Counts down `remaining` |
|---|---|---|
| Scheduled send | yes | yes |
| SKIP | yes | yes |
| DEFER | yes | no |

When `remaining` reaches 0 the reminder ends. On an unlimited reminder SKIP and DEFER do the same thing.

Two examples:

- **Prenatal reminder:** weekly, limit 40. Each week either sends or gets skipped, and it stops after 40 weeks.
- **Dead man's switch:** daily, limit 1, e.g. "send this to family if I've lost my phone". DEFER it every day. The first day it isn't deferred, it sends once and is done.

```
          create                 claim                 enqueue SMS
  (none) ───────▶ active ──────────────▶ sending ───────────────────┐
                   ▲  │                                             │
                   │  │ skip / defer: advance next_send_at          │
                   │  │ skip (once or last) / delete: remove item   │
                   │  ▼                                             │
                   │ (gone)                                         │
                   │                                                │
                   └──────── recurring: schedule next, advance ◀────┤
                                                                    │
                             completed ◀── once or last one ◀───────┘
```

### Recurrence

Occurrence *n* is always worked out from the original local start (`start_local`) plus *n* days, weeks, months or years. It is never worked out from the previous occurrence. That way:

- A daily 8:00 reminder stays at 8:00 local through daylight saving changes.
- Monthly from Jan 31 goes Feb 28 (or 29), Mar 31, Apr 30, and so on, without drifting to the 28th.
- Yearly from Feb 29 falls on Feb 28 in non-leap years.

A start time that doesn't exist (02:30 on spring-forward day) lands at 03:30 EDT. An ambiguous fall-back time uses the first (EDT) instance.

When a reminder moves forward, it skips any occurrence already in the past. A late retry never schedules a time in the past.

## Races, retries and duplicates

Every state change is a DynamoDB conditional write, so when a SKIP, a DELETE and a dispatch overlap, exactly one of them wins.

| Situation | What happens |
|---|---|
| SKIP lands just before dispatch | The skip changes `next_send_at`, so the dispatcher's claim condition fails and nothing is sent. |
| Dispatch claims just before SKIP | The skip's condition (`status = active`) fails and the page shows "already being sent". |
| SKIP or DEFER double-tapped, or the request retried | The second request's `next_send_at` no longer matches, so it gets a 409 and the reminder only moves forward once. |
| The Lambda retries after a send | The decrement of `remaining` is part of the same update that releases the claim, so it happens exactly once. |
| An old schedule fires after a skip, delete or advance | Its `occurrence` doesn't match the stored `next_send_at`, so nothing is sent. Leftover schedules are therefore harmless, and deleting them is best-effort. |
| EventBridge delivers the same event twice | Only one invocation wins the `active → sending` claim. |
| The Lambda crashes after claiming | Lambda's async retry reuses the same request id, which is stored as `claim_id`, so the retry resumes its own claim. A delivery with a different request id backs off. |
| The Lambda crashes after enqueueing | `sms_enqueued_for` is written right after `sqs.send_message`, so a retry doesn't send again. A crash in the moment between those two calls is the only way to get a duplicate SMS. That's accepted, because the alternative is risking a reminder that is silently never sent. |
| Scheduling the next occurrence fails | The claim isn't released until the next schedule exists. Schedule names are fixed (`reminder_<id>_<YYYYMMDDTHHMMZ>`), so retries and racing requests never create two. |
| Every retry fails | The reminder stays `sending` and the admin gets an SMS for each failed attempt. The user can't SKIP it, but can DELETE it once the claim is more than 15 minutes old. |

### Enqueued is not delivered

"Sent" here means the message was put on the existing SMS SQS queue. That queue's consumer, which isn't in this repo, actually delivers it, and a delivery failure there is invisible to this code. `last_sent_at` records when the message was **enqueued**, not when it was delivered.

## AWS setup

All commands assume region `us-east-1`. Replace the `<placeholders>`. Nothing new is created apart from one schedule group. The existing scheduler role and Lambda are reused.

### 1. Find the existing names

```sh
aws lambda get-function-configuration --function-name dumbphoneapps-prod \
  --query '{role: Role, schedulerRole: Environment.Variables.SMS_SCHEDULER_ROLE_ARN, arn: FunctionArn}'
```

- `role` is the Lambda execution role. Its name, the part after `role/`, is `<LAMBDA_EXECUTION_ROLE_NAME>`.
- `schedulerRole` is `<SMS_SCHEDULER_ROLE_ARN>`. Its name is `<SMS_SCHEDULER_ROLE_NAME>`.
- `arn` is the value for `REMINDER_DISPATCH_LAMBDA_ARN`.

### 2. Create the schedule group

```sh
aws scheduler create-schedule-group --name preventable-reminders
```

(The code creates it on first use if it's missing, but creating it up front means the Lambda doesn't need `scheduler:CreateScheduleGroup`.)

### 3. Let the scheduler role invoke the Lambda

The role already trusts `scheduler.amazonaws.com` and can send to the SMS queue. This adds Lambda invoke permission:

```sh
aws iam put-role-policy --role-name <SMS_SCHEDULER_ROLE_NAME> \
  --policy-name invoke-reminder-dispatcher \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Action": "lambda:InvokeFunction",
      "Resource": [
        "arn:aws:lambda:us-east-1:<ACCOUNT_ID>:function:dumbphoneapps-prod",
        "arn:aws:lambda:us-east-1:<ACCOUNT_ID>:function:dumbphoneapps-prod:*"
      ]
    }]
  }'
```

### 4. Let the Lambda manage reminder schedules

The existing `/scheduler/set` route may already be covered by a broader policy. Check with `aws iam list-role-policies` / `list-attached-role-policies` on `<LAMBDA_EXECUTION_ROLE_NAME>`. If it isn't covered:

```sh
aws iam put-role-policy --role-name <LAMBDA_EXECUTION_ROLE_NAME> \
  --policy-name preventable-reminders-scheduler \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": ["scheduler:CreateSchedule", "scheduler:DeleteSchedule"],
        "Resource": "arn:aws:scheduler:us-east-1:<ACCOUNT_ID>:schedule/preventable-reminders/*"
      },
      {
        "Effect": "Allow",
        "Action": "iam:PassRole",
        "Resource": "<SMS_SCHEDULER_ROLE_ARN>",
        "Condition": {"StringEquals": {"iam:PassedToService": "scheduler.amazonaws.com"}}
      }
    ]
  }'
```

### 5. Add the environment variable

`update-function-configuration --environment` **replaces every variable**, so start from the current set:

```sh
aws lambda get-function-configuration --function-name dumbphoneapps-prod --query Environment > env.json
# edit env.json and add, inside "Variables":
#   "REMINDER_DISPATCH_LAMBDA_ARN": "arn:aws:lambda:us-east-1:<ACCOUNT_ID>:function:dumbphoneapps-prod"
aws lambda update-function-configuration --function-name dumbphoneapps-prod --environment file://env.json
rm env.json
```

(Or add it in the console under Configuration → Environment variables.)

### 6. Deploy and check the time zone data

```sh
sh release.sh ls
```

The timezone is loaded with `zoneinfo`, which needs tz data on the runtime. It's loaded lazily, so if the data is missing only the reminder routes fail, not the rest of the app. Create a test reminder. If CloudWatch shows `ZoneInfoNotFoundError`, vendor the `tzdata` package into the Lambda and release again:

```sh
pip install --target lambda/dumbphoneapps-monolith tzdata
```

### 7. Optional: catch dispatches that fail every retry

Failed dispatches already text `ADMIN_PHONE`. To also keep the failed events, add an async on-failure destination:

```sh
aws lambda put-function-event-invoke-config --function-name dumbphoneapps-prod \
  --destination-config '{"OnFailure": {"Destination": "arn:aws:sqs:us-east-1:<ACCOUNT_ID>:<FAILED_DISPATCH_QUEUE>"}}'
```

## Testing

Unit tests use stdlib `unittest` with in-memory fakes for DynamoDB (including condition expressions), Scheduler and SQS:

```sh
pipenv run python -m unittest discover tests -v
```

After deploying, check by hand:

1. Create a one-time reminder a few minutes out and confirm the text arrives.
2. Create another and SKIP it. Confirm no text arrives and the schedule is gone (`aws scheduler list-schedules --group-name preventable-reminders`).
3. Create a daily reminder, SKIP it, and confirm "Next send" moves forward one day.
4. Create a daily reminder limited to 2. SKIP shows "Remaining: 1 of 2", and a second SKIP removes it.
5. Create a daily reminder limited to 1. DEFER moves the next send forward and it still shows "Remaining: 1 of 1".
6. DELETE a reminder and confirm it leaves the list and the group.
