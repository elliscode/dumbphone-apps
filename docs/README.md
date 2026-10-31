# Setup docs

Walkthroughs for standing up dumbphoneapps on a fresh AWS account. Each doc lists what it depends on, so follow them in the order below.

| Doc | What it sets up |
|---|---|
| [file-sharer-link-previews.md](file-sharer-link-previews.md) | `/share/<id>` links with per-file Open Graph previews and blurred thumbnails |
| [preventable-reminders.md](preventable-reminders.md) | SMS reminders that can be skipped before they send, dispatched through EventBridge Scheduler |

All AWS commands assume region `us-east-1` and a configured AWS CLI. Replace `<ACCOUNT_ID>` and other `<placeholders>` with your own values.
