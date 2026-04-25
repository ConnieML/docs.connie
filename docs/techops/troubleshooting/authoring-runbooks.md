---
sidebar_label: Authoring & Publishing Runbooks
sidebar_position: 3
title: "Authoring & Publishing Runbooks"
---

# Authoring & Publishing Runbooks

How to write a new runbook for a Connie feature, get it on docs.connie.one, and into the [Runbook Index](/techops/troubleshooting/runbook-index).

For human authors and AI agents alike. If you're touching docs.connie for the first time, read this before you write anything.

> **Implements [Runbook Authoring Standard v1.0](https://vault.chrisberno.dev/techops/standards/runbook-authoring)** (the enterprise standard owned by the CDO and applied across all org docs platforms). This guide is the Connie/Docusaurus-specific implementation — it adds platform-specific gotchas (numeric prefix slug stripping, MDX caveats, GitHub Pages publishing pipeline) on top of the canonical 5-file anatomy and 7-section action-runbook template defined at the enterprise level.

---

## Where docs.connie lives

| Item | Location |
|---|---|
| Local working tree | `~/projects/connie/rtc/docs.connie/` |
| Git repo | `github.com/ConnieML/docs.connie` |
| Branch | `main` (push triggers deploy) |
| Live site | `https://docs.connie.one` |
| Publishing pipeline | GitHub Actions → `gh-pages` branch → GitHub Pages → CNAME → docs.connie.one |
| Docusaurus version | v3.x |

**Doctrine:** All Connie-customer-facing docs go in `docs.connie`. The `basecamp-v26.02/docs/` directory in the code repo is upstream Twilio template content — do **not** put Connie customizations there.

---

## The standard runbook anatomy

Every Connie feature gets a **product page + four runbooks**. Always five files. Always the same four runbook types.

| File | Purpose | Audience |
|---|---|---|
| `01_overview.md` (or unprefixed `overview.md`) | **Product page.** Caller experience, admin benefit, what the feature does and why. | Stakeholders + agents starting a deploy |
| `02_setup.md` / `setup.md` | 🛠️ **Setup runbook.** Phased deploy procedure (prereqs → config → verify). | Operator deploying for the first time |
| `03_change.md` / `change.md` | ✏️ **Change runbook.** Modifying an existing live install (e.g., swap hold music, change admin email). | Operator running a change request |
| `04_cancel.md` / `cancel.md` | 🗑️ **Cancel runbook.** Cleanly removing the feature without breaking anything else. | Operator decommissioning |
| `05_troubleshoot.md` / `troubleshoot.md` | 🚨 **Troubleshoot runbook.** Symptom → investigation → fix patterns specific to this feature. | Operator on a live incident |

If a feature genuinely doesn't have one of the four (e.g., no "change" pathway because it's binary on/off), still create the file with a one-paragraph "this feature has no change runbook because..." — don't leave gaps in the standard set. Future agents will look for all five.

---

## What goes inside each runbook (the 7-section template)

A runbook procedure isn't enough. AI agents (and humans new to the system) need the **wrapper** around the procedure as much as the steps themselves. Every action runbook (Setup / Change / Cancel / Troubleshoot) **must** have these seven sections, in this order:

| # | Section | Purpose |
|---|---|---|
| 1 | **Role / Authority** | Which executive role the agent operates as (e.g., CTO-Connie, CDO). Reading this first prevents wrong-role escalation. |
| 2 | **Required Parameters** | Explicit checklist of inputs the operator MUST gather from the CEO/stakeholder **before starting**. Forces the agent to ask, not assume. |
| 3 | **Read First** | Cross-references to authoritative docs the operator must read before procedure: the relevant CLAUDE.md, the product overview, adjacent runbooks. |
| 4 | **Safety Rails for This Change** | Concrete don'ts specific to *this* change type, not generic advice. Quote the relevant CLAUDE.md doctrine inline. |
| 5 | **Procedure** | The step-by-step. Phased is fine; numbered is fine. This is what most existing runbooks already have — keep it. |
| 6 | **Definition of Done** | Testable verification. Not "deploy succeeded" — "test call lands in queue, hold music plays, pressing * drops to voicemail, admin email arrives in inbox." Specific commands or interactions, not vibes. |
| 7 | **If Your Variant Differs** | Pointer to this authoring guide + a callout that variants get their own file set, not edits to this one. |

