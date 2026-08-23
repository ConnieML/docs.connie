---
sidebar_label: "How Long Tasks Last"
sidebar_position: 5
title: "How Long a Task Stays in Your Queue"
---

# How Long a Task Stays in Your Queue

Tasks don't wait forever. Every task that arrives in Connie carries a **time-to-live** — how long it stays in the queue before the system automatically closes it.

**On Connie, that window is 96 hours — four full days.**

## Why four days and not one

Connie's underlying platform defaults to **24 hours**. For a contact center that runs seven days a week, that's fine. For a nonprofit that closes on Friday evening, it isn't — and the difference matters most at exactly the moment you're least able to catch it.

Here's the case that decided it:

> Your office closes **Friday at 5:30 PM**.
> An email referral arrives at **5:31 PM**.
> Your next agent starts **Monday at 7:00 AM**.

| Time-to-live | Task expires | Agent arrives Monday 7:00 AM | Outcome |
|---|---|---|---|
| 24 hours (platform default) | Saturday 5:31 PM | — | ❌ **Gone. Nobody ever saw it.** |
| 72 hours | Monday 5:31 PM | ✅ Still there | Works — until a holiday |
| **96 hours (Connie)** | **Tuesday 5:31 PM** | ✅ Still there | ✅ **Survives a holiday weekend too** |

That last row is the reason for 96 rather than 72. If Monday is a holiday and your team returns **Tuesday** at 7:00 AM, a 72-hour window would have closed the task on Monday evening — hours before anyone walked in. 96 hours covers a normal weekend *and* a long one, with about ten hours to spare.

## What this means for you day to day

- **Anything that arrives while you're closed will still be waiting** when you get back — over a weekend, and over a three-day weekend.
- **This applies to everything that waits for a person**: email, fax, web referrals, website contact forms, text messages, and voicemail.
- **Live phone calls and web chats are different.** Those have a much shorter window, because someone is on the line right now. Nobody holds on a phone line over a weekend.

:::warning A task expiring is silent
When a task reaches the end of its window, it closes **quietly**. There's no alert, no email, and it won't appear in your reports. That's exactly why the window is set generously — and why long-pending items are worth a look when you start your shift.
:::

## If you need something different

Some programs have needs the standard doesn't cover — a referral pathway that routinely takes a week, or a compliance rule that requires a shorter retention window.

**Custom time-to-live settings are available.** They're configured per channel, per program, so one department can differ from another.

To request a change, contact **your Connie account representative** or the **[Connie Care Team](/get-support/overview)**. Please include:

- **Which program or channel** (for example, "H2H web referrals" or "RAMP voicemail")
- **The window you need**, and roughly why
- **Who approved it** on your side

One thing worth knowing before you ask: the window is set **at the moment a task is created** and cannot be changed afterward. Raising the limit protects everything that arrives *from then on* — it can't reach back and recover a task that has already closed. So it's worth raising sooner rather than after something is missed.

## Related

- **[Handling Tasks](/end-users/staff-agents/handling-tasks)** — the task lifecycle, channel by channel
- **[Parking Tasks](/end-users/staff-agents/parking-tasks)** — stepping away from a task you're waiting on. Parking has its **own, much longer** window and is the right tool when you're waiting on a third party.
- **[Task Alerts](/end-users/staff-agents/task-alerts)** — how Connie notifies you about waiting work
