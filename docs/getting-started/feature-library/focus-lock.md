---
sidebar_label: Focus Lock
title: Focus Lock
---

# Focus Lock

> **Status:** Optional feature — **OFF by default.** Turn it on per account when you want it.
> **Technical name:** `prevent-call-autoselect` (config flag `features.prevent_call_autoselect`).

## Feature summary

**Focus Lock keeps an incoming phone call from yanking an agent off the task they're already working.**

Out of the box, Connie (Twilio Flex) is an "omni-channel" tool: when a new call arrives, it automatically jumps
the agent's screen onto that call — even if the agent is in the middle of an email or chat. With **Focus Lock
turned on**, an incoming call instead **rings, appears in the agent's task list, and waits** — the agent stays
on their current work and **picks the call up when they're ready.** Callers wait in the queue; nothing is hidden
and nothing is dropped.

It changes **one** thing only: it stops the *automatic screen-grab*. The ring, the visibility in the task list,
the ability to answer — all unchanged.

## For Agents 👩‍💻

- **What changes:** When you're already working a task and a call comes in, your screen **stays put** on what
  you're doing. The call **still rings** and **shows up in your task list** — you just aren't thrown onto it.
- **To answer the call:** click it in your task list when you're ready. (Same accept button as always.)
- **If you're not working anything** when a call arrives, it behaves exactly like today — the call comes right to
  you.
- **Default:** Off. If your organization hasn't enabled it, calls behave the normal (interrupting) way.

## For Supervisors 👀

- Focus Lock makes the agent experience **"finish your thought, then take the call."** Agents won't get bumped
  mid-task; calls queue and are picked up when an agent is free.
- **Callers wait in queue** until an agent grabs the call — there is no automatic timeout/voicemail added by this
  feature (configure your queue/voicemail behavior separately if you want a fallback).
- It does **not** change routing, who sees which calls, or call priority — only the on-screen interruption.
- **Default:** Off. Ask your administrator to enable it for your team if "no interruptions" is the behavior you
  want.

## For Administrators ⚙️

- **What it is:** an optional plugin feature (`prevent-call-autoselect`) that suppresses Flex's automatic
  task-focus *only* for an inbound voice call arriving while the agent already has an active task.
- **Default (out of the box):** **disabled.** Registered in `flex-config/ui_attributes.common.json` as
  `prevent_call_autoselect: { enabled: false }` — no effect anywhere until you turn it on.
- **How to adjust / enable (per account):** set
  `features.prevent_call_autoselect.enabled: true` in that account's `flex-config/ui_attributes.<account>.json`
  (or via the `/template-admin` panel), then deploy/sync the config. Set it back to `false` to revert.
- **Scope of effect:** inbound **voice** tasks only, and only when the agent is **already busy**. Other channels
  (email/chat/fax), outbound calls, transfers, idle-agent calls, and other accounts are unaffected.

## How does it work?

Flex fires its native **`SelectTask`** action whenever a reservation arrives, which focuses the new task (the
"yank"). Focus Lock adds a small action hook: when an **inbound voice** reservation arrives while the agent has
an **accepted/wrapping** task, it flags that one reservation; a **`before SelectTask`** hook then aborts *only*
that automatic focus-grab. The flag is single-use and auto-expires, so the agent's **manual** click to answer
the call still works normally. This is the Twilio-recommended pattern for this behavior (no native toggle
exists). The ring and task-list visibility are provided by other (unchanged) features.

## Setup and dependencies

- Ships in the Connie Flex plugin (`plugin-flex-ts-template-v2`). No external dependencies.
- Enable via the flex-config flag above; deploy the plugin + config to the account.
- Recommended companion setting: worker **voice channel capacity = 1** (the Connie standard — "one call at a
  time").
