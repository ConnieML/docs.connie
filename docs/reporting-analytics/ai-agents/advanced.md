---
title: "AI Agents — Connie Data Center (Advanced)"
sidebar_label: Connie Data Center
sidebar_position: 2
---

# AI Agents — Connie Data Center (Advanced)

> 📦 **Connie Data Center (Advanced) — paid upgrade (additional fee).** The programmatic engine behind the Connie Data Center: pull Insights data via API and build funder / county / impact + custom reports. **Requires an account upgrade** — gated to upgraded accounts.

> **STUB — scaffold only.** Outline and source pointers below; prose to follow.

**Purpose (one line):** The developer/agent reference for the Flex Insights API (SST→TT), the data model, querying reports, and building the custom reports / funder-data pipeline that powers **Connie Data Center (Advanced)**.

**Audience / Tier:** Developers & AI agents · 🟪 Connie Data Center (Advanced) · paid upgrade.

See **[Concepts & Glossary](/reporting-analytics/concepts-glossary)** for all metric definitions used below.

---

## Intended H2 outline

## Flex Insights API: Auth (SST → TT)
<!-- The GoodData/Ytica two-step token flow (POST /gdc/account/login → X-GDC-AuthSST → GET /gdc/account/token → GDCAuthTT). NOT the normal Twilio API. The flex_insights_hr=null trap. Credentials live in the credential file, never inline. -->

## Data Model
<!-- 235 attributes; the dimensions that matter (Department, Handling Department, Agent Team, Handling Team, Queue, Agent, Channel, Location, Role); metrics; how reports/definitions are structured. -->

## Query Reports
<!-- /query/reports, /query/attributes, /query/metrics, execute a report → dataResult. GOTCHA: /query/* needs `Accept: application/json` or returns an HTML form; curl over urllib (cookie-on-redirect). -->

## Custom Reports / Funder-Data Pipeline
<!-- Programmatically create report definitions (POST to /gdc/md/<ws>/obj), curate dimensions, and pull data for the connie.plus Advanced reformatting layer. -->

## API Reference
<!-- Endpoint table + per-account workspace IDs + export-data link. -->

---

## Draws from

- **Flex Insights API runbook:** `connie-vault/operations/runbooks/flex-insights-api-access.md` — the canonical SST→TT auth, copy-paste query block, endpoint table, data-model inventory. **Primary source for this page.**
- **Sprint record S11-260601 (Session 2)** — how to create GoodData reports via API (reportDefinition → report → execute → verify), the curated Department report, the `Accept: application/json` gotcha.
- **Credentials:** `~/.claude/credentials/FLEX-INSIGHTS-YTICA-API-ACCESS.md` (local-only).
- **Twilio Flex Insights developer docs** — general usage + export-data API.
