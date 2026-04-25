---
sidebar_label: Change Runbook
sidebar_position: 3
title: "Wait Experience + Admin Email — Change Requests"
---

# Change Runbook

**Audience:** Connie agent modifying an existing Wait Experience + Admin Email deployment.

**Use this runbook when:** A client admin requests a change to an already-live deployment. For first-time provisioning, see [Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup). For tearing down, see [Cancellation](/getting-started/channels/voice/voice-features/wait-experience-with-email/cancel).

---

## Universal pre-flight (every change)

1. Confirm the change request with CEO if the change has any caller-visible impact.
2. `twilio profiles:use <ClientName>` — verify the right profile is active.
3. Capture a PRE-change snapshot of whatever you're changing (config JSON, Studio Flow definition, env file). Store in `dev-logs/wait-experience-<client>-<YYYY-MM-DD>-<change>/`.
4. Apply the change.
5. Capture a POST snapshot. Diff against PRE. **Verify CCT/DevSandbox baselines are unchanged.**
6. Smoke-test the changed path.
7. Update PAC.md and dev-log if SIDs/configs changed.

---

## Change types

### Add a new queue (e.g. add a new department)

**What's involved:** Create a new TaskRouter Workflow → create a new Studio Flow that points to it → assign a new phone number to that flow OR add IVR routing in front of the existing flow.

**Steps:**

1. In TaskRouter, create the new Workflow with the appropriate target queue and routing rules.
2. Either:
   - **New phone number for the queue:** create a fresh Studio Flow (clone your template) with the new `WorkflowSid` query param in the Wait URL, then wire the number to the flow.
   - **Same phone number, IVR-routed:** modify the existing Studio Flow to add a `Gather` widget before `Send to Flex`, branching to N `Send to Flex` widgets — each with a different `WorkflowSid` query param in its Wait URL.
3. **Critical:** every `Send to Flex` widget gets its own `?WorkflowSid=<that-queue-workflow-sid>` in its Wait URL. This is what we shipped on NSS RAMP/PCA.
4. Smoke-test each new queue path independently.

### Change the admin email address

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

### Change the Mailgun domain or API key

**What's involved:** Update `MAILGUN_DOMAIN` and/or `MAILGUN_API_KEY` in the per-environment `.env`, redeploy.

**Test the new credentials BEFORE redeploying** (see Phase 1.3 of [Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup)). A bad key in production breaks all admin email until rolled back.

### Add or change custom hold music

**What's involved:** This config uses the `wait-experience` serverless function for the Wait URL — which means the hold music is whatever's configured in `wait-experience.protected.js` and the announcements logic. If you want fully custom audio, you have two options:

1. **Edit `wait-experience.protected.js`** — change the hold-music URL or audio assets used in the TwiML response. Redeploy serverless functions.
2. **Use the separate `custom-hold-music` feature** — (basecamp `feature-library/custom-hold-music` — separate doc forthcoming on docs.connie). Note: this affects agent-initiated holds, not the queue wait experience.

For full per-client wait-experience customization, plan a feature module fork. (TODO: file an issue for this if a client requests it.)

### Change the greeting voice (TTS)

**What's involved:** The greeting voice is set in `wait-experience.protected.js`. Default uses Polly Neural voices. To switch, edit the TwiML `<Say voice="...">` in the function and redeploy serverless.

Available voices: see [Twilio TTS docs](https://www.twilio.com/docs/voice/twiml/say/text-speech) and [Polly NTTS](https://docs.aws.amazon.com/polly/latest/dg/NTTS-main.html).

### Modify the periodic prompt copy

**What's involved:** Edit the TwiML `<Say>` strings in `wait-experience.protected.js`. Redeploy serverless.

For HIPAA/compliance-sensitive copy: have the new copy reviewed by client compliance owner before deploying.

### Disable email but keep Wait Experience

**What's involved:** Set `ADMIN_EMAIL=` (empty) in `.env`, redeploy. The function will skip the Mailgun call when `ADMIN_EMAIL` is empty.

This effectively converts the deployment to "Wait Experience without admin email" — a different config that should eventually have its own product page.

### Move the deployment to a different Twilio sub-account

**Don't.** This is a teardown + setup, not a change. See [Cancellation](/getting-started/channels/voice/voice-features/wait-experience-with-email/cancel) followed by [Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) on the new account.

---

## What change requests cannot be done with this runbook

If the request is for fundamentally different caller behavior — e.g. "we want callers to go straight to voicemail without the option to wait" — that's a **config switch**, not a change. Use [Cancellation](/getting-started/channels/voice/voice-features/wait-experience-with-email/cancel) on this config and [Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) for the new config (e.g. Voicemail-only — TODO).

---

## Changelog format

Every change creates a row in the client's dev-log changelog. Format:

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
