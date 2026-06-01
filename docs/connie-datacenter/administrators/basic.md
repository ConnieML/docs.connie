---
title: "Administrators — Standard Reporting"
sidebar_label: Standard
sidebar_position: 1
---

# Administrators — Standard Reporting

> **STUB — scaffold only.** Outline and source pointers below; prose to follow.

**Purpose (one line):** How an Administrator provisions native Insights, configures the views/columns supervisors see, manages Insights roles, schedules report emails, and handles per-tenant setup.

**Audience / Tier:** Administrators · 🟦 Standard.

See **[Concepts & Glossary](/connie-datacenter/concepts-glossary)** for all metric definitions used below.

---

## Intended H2 outline

## Provision Insights
<!-- Confirm the warehouse exists (do NOT read flex_insights_hr=null as "off" — that is only the in-Flex embed). Wire the in-Flex "Dashboards" embed via the CEO Console step. Note forward-only backfill + HIPAA auto-filtering with account BAA. -->

## Configure Views & Columns
<!-- /template-admin Feature Settings: queues_stats_metrics (Assigned/Wrapping/Agent-activity columns), Teams View Department column. SAFETY: use /template-admin for NSS-style config, NOT the deploy pipeline. -->

## Manage Insights Roles
<!-- Insights user roles / who can see what (links to Twilio Insights user-roles doc). -->

## Schedule Report Emails
<!-- Recurring report delivery (e.g. daily KPI to stakeholders); note the existing NSS daily Control Center PDF. -->

## Per-Tenant Setup
<!-- Each Flex account gets its own GoodData workspace; how to find a tenant's workspace ID; the curate-not-build approach to department rollups. -->

---

## Draws from

- **Sprint record S11-260601** — the `flex_insights_hr=null` trap, /template-admin vs pipeline safety, Feature Settings changes shipped, curate-not-build, forward-only backfill.
- **Flex Insights API runbook** — per-account workspace IDs, where the warehouse lives.
- **CACC → Data & Reporting** — admin reporting tools, dashboard vs custom, KPI alerts.
- **Live surface:** `/template-admin` Feature Settings; CEO Console (Flex → Insights provision/link).
