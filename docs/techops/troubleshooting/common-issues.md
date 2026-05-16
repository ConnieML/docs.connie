---
sidebar_label: Common Issues
sidebar_position: 2
title: "Common Issues"
---

# Common Issues

Symptom-driven quick reference for common ConnieRTC support issues and their resolutions. For full deploy/change/cancel/troubleshoot runbooks per feature, see the [Runbook Index](/techops/troubleshooting/runbook-index).

---

## Voice Issues

### Calls Not Reaching Flex

**Symptoms:** Callers hear ringing but no task appears in Flex

**Investigation:**
```bash
# Check phone number configuration
twilio api:core:incoming-phone-numbers:list | grep [PHONE_NUMBER]

# Verify Studio Flow is published
twilio api:studio:v2:flows:list
```

**Common Causes:**
- Phone number not configured with Studio Flow
- Studio Flow in draft status
- Webhook URL incorrect

---

### Voicemail Not Recording

**Symptoms:** Callers report leaving voicemail but no recording appears

**Investigation:**
```bash
# Check recent recordings
twilio api:core:recordings:list --limit 10

# Check function logs
twilio serverless:logs --service-sid [SERVICE_SID] --tail
```

**Common Causes:**
- Recording callback URL misconfigured
- Storage permissions issue
- Transcription service timeout

---

## SSO Issues

### "Session not found" Error

**Symptoms:** Users see session errors when logging into Flex via SSO

**Root Cause:** "Login using popup" not enabled in Twilio SSO settings

**Fix:**
1. Go to Flex → Admin → Single Sign-On
2. Enable "Login using popup" checkbox
3. Save configuration

This is required for iframe-embedded Flex instances due to third-party cookie restrictions.

---

### SAML Response Invalid

**Symptoms:** Auth0 returns error during SSO login

**Investigation:**
- Verify Auth0 certificate matches Twilio configuration
- Check SSO URL is exactly correct
- Verify Issuer matches Auth0 domain

---

## Task Issues

### Tasks Not Routing to Agents

**Symptoms:** Tasks appear in queue but agents don't receive them

**Investigation:**
```bash
# Check workflow configuration
twilio api:taskrouter:v1:workspaces:workflows:list --workspace-sid [WS_SID]

# Check agent status
twilio api:taskrouter:v1:workspaces:workers:list --workspace-sid [WS_SID]
```

**Common Causes:**
- Workflow filter doesn't match task attributes
- Agent not in correct queue
- Agent status not "Available"

---

## Email Notifications

### Voicemail Emails Not Arriving

**Symptoms:** Voicemails recorded but admin doesn't receive email

**Investigation:**
```bash
# Test Mailgun API
curl -s --user "api:[KEY]" \
  "https://api.mailgun.net/v3/[DOMAIN]/events?event=delivered&limit=5"
```

**Common Causes:**
- Wrong Mailgun API key (using private key instead of domain-specific)
- ADMIN_EMAIL environment variable not set
- Domain not verified in Mailgun

---

## Flex UI / Plugin Issues

### "NotificationManager: Notification already registered" in Status Report

**Symptoms:**
- Red "Operational issue detected" banner appears in the Flex Status Report sidebar (top-right of the agent desktop)
- Downloaded error report contains `NotificationManager: Notification already registered` with `twilioErrorCode: 45600`
- Stack trace points to `addHook` in `plugin-flex-ts-template-v2/.../utils/feature-loader/notifications.ts`
- Functional impact is usually nil (notifications still fire), but agents see the persistent error indicator

**Root Cause:** Two ConnieRTC features registered the same Flex notification ID. Twilio's `flex.Notifications.registerNotification(id)` throws on the second registration. The basecamp feature-loader fans out to every enabled feature's `notificationHook`; if two features hand back overlapping IDs, the boot sequence trips this error.

The most common offender is having **both** `callback_and_voicemail` and `callback_and_voicemail_with_email` enabled on the same account — both define `CallbackErrorCallingCustomer`, `CallbackErrorRequeuingCallbackTask`, and `CallbackOutboundDialingNotEnabled` as their notification IDs.

**Investigation:**

