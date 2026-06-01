---
title: "Concepts & Glossary"
sidebar_label: Concepts & Glossary
sidebar_position: 2
---

# Concepts & Glossary

> **STUB — scaffold only.** This is the shared reference cited by all six guides. Definitions to be filled deliberately.

**Purpose (one line):** One authoritative place for every reporting concept and metric definition, so the six guides cite rather than re-explain.

**Audience / Tier:** All audiences · Both tiers (shared reference).

---

## Intended H2 outline

## Real-time vs. Historical
<!-- Real-time = live state (Queues Stats, Teams View), no history. Historical = the Flex Insights warehouse, forward-only backfill from provisioning. Note the CACC 60-min adhoc refresh-rate model. -->

## Standard vs. Advanced
<!-- 🟦 Standard = native Flex Insights surfaced in-UI (included). 🟪 Advanced = connie.plus reformatting Insights data for funder/county/grant/board audiences (premium). The Flex Insights API is the seam. -->

## The Drill-Down Model (KPI → Segment)
<!-- Top-level KPI → group → individual conversation segment. The defining capability of the Datacenter; out-of-the-box and custom views both support it. -->

## Metric Definitions
<!-- Define each precisely, with the canonical Twilio link where one exists:
  - Handle Time vs. Experience Time (the two are NOT the same — link conversation-structure docs)
  - Abandoned % (and the CACC 2-week auto-abandon rule for stale assigned tasks)
  - SLA / Service Level
  - Queue Time, Talk Time, Wrap (After-Task Work) Time, Hold Time
  - Handled / Missed / Rejected
  - AvgTalk, AvgWrap, Quality %
-->

## Data-Model Dimensions
<!-- The axes you can group/filter by, from the live Insights warehouse (235 attributes):
  Queue · Agent · Team (Agent Team / Handling Team) · Department (Department / Handling Department) ·
  Communication Channel · Agent Location · Agent Role.
  Note the S11 finding: Department (obj/1660) is clean (Admin/H2H/PCA/RAMP); Agent Team is messy. -->

## Glossary Index (A–Z)
<!-- Alphabetical quick-reference once definitions above are written. -->

---

## Draws from

- **CACC User Guide → Data & Reporting** — metric framing, task lifecycle (Pending/Reserved/Assigned/Wrap), 2-week auto-abandon rule, adhoc refresh model.
- **Sprint record S11-260601** — verified dimension findings (Department clean vs Agent Team messy), the 6 standard metrics, the two-tier model.
- **Flex Insights API runbook:** `connie-vault/operations/runbooks/flex-insights-api-access.md` — the 235-attribute data model and dimension list.
- **Twilio Flex Insights docs** — canonical definitions for Handle vs Experience Time, data model, data caveats.
