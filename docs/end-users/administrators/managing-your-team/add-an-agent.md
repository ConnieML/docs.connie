---
sidebar_label: "Add an Agent"
sidebar_position: 3
title: "Add an Agent"
---

# Add an Agent

Adding an agent to Connie means: identifying the right person, setting them up so they can sign in, putting them on the right team, and giving them the right skills so the right work routes to them. Today this is a coordinated handoff between you (the admin) and your Connie deployment team. A self-serve admin panel is on the roadmap.

## Before you start — admin checklist

Have these four things in hand before you open the ticket. The deployment team needs all four to provision cleanly the first time.

| What | Why it matters |
|---|---|
| **Agent's full First Last name** | This sets the display name on every internal surface (Teams View, reports, notifications). Get it right the first time — see [Display names](/end-users/administrators/managing-your-team/display-names) for why this matters. |
| **Agent's Connie email** (`@yourorg.org`) | This becomes their sign-in identity. The agent will receive an invitation email at this address. |
| **Role** | Staff Agent, Supervisor, or Admin — see [Roles & permissions](/getting-started/roles-permissions). |
| **Team and skills** | Which team (e.g. *ADC-Jones*, *RAMP*, *Intake*) and which skills (e.g. *Spanish*, *Nursing*, *Webchat*) so the right work routes to them on day one. See [Assign skills](/end-users/administrators/managing-your-team/assign-skills) and [Manage teams & queues](/end-users/administrators/managing-your-team/manage-teams-queues). |

## How the onboarding flow works

Connie uses Single Sign-On (SSO) for agent authentication. The Worker record — the thing that lets Connie route tasks to that person — is created the first time the agent signs in through SSO, not when the admin requests the account. This is important to understand because it changes what "ready" means.

| Step | Who does it | What happens |
|---|---|---|
| 1. You open the request | Admin (you) | Ticket with the four items above. |
| 2. Deployment team configures access | Connie deployment team | Adds the agent to your tenant's SSO allowlist; pre-stages the team and skill assignments. |
| 3. Agent receives sign-in URL | Deployment team → agent | The agent gets their organization's Connie URL (e.g. `https://yourorg.connie.team`) and the prompt to sign in for the first time. |
| 4. Agent signs in for the first time | Agent | This first sign-in creates the Worker record and applies the pre-staged team and skill assignments. The agent now appears in Teams View and starts receiving work. |
| 5. You verify | Admin (you) | Confirm the agent appears in your supervisor's Teams View with the correct name, team, and skills. |

**The agent is not "live" until they complete step 4.** If you provisioned five agents on Monday morning and three of them haven't logged in yet, only the two who signed in will show up in Teams View. That's expected — the others are pre-staged and will appear the moment they sign in.

> 📸 **SCREENSHOT NEEDED — Andrea**
> **File path to save as:** `/static/img/managing-your-team/add-an-agent-teams-view-after-first-login.png`
> **What to capture:** The supervisor's Teams View showing a freshly-added agent who has completed their first sign-in. Ideally side-by-side or before/after with a placeholder row vs. the row populated after the agent's first login.
> **Why this shot matters:** Anchors the "not live until first sign-in" concept above — admins need to see what "live" looks like.
> **Replace this whole quote-block with:**
> `<div style={{textAlign: 'center', margin: '20px 0'}}><img src="/img/managing-your-team/add-an-agent-teams-view-after-first-login.png" alt="Teams View showing newly-added agent after first SSO sign-in" style={{maxWidth: '800px', border: '1px solid #ddd', borderRadius: '8px'}} /></div>`

## How to open the request today

Until the self-serve admin panel ships, open a support ticket with all four items from the checklist above. Use this template:

```
Subject: New agent onboarding — [Agent First Last]

Agent: [First Last]
Email: [agent@yourorg.org]
Role: [Staff Agent / Supervisor / Admin]
Team: [Team name]
Skills: [comma-separated skill names]
Effective date: [date the agent should be able to sign in]
Notes: [anything special — e.g. "covers evenings only", "bilingual Spanish/English"]
```

Typical turnaround is same business day. If your agent is starting Monday morning, send the request by Friday afternoon at the latest so the deployment team can pre-stage and you have time to verify.

## After the agent is added

1. **Confirm display name** — open Teams View (after the agent has signed in for the first time) and check the name renders as full First Last. If it shows as an email address, see [Display names](/end-users/administrators/managing-your-team/display-names#when-your-name-is-wrong).
2. **Confirm skills** — send a test task on each channel the agent is supposed to handle. If you assigned the *Webchat* skill, start a webchat session and confirm the task routes to them.
3. **Confirm team membership** — in Teams View, filter by their team. They should appear in the filtered list.

## Self-serve — on the roadmap

A self-serve admin panel for agent onboarding is on the product roadmap. Until then, the ticket process keeps a clean audit trail and ensures all four configuration surfaces (SSO, Worker record, team membership, skill assignment) stay consistent. Splitting them across self-serve and ticket would create the kind of drift that causes the "agent missing from Teams View" or "agent has wrong skills" failure modes we're explicitly avoiding.

## Related

- [Display names](/end-users/administrators/managing-your-team/display-names) — what to verify after the agent's first sign-in
- [Assign skills](/end-users/administrators/managing-your-team/assign-skills) — adjust skills after onboarding
- [Manage teams & queues](/end-users/administrators/managing-your-team/manage-teams-queues) — move an agent between teams
- [Remove or deactivate](/end-users/administrators/managing-your-team/remove-or-deactivate) — the reverse workflow

## Further reading (technical admins)

For the platform-level details on how Teams, Workers, and channel routing work in the Twilio Flex layer underneath Connie, see the [Twilio Flex Teams admin guide](https://www.twilio.com/docs/flex/admin-guide/setup/teams). Connie's deployment model differs in several specifics (SSO-first provisioning, basecamp-managed configuration) but the underlying concepts are useful background.
