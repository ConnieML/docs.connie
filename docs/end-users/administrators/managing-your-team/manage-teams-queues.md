---
sidebar_label: "Manage Teams & Queues"
sidebar_position: 5
title: "Manage Teams & Queues"
---

# Manage Teams & Queues

**Teams** are how supervisors *see* their people — the filter in Teams View, the grouping in reports, the cohort for performance dashboards. **Queues** are how work *finds* people — the pool of skill+channel+priority criteria that decides which agent gets a given task. They're two different things solving two different problems, and getting that distinction clear up front saves a lot of confusion later.

| | Teams | Queues |
|---|---|---|
| **Purpose** | Supervisor / admin organization | Work routing |
| **Who sees them** | Supervisors and admins in Teams View | Nobody — they run in the background |
| **Membership rule** | Explicit (admin assigns) | Implicit (skills + channel + priority match) |
| **An agent can be in…** | Multiple teams | Many queues, automatically, by skill match |
| **Changes via** | Admin / support ticket | Skill changes ([Assign skills](/end-users/administrators/managing-your-team/assign-skills)) |

## Teams — the supervisor's view

A team is a named group of agents that shows up in Teams View as a filter. Your supervisor opens Teams View, picks a team from the dropdown, and sees just those agents and their current activity.

A real example from a multi-program deployment (NSS):

| Team | Who's on it | Typical use |
|---|---|---|
| RAMP | RAMP-program staff | Supervisor watching RAMP intake load |
| PCA | PCA-program staff | Supervisor watching PCA capacity |
| H2H | H2H program staff (Hospital-to-Home) | Cross-shift coverage view |
| ADC-Jones | ADC Jones location staff | Site supervisor at Jones |
| ADC-Henderson | ADC Henderson location staff | Site supervisor at Henderson |
| Admin | Operations / admin staff | Admin-only filter |

An agent can be on more than one team. A bilingual nurse who floats between Jones and Henderson might appear on both `ADC-Jones` and `ADC-Henderson` — that's expected, and both site supervisors see her in their respective filters.

> 📸 **SCREENSHOT NEEDED — Andrea**
> **File path to save as:** `/static/img/managing-your-team/teams-view-team-filter-dropdown.png`
> **What to capture:** Teams View open, with the team-filter dropdown expanded, showing multiple teams in a real deployment (e.g., the NSS team list above). Highlight or arrow the dropdown.
> **Why this shot matters:** Makes the "team = filter" concept concrete for admins who haven't poked around Teams View.
> **Replace this whole quote-block with:**
> `<div style={{textAlign: 'center', margin: '20px 0'}}><img src="/img/managing-your-team/teams-view-team-filter-dropdown.png" alt="Teams View with team-filter dropdown expanded" style={{maxWidth: '800px', border: '1px solid #ddd', borderRadius: '8px'}} /></div>`

## Queues — the routing layer

A queue is a pool of work waiting for an eligible agent. "Eligible" means the agent has the right skills, the right channel capacity, and is in an available status. Queues are configured during deployment and rarely change day-to-day — when they do, it's the deployment team, not the admin, who reconfigures them.

The mental model: **teams answer "who reports to which supervisor"; queues answer "who can take this incoming task."**

Common queue patterns:

- **One queue per program × channel** — e.g. *PCA-Voice*, *PCA-Webchat*, *RAMP-Voice*. An agent matches by holding the program skill (*PCA*) and the channel skill (*Voice*).
- **Language-overlay queues** — *Spanish-Voice* runs in parallel with the general voice queue. Agents with the *Spanish* skill match both; agents without it match only the general queue.
- **Overflow queues** — catch tasks that have waited longer than a threshold and route them to a broader pool. Useful for unstaffed nights and weekends.

Admins generally do not need to touch queue configuration directly. If a queue is misrouting work, the fix is almost always at the skill level (an agent missing a skill, or carrying a skill they shouldn't). See [Assign skills](/end-users/administrators/managing-your-team/assign-skills).

## How to change team membership today

For adding or removing an agent from a team, open a support ticket:

```
Subject: Team membership change — [Agent First Last]

Agent: [First Last] ([agent@yourorg.org])
Add to team(s): [comma-separated]
Remove from team(s): [comma-separated]
Effective date: [date]
Notes: [any context the supervisor or deployment team needs]
```

For creating a new team or renaming an existing one — that's a deployment-team configuration change, not a per-agent change. Open a ticket with the proposed team name, who should be on it (initial membership), and which supervisor owns the team's view.

## Common patterns

| Situation | Recommended approach |
|---|---|
| New program launches | Create a team for the new program; add agents who'll cover it; verify they hold the matching program skill (the routing layer needs both). |
| Agent moves between sites | Add to the new site's team; remove from the old site's team (unless they're floating across both). |
| Supervisor wants a custom "watch list" view | Today this is a team. The supervisor opens a ticket naming the watch list and the agents on it. |
| Cross-program coverage (one agent serving two programs) | Multiple team membership + matching program skills. Avoid creating overlapping queues unless the channel pattern truly differs. |

## Self-serve — on the roadmap

A self-serve team membership editor is on the roadmap. Queue reconfiguration will remain a deployment-team responsibility for the foreseeable future — queue changes have routing-wide implications that aren't safe to expose self-serve.

## Related

- [Assign skills](/end-users/administrators/managing-your-team/assign-skills) — the routing layer that complements teams
- [Add an agent](/end-users/administrators/managing-your-team/add-an-agent) — initial team assignment happens during onboarding
- [Conversation transfer configuration](/end-users/administrators/conversation-transfer) — how transfers interact with queues
- [Supervisor overview](/end-users/supervisors/overview) — what supervisors see when they filter by team

## Further reading (technical admins)

For the underlying Twilio Flex Teams and TaskRouter Workflow primitives that drive Connie's team / queue model, see the [Twilio Flex Teams admin guide](https://www.twilio.com/docs/flex/admin-guide/setup/teams) and the [TaskRouter Workflows documentation](https://www.twilio.com/docs/taskrouter/api/workflow). Connie's day-to-day admin surface is wrapped in basecamp-managed configuration; the concepts map directly.
