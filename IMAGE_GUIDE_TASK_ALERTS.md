# Connie Task Alerts — Image Capture Guide

Screenshots to add to the Task Alerts docs. **All product screenshots must come
from the Lifeline demo tenant (fake data) — never a real client account.**

## Storage location
```
/static/img/features/task-alerts/
```
Reference in docs as `/img/features/task-alerts/<name>.png` using the centered
`<img>` pattern (see `IMAGE_GUIDE_STAFF_AGENTS.md` for the snippet).

## Screenshots needed

| # | File | Page | What to capture |
|---|------|------|-----------------|
| 1 | `task-alert-popup.png` | Agent guide (§ "What a Task Alert looks like") | A real **"Connie — New Task"** desktop pop-up in the corner of the screen (capture from a Lifeline session, tab unfocused). |
| 2 | `admin-toggle.png` | Admin guide (§ "Activate") | The **Admin panel** feature card labeled **"Browser notification"** with its on/off toggle, on Lifeline. |
| 3 | `chrome-allow-notifications.png` | Agent guide (§ Step 1) | Chrome's **Site settings → Notifications → Allow** for a `*.connie.team` site. |
| 4 | `mac-notifications-alerts.png` | Troubleshooting (Layer 2) | macOS **System Settings → Notifications → Google Chrome** with **Alert style = Alerts**. |
| 5 | `notification-center-piled.png` | Troubleshooting (Layer 1) | The macOS/Windows notification center with Connie alerts stacked (the "delivered but not shown" symptom). |

## Why these weren't auto-captured

Screenshots #1–#2 require an **authenticated Lifeline Flex session** (SSO), which
the automated tooling can't reach; #1/#4/#5 are OS-level notification UI that
can't be captured without the live desktop. Capture these manually from a
Lifeline session (privacy-safe — fake data), drop them in the folder above with
the filenames in the table, and embed with the standard centered `<img>` snippet.
