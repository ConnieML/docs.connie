---
sidebar_label: "Task Alerts — Troubleshooting"
sidebar_position: 6
title: "Connie Task Alerts — Advanced Troubleshooting"
description: "Why desktop alerts don't show, and how to fix it — for agents and admins. Covers Chrome, macOS, Windows, and Focus/Do-Not-Disturb."
---

# Connie Task Alerts — Advanced Troubleshooting

**Purpose:** get an on-screen desktop pop-up (with sound) when a new task is routed to you in Connie, even when Chrome isn't your focused window.

**Supported browser:** Google Chrome. These steps assume Chrome, on a **standalone** Connie page (e.g. `your-org.connie.team`) — not Connie embedded inside another website.

:::danger The #1 gotcha
A notification can be **delivered to your computer but never shown on screen** — it lands silently in the OS notification list instead. If alerts "aren't working," the fastest tell is to **open your notification center and look**: if Connie alerts are **piled up there** but you never saw them pop, it's a **display / Focus** setting — *not* Connie, and *not* a permissions problem.
:::

---

## ✅ Basic checklist (all agents — do these 3 in order)

### 1. Chrome — allow notifications for your Connie site

1. In Chrome, open your Connie tab (e.g. `your-org.connie.team`).
2. Click the **tune / sliders icon** (or 🔒) at the left of the address bar → **Site settings**.
3. Set **Notifications → Allow**.
4. Confirm you're in the **correct Chrome profile** (avatar, top-right) — the one you actually log in to Connie with. **Permissions are per-profile.**

### 2a. Mac — turn on notifications + alert style

1. **System Settings → Notifications → Google Chrome**
2. **Allow Notifications:** ON
3. **Alert style: Alerts** ← important. *(None = silent, never pops. Banners = pops but vanishes in ~5s. **Alerts** stays on screen until you act.)*
4. Turn ON: **Play sound**, **Show in Notification Center**, **Badge app icon**.

### 2b. Windows — turn on notifications + banners

1. **Settings → System → Notifications** → make sure notifications are **On**.
2. Find **Google Chrome** in the app list → turn it **On**, then click it.
3. Enable **Show notification banners** *and* **Play a sound**. *(Banners is a separate toggle from "show in notification center" — both should be on.)*

### 3. Turn off / pass through "quiet" modes

- **Mac:** Control Center (top-right) → make sure **Focus / Do Not Disturb** isn't active (no moon icon). To keep DND on but let Connie through, see **Layer 3** below.
- **Windows:** **Settings → System → Notifications** → ensure **Do not disturb** is Off.

> **Quick test:** switch to another app (Chrome in the background) → have a task routed to you → you should get an on-screen alert with sound.

---

## 🔧 Advanced — admins & deep troubleshooting

Desktop alerts pass through **three independent layers**, and any one can silently kill them. Diagnose in this order.

### Layer 1 — Is the notification even arriving? (rule out Connie / Chrome)

Open the OS notification list and look for piled-up Connie notifications:

- **Mac:** click the **clock** (top-right) to open Notification Center.
- **Windows:** click the **date/time** (bottom-right).

:::tip
If they're **stacked there but were never shown on screen** → delivery is fine; it's a display setting (Layer 2/3). **Do not touch Connie or site permissions.**
:::

### Layer 2 — Alert / display style (the most common silent culprit)

- **Mac:** System Settings → Notifications → **Google Chrome** → style was likely **None** (delivers silently). Set to **Alerts**.
  - The entry that actually presents web-push alerts is **"Google Chrome Alerts"** (the alert notification service) — make sure **it** is also set to **Alerts**, not just the main Chrome app.
- **Windows:** Settings → System → Notifications → **Google Chrome** → enable **Show notification banners**. *(A banner can be off while "show in notification center" is on — that produces the exact "silently piling up" symptom.)*

### Layer 3 — Focus / Do Not Disturb suppression

- **Mac:** Focus modes each have their **own** allow-list. To keep DND on but let Connie through: **System Settings → Focus →** *(each mode you use, e.g. Do Not Disturb, Reduce Interruptions)* **→ Allowed Notifications → Apps → ➕ → add Google Chrome.** Adding it to one mode does **not** cover the others — add it to **every** mode you use, and watch for a **scheduled Focus** (e.g. an automatic 9am–5pm Do Not Disturb) that silently activates during work hours.
- **Windows:** Settings → System → **Focus / Do not disturb** → check **automatic rules** (turns on during set hours, when an app is full-screen, when mirroring a display, when gaming). Disable the rules that fire during shifts, or add Chrome under **Set priority notifications**.

### Chrome-side advanced checks

- `chrome://settings/content/notifications` — confirm your Connie domain is under **Allowed**, not **Blocked**, and that **"Sites can ask to send notifications"** is enabled.
- **Profiles:** confirm you're logged in to Connie in the **same profile** that holds the Allow permission. A second/work profile without the permission is a common miss.
- `chrome://settings/system` — if available, ensure Chrome uses **native OS notifications** (so OS Focus/style settings apply).
- **Chrome must be running** (even in the background / minimized) to receive a push. Fully quitting Chrome = no notification.

---

## Admin one-liners (Mac — verify state without clicking)

For administrators or TechOps confirming a user's machine state from a terminal:

**See which notifications actually reached macOS** (proves delivery vs. display):

```bash
sqlite3 "$HOME/Library/Group Containers/group.com.apple.usernoted/db2/db" \
"SELECT datetime(delivered_date+978307200,'unixepoch','localtime'), app.identifier \
FROM record JOIN app ON record.app_id=app.app_id \
WHERE app.identifier LIKE '%hrome%' ORDER BY delivered_date DESC LIMIT 20;"
```

**Check which Focus is active right now** (an active `storeAssertionRecords` entry = a Focus is on):

```bash
cat "$HOME/Library/DoNotDisturb/DB/Assertions.json"
```

---

## TL;DR

- **Chrome →** Allow notifications for Connie.
- **Mac →** Notifications → Chrome → **Alerts** + sound.
- **Windows →** Notifications → Chrome → **banners** + sound.
- **Turn off Do Not Disturb** (or add Chrome to its allow-list).
- If alerts seem missing, **check your notification center first** — they're usually arriving, just not popping.

---

## Related

- [Agent Setup Guide](/end-users/staff-agents/task-alerts)
- [Activate / Deactivate (Admins)](/end-users/administrators/task-alerts)
- [Get Support](/get-support/overview)
