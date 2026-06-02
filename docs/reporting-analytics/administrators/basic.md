---
title: "Basic Reporting"
sidebar_label: Basic
sidebar_position: 1
---

# Basic Reporting

> 📦 **Basic — included with every Connie account.** It lives inside Flex, costs nothing extra, and needs no setup. It's role-gated to administrators and supervisors.

Basic Reporting answers one question: **"What happened?"** It comes in two halves:

- 🟢 **Real-time** — what's happening *right now* (Teams View, Queues Stats)
- 🕓 **Historical** — what happened *over time* (native Flex Insights)

This guide is for **CBO administrators and supervisors**. (Agents don't see reporting.)

---

## 1. What it is & where to find it

Basic Reporting lives **inside Flex** — there's nothing extra to install. You'll find it in the Flex navigation:

| Where | What it shows |
|---|---|
| **Queues Stats** | 🟢 Real-time queue activity — who's available, what's waiting |
| **Teams View** | 🟢 Real-time agent activity, organized by department |
| **Dashboards** | 🕓 Historical reports, including your curated **Standard Reporting** view |
| **Analyze** | 🕓 Build your own report from scratch (drag-and-drop) |

{/* SCREENSHOT SLOT (CDO/CEO): Flex left-nav with the reporting icons highlighted.
     ⚠️ CAPTURE FROM THE LIFELINE DEMO TENANT (fake data) — NEVER a real client account.
     docs.connie.one is PUBLIC: no real client name, staff names, user names, or tokens
     may ever appear. If a real account is unavoidable, white-box every instance and
     re-verify each image before publishing (the 02/03/04 images on this page were
     redacted that way). Drop the image in using the same centered-image style below. */}

:::tip Start with the curated view, not the firehose
Your account comes with a **Standard Reporting** dashboard already built for you. Start there — it answers the everyday questions out of the box. Reach for **Analyze** only when you need something custom.
:::

## 2. Who can see reporting

Reporting is **role-gated**:

- ✅ **Administrators and supervisors** with the **Insights role** can see it.
- ❌ **Agents cannot** — reporting never appears in an agent's view.

Adding a new supervisor is a quick, per-account step — **[ask your Connie team](#getting-help)** to grant the Insights role to their account.

## 3. Customizing dashboards

Your built-in dashboards are **read-only** by design, so you can't accidentally break them. The rule of thumb: **clone, don't fight them.**

**To make your own version of a dashboard:** open the **dashboard menu** (the gear icon, top-right) and choose **Save as…** to make a copy you can edit freely.

<div style={{textAlign: 'center', margin: '20px 0'}}>
  <img src="/img/reporting-analytics/basic/04-dashboard-editor.png" alt="The Flex Insights dashboard menu, showing Edit, Save as, Sharing & Permissions, Export to PDF, Export to XLSX, Embed, and Add Dashboard" style={{maxWidth: '820px', border: '1px solid #ddd', borderRadius: '8px'}} />
</div>

**To build a report from scratch:** open **Analyze**. Drag metrics and dimensions from the left panel into the **Metrics**, **Rows**, and **Columns** zones. It's all drag-and-drop — no code required.

<div style={{textAlign: 'center', margin: '20px 0'}}>
  <img src="/img/reporting-analytics/basic/02-analyze-report-builder.png" alt="The Flex Insights Analyze report builder — drag metrics and dimensions from the left panel into the Metrics, Rows, and Columns zones" style={{maxWidth: '820px', border: '1px solid #ddd', borderRadius: '8px'}} />
</div>

:::note Go deeper
For the full feature reference, see Twilio's **[Flex Insights end-user guide](https://www.twilio.com/docs/flex/end-user-guide/insights)**.
:::

## 4. Switching time frames

Every dashboard has a **date filter** at the top. There are two ways to set it:

- **Quick-picks** — the last **7 / 30 / 60 / 90 / 180 / 365** days, one click each.
- **Custom range** — pick a specific **From** and **To** date.

<div style={{textAlign: 'center', margin: '20px 0'}}>
  <img src="/img/reporting-analytics/basic/03-date-filter-timeframes.png" alt="The Flex Insights date filter, showing quick-pick day ranges (7, 30, 60, 90, 180, 365) and a custom From and To date range" style={{maxWidth: '820px', border: '1px solid #ddd', borderRadius: '8px'}} />
</div>

:::tip Reaching back more than a year
The quick-pick buttons stop at **365 days**. To see the **full history**, use the **custom From/To** range instead.
:::

## 5. How far back the data goes

About **24 months** of history is available. The exact window can change, so if you need to rely on a specific date range, **[check with your Connie team](#getting-help)** first.

## 6. Exporting & downloading 📌

This one trips people up, so be precise: **whether you can download depends on which surface you're on.**

| Surface | Export today? | How |
|---|---|---|
| **Native Insights dashboards** | ✅ **Yes** | Dashboard menu → **Export to PDF** or **Export to XLSX** |
| **connie.plus Data Center reports** | ⏳ **Not yet** | Raw-data download is **in development — available by June 15, 2026** |

There's **no blanket "you can't download."** From a **native Insights dashboard**, export to PDF or XLSX from the dashboard menu (the same menu shown in [Customizing dashboards](#3-customizing-dashboards), above). The **connie.plus Data Center** raw-data download arrives **June 15, 2026**.

---

## A few terms, in plain language

Full definitions live in the **[Concepts & Glossary](/reporting-analytics/concepts-glossary)**. The ones you'll see most:

| Term | What it means |
|---|---|
| **Offered** | A conversation that reached your team — whether or not it was answered |
| **Handled** | A conversation an agent actually worked |
| **Missed / Abandoned** | A conversation that wasn't answered (the caller hung up or it timed out) |
| **Department** | The program a worker belongs to (your service lines) |
| **Queue Time** | How long a conversation waited before an agent picked it up |

## Basic vs. Advanced

**Basic** tells you *what happened*. **Advanced** (a paid upgrade) takes that same data and reshapes it into **funder-, county-, and board-ready** reports. → **[See Advanced](/reporting-analytics/administrators/advanced)**

**What's _not_ in Basic:**

- **Funder / grant / board exports** — the "already in the shape your funders want" formatting → Advanced
- **Community-impact reporting** (SDOH / CIE outcomes) → Advanced

## Getting help {#getting-help}

- **Need a new supervisor added** to reporting? Ask your Connie team to grant the Insights role.
- **Want a custom dashboard built** for your program? Connie can build curated dashboards for you — just ask.

---

**Need help?** Visit **[Get Support](/get-support/overview)** or reach out to your Connie team.
