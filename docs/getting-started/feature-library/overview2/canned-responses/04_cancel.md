---
sidebar_label: Cancel
sidebar_position: 4
title: "Canned Responses — Cancel (disable on an account)"
---

# Cancel Runbook — Disable Canned Responses on an account

**Estimated time:** 10 minutes.

> **Scope:** Disabling the Canned Responses dropdown on a client's account. The feature has no destructive teardown — the serverless asset can stay in place even when the feature is disabled (it's just unused). The disable is a single flex-config flag flip.

---

## 1. Role / Authority

Run as **CTO-Connie**. Live config change on a customer account.

---

## 2. Required Parameters

| Parameter | Why you need it | Example |
|---|---|---|
| Connie client account name | Selects the flex-config file | `lifeline`, `NSS` |
| Reason for disable | Audit trail | "Client migrating to AI-suggested replies instead of static library" |
| Disable strategy | Soft (flag off, asset retained) vs Hard (flag off + asset removed) | "Soft" — recommended default |

**Default to Soft.** The serverless asset is small (~10KB) and retaining it costs nothing. Removing it forecloses easy re-enable later.

---

## 3. Read First

1. `~/projects/connie/rtc/basecamp-v26.02/CLAUDE.md` — Flex Configuration Safety Protocol.
2. [Canned Responses — Overview](./overview) — confirm you understand which feature you're disabling. Don't confuse Canned Responses with Dispositions, Worker Canvas Tabs, or Quick Replies (different features with overlapping vocabulary).

---

## 4. Safety Rails for This Change

- **No direct `POST /v1/Configuration` writes.** Use the flex-config deploy pipeline (basecamp `CLAUDE.md` G-rule).
- **Confirm the CLI profile** before any deploy.
- **CEO approval before deploy**, even on a "soft" disable.

---

## 5. Procedure

### Soft disable (recommended default)

#### 5.1 Flip the flag in flex-config

Edit `~/projects/connie/rtc/basecamp-v26.02/flex-config/ui_attributes.<account>.json`:

```json
"canned_responses": {
    "enabled": false
}
```

#### 5.2 Deploy flex-config

Use the standard flex-config deploy pipeline for the target account. **Do not POST directly to `/v1/Configuration`.**

#### 5.3 Verify the dropdown is gone

CEO logs in to `<account>.connie.team`, accepts a chat task — confirm the dropdown/CRM panel for canned responses no longer renders.

### Hard disable (only if explicitly requested)

In addition to the soft-disable steps above:

```bash
twilio profiles:use <account>
cd ~/projects/connie/rtc/basecamp-v26.02/serverless-functions
# Remove the canned-responses serverless function + asset
# CAUTION: this requires editing serverless-functions/package.json + redeploying
```

**Hard disable is rarely needed.** If the CEO asks for it, double-check the reason; usually they actually want soft disable. The asset itself is inert when the flex-config flag is off.

---

## 6. Definition of Done

- [ ] `canned_responses.enabled: false` deployed to the account's flex-config.
- [ ] CEO confirms agent UI no longer shows the dropdown / CRM panel.
- [ ] (Hard disable only) `curl https://${SERVICE_DOMAIN}/features/canned-responses/responses.json` returns 404.

---

## 7. If Your Variant Differs

If the disable is part of a larger feature swap (e.g., replacing static canned responses with AI-suggested replies), the steps above are still valid but additional setup for the replacement feature is out of scope here.
