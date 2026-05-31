# Broken Link Audit — docs.connie.one

**Date:** 2026-05-30
**Author:** CDO
**Method:** `npm run build` with `onBrokenLinks: "warn"` (Docusaurus reports every internal link that resolves to a non-existent page).

## Headline

- **178** broken internal link instances across **59** source pages
- **2** broken anchors (links to a heading that doesn't exist on the target page)
- Root cause: past site restructures renamed/moved whole sections; old links were never repointed. Build passes today only because `onBrokenLinks` is set to `warn`, not `throw`, so the breakage is silent.

## Categorized resolution map

### Tier 1 — Mechanical repoint, target page CONFIRMED to exist (127 instances, safe to auto-fix)

| # | Bucket | Broken pattern | Resolution (repoint to) | Notes |
|---|--------|----------------|--------------------------|-------|
| C | 52 | `/platform-developers/authentication/*` | `/techops/account-provisioning/authentication/*` | Auth pages cross-linking with the old `/platform-developers/` prefix. All 8 target pages exist under techops. Largest single cluster. |
| D | 48 | `/getting-started/feature-library/<name>` (resolves one dir too high) | `/getting-started/feature-library/overview2/<name>` | `overview2/index.md` (and a few siblings) link to feature pages by bare relative name; Docusaurus resolves them to the parent dir. Targets exist under `overview2/`. |
| A1 | 16 | `/developers/building/feature-management/remove-features` | `/techops/feature-deployment/feature-management/remove-features` | `/developers/` section no longer exists; this page moved to techops. |
| B | 11 | `/end-users/cbo-admins/*` | `/end-users/administrators/*` | `cbo-admins` was renamed to `administrators`. All targets exist. |

### Tier 2 — Target page is genuinely MISSING (51 instances, needs a create-or-remove decision)

| # | Bucket | Broken target | Options |
|---|--------|---------------|---------|
| A2 | 18 | `/developers/building/template-utilities/{configuration,terraform,logging,audit-logging}`, `/developers/building/flex-hooks/keyboard-shortcuts`, `/developers/{install-template,developer-setup,building/deployment/local-deployment}`, `/developers/building/twilio-profile-management` | No techops equivalent exists. Either (a) create the pages, or (b) strip the links. These are developer-facing topics that were never migrated. |
| G | 7 | `email-providers/mailgun-setup` | Page doesn't exist, but `sendgrid-setup.md` does. Either create the Mailgun page (Connie uses Mailgun in prod — likely should exist) or repoint to sendgrid. |
| E | 4 | `/solutions/{call-management,sms-enablement,digital-fax,after-hours}` | Only referenced from `interactive-overview-mockup` — a mockup page. No `/solutions/` section exists. Likely the mockup page should be unpublished or its links stubbed. |
| H | 3 | `direct-plus-deployment-guide` (voice deployment) | Referenced 3× from voice deployment pages; page never created. Create or remove. |
| Misc | ~9 | `/techops/codebase/fax/sinch-implementation` (3×), `/developers/backend/fax/sinch-implementation`, `/techops/codebase/web/adobe-implementation`, `/techops/codebase/merge-future-updates`, `/support-team/conversation-transfer-troubleshooting`, `/ai-agents/conversation-transfer.json`, `/platform-developers/conversation-transfer` | Assorted missing targets from old structures. Per-link decision. |

### Tier 3 — Broken anchors (2)

| Source page | Bad anchor | Resolution |
|-------------|-----------|------------|
| `/getting-started/feature-library/overview2/chat-to-video-escalation` | `#escalating-chat-to-video`, `#changelog` | Add the headings, or fix the anchor to match an existing heading. |
| `/techops/codebase/deployment/ci-deployment` | `#deploy-flex` | Same. |

## Recommended sequencing

1. **Tier 1 sweep** (127 links) — mechanical find-and-replace across the 4 confirmed patterns. Re-run `npm run build` to confirm the count drops to ~51. Zero judgment required; fully reversible.
2. **Tier 2 triage** (51 links) — CEO/CTO-Connie decision per bucket: create the missing page vs. remove the dead link. Mailgun-setup and `direct-plus-deployment-guide` look like real content gaps worth filling; `/solutions/*` and the mockup page look like cleanup.
3. **Tier 3** (2 anchors) — trivial heading fixes.

## Prevention

Once Tier 1 + 2 are clean, flip `onBrokenLinks` and `onBrokenMarkdownLinks` from `warn` to `throw` in `docusaurus.config.js`. That makes any future broken link fail the build (the CI gate), so this never silently accumulates again.

---

## RESOLUTION — executed 2026-05-30 (CDO, CEO-approved)

**Result: 178 broken links + 2 broken anchors → 0 / 0. Build passes under `throw`.**

### Tier 1 — repointed to confirmed-existing targets (127+)
- **C (52):** `/platform-developers/authentication/*` → `/techops/account-provisioning/authentication/*`
- **D (48):** overview2 bare-slug links → relative `.md` links (file-relative resolution)
- **A1 (16):** `remove-features` repointed (one shared MDX partial fixed all 16)
- **B (11):** `cbo-admins` → `administrators`
- **Plus a second flat→overview2 pattern** from other source pages (homepage, template-installation, feature cross-links, recording pages) repointed to `/getting-started/feature-library/overview2/<slug>`; `sendgrid-setup` repointed to its real techops path; legacy `00_overview.md` bare links and `canned-responses` dir link fixed.

### Tier 2 — stripped (target genuinely missing), per CEO "strip for now"
35 markdown link-strips (label kept, link removed) + 2 JSX `<Link>` cards neutralized to `<span>` (fax provider card, email Mailgun card). Full per-file strip log: `/tmp/strip-log.txt` at execution time. **Content gaps logged for backfill** (real pages worth writing later):
- **Mailgun voicemail/email setup page** — Connie uses Mailgun in production; this guide doesn't exist. Highest-value backfill.
- **Sinch fax implementation guide** (`sinch-implementation`) — referenced from 3 fax pages.
- **`direct-plus-deployment-guide`** (voice) — referenced 3×.
- Developer-facing pages never migrated from the old `/developers/` tree: `template-utilities/{configuration,terraform,logging,audit-logging}`, `flex-hooks/keyboard-shortcuts`, `install-template`, `developer-setup`, `local-deployment`, `twilio-profile-management`.
- `/solutions/*` (4) — from `interactive-overview-mockup`, a mockup page with no backing section.
- Adobe web-forms implementation, `merge-future-updates`, and assorted `/support-team`, `/ai-agents` targets.

### Tier 3 — anchors (2)
Self-page anchor links to non-existent headings (`#escalating-chat-to-video`, `#changelog`, `#deploy-flex`) converted to plain text.

### Prevention — DONE
`onBrokenLinks`, `onBrokenMarkdownLinks`, and `onBrokenAnchors` all set to `throw`. Any future broken link/anchor now fails the build before it can deploy.

### Self-corrected during execution
The sendgrid repoint initially produced a `//techops/...` protocol-relative URL (double slash) that dodges the internal-link checker — caught and fixed before deploy.
