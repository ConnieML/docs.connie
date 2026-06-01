---
title: "AI Agents — Connie Data Center (Advanced)"
sidebar_label: Connie Data Center
sidebar_position: 2
---

# AI Agents — Connie Data Center (Advanced)

> 📦 **Connie Data Center (Advanced) — paid upgrade (additional fee).** The programmatic engine behind the Connie Data Center: pull reporting data via API and build funder / county / impact + custom reports. **Requires an account upgrade** — gated to upgraded accounts.

**Purpose:** The developer reference for programmatic access to Connie's historical reporting data — authentication, the data model, querying reports, and building the custom pipelines that power **Connie Data Center (Advanced)**.

**Audience / Tier:** Developers & AI agents · 🟪 Connie Data Center (Advanced) · paid upgrade.

See **[Concepts & Glossary](/reporting-analytics/concepts-glossary)** for all metric and dimension definitions used below.

<!-- INTERNAL SOURCE (not for readers): ported + sanitized from the connie-vault Flex Insights API runbook + the S11 sprint record. Keep this page free of real credentials, logins, account SIDs, and workspace IDs — placeholders only. -->

---

## What this is

Connie's **historical reporting** is powered by **Twilio Flex Insights**, which runs on the **GoodData / Ytica** analytics platform. The Connie Data Center (Advanced) tier reads from that warehouse over its API, then reformats the results into funder-, county-, and grant-ready deliverables.

:::caution This is a different API from the rest of Twilio
Flex Insights does **not** use your Twilio Account SID / Auth Token / API keys. It uses GoodData's own **two-step token login (SST → TT)** against `analytics.ytica.com`. Everything on this page targets that API, not the standard Twilio REST API.
:::

## Before you start

You'll need:

- An account on the **Connie Data Center (Advanced)** tier (this is a gated, paid upgrade).
- A **Flex Insights user** for your account (the login your reporting warehouse was provisioned with).
- Your account's **GoodData workspace ID** (see [Find your workspace](#find-your-workspace-id) below — each account has its own).

:::danger Never hardcode credentials
Load your Insights login, password, and workspace ID from environment variables or a secrets manager. **Never** inline them in a command, commit them to source control, or paste them into a shared notebook.
:::

## Authentication (SST → TT)

GoodData uses a two-step token exchange:

1. **Log in** → a **Super-Secure Token (SST)**, ~2-week life, returned in the `X-GDC-AuthSST` response header.
2. **Exchange the SST** → a **Temporary Token (TT)**, ~10-minute life, returned in the response body.
3. **Query** with the TT as a `GDCAuthTT` cookie. Refresh step 2 whenever a request returns `401`.

```bash
# Credentials come from YOUR account's Flex Insights user.
# Load them from the environment / a secrets manager — never hardcode or commit them.
INSIGHTS_LOGIN="$CONNIE_INSIGHTS_LOGIN"
INSIGHTS_PASSWORD="$CONNIE_INSIGHTS_PASSWORD"
WORKSPACE="$CONNIE_INSIGHTS_WORKSPACE"        # your account's GoodData workspace ID
BASE="https://analytics.ytica.com"

# 1) Log in -> Super-Secure Token (SST), from the X-GDC-AuthSST response header
SST=$(curl -s -D - -o /dev/null -X POST "$BASE/gdc/account/login" \
  -H "Content-Type: application/json" -H "Accept: application/json" \
  -d "{\"postUserLogin\":{\"login\":\"$INSIGHTS_LOGIN\",\"password\":\"$INSIGHTS_PASSWORD\",\"remember\":0,\"verify_level\":2}}" \
  | tr -d '\r' | awk -F': ' 'tolower($0) ~ /x-gdc-authsst:/ {print $2}')

# 2) Exchange SST -> Temporary Token (TT), read from the response body
TT=$(curl -s "$BASE/gdc/account/token" \
  -H "Accept: application/json" -H "X-GDC-AuthSST: $SST" \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['userToken']['token'])")

# 3) Query with the TT (good ~10 min; re-run step 2 on a 401)
curl -s -b "GDCAuthTT=$TT" -H "Accept: application/json" \
  "$BASE/gdc/md/$WORKSPACE/query/reports"
```

