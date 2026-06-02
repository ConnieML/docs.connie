---
title: "Reporting & Analytics — Concepts and Glossary"
sidebar_label: Concepts & Glossary
sidebar_position: 2
---

# Reporting & Analytics — Concepts and Glossary

Plain-language reference for every term used across the Reporting & Analytics guides. Each of the six audience guides links here rather than re-defining terms, so a definition lives in exactly one place.

:::tip One source of truth
If a term appears in a reporting guide and isn't defined here, it belongs here — flag it to your Connie contact.
:::

<!-- ============================================================
RATIFY LOG (CDO, 2026-06-01) — items needing CTO-Connie / CEO sign-off before this page is treated as authoritative. Kept as source comments so the live page stays client-clean. Search "RATIFY:" to find each in context.
  NAMING UPDATE (CEO addendum, 2026-06-01): customer-facing tier names are now BASIC (included, left-nav) and CONNIE DATA CENTER (ADVANCED) (paid upgrade, gated). "Advanced" = the Advanced/premium destination, NOT the umbrella. Umbrella section = "Reporting & Analytics" (folder reporting-analytics/). Items 1–4 below were ratified under the older Standard/Advanced labels; the operational-vs-external-audience meaning is unchanged — only the labels were renamed (Standard→Basic, Advanced→Advanced).
  1. RESOLVED (CEO, 2026-06-01): Real-time has NO fixed interval — it streams off the live event stream. Teams View = live as-it-happens. Queues View = ~15s queue metrics / 1–3s "Now" tiles. The 60-min figure is the Historical (Adhoc) pull ONLY — a separate mechanism, never a real-time cadence. Retention number intentionally omitted until separately confirmed for native Insights.
  2. RESOLVED (CEO, 2026-06-01): Connie DOES surface SLA. Admin-set via Service Level Preferences ("Configure Service Levels" → "Add custom levels"), per queue + per channel, in seconds: SLA Threshold + Short Abandoned Time. Drives the real-time Queues SLA column. NOT in config files (config only controls which SLA tiles show + Teams handle-time thresholds). Real-time SLA (Service Level Preferences) and historical SLA (Connie Analytics) are SEPARATE metrics with separate thresholds. Config is an Administrators → Basic item.
  3. RESOLVED (CEO, 2026-06-01): Map confirmed. Real-Time + Historical → Standard (operational). Impact + Raw-Data/Custom → Advanced. Tier = PURPOSE + AUDIENCE, not implementation layer (an Impact dashboard built in native Insights is still Advanced). Within Advanced: Impact = marquee use case (outcomes for external audiences), Raw-Data/Custom = enabling capability (the connie.plus pipeline).
  4. RESOLVED (CEO, 2026-06-01): KEEP Quality %, framed as in-development. Quality Dimensions (quality monitoring + reporting tooling) are in development as of 2026-06-01; customers notified when ready for beta. May appear blank until then.
============================================================ -->

---

## Real-time vs. Historical

Two complementary views of the same underlying activity — driven by **completely separate mechanisms** on **different clocks**. Don't conflate their cadences.

- **Real-time** — what is happening *right now*, streamed live off Connie's event stream. There is **no single fixed refresh interval**; updates arrive as events occur. Answers: *"What's going on this minute? Who's available, what's waiting?"*
  - **Teams View** — agent activity and status update **as they happen** (live stream).
  - **Queues Stats (Queues View)** — queue-level metrics refresh about every **15 seconds**; the **"Now" tiles** (active tasks, waiting tasks, available agents) refresh every **1–3 seconds**.
- **Historical** — what *has happened* over time, and the trends inside it. Powered by **Flex Insights**, the reporting warehouse that accumulates every conversation. Answers: *"What happened last month, and is it getting better or worse?"*

:::caution Real-time and Historical refresh on different clocks
The **60-minute** figure you may see refers to the **Historical (Adhoc)** data pull — a separate mechanism from the real-time views. It is **not** how often Queues Stats or Teams View update. Real-time streams (≈15s for Queues metrics, 1–3s for the Now tiles, live for Teams); Historical refreshes on the adhoc cycle.
:::

---

## Basic vs. Advanced

Connie reporting comes in two tiers.

The tier line is **purpose + audience**, not which tool builds the report.