The product page (`01_overview.md`) does NOT need this template — it's a marketing/context page, not a procedure. The template applies to the four action runbooks only.

**Why this matters:** the gap between "runbook content" and "promptable runbook" is exactly these seven sections. A procedure-only runbook reads like a recipe; a 7-section runbook reads like a complete delegation. AI agents that pick up a 7-section runbook can run with it without follow-up questions. Procedure-only runbooks force the agent (or the CEO) to fill the gaps every time.

**Reference implementation:** the [Wait Experience + Admin Email setup runbook](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) is the canonical example of the 7-section structure applied to a real Connie feature. Pattern-match against that file when authoring new runbooks.

---

## File placement

Put the runbook files **inside the feature's existing docs tree**, not in this `troubleshooting/` directory.

**Examples:**

```
docs/getting-started/channels/voice/voice-features/wait-experience-with-email/
  ├── _category_.json
  ├── 01_overview.md
  ├── 02_setup.md
  ├── 03_change.md
  ├── 04_cancel.md
  └── 05_troubleshoot.md

docs/getting-started/channels/sms/keyword-router/
  ├── _category_.json
  ├── 01_overview.md
  ├── 02_setup.md
  └── ... (etc.)
```

`troubleshooting/` is for **the Runbook Index itself + symptom-driven references** (e.g., `common-issues.md`). Runbook files for a specific feature live with the feature.

---

## Frontmatter pattern

Use this on every runbook file. `sidebar_position` controls order in the left nav.

```markdown
---
sidebar_label: Setup
sidebar_position: 2
title: "Wait Experience + Admin Email — Setup"
---

# Wait Experience + Admin Email — Setup

(content here)
```

For the feature's `_category_.json`, use `link.type: generated-index` so the category landing page auto-renders the file list:

```json
{
  "label": "Wait Experience + Admin Email",
  "position": 1,
  "collapsed": true,
  "collapsible": true,
  "link": {
    "type": "generated-index",
    "title": "Wait Experience + Admin Email",
    "description": "Voice Direct config: ...",
    "slug": "/getting-started/channels/voice/voice-features/wait-experience-with-email"
  }
}
```

`link.type: doc` (pointing at a specific file) also works but is more brittle when files get renamed.

---

## Cross-link rules

**Always use absolute Docusaurus paths.** Never relative.

✅ `/getting-started/channels/voice/voice-features/wait-experience-with-email/setup`
❌ `./02_setup.md`
❌ `../setup.md`
❌ `setup`

**Numeric prefix gotcha:** Docusaurus strips numeric prefixes (`01_`, `02_`, etc.) from the URL slug. So `01_overview.md` lives at URL `/overview`, not `/01_overview`. When you cross-link, link to the **stripped slug**:

```markdown
[Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup)
```

NOT:

```markdown
[Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/02_setup)
```

This is the single most common broken-link pattern when copying runbooks from one location to another.

---

## Authoring checklist

When you create a new runbook set:

- [ ] Five files in the feature's directory: `01_overview.md`, `02_setup.md`, `03_change.md`, `04_cancel.md`, `05_troubleshoot.md`.
- [ ] **Each action runbook (setup/change/cancel/troubleshoot) has all 7 sections** in the order specified above: Role / Authority, Required Parameters, Read First, Safety Rails for This Change, Procedure, Definition of Done, If Your Variant Differs. No exceptions — fill each section even if briefly.
- [ ] `_category_.json` with `link.type: generated-index` and a meaningful `description`.
- [ ] Cross-links use **absolute paths with stripped numeric prefixes**.
- [ ] Add a row to the [Runbook Index](/techops/troubleshooting/runbook-index) under the matching channel/feature section.
- [ ] If the feature is on a channel hub page (e.g., `/getting-started/channels/voice`), add a row to that page's inline runbook table too. The two tables stay in sync.
- [ ] Run `npm run build` locally — must complete with `[SUCCESS] Generated static files in "build".` and no broken links pointing at your new files. Pre-existing broken links elsewhere are not your problem to fix in the same commit.

