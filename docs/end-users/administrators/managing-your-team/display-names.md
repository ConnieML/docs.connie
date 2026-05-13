---
sidebar_label: "Display Names"
sidebar_position: 2
title: "Your Display Name in Connie"
---

# Your Display Name in Connie

For security and privacy reasons, Connie shows two different versions of every agent's name depending on who is looking. **Internal surfaces** (the ones your team sees) show the full "First Last" — that's what you, your teammates, and your supervisors need to do the work. **External surfaces** (the ones the people you serve see) show an abstracted version like "Olivia T." instead of "Olivia Thompson" — that protects your staff from being personally identifiable to third parties outside your organization.

## Where your name shows up

| Surface | Audience | What renders | Example |
|---|---|---|---|
| **Teams View** (Supervisor) | Internal — your supervisor and admins | Full First Last | Olivia Thompson |
| **Agent panel** (top-right of Connie) | Internal — you, on your own screen | Full First Last + activity status | Olivia Thompson · Available |
| **Reports and activity logs** | Internal — admin / supervisor / funder reporting | Full First Last | Olivia Thompson |
| **Incoming task notifications** (call / chat / SMS / WhatsApp) | Internal — you, when work is routed to you | Full First Last | "New task assigned to Olivia Thompson" |
| **Webchat header** | **External** — the website visitor chatting with you | Abstracted (First + last initial) | Olivia T. |
| **Voicemail / callback voice prompts** | **External** — the caller | Abstracted | "You'll be called back by Olivia T." |
| **Outbound email channel** | **External** — the email recipient | Configurable per deployment; defaults to abstracted | Olivia T. |

> 📸 **SCREENSHOT NEEDED — Andrea**
> **File path to save as:** `/static/img/managing-your-team/teams-view-display-name.png`
> **What to capture:** The supervisor's Teams View page in Connie, with at least one row showing the full "First Last" of an agent. Highlight or arrow the name column.
> **Why this shot matters:** Anchors the "internal surface = full name" claim above.
> **Replace this whole quote-block with:**
> `<div style={{textAlign: 'center', margin: '20px 0'}}><img src="/img/managing-your-team/teams-view-display-name.png" alt="Teams View showing full agent display name" style={{maxWidth: '800px', border: '1px solid #ddd', borderRadius: '8px'}} /></div>`

> 📸 **SCREENSHOT NEEDED — Andrea**
> **File path to save as:** `/static/img/managing-your-team/agent-panel-top-right.png`
> **What to capture:** The top-right corner of an agent's own Connie screen — avatar + display name + activity status (Available / Unavailable / On a Task). Capture just the panel, not the whole screen.
> **Why this shot matters:** Shows agents what they see when they look at themselves.
> **Replace this whole quote-block with:**
> `<div style={{textAlign: 'center', margin: '20px 0'}}><img src="/img/managing-your-team/agent-panel-top-right.png" alt="Agent panel top-right showing own display name and status" style={{maxWidth: '400px', border: '1px solid #ddd', borderRadius: '8px'}} /></div>`

> 📸 **SCREENSHOT NEEDED — Andrea**
> **File path to save as:** `/static/img/managing-your-team/webchat-header-external.png`
> **What to capture:** The external webchat widget as a website visitor sees it, with the agent identified as "First L." (e.g. "Olivia T."). If possible, capture both states: the chat header and an in-line agent message bubble showing the abstracted name.
> **Why this shot matters:** Proves the privacy-preserving abstracted form. This is the page's single most important visual.
> **Replace this whole quote-block with:**
> `<div style={{textAlign: 'center', margin: '20px 0'}}><img src="/img/managing-your-team/webchat-header-external.png" alt="Webchat header showing abstracted agent name to external visitor" style={{maxWidth: '500px', border: '1px solid #ddd', borderRadius: '8px'}} /></div>`

> 📸 **SCREENSHOT NEEDED — Andrea**
> **File path to save as:** `/static/img/managing-your-team/activity-log-internal.png`
> **What to capture:** A reports or activity-log view showing one or more agent rows with full First Last names visible.
> **Why this shot matters:** Confirms reports surface full names for internal audit / funder reporting.
> **Replace this whole quote-block with:**
> `<div style={{textAlign: 'center', margin: '20px 0'}}><img src="/img/managing-your-team/activity-log-internal.png" alt="Internal activity log showing full agent display names" style={{maxWidth: '800px', border: '1px solid #ddd', borderRadius: '8px'}} /></div>`

## When your name is correct

In most cases your display name is set correctly the first time your Connie account is provisioned. There is nothing for you to do.

## When your name is wrong

Occasionally a display name shows incorrectly — most often as an email address — if the name field on the account was incomplete when it was created, or if changes were made after the agent's first login.

**If your display name (or a teammate's) is showing wrong, open a support ticket with:**

1. The affected person's Connie email
2. The correct First Last name as it should appear
3. A short note about where you are seeing it wrong (Teams View? Agent panel? Webchat? Reports?)

We will fix it on the back end — typically within the same business day, often much faster.

> 📸 **SCREENSHOT NEEDED — Andrea (OPTIONAL)**
> **File path to save as:** `/static/img/managing-your-team/display-name-wrong-example.png`
> **What to capture:** An anonymized example of the failure mode — an agent showing as an email address (e.g. `j.smith@example.org`) instead of "Jane Smith." If a real example isn't available, this shot can be skipped or mocked up.
> **Why this shot matters:** Helps admins recognize the specific failure pattern so they raise the right ticket.
> **Replace this whole quote-block with:**
> `<div style={{textAlign: 'center', margin: '20px 0'}}><img src="/img/managing-your-team/display-name-wrong-example.png" alt="Display name rendering as email address instead of First Last" style={{maxWidth: '500px', border: '1px solid #ddd', borderRadius: '8px'}} /></div>`

## Self-serve fix — on the roadmap

A self-serve version of this fix is on our product roadmap. Until then, the ticket process keeps a clean audit trail and ensures the change is applied consistently to every place your name appears in Connie — internal **and** external surfaces, in one operation.

## Related

- [Roles & permissions](/getting-started/roles-permissions)
- [Add an agent](/end-users/administrators/managing-your-team/add-an-agent) (for provisioning a new agent so their name is correct from the start)