- **🟦 Basic — operational reporting, included with every Connie account.** For the people *running* the contact center (supervisors, admins). Answers *"How is my center running?"* — queues, SLA, handle time, agent activity. Native Flex Insights surfaced cleanly in the Connie UI, accessed from the **left nav**.
- **🟪 Advanced — outcomes for external audiences; a paid upgrade.** For funders, county, board, grants. Answers *"What impact are we having, and can I hand it to a funder?"* The connie.plus custom layer pulls your data out of Insights via API and reformats it into funder-ready deliverables. Native Insights produces operational dashboards; it does **not** produce funder-ready impact reports. Closing that gap is the entire reason the Advanced tier exists. A paid upgrade, gated to upgraded accounts.

Within the **Advanced** tier there are two kinds of work:

- **Impact — the marquee use case (the *what / why*).** Your CBO's effect on the communities it serves: closed-loop resolution, SDOH outcomes, community-referral coordination. This is what funders, boards, and counties want to see.
- **Raw Data / Custom — the enabling capability (the *how*).** Pull raw data via the Insights API and build/export anything (the connie.plus pipeline). The engine behind Impact.

The **Flex Insights API is the seam** between the tiers: Basic is *"look at the dashboards"*; Advanced is *"we pull your data and make it funder-ready."*

:::caution Tier = purpose, not where it's built
A report's tier is set by **who it's for and why**, *not* by which tool produced it. A community-impact dashboard built inside native Insights today is still **Advanced** — its purpose is an external-audience outcome. Don't let "it's built in Insights" pull Impact back into Basic.
:::

---

## The Drill-Down Model (KPI → Segment)

The defining capability of Connie reporting. Every report lets you move from the **top-level number** down to the **single conversation** behind it:

```
KPI (e.g. "Avg Handle Time: 4:32")
  → grouped by a dimension (e.g. by Department → PCA)
    → a list of conversations in that group
      → one conversation segment (talk, hold, wrap, transfer…)
```

Both out-of-the-box and custom views support this drill path. It's what turns a dashboard from a scoreboard into a diagnostic tool.

---

## Metric Definitions

Connie's reporting is **lifecycle-based**: every task is tracked from arrival to completion and broken into segments, so the metrics below are all measurements of those segments.

### Time metrics

| Metric | Definition | Note |
|---|---|---|
| **Handling Time** (Handle Time) | The time **agents** spend handling a task (including unavailable/offline activities tied to it). | Agent-side view. |
| **Experience Time** | The time a **customer** spends resolving their issue — including time in queue *and* time communicating with agents. | Customer-side view. |
| **Talk Time** | Time the agent and customer are actively communicating on the task. | A component of Handle Time. |
| **Wrap Time** (After-Task Work) | Time the agent spends finishing up after the conversation ends (case notes, etc.). | The "Wrap" lifecycle segment. |
| **Hold Time** | Time the customer is on hold during the task. | |
| **Queue Time** | Time a task waits in queue before an agent picks it up. | Part of Experience Time. |

:::info Handle Time ≠ Experience Time
These two will almost never reconcile 1:1 — Experience Time includes the wait, Handle Time doesn't. Read **Experience Time** for the true customer journey, then **drill down to Handle Time** to find improvement opportunities.
:::

### Volume & outcome metrics

| Metric | Definition |
|---|---|
| **Handled** | Conversations an agent accepted and worked. |
| **Missed** | Conversations offered to an agent that weren't answered. |
| **Rejected** | Conversations an agent actively declined. |
| **Abandoned Conversations %** | The ratio of **abandoned** conversations to **total offered** conversations. A customer left before reaching the team (e.g. hang-up, signal loss, timeout). |
| **Abandon Time** | How long a customer waited in queue before disconnecting. |
| **AvgTalk** | Average Talk Time across the group. |
| **AvgWrap** | Average Wrap Time across the group. |
| **Quality %** | Score from quality monitoring of handled conversations. *In development — see note below.* |

:::note Voicemail and callbacks are not abandons
A voicemail or callback request is **not** counted as an abandon — these are tracked as **Follow-ups**.
:::

:::info Quality monitoring is coming
As of **June 1, 2026**, Connie's **Quality Dimensions** — quality monitoring and reporting tooling — are in development. Customers will be notified when it's ready for **beta testing**. Until then, **Quality %** may appear blank.
:::

### Service Level (SLA)

**Service Level (SLA)** — the percentage of conversations answered within a target wait-time threshold. Two settings define it, set **per queue and per channel** (in seconds) by administrators under **Service Level Preferences**:

