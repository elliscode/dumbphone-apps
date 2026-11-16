# Connections backfill and daily fetch

Two EventBridge Scheduler schedules invoke the `dumbphoneapps-prod` Lambda directly with `{"connections_backfill": {}}`. These calls don't go through API Gateway, so no cookie or CSRF token is involved. The scheduler role's `lambda:InvokeFunction` permission is the only access control. `lambda_handler` passes the payload to `run_connections_backfill` in `dumbphoneapps/connections.py`.

## How it works

Each run handles regular Connections (`""`) and Sports Connections (`"_sports"`):

1. It reads a cursor from DynamoDB: `key1=connections_backfill_cursor{type}`, `key2=cursor`. The cursor defaults to the first puzzle, `2023-06-12` for regular and `2024-09-18` for sports.
2. It moves forward past dates that are already stored (`key1=connections{type}`), without sending any upstream request.
3. It fetches the **first missing date** from NYT, stores it and advances the cursor. That's at most one upstream request per type per run.
4. When the cursor passes today (UTC), it returns `caught_up`.

When a fetch fails:
- **Past date:** the date is skipped (logged as `skipped`), so it can't block the backfill.
- **Today:** the cursor stays put (`not_ready`) and the next run tries again.

The same payload covers both jobs. Every 5 minutes it works through the backlog. Once caught up, the daily run picks up each new day's puzzle.

To run only one type, send `{"connections_backfill": {"types": ["_sports"]}}`.

## AWS setup

Region `us-east-1`. This reuses the scheduler role from the preventable reminders setup (`docs/preventable-reminders.md`, step 3), which can already invoke `dumbphoneapps-prod`.

### 1. Get the ARNs

```sh
aws lambda get-function-configuration --function-name dumbphoneapps-prod \
  --query '{arn: FunctionArn, schedulerRole: Environment.Variables.SMS_SCHEDULER_ROLE_ARN}'
```

### 2. Deploy, then test with one manual invoke

```sh
aws lambda invoke --function-name dumbphoneapps-prod \
  --cli-binary-format raw-in-base64-out \
  --payload '{"connections_backfill":{}}' out.json && cat out.json
```

The result should look like `{"": {"status": "fetched", ...}, "_sports": {"status": "fetched", ...}}`.

### 3. Create the schedules

```sh
aws scheduler create-schedule-group --name connections

# Backfill: every 5 minutes. Stops by itself at the end date
aws scheduler create-schedule --group-name connections --name connections-backfill \
  --schedule-expression "rate(5 minutes)" \
  --end-date "2026-11-25T00:00:00Z" \
  --flexible-time-window '{"Mode":"OFF"}' \
  --target '{"Arn":"<LAMBDA_ARN>","RoleArn":"<SCHEDULER_ROLE_ARN>","Input":"{\"connections_backfill\":{}}","RetryPolicy":{"MaximumRetryAttempts":0}}'

# Daily at 12:00 UTC (7-8am Eastern), when the UTC date matches the NYT date
aws scheduler create-schedule --group-name connections --name connections-daily \
  --schedule-expression "cron(0 12 * * ? *)" --schedule-expression-timezone UTC \
  --flexible-time-window '{"Mode":"OFF"}' \
  --target '{"Arn":"<LAMBDA_ARN>","RoleArn":"<SCHEDULER_ROLE_ARN>","Input":"{\"connections_backfill\":{}}","RetryPolicy":{"MaximumRetryAttempts":2}}'
```

At one puzzle per type every 5 minutes, about 1,250 regular days take at most about 4.4 days. The 790 or so sports days finish sooner. Dates that are already stored are skipped for free, so the backfill can go much faster. Both schedules can run at once with no harm, because a repeated write is idempotent.

### Monitoring and cleanup

- Logs: CloudWatch lines with `connections_backfill_results`.
- Progress: the `connections_backfill_cursor` / `connections_backfill_cursor_sports` items in DynamoDB.
- Stop the backfill early: `aws scheduler delete-schedule --group-name connections --name connections-backfill`
- Re-run the backfill from scratch: delete the cursor items. Stored puzzles are skipped, so only gaps get fetched.
