---
sidebar_label: "Assign Skills"
sidebar_position: 4
title: "Assign Skills to an Agent"
---

# Assign Skills to an Agent

Skills are how Connie decides which work goes to which agent. An agent with the *Spanish* skill receives Spanish-language tasks. An agent with the *Nursing* skill receives nursing-program tasks. An agent without a given skill is invisible to that pool of work — they won't see it, and supervisors don't have to manually route around them.

Skills are the most important routing lever you control as an admin. Get them right and the queue takes care of itself.

## What skills look like in Connie

Connie deployments typically organize skills along three axes. Most agents carry skills from more than one axis.

| Skill axis | Examples | Used to route by… |
|---|---|---|
| **Language** | *Spanish*, *English*, *Vietnamese*, *ASL* | The caller's language preference, detected at intake or self-selected |
| **Program** | *Nursing*, *Intake*, *PCA*, *RAMP*, *ADC*, *H2H* | Which program or service line the work belongs to |
| **Channel** | *Voice*, *Webchat*, *SMS*, *Email*, *Fax*, *Whatsapp* | Which communication channel the work arrived on |

A new bilingual intake nurse at NSS, for example, might carry: *Spanish*, *English*, *Nursing*, *Intake*, *Voice*, *Webchat* — six skills, two from each axis. That's normal.

## Channel capacity

Beyond just "can this agent take this kind of work," Connie also tracks **how much of it** an agent can handle at once. This is channel capacity, and it's configured per-channel per-agent.

| Channel | Typical default capacity | Why |
|---|---|---|
| Voice | 1 | A human can only talk on one phone call at a time. |
| Webchat | 2–3 | Most agents can manage two or three webchats in parallel. |
| SMS | 3–5 | Asynchronous, longer reply windows allow more concurrency. |
| Email | 5+ | Longest reply windows, lowest interruption cost. |

Capacities are set per agent during onboarding and adjusted when an agent moves between roles (a supervisor taking overflow might have higher capacity than a frontline agent). Capacity changes today go through the same ticket process as skill changes.

> 📸 **SCREENSHOT NEEDED — Andrea**
> **File path to save as:** `/static/img/managing-your-team/agent-skills-and-capacity-config.png`
> **What to capture:** The admin or supervisor view of an agent's skill list and per-channel capacity. If Connie surfaces this in Teams View detail, capture that; if it's only visible in the deployment team's backend, mock up a clean tabular representation.
> **Why this shot matters:** Admins need a visual anchor for "what does my agent's skill profile look like right now."
> **Replace this whole quote-block with:**
> `<div style={{textAlign: 'center', margin: '20px 0'}}><img src="/img/managing-your-team/agent-skills-and-capacity-config.png" alt="Agent skills and per-channel capacity configuration" style={{maxWidth: '800px', border: '1px solid #ddd', borderRadius: '8px'}} /></div>`

## How to change an agent's skills today

Open a support ticket with the deployment team. Use this template:

```
Subject: Skill change — [Agent First Last]

Agent: [First Last] ([agent@yourorg.org])
Add skills: [comma-separated]
Remove skills: [comma-separated]
Capacity changes (if any):
  - Voice: [n]
  - Webchat: [n]
  - SMS: [n]
  - Email: [n]
Effective date: [date]
Reason: [brief — "language coverage rebalance", "promoted to supervisor", etc.]
```

Typical turnaround is same business day. Skill changes take effect on the agent's next sign-in (or immediately if they're already signed in — the routing engine picks up the change on the next task assignment).

## Common patterns we see

| Pattern | When to use it |
|---|---|
| **One skill per program, plus language(s)** | Best default. An ADC nurse with `ADC-Jones` + `English` receives ADC-Jones tasks in English; a `Spanish` skill makes them part of the bilingual pool. |
| **Channel-restricted agents** | Volunteers or part-time agents who should only handle webchat or SMS, not live voice. Give them only the channels they're qualified for. |
| **Overflow / supervisor agents** | High capacity on every channel, plus every program — they catch what slips through. Tag explicitly with an `Overflow` or `Supervisor` skill so the routing engine prefers them last (not first). |

## Self-serve — on the roadmap

A self-serve skill editor for admins is on the product roadmap. Until then, the ticket process ensures skill changes propagate consistently across the routing engine, the Teams View display, and the per-agent capacity model.

## Related

- [Add an agent](/end-users/administrators/managing-your-team/add-an-agent) — initial skill assignment happens during onboarding
- [Manage teams & queues](/end-users/administrators/managing-your-team/manage-teams-queues) — how skills, teams, and queues interact in routing
- [Display names](/end-users/administrators/managing-your-team/display-names) — what supervisors see alongside skill data

## Further reading (technical admins)

The Twilio Flex documentation covers the underlying TaskRouter primitives that drive Connie's skill-based routing: see the [Twilio TaskRouter overview](https://www.twilio.com/docs/taskrouter) and the [Flex workers and skills guide](https://www.twilio.com/docs/flex/admin-guide/setup/teams). Connie wraps this in deployment-team-managed configuration; the concepts map cleanly but the day-to-day interface differs.