- **SLA Threshold** — the longest wait that still counts as "within SLA."
- **Short Abandoned Time** — waits too short to count against SLA, so a quick hang-up doesn't hurt the number.

:::note Real-time and historical SLA are separate
The SLA shown in the real-time **Queues Stats** view is driven by **Service Level Preferences**. Connie's **historical** reporting has its **own** Service Level metric with separate threshold handling — the two are configured and calculated independently.
:::

:::tip Seeing SLA at 0%?
A queue showing **0%** SLA usually means **no threshold is configured yet**, or every task ran past it. SLA targets are **not** set in Connie's config files (those only control which SLA tiles display and the Teams handle-time thresholds) — they're set in the admin UI. See **[Administrators → Basic Reporting](/reporting-analytics/administrators/basic)** to configure Service Levels.
:::

---

## Data-Model Dimensions

The **axes** you group and filter reports by. (Insights carries 235 attributes total; these are the ones that matter for Connie's use case.)

| Dimension | What it groups by |
|---|---|
| **Department** | The program a worker belongs to (e.g. Admin / H2H / PCA / RAMP). The cleanest grouping for program-level rollups. |
| **Handling Department** | The department that actually handled the conversation. |
| **Agent Team** / **Handling Team** | Team-level groupings. <!-- S11: messier than Department — fragmented values; prefer Department for program rollups. --> |
| **Queue** | The TaskQueue a conversation routed through. |
| **Agent** | The individual worker. |
| **Communication Channel** | Voice, SMS/Text, Webchat, Fax, etc. |
| **Agent Location** | Where the agent is based. |
| **Agent Role** | The agent's assigned role. |

---

## Task Lifecycle (the segments behind the metrics)

Every conversation moves through these states; reporting segments map to them:

**Pending** → **Reserved** → **Assigned** → **Wrap** → **Complete**

- **Pending** — Connie is finding an available, qualified agent.
- **Reserved** — offered to an agent, awaiting accept/reject.
- **Assigned** — accepted; the agent owns it until they complete, park, reassign, escalate, or cancel it.
- **Wrap** — conversation done; agent finishing after-task work.
- **Complete** — closed.

:::note Auto-abandon
An assigned task left untouched for **two weeks** (no complete/park/reassign/escalate/cancel) is auto-terminated by Connie and reported as an abandoned task.
:::

---

## Channels

Conversations are reported per channel and direction: **Voice, SMS/Text, Webchat, Fax**, across **Inbound** and **Outbound**.

---

## How Connie's reporting categories map to the two tiers

Connie's underlying reporting breaks into four categories. Tier is assigned by **purpose and audience**, not by which tool builds the report:

| Connie category | Tier | Role |
|---|---|---|
| **Real-Time** (live dashboards) | 🟦 Basic | Operational — running the center |
| **Historical** (adhoc dashboards & reports) | 🟦 Basic | Operational — trends over time |
| **Impact** (community-impact dashboards) | 🟪 Advanced | **Marquee use case** — outcomes for funders / board / county |
| **Custom / Raw Data** (export & reformat) | 🟪 Advanced | **Enabling capability** — the connie.plus data pipeline |

---

## Glossary index (A–Z)

Abandoned Conversations % · Abandon Time · Advanced · Agent · Agent Location · Agent Role · Agent Team · AvgTalk · AvgWrap · Basic · Channel · Department · Drill-Down · Experience Time · Follow-up · Handled · Handling Department · Handling Time · Historical · Hold Time · Impact · KPI · Missed · Queue · Queue Time · Quality % · Real-time · Rejected · Service Level (SLA) · Short Abandoned Time · SLA Threshold · Talk Time · Task Lifecycle · Wrap Time

---

## Draws from

- **CACC User Guide → Data & Reporting** — Handle vs Experience Time, Abandoned % + Follow-up exclusion, task lifecycle, four reporting categories, refresh/retention figures.
- **Sprint record S11-260601** — the verified six standard metrics, Department (clean) vs Agent Team (messy), the two-tier model.
- **Flex Insights API runbook** — the 235-attribute data model and dimension list.
- **Twilio Flex Insights docs** — canonical [Handling and Experience Time](https://www.twilio.com/docs/flex/end-user-guide/insights/conversation-structure#handling-and-experience-time) and data-model references.
