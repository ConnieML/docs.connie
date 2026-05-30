---
sidebar_label: Ticketing System
sidebar_position: 3
title: "Ticketing System Troubleshooting"
---

# Ticketing System Troubleshooting

Symptom-driven guide for the **Connie Support Ticket System**, written for Connie account administrators. Each item says what you can **check or fix locally** versus when to **open a ticket with Connie** (or, if the ticketing system itself is the problem, contact the Connie Care Team directly).

> **Rule of thumb:** anything about *one staff member, one ticket, or one inbox* is usually local. Anything about *your whole account's scoping, isolation, or the Support panel not appearing* is a Connie-side onboarding matter — open a ticket.

---

## "Track" says **"not found"** for a ticket I know exists

**What it means:** the lookup is **account-scoped** — it only finds tickets that belong to *your* account.

**Fix locally:**
- Confirm you typed the **correct ticket number** (from the confirmation screen or email).
- Confirm you're signed into the **right Connie account** for that ticket.
- Remember you can only look up **your own account's** tickets — a number from another organization will always return "not found." This is expected and protects privacy.

**Open a ticket with Connie if:** a ticket number that you *know* belongs to your account, and that appears under **"See all tickets,"** still returns "not found" in Track.

---

## "See all tickets" is **empty**

**Fix locally:**
- Make sure you opened the Support panel from the **no-active-task view** (the right-hand panel when you have no task), so your account context is set. Re-load the panel if needed.
- Check the **status filter** — the list defaults to **Open**. Switch to **All** to see closed/resolved tickets too.

**Open a ticket with Connie if:** the list is empty even with the **All** filter and you know tickets exist for your account. This usually means your account's support scoping isn't fully wired — a Connie-side onboarding fix, **not** something an administrator changes locally.

---

## Staff don't see the **Support panel** at all

**Fix locally:**
- Confirm the staff member has **no active task** — the Support panel shows in the no-task view.
- Have them reload Connie.

**Open a ticket with Connie if:** the Support panel still doesn't appear. The panel and its account scoping are configured during account onboarding; if it's missing, that's a Connie-side gap.

---

## I see **another organization's** tickets (or someone else sees mine)

**This should never happen** — accounts are isolated by design.

**Action:** **Open a ticket with Connie immediately** and flag it as a **privacy/isolation** issue. Do not keep using the affected view until you hear back. This is the one symptom to escalate right away rather than troubleshoot locally.

---

## No **email confirmation** after submitting

**Fix locally:**
- Check the **spam/junk** folder.
- Confirm the email address entered on the ticket form is correct and is an inbox the person actually checks.
- Some self-hosted email domains can intermittently delay or drop automated mail. If your staff use such an address, try a more reliable inbox (e.g., a standard provider) for ticket correspondence.

**Open a ticket with Connie if:** confirmations are *consistently* missing across multiple staff and inboxes — that points to a delivery issue on the support side.

---

## A closed ticket **came back / reopened on its own**

**This is expected.** If anyone **replies to the ticket email** after it's closed, the ticket **automatically reopens** and returns to the Care Team. To keep a ticket closed, don't reply to its email — start a new ticket for a new issue instead.

---

## After submitting, the confirmation screen feels like a dead end

**Fix locally:** use the buttons on the confirmation screen — **"See all my tickets"** (your account's list) or **"Back to Connie"** (returns to the support home). There's also **"File another ticket."**

---

## When in doubt

If you can't tell whether something is local or Connie-side, **open a ticket** and describe what you saw, what account you were in, and the ticket number (if any). The Care Team would rather take an extra ticket than have you stuck.

## Related

- [Support Ticket System — Administrator Guide](/techops/feature-deployment/support-features/support-ticket-system)
- [Submitting a Ticket (staff guide)](/get-support/support-ticket-system/submitting-a-ticket)
- [Common Issues](/techops/troubleshooting/common-issues)