---

## Publishing pipeline

The pipeline is fully automated. You commit to `main`, push, and the site updates ~3 minutes later.

```bash
# 1. Make changes locally
cd ~/projects/connie/rtc/docs.connie

# 2. Validate the build
npm run build

# 3. Stage, commit, push
git add docs/getting-started/channels/<your-changes> docs/techops/troubleshooting/runbook-index.md
git commit -m "Add <feature> runbook set under <channel>"
git push origin main

# 4. Watch the deploy
gh run list --limit 1
# wait for "completed success" — usually ~2-3 min

# 5. Verify the live URL
curl -sI https://docs.connie.one/<your-new-path> | head -3
# expect: HTTP/2 200
```

**Don't push if `npm run build` errored.** Broken builds break the deploy pipeline and leave the site stale.

**Don't commit secrets.** No API keys, no account-specific tokens, no client-internal URLs. The repo is public.

**Don't add `Co-Authored-By: Claude` or any Claude/Anthropic attribution to commit messages.** The CEO has a standing rule: clean professional commit messages only.

---

## When the live site doesn't show your changes

Almost always browser cache or CDN propagation. In order:

1. **Check the deploy actually succeeded:** `gh run list --limit 1` should show `completed success`. If it's `failure`, run `gh run view <run-id> --log-failed` and fix.
2. **Check what's actually deployed:** `curl -sL https://docs.connie.one/<path> | grep -i <expected-content>`. If the content IS in the curl output, the deploy worked — you're seeing browser cache.
3. **Hard-refresh the browser:** Cmd+Shift+R (Mac) or Ctrl+Shift+R (Win/Linux). Or open in an incognito window — that bypasses cache instantly.
4. **CDN propagation:** GitHub Pages CDN typically updates within seconds, but allow up to 5 minutes for global edge nodes.

If after all that the change still isn't visible, check that you committed to `main` (not a branch) and that the file path actually matches what the build produced. URLs come from frontmatter and file structure, not from filename alone.

---

## Common Docusaurus gotchas

| Symptom | Cause | Fix |
|---|---|---|
| Build error: `Can't find any doc with ID ...` | `_category_.json` `link.type: doc` references a doc by ID that doesn't exist (e.g., wrong path or numeric prefix in ID) | Use `link.type: generated-index` instead, or reference the doc by its actual frontmatter ID |
| Cross-link 404s on live but not in source | Numeric prefix not stripped from link target | Use `/path/setup` not `/path/02_setup` |
| Cross-link 404s with absolute path | Path uses `/docs/...` prefix | Drop the `/docs/` prefix — `routeBasePath: "/"` serves docs at root |
| MDX won't render `<` characters in content | MDX parses `<` as JSX | Escape with `\<` or wrap the block in a code fence |
| Build warns "broken anchors" | `#anchor` links to a heading that doesn't exist or has different slug | Match the auto-generated slug (lowercase, dashes for spaces) |
| Sidebar order wrong | Multiple files have same `sidebar_position` or none have it | Set explicit `sidebar_position` on each file |

---

## What does NOT belong as a runbook

Not everything that documents a procedure is a runbook. Use judgment:

- **Symptom-driven debugging** ("calls aren't reaching Flex"): goes in [Common Issues](/techops/troubleshooting/common-issues), not as a runbook.
- **Architecture / design docs**: goes in `techops/codebase/` or `techops/infrastructure/`, not as a runbook.
- **End-user help** ("how do I take a call"): goes in `end-users/staff-agents/` or similar, not as a runbook.
- **Project / sprint context**: belongs in `~/projects/connie/rtc/docs/dev-logs/` (the internal-team tree), not on docs.connie.

The Runbook Index is for **Setup / Change / Cancel / Troubleshoot procedures tied to a deployable Connie feature**. Keep the bar there.

---

## Related

- [Runbook Index](/techops/troubleshooting/runbook-index) — the master map of every live runbook
- [Common Issues](/techops/troubleshooting/common-issues) — symptom-driven quick reference
- Connie code repo: `~/projects/connie/rtc/basecamp-v26.02/` (where Connie features actually live; see that repo's `CLAUDE.md` for the docs-vs-code split doctrine)