:::tip Pull the TT from the response body
Read the token from `userToken.token` in the body — parsing it out of `Set-Cookie` is less reliable.
:::

## Find your workspace ID

Each account with Insights provisioned gets its **own** GoodData workspace. To discover yours:

```bash
curl -s -b "GDCAuthTT=$TT" -H "Accept: application/json" \
  "$BASE/gdc/app/account/bootstrap"
# -> bootstrapResource.current.project is your active workspace URI
```

## The data model

The warehouse exposes a rich data model — hundreds of attributes (dimensions) and metrics. The ones that matter for Connie reporting:

- **Dimensions** — Department, Handling Department, Agent Team, Handling Team, Queue, Agent, Communication Channel, Agent Location, Agent Role.
- **Metrics** — Handled / Missed / Rejected, Talk / Wrap / Hold / Queue time, Handle vs. Experience Time, Abandoned %, Service Level.

Full definitions live in the **[Concepts & Glossary](/reporting-analytics/concepts-glossary)**. Enumerate them live with the query endpoints below.

## Querying reports

```bash
# All report definitions (title + link)
curl -s -b "GDCAuthTT=$TT" -H "Accept: application/json" \
  "$BASE/gdc/md/$WORKSPACE/query/reports"

# All dimensions you can group/filter by
curl -s -b "GDCAuthTT=$TT" -H "Accept: application/json" \
  "$BASE/gdc/md/$WORKSPACE/query/attributes"

# All metrics (measures)
curl -s -b "GDCAuthTT=$TT" -H "Accept: application/json" \
  "$BASE/gdc/md/$WORKSPACE/query/metrics"
```

:::warning Always send `Accept: application/json`
The `/query/*` endpoints return an **HTML form** if you omit `Accept: application/json`. Always send it. Also prefer a real HTTP client that preserves the auth cookie across redirects.
:::

To run a report, POST its URI to the execution endpoint, then fetch the returned data result:

```bash
# Execute a report -> returns a dataResult URI
curl -s -b "GDCAuthTT=$TT" -H "Accept: application/json" -H "Content-Type: application/json" \
  -X POST "$BASE/gdc/app/projects/$WORKSPACE/execute/raw" \
  -d '{"report_req":{"report":"<REPORT_URI>"}}'
# Then GET the dataResult URI (poll until ready) for the rows.
```

## Custom reports & the funder-data pipeline

The Connie Data Center (Advanced) layer builds funder-ready output by:

1. **Curating dimensions** — re-pointing a report's grouping to the dimension a funder needs (e.g. grouping by **Department** instead of Team).
2. **Creating report definitions programmatically** — `POST` a report definition to `/gdc/md/<workspace>/obj`, then a report that references it, then executing it to verify.
3. **Pulling + reformatting** — the resulting rows are pulled into the connie.plus pipeline and reshaped into county / funder / grant / board deliverables.

This is the seam that makes Connie Data Center "Advanced": native Insights produces operational dashboards; this pipeline turns the same data into external-audience reports.

## Endpoint reference

| Endpoint | Returns |
|---|---|
| `POST /gdc/account/login` | Super-Secure Token (SST), in the `X-GDC-AuthSST` header |
| `GET /gdc/account/token` | Temporary Token (TT), in the body as `userToken.token` |
| `GET /gdc/app/account/bootstrap` | Identity + your current workspace |
| `GET /gdc/md/<workspace>/query/reports` | All report definitions |
| `GET /gdc/md/<workspace>/query/attributes` | All dimensions |
| `GET /gdc/md/<workspace>/query/metrics` | All metrics |
| `GET /gdc/md/<workspace>/query/dashboards` | All dashboards |
| `POST /gdc/md/<workspace>/obj` | Create a report definition / report |

## References

- [Twilio Flex Insights — API general usage](https://www.twilio.com/docs/flex/developer/insights/api/general-usage)
- [Twilio Flex Insights — Export Data](https://www.twilio.com/docs/flex/developer/insights/api/export-data)
- [Twilio Flex Insights — Data model](https://www.twilio.com/docs/flex/end-user-guide/insights/data-model)
- **[Concepts & Glossary](/reporting-analytics/concepts-glossary)** — metric and dimension definitions
