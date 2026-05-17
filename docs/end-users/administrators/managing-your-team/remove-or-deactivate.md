---
sidebar_label: "Remove or Deactivate"
sidebar_position: 6
title: "Remove or Deactivate an Agent"
---

# Remove or Deactivate an Agent

When an agent leaves your organization, takes extended leave, or changes role, you can take them out of Connie cleanly. There are two ways to do that, and the choice matters for both compliance and for getting them back later if circumstances change.

| | Deactivation | Removal |
|---|---|---|
| **What it does** | Stops the agent from signing in. Stops new work from routing to them. Preserves their account, history, and configuration. | Same as deactivation, plus permanently closes the account. The agent record is retired. |
| **Reversible?** | Yes — reactivate any time. | No — would require full re-onboarding as a new agent. |
| **Best for** | Extended leave, sabbatical, temporary role change, agent on a performance plan. | Departure from the organization, end of contract, security event. |
| **Audit trail** | Account remains visible in reports as "Deactivated." | Account remains in historical reports under their original display name. |

**When in doubt, deactivate.** Removal is permanent and re-creating the agent later (same person, new account) breaks historical reporting continuity. Deactivation is the safer default.

## Before you offboard — admin checklist

Run through these before opening the ticket. Skipping any of them creates work for someone else later.

| What | Why |
|---|---|
| **Reassign in-flight tasks** | If the agent is on a live call, in an active webchat, or owns open trouble tickets — those need to land somewhere. Identify who picks them up. |
| **Transfer ownership** of saved templates, scheduled callbacks, recurring tasks | Anything owned by the agent's user identity will become orphaned. Move them to the team's shared admin or to the agent's replacement. |
| **Capture handoff knowledge** | If this agent was the only one with a particular skill or program coverage, document what they knew. The remaining team needs that context. |
| **Note compliance preservation needs** | Historical reports retain the agent's data automatically. Don't worry about "losing" their work — funder reporting and audit trails preserve everything. |
| **Coordinate with HR / IT timing** | The offboarding timing should align with the agent's last day and any HR-driven access revocations. |

## How the offboarding flow works

Order matters. Connie uses Single Sign-On (SSO), so revoking the SSO access first prevents the agent from re-authenticating and re-provisioning themselves after you deactivate the Worker record.

| Step | What happens |
|---|---|
| 1. SSO access revoked | Deployment team removes the agent from the organization's SSO allowlist. They can no longer sign in. |
| 2. Active sessions terminated | Any active Connie session (browser tab still open) is signed out within minutes. |
| 3. Worker record deactivated (or removed) | The routing engine stops considering them for new work. Open queues skip them. |
| 4. Team memberships preserved (deactivation) or cleared (removal) | Deactivation keeps team rosters intact for reporting context; removal cleans them out. |
| 5. Historical reports unchanged | All past activity (tasks handled, time logged, performance) stays in reports under the agent's original display name. |

> 📸 **SCREENSHOT NEEDED — Andrea**
> **File path to save as:** `/static/img/managing-your-team/teams-view-deactivated-agent.png`
> **What to capture:** Teams View showing a deactivated agent — typically grayed out, with a "Deactivated" status badge or similar visual. Compare side-by-side with an active agent row if possible.
> **Why this shot matters:** Admins need to recognize what a deactivated agent looks like in their day-to-day view so they don't mistakenly assume the agent is still routable.
> **Replace this whole quote-block with:**
> `<div style={{textAlign: 'center', margin: '20px 0'}}><img src="/img/managing-your-team/teams-view-deactivated-agent.png" alt="Teams View showing deactivated agent row" style={{maxWidth: '800px', border: '1px solid #ddd', borderRadius: '8px'}} /></div>`

## What the system handles automatically

You don't need to do these — they happen as a consequence of step 1 or 3 above:

- **Sign out active sessions** (no agent can hold an open browser tab indefinitely after access is revoked)
- **Stop routing new work** (queues skip deactivated/removed agents on the next assignment cycle, usually within seconds)
- **Preserve historical reports** (every task they ever handled, every minute they were available, every transfer — all retained, queryable by their original name, indefinitely)
- **Preserve audit trail** for funder reporting and compliance reviews

## What you DO need to do

- **Reassign their in-flight work** — Connie doesn't auto-reroute tasks an agent was actively holding. Active calls drop when the session terminates; open trouble tickets need explicit reassignment. Reassign before the deactivation step, not after.
- **Communicate to the team** — supervisors and teammates need to know who's covering the gap. Connie won't tell them.

## How to open the request today

Open a support ticket with the deployment team:

```
Subject: Offboard agent — [Agent First Last]

Agent: [First Last] ([agent@yourorg.org])
Action: [Deactivation / Removal]
Effective date and time: [date and time, in your local time zone]
In-flight work reassignment:
  - Task / item: [description]
    Reassign to: [agent name + email]
  - (repeat as needed)
Notes: [HR coordination, any compliance flags, reason if useful for audit trail]
```

Typical turnaround is same business day. For end-of-week departures, send the request by Thursday so the offboarding can land cleanly on Friday without rushing.

## Reactivating a deactivated agent

If you deactivated and circumstances change — agent returns from leave, role change reversed — reactivation is a single ticket:

```
Subject: Reactivate agent — [Agent First Last]

Agent: [First Last] ([agent@yourorg.org])
Effective date: [date]
Skill/team changes since deactivation (if any): [list]
Notes: [why they're coming back, if useful]
```

Their account, history, and team memberships restore intact. Skills can be adjusted as part of the reactivation if their role is different the second time around.

## Self-serve — on the roadmap

A self-serve offboarding panel is on the roadmap. Today's ticket process exists specifically to make sure the SSO-then-Worker order is correct and that in-flight work doesn't get orphaned. Both have caused real incidents in the past where self-serve would have been faster but messier.

## Related

- [Add an agent](/end-users/administrators/managing-your-team/add-an-agent) — the reverse direction of this workflow
- [Display names](/end-users/administrators/managing-your-team/display-names) — historical reports preserve names even after removal
- [Assign skills](/end-users/administrators/managing-your-team/assign-skills) — adjust on reactivation if their role changed

## Further reading (technical admins)

For the underlying Twilio Flex Worker lifecycle and TaskRouter activity model that drive deactivation and removal behavior, see the [Twilio Flex Teams admin guide](https://www.twilio.com/docs/flex/admin-guide/setup/teams) and the [TaskRouter Workers documentation](https://www.twilio.com/docs/taskrouter/api/worker). Connie's offboarding flow layers the SSO-first ordering on top of these primitives.
