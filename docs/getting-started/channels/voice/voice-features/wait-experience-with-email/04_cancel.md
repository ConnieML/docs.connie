---
sidebar_label: Cancellation Runbook
sidebar_position: 4
title: "Wait Experience + Admin Email — Cancellation"
---

# Cancellation Runbook

**Use this runbook when:**
- Client is canceling Connie service entirely.
- Client wants to switch this number to a simpler config (e.g. Voicemail-only).
- A test/staging deployment needs to be removed.

For changes that don't require teardown (admin email change, hold music swap, etc.), use [Change](/getting-started/channels/voice/voice-features/wait-experience-with-email/change) instead.

---

## 1. Role / Authority

Run as **CTO-Connie**. Cancellation is **destructive** — once the phone number is unwired or the Studio Flow is deleted, there is no rollback. **Written CEO confirmation is mandatory** before any teardown step. Verbal approval is not enough; capture the approval in Slack, email, or a commit message.

---

## 2. Required Parameters

Gather from the CEO **in writing before starting**:

| Parameter | Why you need it |
|---|---|
| Connie client account name | Which sub-account the cancellation applies to |
| Phone number being torn down | Scope; also affects whether to release or retain |
| Cancellation type | Full teardown (Path A), config switch (Path B), or test/staging removal (Path C) — see Decision tree below |
| Phone number disposition | **Release** (return to Twilio pool) vs. **retain** (port out, reuse for new config). Affects order of operations. |
| Drain window | Default 24h to let in-flight calls complete. Test/staging can skip. |
| Customer-record retention requirements | Studio Flow execution history, recordings, transcripts — does the client need these archived/exported before deletion? |
| Written CEO approval | Slack thread link, email, or commit message reference. **Required.** |

If any of these are missing — especially the written CEO approval — **stop**. Cancellation without proper authorization is a worse outcome than a delayed teardown.

---

## 3. Read First

1. `~/projects/connie/rtc/basecamp-v26.02/CLAUDE.md` — Deployment Safety + Flex Configuration Safety Protocols both apply during teardown deploys.
2. The dev-log directory for the original deploy: `~/projects/connie/rtc/dev-logs/wait-experience-<client>-<original-deploy-date>/` — review what was deployed so you know what to tear down.
3. `~/projects/connie/rtc/PAC.md` — current SIDs, Mailgun domain, env file path. You'll be modifying or removing these.
4. [Setup runbook](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) — for Path B (config switch), the target config's Setup runbook is the second half of the work.

---

## 4. Safety Rails for This Change

- **Cancellation is destructive. Written CEO approval first. No exceptions.**
- **Order of operations matters.** Going inside-out (caller-experience first, infrastructure last) prevents callers from hitting broken flows. The Decision tree below preserves this order — follow it.
- **Capture a final PRE-cancellation snapshot of EVERYTHING** before any deletion. Once a Studio Flow is archived/deleted, you can't recover its execution history.
- **Do NOT delete the TaskRouter Workspace.** Workspace deletion takes the entire Flex deployment down. Only delete the workspace if the entire Twilio sub-account is being closed.
- **Do NOT delete the Mailgun parent domain.** Other clients may share the DNS records. Revoke the per-client API key only.
- **Do NOT delete the serverless service.** Other features (webchat, video escalation) may rely on it. Just remove the per-client `.env` entries.
- **Drain in-flight calls** before unwiring the phone number — typically 24h. Skipping this drops live callers mid-call.
- **Revoke Mailgun key AFTER serverless deploy disables the feature flag.** Reversed order produces loud function errors on in-flight calls.

---

## 5. Procedure

### Universal pre-flight (every cancellation)

1. **Confirm the cancellation with CEO in writing.** Cancellation is destructive — no rollback after the phone number is unwired or the Studio Flow is deleted.
2. Capture a final PRE-cancellation snapshot of EVERYTHING:
   - `<client>-config-PRE-cancel.json`
   - Studio Flow definition export
   - Studio Flow execution history (last 30 days, for client records)
   - Serverless function source (`git log` reference is fine if untouched)
   - Per-environment `.env` (with secrets redacted)
3. Decide whether the phone number is being **released** (returned to Twilio pool) or **retained** for another use. This decision affects the order of operations.

### Decision tree

#### Path A — Full teardown (client canceling Connie)

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

#### Path B — Switch to a simpler config (e.g. Voicemail-only)

This is a teardown of the Wait Experience-specific bits and a re-setup of the simpler config. Plan it as a single deploy with a brief outage window agreed with the client.