```bash
# 1. Identify duplicate notification ID strings across features
cd ~/projects/connie/rtc/basecamp-v26.02
grep -rh "^\s*[A-Z][A-Za-z0-9_]* = ['\"]" plugin-flex-ts-template-v2/src/feature-library --include="*.ts" --include="*.tsx" \
  | grep -oE "['\"][^'\"]+['\"]" | sort | uniq -c | sort -rn | awk '$1 > 1'

# 2. Locate which features define each duplicate ID
grep -rn "= ['\"]<duplicated-id-string>['\"]" plugin-flex-ts-template-v2/src/feature-library

# 3. Confirm both conflicting features are enabled in the live Flex Configuration
curl -s -u "$ACCOUNT_SID:$AUTH_TOKEN" \
  "https://flex-api.twilio.com/v1/Configuration" \
  | python3 -c "
import sys,json
d=json.load(sys.stdin)
features = d.get('ui_attributes',{}).get('custom_data',{}).get('features',{})
for k,v in features.items():
    if v.get('enabled'): print(f'  {k}: enabled')"
```

**Fix (preferred — config only, no redeploy):**

1. Open the `/template-admin` panel on the affected Flex account. **Do not** write the Flex Configuration API directly — see the basecamp Flex Configuration Safety Protocol.
2. Find the legacy/redundant feature card (e.g., **Callback and Voicemail** when **Callback and Voicemail with Email** is also enabled).
3. Toggle `enabled` **off**, save.
4. Hard-reload Flex (Cmd+Shift+R) — the Status Report banner should clear.

**Mandatory follow-up — sync source to live:**

The admin-panel toggle is live-only. The next deploy through the basecamp pipeline will re-enable the feature unless the source override is also added to the per-account file:

```jsonc
// flex-config/ui_attributes.<account>.json, under custom_data.features:
"callback_and_voicemail": { "enabled": false },
```

Then verify source matches live by pulling `GET /v1/Configuration` and diffing the `ui_attributes.custom_data.features` block. Source/live drift on this setting silently regresses the fix on the next deploy.

**Fix (alternative — code-level, requires plugin redeploy):** Rename the conflicting IDs in one of the two features so they no longer collide. More work, but addresses the architectural overlap rather than choosing one feature.

**Reference incident:** NSS, 2026-04-27 — both callback features enabled simultaneously, error surfaced in the Flex Status Report. Resolved by disabling `callback_and_voicemail` in the NSS-specific override (kept the `_with_email` variant which is the superset).

---

## Teams View (Supervisor) Issues

### Department / Team filter shows Twilio's native defaults instead of the configured values

**Symptoms:** `/teams` view's Filter pane → Department dropdown shows `Customer Service / Finance / General Management / Human Resources / Marketing / Operations / Purchasing / Recruiting / Sales` instead of the values deployed in the account's `flex-config/ui_attributes.<account>.json` under `custom_data.common.departments`. Same issue can affect the **Team** filter. Hard-refresh, incognito, basecamp plugin redeploy — none of them fix it.

**60-second diagnosis (DevTools console on the affected /teams page):**

```javascript
(() => {
  const F = window.Twilio?.Flex || window.Flex;
  const filters = F.TeamsView.defaultProps.filters;
  const dept = filters.find(f => f?.fieldName === 'department_name' || /department/i.test(f?.id ?? ''));
  return { options: dept?.options?.map(o => o?.value ?? o), fieldName: dept?.fieldName };
})();
```

If `options` returns Twilio's native defaults, the basecamp `teams_view_filters` feature's hook is not winning over Flex SDK defaults — direct override is required.

**Cause:** basecamp's `teamsFilterHook` (in `plugin-flex-ts-template-v2/src/feature-library/teams-view-filters/`) registers custom filters via the hook contract, but in current Flex SDK versions that path does NOT replace `Flex.TeamsView.defaultProps.filters`. Native defaults stay in place.

**Fix:** Account-scoped Flex plugin that reassigns `Flex.TeamsView.defaultProps.filters` at init, reading values from `custom_data.common.{departments,teams}`. Full pattern + reference implementation + deploy steps in **[Teams View Filter Override](/techops/codebase/teams-view-filter-override)**.

**Do not** "fix" this by direct `POST /v1/Configuration` writes or by renaming Worker `attributes.department` → `department_name` — see the safety-rails section of the override doc for why.

**Reference incident:** NSS, 2026-05-15. Plugin scaffold at `~/projects/connie/clients/nss/flex-plugins/nss-teams-filters/`.

---

## Quick Diagnostic Commands

```bash
# Real-time function logs
twilio serverless:logs --service-sid [SERVICE_SID] --tail

# Recent failed calls
twilio api:core:calls:list --limit 10 --status failed

# Studio Flow executions
twilio api:studio:v2:flows:executions:list --flow-sid [FLOW_SID] --limit 10

# TaskRouter tasks
twilio api:taskrouter:v1:workspaces:tasks:list --workspace-sid [WS_SID] --limit 10
```

---

*For detailed debugging guidance, see [Debugging Best Practices](/techops/codebase/debugging).*
