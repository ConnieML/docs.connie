---
title: "Connie Datacenter — Reporting & Analytics"
sidebar_label: Overview
sidebar_position: 1
---

# Connie Datacenter — Reporting & Analytics

> **STUB — scaffold only.** Purpose, outline, and source pointers below. Prose to be filled deliberately (CTO-Connie + CEO).

**Purpose (one line):** The single home for all Connie reporting — what the Datacenter is, the two tiers, where each surface lives, and a role-based router to the right guide.

**Audience / Tier:** All audiences · Both tiers (entry point) · Traces to **PRD #3 — Admin Logging Dashboard**.

---

## Intended H2 outline

## What the Connie Datacenter Is
<!-- One umbrella for every reporting surface. Reporting is consolidated here; the End Users → Supervisors and → Administrators sections point here rather than duplicate. -->

## The Two Tiers
<!-- 🟦 Standard = reselling native Twilio Flex Insights, surfaced cleanly in the Connie/Flex UI, included with every account. 🟪 Advanced = the connie.plus custom layer that pulls Insights data via API and reformats it for funder / county / grant / board audiences. The Flex Insights API is the seam between the two. -->

## Surfaces Map
<!-- Real-time → Queues Stats + Teams View (native Flex). Historical → Flex Insights (GoodData/Ytica warehouse). Advanced → connie.plus Datacenter (connie.plus/data-center). Table: surface → tier → audience → what it answers. -->

## The Core Capability: Drill-Down (KPI → Conversation Segment)
<!-- The defining feature: drill from a top-level KPI down to an individual conversation segment. Out-of-the-box and custom views both support this. Reference the V0.1 baseline scenario screenshots below. -->

![Real-Time vs Historical / Reports — the Manager Desktop concept (V0.1 baseline)](/img/connie-datacenter/01-realtime-vs-historical.png)

## Which Do I Need? (Role Router)
<!-- Decision router: Supervisor/PM → Supervisors guides. Administrator → Administrators guides. Developer/AI agent → AI Agents guides. Each row links into the relevant Basic/Advanced stub. -->

## Glossary
<!-- Pointer: all reporting terms + metric definitions live in the shared Glossary, cited by all six guides. -->
See the **[Concepts & Glossary](/connie-datacenter/concepts-glossary)** page for every term used across these guides.

---

## Draws from

- **Sprint record:** `vault.connie.one/operations/sprints/S11-260601-Connie-Analytics-Standard-And-Advanced` — the two-tier model, surfaces, and everything known about Connie reporting.
- **Original requirements + visuals:** `Connie Analytics Dashboard-V0.1.md` — 5 user stories, 5 screenshots, live sandbox demo reference. Traces to **PRD #3 — Admin Logging Dashboard**.
- **CACC User Guide → Data & Reporting** — real-time vs historical (adhoc) framing, 60-min refresh model, dashboard vs custom reports.
- **Live surfaces:** Queues Stats + Teams View (NSS Flex), Flex Insights Analytics Portal (`analytics.ytica.com`), connie.plus Datacenter (`connie.plus/data-center`).
