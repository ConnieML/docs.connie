---
sidebar_label: Cancellation Runbook
sidebar_position: 4
title: "Wait Experience + Admin Email — Cancellation"
---

# Cancellation Runbook

**Audience:** Connie agent tearing down a Wait Experience + Admin Email deployment, or reverting it to a simpler config.

**Use this runbook when:**
- Client is canceling Connie service entirely.
- Client wants to switch this number to a simpler config (e.g. Voicemail-only).
- A test/staging deployment needs to be removed.

**For changes that don't require teardown** (admin email change, hold music swap, etc.), use [Change](/getting-started/channels/voice/voice-features/wait-experience-with-email/change) instead.

---

## Universal pre-flight (every cancellation)

1. **Confirm the cancellation with CEO in writing.** Cancellation is destructive — no rollback after the phone number is unwired or the Studio Flow is deleted.
2. Capture a final PRE-cancellation snapshot of EVERYTHING:
   - `<client>-config-PRE-cancel.json`
   - Studio Flow definition export
   - Studio Flow execution history (last 30 days, for client records)
   - Serverless function source (`git log` reference is fine if untouched)
   - Per-environment `.env` (with secrets redacted)
3. Decide whether the phone number is being **released** (returned to Twilio pool) or **retained** for another use. This decision affects the order of operations.

---

## Decision tree

### Path A — Full teardown (client canceling Connie)

Order of operations matters. Going inside-out (caller-experience first, infrastructure last) prevents callers from hitting broken flows.

1. **Update Studio Flow** to play a goodbye message and hang up. Publish.
2. Wait 24h to drain in-flight calls.
3. **Unwire phone number** from the flow (set Voice URL to a bin that says "this number is no longer in service" or release the number).
4. **Disable the feature** in `ui_attributes.<client>.json`:
   ```json
   {
     "custom_data": {
       "features": {
         "callback_and_voicemail_with_email": { "enabled": false }
       }
     }
   }
   ```
   Deploy with `OVERWRITE_CONFIG=true` so the live config picks up the disable.
5. **Delete the Studio Flow** (or archive — Twilio doesn't have hard delete; you can rename to `[ARCHIVED] ...`).
6. **Revoke the Mailgun API key** for this client.
7. **Remove the client section from PAC.md**.
8. Move dev-logs to an archive folder.

### Path B — Switch to a simpler config (e.g. Voicemail-only)

This is a teardown of the Wait Experience-specific bits and a re-setup of the simpler config. Plan it as a single deploy with a brief outage window agreed with the client.

1. Inside a maintenance window:
2. Apply Path A steps 4 and 5 (disable feature flag, delete or archive Studio Flow).
3. Follow [Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) for the target simpler config (TODO: voicemail-only setup runbook).
4. Re-wire the phone number to the new Studio Flow.
5. Smoke-test the new caller experience.

### Path C — Test/staging removal

For non-production deployments, you can skip the 24h drain. Otherwise the steps mirror Path A.

---

## What NOT to delete

- **The TaskRouter Workspace.** Workspace deletion takes the entire Flex deployment down. Only delete the workspace if Path A is "we're closing the entire Twilio sub-account."
- **The Mailgun domain.** Other clients may share the parent domain or its DNS records. Just revoke the per-client API key.
- **The serverless service.** Other features (e.g. webchat, video escalation) may rely on it. Just remove the per-client `.env` entries.
- **PAC.md history** — keep the cancellation note in PAC.md as a tombstone so future agents know this client used to exist.

---

## Common gotchas

| Gotcha | Symptom | Fix |
|--------|---------|-----|
| Phone number released too early | Callers in mid-flow get dropped | Always update Studio Flow first, drain, then unwire. |
| Mailgun key revoked before serverless deploy | Function errors loudly in logs for any in-flight calls | Revoke key AFTER feature flag is disabled and deployed. |
| Forgot to set `OVERWRITE_CONFIG=true` on the disable deploy | Feature flag stays enabled in live | Re-deploy with the flag. |
| Studio Flow archived but not unwired | Phone number still routes to a published flow that does nothing useful | Always unwire phone number before archiving the flow. |

---

## Post-cancellation verification

24h after cancellation, verify:

- Calls to the (now-unwired) number reach the goodbye message or busy signal as expected.
- No new admin emails arrive.
- No new tasks land in the agent dashboard.
- Mailgun activity log shows zero outbound emails for the disabled domain key.
- PAC.md no longer references this client (or is annotated as cancelled).
