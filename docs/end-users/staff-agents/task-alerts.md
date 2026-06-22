---
sidebar_label: "Connie Task Alerts"
sidebar_position: 6.5
title: "Connie Task Alerts"
description: "Get a friendly desktop pop-up when a new task arrives — so you don't have to watch Connie all day."
---

# Connie Task Alerts

**Connie isn't meant to be stared at all day.** Like most people at a nonprofit, you're juggling — email, your EMR, a spreadsheet, a phone call, a walk-in. You shouldn't have to keep one eye glued to the Connie tab waiting for work to show up.

**Connie Task Alerts** are a friendly heads-up: when a new task is routed to you, your computer shows a **desktop pop-up** — even when Connie is in the background and you're working in another window. Glance at it, finish what you're doing, and come back to Connie when you're ready.

## 🎥 Video walkthrough {#video-walkthrough}

A quick 90-second tour — what Task Alerts are, what the pop-up looks like, and how to turn them on or off right from Chrome.

<video
controls
preload="metadata"
poster="https://admin-connie-one-uploads.s3.amazonaws.com/training/connie-task-alerts-poster.jpg"
style={{width: '100%', maxWidth: '900px', borderRadius: '8px', display: 'block', margin: '1rem 0'}}>
<source src="https://admin-connie-one-uploads.s3.amazonaws.com/training/connie-task-alerts.mp4" type="video/mp4" />
<track kind="captions" src="/captions/connie-task-alerts.vtt" srcLang="en" label="English" default />
Your browser doesn't support embedded video — <a href="https://admin-connie-one-uploads.s3.amazonaws.com/training/connie-task-alerts.mp4">download the walkthrough</a> instead.
</video>

---

:::info Who turns this on?
Task Alerts have two switches, and **both** have to be on for you to see pop-ups:

1. **Your administrator** turns the feature on **for your organization** (see your admin's guide).
2. **You** allow notifications on **your own computer** — and you can turn them on or off whenever you like. It's your screen; it's your call.

This page covers **your** half: getting the pop-ups to show up on your machine.
:::

---

## What a Task Alert looks like

When a new task arrives, you'll get a standard desktop notification from your browser titled **"Connie — New Task"** with the message *"A new task has arrived in your queue."* It appears in the corner of your screen (top-right on Mac, bottom-right on Windows), the same way a calendar or email alert does.

It does **not** put anything new inside the Connie screen — Connie already shows you incoming tasks. The alert is purely for when you're looking **somewhere else**.

:::note Supported browser
Connie Task Alerts work in **Google Chrome**. Make sure you're using Chrome and signed in to Connie on a **standalone** Connie page (e.g. `your-org.connie.team`) — not Connie embedded inside another website.
:::

---

## Turn on Task Alerts (3 quick steps)

Do these once, in order.

### 1. Chrome — allow notifications for Connie

1. In Chrome, open your Connie tab.
2. Click the **tune / sliders icon** (or the 🔒) at the **left of the address bar** → **Site settings**.
3. Set **Notifications → Allow**.
4. Confirm you're in the **correct Chrome profile** (the avatar at the top-right) — the one you actually sign in to Connie with. Permissions are saved per profile, so a different profile won't carry them over.

The first time a task arrives after the feature is enabled, Chrome may also pop a small prompt asking to show notifications — click **Allow**.

### 2. Let your computer show the pop-up

**On a Mac:**

1. Open **System Settings → Notifications → Google Chrome**.
2. Turn **Allow Notifications** → **ON**.
3. Set **Alert style → Alerts**. *(This matters: "None" is silent and never pops; "Banners" pops but disappears in a few seconds. **Alerts** stays on screen until you act.)*
4. Turn on **Play sound for notifications**, **Show in Notification Center**, and **Badge app icon**.

**On Windows:**

1. Open **Settings → System → Notifications** and make sure notifications are **On**.
2. Find **Google Chrome** in the app list → turn it **On**, then click it.
3. Enable **Show notification banners** *and* **Play a sound**. *(Banners is a separate toggle from "show in notification center" — turn on both.)*

### 3. Turn off "quiet" modes

A focus or Do-Not-Disturb mode will **silently swallow** every pop-up — this is the single most common reason alerts "don't work."

- **Mac:** open **Control Center** (top-right of the menu bar) → make sure **Focus / Do Not Disturb is off** (no moon icon).
- **Windows:** **Settings → System → Notifications** → make sure **Do not disturb is Off**.

---

## Test it

1. In Connie, set your status to **Available**.
2. Switch to **another app or browser tab** so Connie is in the background.
3. Have a task routed to you (ask a teammate to send a test, or call your Connie number).
4. You should get an on-screen **"Connie — New Task"** pop-up, with a sound.

That's it — you're set.

---

## Not seeing alerts?

Quick checks, in order:

1. **Open your notification center first.** If you see Connie alerts **piled up there** but never saw them pop, the alert is arriving fine — a **Focus / Do Not Disturb** or **alert-style** setting is hiding it (Step 2 or 3 above). This is *not* a Connie or permissions problem.
   - *Mac:* click the **clock** (top-right) to open Notification Center.
   - *Windows:* click the **date/time** (bottom-right).
2. **Confirm the feature is on for your org.** If no teammate is getting alerts either, ask your administrator to confirm Connie Task Alerts is **activated** for your organization.
3. **Wrong Chrome profile?** Make sure you're signed in to Connie in the same profile where you clicked **Allow**.

Still stuck? See **[Connie Task Alerts — Advanced Troubleshooting](/end-users/administrators/task-alerts-troubleshooting)** (you can share it with your admin), or [Get Support](/get-support/overview).

---

## Related

- [Getting Started](/end-users/staff-agents/getting-started) — set your status to Available
- [Handling Tasks](/end-users/staff-agents/handling-tasks/) — what to do once a task arrives
- [Administrators: Activate Connie Task Alerts](/end-users/administrators/task-alerts) — the org-level switch