1. Inside a maintenance window:
2. Apply Path A steps 4 and 5 (disable feature flag, delete or archive Studio Flow).
3. Follow [Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) for the target simpler config (TODO: voicemail-only setup runbook).
4. Re-wire the phone number to the new Studio Flow.
5. Smoke-test the new caller experience.

#### Path C — Test/staging removal

For non-production deployments, you can skip the 24h drain. Otherwise the steps mirror Path A.

---

### What NOT to delete (reference)

- **The TaskRouter Workspace.** Workspace deletion takes the entire Flex deployment down. Only delete the workspace if Path A is "we're closing the entire Twilio sub-account."
- **The Mailgun domain.** Other clients may share the parent domain or its DNS records. Just revoke the per-client API key.
- **The serverless service.** Other features (e.g. webchat, video escalation) may rely on it. Just remove the per-client `.env` entries.
- **PAC.md history** — keep the cancellation note in PAC.md as a tombstone so future agents know this client used to exist.

---

### Common gotchas (reference)

| Gotcha | Symptom | Fix |
|--------|---------|-----|
| Phone number released too early | Callers in mid-flow get dropped | Always update Studio Flow first, drain, then unwire. |
| Mailgun key revoked before serverless deploy | Function errors loudly in logs for any in-flight calls | Revoke key AFTER feature flag is disabled and deployed. |
| Forgot to set `OVERWRITE_CONFIG=true` on the disable deploy | Feature flag stays enabled in live | Re-deploy with the flag. |
| Studio Flow archived but not unwired | Phone number still routes to a published flow that does nothing useful | Always unwire phone number before archiving the flow. |

---

## 6. Definition of Done

A cancellation is **not** done at the moment the Studio Flow is unwired — it's done after the 24h post-cancellation verification window confirms zero residual activity. **Don't** archive the dev-log directory or close the cancellation ticket until every item below is verified:

- [ ] **PRE-cancellation snapshot captured** in `~/projects/connie/rtc/dev-logs/wait-experience-<client>-<cancel-date>/`, including config JSON, Studio Flow export, execution history (last 30 days), and `.env` file (secrets redacted).
- [ ] **Inside-out teardown order followed** per Decision tree (goodbye message → drain → unwire → flag → archive flow → revoke key → PAC.md update).
- [ ] **Drain window honored** (24h for production, skippable for test/staging only).
- [ ] **Live verification 24h after cancellation:**
  - Calls to the (now-unwired) number reach the goodbye message or busy signal as expected
  - No new admin emails arrive at the previously-configured admin address
  - No new tasks land in the agent dashboard for the cancelled queue
  - Mailgun activity log shows zero outbound emails for the disabled domain key
- [ ] **PAC.md** no longer references this client as active — annotated as cancelled with date and tombstone reference (don't delete the section entirely; future agents may need to know this client existed).
- [ ] **Dev-logs archived** to a `~/projects/connie/rtc/dev-logs/_archive/` location, not deleted.
- [ ] **Mailgun parent domain still intact** (only the per-client API key was revoked).
- [ ] **TaskRouter Workspace still intact** (only the per-feature flag was disabled).
- [ ] **CEO sign-off** on the completed cancellation (acknowledging the 24h verification passed).

If any post-cancellation verification fails, **investigate before declaring done.** Residual emails or tasks usually mean a config flag didn't propagate or the Mailgun key wasn't actually revoked.

---

## 7. If Your Variant Differs

If the request isn't actually a cancellation but a **change to an already-live deployment** (admin email swap, hold music, prompt copy, etc.), use the [Change runbook](/getting-started/channels/voice/voice-features/wait-experience-with-email/change) instead — those don't require teardown.

If the request is to **switch to a different routing config** (Path B above), the second half of the work is a Setup runbook for the target config. Wait Experience + Admin Email is currently the only fully-documented routing config — for Voicemail-only, Callback-only, or Voicemail-or-Callback, the Setup runbook does not yet exist.

| Switching to... | Routing config | Setup runbook |
|---|---|---|
| Voicemail-only | Voice Direct → Voicemail-only | `docs/getting-started/channels/voice/voice-features/voicemail-only/02_setup.md` *(📝 TBD)* |
| Callback-only | Voice Direct → Callback-only | `docs/getting-started/channels/voice/voice-features/callback-only/02_setup.md` *(📝 TBD)* |
| Voicemail OR Callback (no email) | Voice Direct → Voicemail OR Callback | `docs/getting-started/channels/voice/voice-features/voicemail-or-callback/02_setup.md` *(📝 TBD)* |

If you are the first to perform a Path B switch into one of those configs, you have an additional deliverable: author the missing Setup runbook for the target config per the [Authoring & Publishing Runbooks](/techops/troubleshooting/authoring-runbooks) guide. Document what you actually shipped, not what you planned to ship.
