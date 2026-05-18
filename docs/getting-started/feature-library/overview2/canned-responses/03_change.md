---
sidebar_label: Change
sidebar_position: 3
title: "Canned Responses — Change (update an existing client library)"
---

# Change Runbook — Update an existing client library

**Estimated time:** 15 minutes if the JSON content is already authored. Allow CEO-side authoring time before this runbook starts.

> **Scope:** This runbook covers updating an *existing* custom canned-responses library on an account that already has client-specific content live. For first-time replacement of the upstream defaults, use [Setup](./setup) instead. For format spec + example JSON, see [Setup Section 7](./setup#7-format-spec--example-json).

---

## 1. Role / Authority

Run as **CTO-Connie**. This is a live content change on a customer Twilio sub-account.

---

## 2. Required Parameters

Gather from the CEO **before starting**.

| Parameter | Why you need it | Example |
|---|---|---|
| Connie client account name | Selects the Twilio CLI profile + `.env.<account>` deploy target | `lifeline`, `NSS` |
| Updated library JSON | The new content to deploy (full file, not a partial diff) | `/Users/cjberno/Downloads/<client>-canned-responses-UPDATED-<date>.json` |
| Reason for the change | Audit context — "added Program Services section after Q4 program launch" | (free text) |
| Logged-in test agent on the account | Needed for post-deploy smoke | CEO ready to log in to `<account>.connie.team` |

The CEO should provide the **full file**, not a partial patch. The deploy replaces the asset wholesale; partial edits in-place at the repo level have no separate audit trail and risk re-introducing previously fixed content. Always full-file replace.

---

## 3. Read First

1. `~/projects/connie/rtc/basecamp-v26.02/CLAUDE.md` — Deployment Safety Protocol.
2. [Canned Responses — Overview](./overview) — wiring diagram.
3. [Setup Section 7 — Format Spec](./setup#7-format-spec--example-json) — re-validate the new file matches the schema before deploy.
4. [Troubleshoot Section 1 — Filename + Path Gotchas](./troubleshoot#filename-and-path-gotchas) — re-read every time. The discipline doesn't change but the temptation to rename "for clarity" recurs.

---

## 4. Safety Rails for This Change

Same set as [Setup Section 4](./setup#4-safety-rails-for-this-change). Specific to a change:

- **Capture a PRE-change baseline.** Without it, you cannot diff what actually changed, and rollback is content-archeology instead of a `cp` away.
- **Do not edit `responses.private.json` in-place in the repo as a quick fix.** Always work from a versioned authored file (e.g., `<client>-canned-responses-UPDATED-<date>.json` on Desktop), then `cp` it into place. The repo's `responses.private.json` reflects whoever-deployed-last; in-place edits make it a scratchpad with no history.
- **Per-account isolation still holds.** Deploying changes to client A's library does **not** affect client B's live runtime, even though the source file is shared at the repo level. Each account has its own serverless runtime serving its own asset copy. See [Troubleshoot Section 1](./troubleshoot#filename-and-path-gotchas).

---

## 5. Procedure

### Phase 0 — Pre-flight

#### 0.1 Confirm deploy target

```bash
twilio profiles:list
twilio profiles:use <account>
```

#### 0.2 Snapshot the LIVE content (mandatory)

```bash
SERVICE_DOMAIN=$(twilio api:serverless:v1:services:list -o json | \
  python3 -c "import sys,json; [print(s['domainBase']+'-'+s['environments'][0]['domainSuffix']+'.twil.io') for s in json.load(sys.stdin) if 'custom-flex-extensions-serverless' in s['friendlyName']]" 2>/dev/null | head -1)

curl -s "https://${SERVICE_DOMAIN}/features/canned-responses/responses.json" \
  > ~/Desktop/<account>-canned-responses-PRE-$(date +%Y-%m-%d).json
```

This is your rollback. If anything goes sideways, you can re-deploy this file via the same Phase 1 procedure.

#### 0.3 Lint the new authored JSON

```bash
python3 -m json.tool < /path/to/<client>-canned-responses-UPDATED-<date>.json > /dev/null && echo OK
```

#### 0.4 Standard compliance check

Walk the file against the schema in [Setup Section 7](./setup#7-format-spec--example-json). Same checklist:

- [ ] Top-level `categories` array
- [ ] Each category has `section` + `responses`
- [ ] Each response has `label` + `text`
- [ ] No new template variables introduced without explicit CEO ask (and if so, `{{task.X}}` form)
- [ ] No brand-firewall violations
- [ ] Contact references use Connie-routed identities

### Phase 1 — Replace source + deploy

#### 1.1 Copy authored JSON into source path

```bash
cp /path/to/<client>-canned-responses-UPDATED-<date>.json \
   ~/projects/connie/rtc/basecamp-v26.02/serverless-functions/src/assets/features/canned-responses/responses.private.json
```

Keep the canonical filename `responses.private.json` — do not create per-account variants. See [Troubleshoot Section 1](./troubleshoot#filename-and-path-gotchas).

#### 1.2 Diff against the live baseline (sanity check)

```bash
diff ~/Desktop/<account>-canned-responses-PRE-$(date +%Y-%m-%d).json \
     ~/projects/connie/rtc/basecamp-v26.02/serverless-functions/src/assets/features/canned-responses/responses.private.json
```

Look at the diff yourself. If it shows changes you did not expect (e.g., a whole section deleted that should have been preserved), **stop** and check with the CEO before deploying.

#### 1.3 CEO sign-off gate

Show the CEO the diff (or a summary if it's large). **Do not proceed without explicit "go".**

#### 1.4 Deploy

```bash
cd ~/projects/connie/rtc/basecamp-v26.02/serverless-functions
ENVIRONMENT=<account> npm run deploy
```

#### 1.5 Verify live

```bash
curl -s "https://${SERVICE_DOMAIN}/features/canned-responses/responses.json" | \
  python3 -m json.tool | grep -E '"section"|"label"' | head -20
```

Confirm the section/label list matches what you just deployed.

---

## 6. Definition of Done

- [ ] **CEO logs in to `<account>.connie.team`** as a Support Team rep, available, skilled.
- [ ] **CEO sends a test webchat in** (or accepts a real inbound task).
- [ ] **Dropdown renders the NEW content** — new/changed sections present, removed sections absent.
- [ ] **Spot-check at least one Insert** and one **Send** on a response that was edited or newly added.

---

## 7. If Your Variant Differs

If your account uses a non-standard placement, has per-team libraries, or pulls content from an external source (CRM, CMS), this runbook doesn't cover it. See [Authoring & Publishing Runbooks](/techops/troubleshooting/authoring-runbooks) to author a variant.
