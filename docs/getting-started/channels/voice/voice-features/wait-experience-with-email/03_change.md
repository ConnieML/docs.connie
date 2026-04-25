---
sidebar_label: Change Runbook
sidebar_position: 3
title: "Wait Experience + Admin Email — Change Requests"
---

# Change Runbook

**Use this runbook when:** A client admin requests a change to an already-live Wait Experience + Admin Email deployment. For first-time provisioning, see [Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup). For tearing down, see [Cancellation](/getting-started/channels/voice/voice-features/wait-experience-with-email/cancel).

---

## 1. Role / Authority

Run as **CTO-Connie**. Most changes are caller-visible — CEO approval required for anything that affects the caller experience (greeting, hold music, prompts, queue routing). Quiet back-end changes (admin email swap, Mailgun key rotation) still need CEO awareness but don't require pre-approval if rollback is well-understood.

---

## 2. Required Parameters

Gather from the CEO/requester **before starting**:

| Parameter | Why you need it |
|---|---|
| Connie client account name | Which sub-account the change applies to |
| Phone number (or queue) being changed | Scope of the change |
| Change type | Match to a row in [Change types](#change-types) below; if no match, see [§7 If Your Variant Differs](#7-if-your-variant-differs) |
| Current value | What's live now (capture in PRE snapshot) |
| Target value | What it should be after the change |
| Caller-visible? | Determines whether CEO pre-approval is mandatory |
| Rollback plan | What you'll do if smoke test fails |

If the request is "convert this number to a different routing config" (e.g. "switch from Wait Experience to Voicemail-only"), this is **not** a change — it's a teardown + setup. See [§7 If Your Variant Differs](#7-if-your-variant-differs).

---

## 3. Read First

1. `~/projects/connie/rtc/basecamp-v26.02/CLAUDE.md` — Flex Configuration Safety Protocol still applies.
2. The dev-log directory for the original deploy: `~/projects/connie/rtc/dev-logs/wait-experience-<client>-<original-deploy-date>/` — review what was deployed and the SIDs in play.
3. `~/projects/connie/rtc/PAC.md` — current SIDs, Mailgun domain, env file path for the target client.
4. [Setup runbook](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) — for change types that involve redeploying serverless or flex-config, the procedure phases are the same.

---

## 4. Safety Rails for This Change

- **Capture PRE snapshot before touching anything.** Skipping this leaves you with no rollback reference and no "what changed" diff.
- **Defensive baselines unchanged** — if the change touches flex-config, snapshot CCT and DevSandbox configs and verify they're untouched after deploy.
- **Test the new credentials/values BEFORE redeploying** when feasible (especially Mailgun key changes — Phase 1.3 of Setup).
- **NEVER write directly to the Flex Configuration API.** All config changes go through `/template-admin` or the deploy pipeline.
- **CRM container `url` MUST stay `{{task.attributes.profile_url}}`.** Don't accidentally hardcode it during a change.
- **For caller-visible copy changes (greetings, prompts, voicemail messages):** have the client compliance owner review the new text before deploy. Especially for HIPAA-sensitive lines.
- **Email infrastructure lag is real.** Mailgun can take 1–6 hours to fully propagate a new sending address — don't declare failure on first send if email doesn't arrive within minutes.

---

## 5. Procedure

### Universal pre-flight (every change)

1. Confirm the change request with CEO if the change has any caller-visible impact.
2. `twilio profiles:use <ClientName>` — verify the right profile is active.
3. Capture a PRE-change snapshot of whatever you're changing (config JSON, Studio Flow definition, env file). Store in `dev-logs/wait-experience-<client>-<YYYY-MM-DD>-<change>/`.
4. Apply the change.
5. Capture a POST snapshot. Diff against PRE. **Verify CCT/DevSandbox baselines are unchanged.**
6. Smoke-test the changed path.
7. Update PAC.md and dev-log if SIDs/configs changed.

### Change types

#### Add a new queue (e.g. add a new department)

**What's involved:** Create a new TaskRouter Workflow → create a new Studio Flow that points to it → assign a new phone number to that flow OR add IVR routing in front of the existing flow.

**Steps:**

1. In TaskRouter, create the new Workflow with the appropriate target queue and routing rules.
2. Either:
   - **New phone number for the queue:** create a fresh Studio Flow (clone your template) with the new `WorkflowSid` query param in the Wait URL, then wire the number to the flow.
   - **Same phone number, IVR-routed:** modify the existing Studio Flow to add a `Gather` widget before `Send to Flex`, branching to N `Send to Flex` widgets — each with a different `WorkflowSid` query param in its Wait URL.
3. **Critical:** every `Send to Flex` widget gets its own `?WorkflowSid=<that-queue-workflow-sid>` in its Wait URL. This is what we shipped on NSS RAMP/PCA.
4. Smoke-test each new queue path independently.

#### Change the admin email address

**What's involved:** Update `ADMIN_EMAIL` in the per-environment `.env`, redeploy serverless functions.

**Steps:**

```bash
# Edit the env file
vi ~/projects/connie/rtc/basecamp-v26.02/serverless-functions/.env.<client>
# ADMIN_EMAIL=newadmin@example.com,oldadmin@example.com  # comma-separated, no spaces

# Redeploy
cd ~/projects/connie/rtc/basecamp-v26.02/serverless-functions
ENVIRONMENT=<client> npm run deploy
```

Trigger a test voicemail. Verify the new address receives the email. Live email infrastructure can lag by 1–6 hours via Mailgun for new addresses — check spam folder before declaring failure.

#### Change the Mailgun domain or API key

**What's involved:** Update `MAILGUN_DOMAIN` and/or `MAILGUN_API_KEY` in the per-environment `.env`, redeploy.

**Test the new credentials BEFORE redeploying** (see Phase 1.3 of [Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup)). A bad key in production breaks all admin email until rolled back.

#### Add or change custom hold music

**What's involved:** This config uses the `wait-experience` serverless function for the Wait URL — which means the hold music is whatever's configured in `wait-experience.protected.js` and the announcements logic. If you want fully custom audio, you have two options:

1. **Edit `wait-experience.protected.js`** — change the hold-music URL or audio assets used in the TwiML response. Redeploy serverless functions.
2. **Use the separate `custom-hold-music` feature** — (basecamp `feature-library/custom-hold-music` — separate doc forthcoming on docs.connie). Note: this affects agent-initiated holds, not the queue wait experience.

For full per-client wait-experience customization, plan a feature module fork. (TODO: file an issue for this if a client requests it.)

#### Change the greeting voice (TTS)

**What's involved:** The greeting voice is set in `wait-experience.protected.js`. Default uses Polly Neural voices. To switch, edit the TwiML `<Say voice="...">` in the function and redeploy serverless.

Available voices: see [Twilio TTS docs](https://www.twilio.com/docs/voice/twiml/say/text-speech) and [Polly NTTS](https://docs.aws.amazon.com/polly/latest/dg/NTTS-main.html).

#### Modify the periodic prompt copy

**What's involved:** Edit the TwiML `<Say>` strings in `wait-experience.protected.js`. Redeploy serverless.

For HIPAA/compliance-sensitive copy: have the new copy reviewed by client compliance owner before deploying.

#### Disable email but keep Wait Experience

**What's involved:** Set `ADMIN_EMAIL=` (empty) in `.env`, redeploy. The function will skip the Mailgun call when `ADMIN_EMAIL` is empty.

This effectively converts the deployment to "Wait Experience without admin email" — a different config that should eventually have its own product page.

#### Move the deployment to a different Twilio sub-account

**Don't.** This is a teardown + setup, not a change. See [Cancellation](/getting-started/channels/voice/voice-features/wait-experience-with-email/cancel) followed by [Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) on the new account.

### Changelog format (every change)

Every change creates a row in the client's dev-log changelog:

```
## YYYY-MM-DD — <one-line summary>
**Changed by:** <agent>
**Files touched:** <list>
**SIDs changed:** <list>
**Pre snapshot:** <path>
**Post snapshot:** <path>
**Smoke test result:** <pass/fail/notes>
**CEO approval:** <commit-message-or-slack-link>
```

---

## 6. Definition of Done

Don't declare a change complete until **every** item below is verified:

- [ ] **PRE snapshot captured** in the change-specific dev-log directory before any modification.
- [ ] **POST snapshot captured** and diffed against PRE — diff matches the intended change, nothing else moved.
- [ ] **Defensive baselines unchanged** — CCT and DevSandbox configs byte-identical PRE vs. POST. Zero bleed.
- [ ] **Smoke test of the changed path passes.** Specific to the change type:
  - New queue → call lands in the new queue, not the old one
  - Admin email change → test voicemail → email arrives at new address (allow Mailgun lag)
  - Mailgun rotation → test voicemail → email arrives, no 401/403/400 in logs
  - Custom hold music → test call → new audio plays
  - Greeting/prompt copy change → test call → new copy heard, no truncation/clipping
  - Disable email → test voicemail records → no email sent, no error in logs
- [ ] **Source files match live.** If you touched flex-config, `GET /v1/Configuration` matches `ui_attributes.<account>.json`. If you touched serverless, the deployed function source matches `git HEAD`.
- [ ] **PAC.md updated** if any SIDs changed.
- [ ] **Changelog entry written** in the client's dev-log per the format above.
- [ ] **CEO sign-off** for caller-visible changes; CEO awareness for back-end changes.

If smoke test fails, **roll back to PRE snapshot** before investigating. Don't leave a broken state live while debugging.

---

## 7. If Your Variant Differs

If the request is for fundamentally different caller behavior — e.g., "we want callers to go straight to voicemail without the option to wait" — that's a **config switch**, not a change. Run [Cancel](/getting-started/channels/voice/voice-features/wait-experience-with-email/cancel) on this config, then [Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) for the target config.

Common variants and where they belong:

| Request | Routing config | Where the runbook goes |
|---|---|---|
| Voicemail-only (no callback, no wait) | Voice Direct → Voicemail-only | `docs/getting-started/channels/voice/voice-features/voicemail-only/` *(📝 TBD)* |
| Callback-only (no voicemail, no wait) | Voice Direct → Callback-only | `docs/getting-started/channels/voice/voice-features/callback-only/` *(📝 TBD)* |
| Voicemail OR callback, no admin email | Voice Direct → Voicemail OR Callback (no email) | `docs/getting-started/channels/voice/voice-features/voicemail-or-callback/` *(📝 TBD)* |

If your change request doesn't match any change-type subsection above AND isn't a routing-config switch, you're likely looking at a **new add-on or feature module** that needs its own runbook set. See [Authoring & Publishing Runbooks](/techops/troubleshooting/authoring-runbooks).
