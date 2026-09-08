---
sidebar_label: "Agent Send to Voicemail"
sidebar_position: 2
title: "Agent Send to Voicemail — what it is and how to turn it on"
---

# Agent Send to Voicemail

This feature gives your agents a third button on a **ringing** voice call: alongside accept and
decline, they can send the caller straight to your voicemail greeting.

It ships **switched off**. Nothing changes for your team until you ask for it to be turned on.

## What your agents get

A caller rings. Nobody can take it — the team is busy, or it's a one-person shift. Rather than
leaving that person on hold, an agent sends them to voicemail, and the message comes back as a
voicemail task in the queue with the caller's details attached.

This is what appears on a ringing call once it's on — the round voicemail icon, to the right of the
green accept and red decline buttons your agents already know:

<a href="/img/features/agent-send-to-voicemail/01-ringing-card-control-present.png" target="_blank">
  <img src="/img/features/agent-send-to-voicemail/01-ringing-card-control-present.png" alt="A ringing call in Connie showing three buttons beneath it: green accept, red decline, and a round voicemail icon" style={{width: '100%', border: '1px solid #ddd', borderRadius: '8px'}} />
</a>

*Click any image on this page to open it full size.*

Your agents' guide to using it:
**[Sending a Caller to Voicemail](/end-users/staff-agents/handling-tasks/handling-calls/send-to-voicemail)**.

## Decide this before you turn it on

:::warning It removes the call for the whole team
One agent clicking it takes the caller out of the queue — the ringing task disappears for
**everyone**, and nobody else can answer it.

For a small program where the whole team is two or three people, that is usually exactly what you
want. For a larger queue where you'd rather a call kept hunting for a free agent, think carefully:
your agents already have the **decline** button, which passes a call along without ending it.
:::

Connie asks the agent to confirm before anything happens, and the confirmation says plainly that the
call ends for the team. **That wording is deliberate and shouldn't be softened** — it is what stops a
mis-click becoming a lost caller.

<div style={{textAlign: 'center'}}>
  <img src="/img/features/agent-send-to-voicemail/02-confirmation-dialog.png" alt="Confirmation dialog reading: Send this caller to voicemail? This ends the call for the whole team, not just for you. The caller will be asked to leave a message, and nobody else will be able to answer this call. Buttons: Keep it ringing, Send to voicemail." style={{maxWidth: '720px', border: '1px solid #ddd', borderRadius: '8px'}} />
</div>

Nothing has happened at this point. **Keep it ringing** backs out and the call carries on hunting for
an agent.

## What it does to your reporting

A caller sent to voicemail by an agent is recorded as **`Sent to voicemail by agent`**. It is **not**
counted as an abandoned call.

This matters if you report to funders. An abandoned call says nobody answered and the caller gave up.
This was a decision your team made to serve the caller better, and the resulting voicemail is linked
back to the original call, so the two read as one story.

## Who can use it

By default, **every agent**. If you'd rather restrict it to supervisors or a particular role, that
can be narrowed for your organization — it's a settings change, not a rebuild. Contact your Connie
account representative or the [Connie Care Team](/get-support/overview).

## What has to be true first

Send to Voicemail rides your existing voicemail setup — it doesn't create one. Before it can be
turned on, your organization needs:

| Requirement | Why |
|---|---|
| **A voicemail experience already working on your voice line** | The feature hands the caller to the greeting you already have. See [Choose Your Voice Experience](/end-users/administrators/channels/voice/voicemail/voicemail-options-guide). |
| **Callers routed through the queue/wait experience** | The button acts on a caller waiting in a queue. |
| **A recent Connie release on your account** | Older accounts may need an update first; your account representative will confirm. |

If you're not sure whether your organization meets these, ask — it takes a few minutes to check and
it's better answered before your team is told about the feature.

## Turning it on

**Contact your Connie account representative or the
[Connie Care Team](/get-support/overview)** and ask for **Agent Send to Voicemail** to be enabled.

Tell us:

1. **Which programs or departments** should have it — it can be enabled for your whole organization
   or specific queues.
2. **Whether every agent should have it**, or only certain roles.
3. **When you want it live.** We schedule these during your business hours, with someone available,
   so any surprise is caught while your team is at their desks rather than the next morning.

We'll confirm when it's active, and what your agents will see.

:::tip Tell your team before we switch it on
A new button appearing next to accept and decline is the kind of thing people notice mid-call. A
short note beforehand — what it is, and that it ends the call for everyone — saves a confused
afternoon. We can supply the wording.
:::

## After it's on

- **Nothing else changes.** Your existing voicemail greeting, routing, transcription and email
  notifications all behave exactly as before.
- **It can be switched off instantly** if it isn't working for your team — no deploy, no downtime.
- **The button only ever appears on a ringing voice call.** It is never offered on emails, faxes,
  chats, or on a call an agent has already accepted.

### Where it deliberately doesn't appear

Worth knowing before the first "the button is missing" question reaches you — in both cases below,
the feature is switched on and working exactly as designed.

<a href="/img/features/agent-send-to-voicemail/04-accepted-call-control-absent.png" target="_blank">
  <img src="/img/features/agent-send-to-voicemail/04-accepted-call-control-absent.png" alt="A call the agent has already accepted, showing only hold and hang up controls — no voicemail icon" style={{width: '100%', border: '1px solid #ddd', borderRadius: '8px'}} />
</a>

**On a call that's already been accepted** — only hold and hang up. Once an agent has answered, the
caller is in a conversation, not waiting in a queue, and there is nothing to send to voicemail.

<a href="/img/features/agent-send-to-voicemail/03-email-task-control-absent.png" target="_blank">
  <img src="/img/features/agent-send-to-voicemail/03-email-task-control-absent.png" alt="An email task open in Connie, with no voicemail icon among its controls" style={{width: '100%', border: '1px solid #ddd', borderRadius: '8px'}} />
</a>

**On an email, fax or chat task** — there is no live caller on the line to redirect.

### Switching it off

It comes off the same way it went on, and the change is immediate — agents see the button disappear
on their next ringing call, with no deploy and no downtime:

<div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
  <a href="/img/features/agent-send-to-voicemail/06-flag-back-on-control-returns.png" target="_blank" style={{flex: '1 1 320px'}}>
    <img src="/img/features/agent-send-to-voicemail/06-flag-back-on-control-returns.png" alt="A ringing call with the feature on — accept, decline and voicemail icon" style={{width: '100%', border: '1px solid #ddd', borderRadius: '8px'}} />
  </a>
  <a href="/img/features/agent-send-to-voicemail/05-flag-off-control-gone.png" target="_blank" style={{flex: '1 1 320px'}}>
    <img src="/img/features/agent-send-to-voicemail/05-flag-off-control-gone.png" alt="The same ringing call with the feature off — only accept and decline" style={{width: '100%', border: '1px solid #ddd', borderRadius: '8px'}} />
  </a>
</div>

*On (left) and off (right). Accept and decline are untouched either way.*

---

**Related:** [Choose Your Voice Experience](/end-users/administrators/channels/voice/voicemail/voicemail-options-guide)
· [Sending a Caller to Voicemail (agent guide)](/end-users/staff-agents/handling-tasks/handling-calls/send-to-voicemail)
· [Get Support](/get-support/overview)
