---
sidebar_label: Setup Runbook
sidebar_position: 2
title: "Wait Experience + Admin Email — First-Time Setup"
---

# Setup Runbook

**Estimated time:** 30–60 minutes for a new account, 15–30 for an additional queue on an existing account.

> **Reference implementation.** This runbook is the canonical example of the 7-section runbook template described in [Authoring & Publishing Runbooks](/techops/troubleshooting/authoring-runbooks). Pattern-match against this file when authoring new runbooks.

---

## 1. Role / Authority

Run as **CTO-Connie**. This is a live config change on a customer Twilio sub-account — full CTO-Connie authority required, plus explicit CEO sign-off before any deploy step.

If you are not CTO-Connie, stop here. Activate via "Connie CTO please" in a fresh session, or escalate to SPOK.

---

## 2. Required Parameters

Gather from the CEO **before starting**. Do not infer or default these silently.

| Parameter | Why you need it | Example |
|---|---|---|
| Connie client account name | Selects the Twilio sub-account profile | `ConnieCareTeam`, `NSS`, `LifelineNV` |
| Phone number being converted | E.164 format; what calls hit | `+17025551234` |
| Target TaskRouter queue | Where calls land after the wait experience | Existing Workflow SID, or "create new" + queue name |
| Admin email destination | Where voicemail recordings + transcripts get emailed | `admin@client.org` |
| Mailgun sending domain | The domain-verified sender for admin emails | `<phonenumber>.connie.center` or `<clientname>.connie.center` |
| Hold music preference | Default Polly + standard track, or custom audio file | "default" or path to client-supplied MP3 |
| Greeting + voicemail prompt copy | What the caller hears | "default" or client-supplied script |
| CRM screen-pop URL pattern | What the agent's CRM container loads | `{{task.attributes.profile_url}}` (template variable, NEVER hardcoded) |

If any of these are missing, **stop and ask the CEO**. Do not proceed with placeholders or assumed defaults — wrong defaults shipped to a live account are a customer-visible incident.

---

## 3. Read First

Before touching anything, read these in order:

1. `~/projects/connie/rtc/basecamp-v26.02/CLAUDE.md` — Deployment Safety Protocol + Flex Configuration Safety Protocol. Both apply to this runbook.
2. [Wait Experience + Admin Email — Overview](/getting-started/channels/voice/voice-features/wait-experience-with-email/overview) — caller experience details, what you're actually building.
3. `~/projects/connie/rtc/PAC.md` — credentials for the target sub-account. Verify the account section is populated before starting.
4. [Voice channel hub](/getting-started/channels/voice) — confirms this feature is the right routing config for the request (vs. Voicemail-only, Callback-only, or VM-or-Callback).

If you skip the basecamp CLAUDE.md, you will violate one of the safety rails below and create config drift. Don't skip.

---

## 4. Safety Rails for This Change

Specific to a Wait Experience + Admin Email deploy. Quoting basecamp `CLAUDE.md` doctrine inline:

- **NEVER write directly to the Flex Configuration API** (`POST /v1/Configuration`). All config goes through the deploy pipeline or `/template-admin`. Direct writes create source/live drift that regresses on the next deploy.
- **CRM container `url` MUST be `{{task.attributes.profile_url}}`** — a template variable, not a hardcoded URL. Hardcoded URLs make all callers see the same CRM record.
- **`auto_accept` must be `false`** on all channels. Agents explicitly accept/reject every task.
- **`attribute_viewer.enabled` must be `false`** on SSO accounts. Enabling it breaks the End button.
- **Confirm Twilio CLI profile matches the deploy target** (`twilio profiles:use <ClientName>`) before every command. A wrong profile = a deploy to the wrong client.
- **Capture forensic baselines BEFORE deploy** (Phase 0.3). Skipping this has caused incidents.
- **Defensive snapshots of adjacent accounts** (CCT, DevSandbox) prove zero-bleed. Capture them too.
- **CEO approval before deploy.** No exceptions, even on a sandbox.

---

## 5. Procedure

**Prerequisites:**
- Twilio CLI installed and authenticated.
- Mailgun account with a verified sending domain.
- Twilio sub-account credentials in PAC.md (Account SID, API Key, API Secret, Workspace SID).
- Confirmed deployment target with CEO. **Never deploy without explicit CEO confirmation.**

### Phase 0 — Pre-flight

#### 0.1 Confirm deploy target

```bash
twilio profiles:list
twilio profiles:use <ClientName>
```

Confirm the active profile matches the intended deploy target. **A wrong profile = a deploy to the wrong client. Stop and ask if uncertain.**

#### 0.2 Read the Flex Config Safety Protocol

Before doing anything else, read `~/projects/connie/rtc/basecamp-v26.02/CLAUDE.md` — specifically the "Flex Configuration Safety Protocol" section. Two non-negotiables:

1. **NEVER write directly to the Flex Configuration API** (`POST /v1/Configuration`). All config goes through either the deploy pipeline or `/template-admin`.
2. **CRM container `url` MUST be `{{task.attributes.profile_url}}`** — a template variable, not a hardcoded URL.

#### 0.3 Forensic baselines (mandatory)

Capture PRE-deploy snapshots. These give you a rollback reference and a "what changed" diff. **Skipping this step has caused incidents — do not skip.**

```bash
mkdir -p ~/projects/connie/rtc/dev-logs/wait-experience-<client>-<YYYY-MM-DD>/preflight
cd ~/projects/connie/rtc/dev-logs/wait-experience-<client>-<YYYY-MM-DD>/preflight

# Target client
curl -u "$API_KEY:$API_SECRET" \
  https://flex-api.twilio.com/v1/Configuration \
  > <client>-config-PRE.json

# Defensive: snapshot adjacent accounts to prove zero bleed
curl -u "$CCT_API_KEY:$CCT_API_SECRET" \
  https://flex-api.twilio.com/v1/Configuration \
  > cct-config-PRE.json

curl -u "$DEVSANDBOX_API_KEY:$DEVSANDBOX_API_SECRET" \
  https://flex-api.twilio.com/v1/Configuration \
  > devsandbox-config-PRE.json
```

Also snapshot Studio Flows and serverless services on the target:

```bash
twilio api:studio:v2:flows:list -o json > <client>-studio-flows-PRE.json
twilio api:serverless:v1:services:list -o json > <client>-serverless-services-PRE.json
```

---

### Phase 1 — Mailgun configuration

#### 1.1 Create or verify the sending domain

Each client should have a Mailgun subdomain (typical convention: `<phonenumber>.connie.center` or `<clientname>.connie.center`). Verify DNS records (SPF, DKIM) are green in the Mailgun console before proceeding.

#### 1.2 Create a domain-specific sending API key

In Mailgun → Sending → Domain Settings → API Security → Create new key.

**Save the key immediately** — Mailgun shows it only once. Add it to PAC.md under the client section.

#### 1.3 Test the credentials before deploying

```bash
curl -s -w "\nHTTP Status: %{http_code}\n" \
  --user "api:$MAILGUN_API_KEY" \
  https://api.mailgun.net/v3/<domain>/messages \
  -F from="Test <test@<domain>>" \
  -F to="<admin-email>" \
  -F subject="Wait Experience setup test" \
  -F text="If you see this, Mailgun is configured correctly."
```

Expect `HTTP Status: 200`. If 401/403: wrong key or wrong domain. If 400: domain not verified yet. **Resolve before continuing — debugging this after deploy is harder.**

---

### Phase 2 — Serverless functions environment

#### 2.1 Update the per-environment `.env` file

For client `<ClientName>`, the file is `serverless-functions/.env.<environment>`:

```bash
# Mailgun configuration for callback-and-voicemail-with-email
ADMIN_EMAIL=<comma-separated-admin-email-list>
MAILGUN_DOMAIN=<phonenumber>.connie.center
MAILGUN_API_KEY=<domain-specific-sending-key>

# TaskRouter
TWILIO_FLEX_WORKSPACE_SID=<workspace-sid>
TWILIO_FLEX_CALLBACK_WORKFLOW_SID=<workflow-sid-for-this-queue>
```

#### 2.2 Deploy the serverless functions

```bash
cd ~/projects/connie/rtc/basecamp-v26.02/serverless-functions
ENVIRONMENT=<client> npm run deploy
```

Capture the deploy log:

```bash
ENVIRONMENT=<client> npm run deploy 2>&1 | \
  tee ~/projects/connie/rtc/dev-logs/wait-experience-<client>-<YYYY-MM-DD>/deploy-serverless.log
```

The output will include the serverless domain (e.g. `custom-flex-extensions-serverless-XXXX-dev.twil.io`). **Save this URL — you need it for the Studio Flow.**

---

### Phase 3 — Flex configuration (`ui_attributes`)

#### 3.1 Edit the per-account config file

Edit `flex-config/ui_attributes.<client>.json`. Required keys for this configuration:

```json
{
  "custom_data": {
    "common": {
      "teams": ["Everyone"],
      "departments": ["..."]
    },
    "features": {
      "callback_and_voicemail_with_email": {
        "enabled": true
      },
      "enhanced_crm_container": {
        "enabled": true,
        "url": "{{task.attributes.profile_url}}",
        "should_display_url_when_no_tasks": true,
        "display_url_when_no_tasks": "https://connie.plus"
      }
    }
  }
}
```

**Critical rules for the CRM container:**

- `url` MUST be the Liquid template `{{task.attributes.profile_url}}` — never hardcode a URL here. (See basecamp CLAUDE.md.)
- `display_url_when_no_tasks` is the no-task fallback. Currently `https://connie.plus` for all accounts.

#### 3.2 Understand the merge semantics before deploying

The deploy pipeline merges configs in this order: `merge({}, common, env, current)` — meaning **live config (`current`) wins** on key conflicts. This means:

- Adding a key in source files: **takes effect on next deploy** (new key, no conflict).
- Removing a key in source files: **does NOT remove the key from live** — live keeps it. (You must remove via `/template-admin` UI or with `OVERWRITE_CONFIG=true`.)
- Changing a key value in source: **does NOT override live** unless `OVERWRITE_CONFIG=true` is set on deploy.

This is intentional — it prevents a routine deploy from accidentally clobbering operator changes made via the admin UI.

#### 3.3 Deploy flex-config

```bash
cd ~/projects/connie/rtc/basecamp-v26.02/flex-config
ENVIRONMENT=<client> node index.mjs 2>&1 | \
  tee ~/projects/connie/rtc/dev-logs/wait-experience-<client>-<YYYY-MM-DD>/deploy-flex-config.log
```

---

### Phase 4 — Studio Flow

#### 4.1 Create the Studio Flow

Create a new Studio Flow in the client's Twilio console. Name it descriptively, e.g. `<Client> Wait Experience — <Queue> Flow`.

#### 4.2 Configure the `Send to Flex` widget

Drag a `Send to Flex` widget onto the canvas and connect it to the `Trigger` widget's `incomingCall` event.

Configure the widget:

| Field | Value |
|-------|-------|
| Workflow | The TaskRouter Workflow SID for this queue |
| Channel | `voice` |
| Attributes | `{"call_sid": "{{trigger.call.CallSid}}", "callBackData": {"attempts": 0}}` |
| Wait URL | `https://<serverless-domain>/features/callback-and-voicemail-with-email/studio/wait-experience?WorkflowSid=<this-queue-workflow-sid>` |
| Wait URL Method | `POST` |

#### 4.3 The `WorkflowSid` query param is mandatory

`wait-experience.protected.js` accepts a `WorkflowSid` via query string. **If you omit it, the function falls back to a hardcoded H2H workflow SID** — meaning callbacks and voicemails created from this flow will land in the wrong queue.

Always include `?WorkflowSid=<this-queue-workflow-sid>` in the Wait URL. This is the per-flow override that makes the wait-experience routing correct.

(See GitHub issue [WO-001 followup #2](https://github.com/ConnieML/basecamp-v26.02/issues/2) for the longer-term fix to remove the H2H hardcode.)

#### 4.4 Publish the flow

Publish the Studio Flow. Capture the Flow SID and revision number in your dev-log.

---

### Phase 5 — Phone number wiring

In the Twilio console, navigate to Phone Numbers → Manage → Active Numbers. Click the target number and set:

- **Voice → A call comes in** → Studio Flow → select the flow you just published.

Save.

---

### Phase 6 — POST baselines

Capture POST-deploy snapshots and diff against PRE:

```bash
cd ~/projects/connie/rtc/dev-logs/wait-experience-<client>-<YYYY-MM-DD>/preflight

# Target
curl -u "$API_KEY:$API_SECRET" https://flex-api.twilio.com/v1/Configuration > <client>-config-POST.json
diff <client>-config-PRE.json <client>-config-POST.json | head -50

# Defensive — these MUST be 0-byte diffs
curl -u "$CCT_API_KEY:$CCT_API_SECRET" https://flex-api.twilio.com/v1/Configuration > cct-config-POST.json
diff cct-config-PRE.json cct-config-POST.json
# expect: no output (zero diff)

curl -u "$DEVSANDBOX_API_KEY:$DEVSANDBOX_API_SECRET" https://flex-api.twilio.com/v1/Configuration > devsandbox-config-POST.json
diff devsandbox-config-PRE.json devsandbox-config-POST.json
# expect: no output (zero diff)
```

If CCT or DevSandbox shows any diff: **stop**. You have cross-account contamination. Investigate before proceeding to smoke test.

---

### Phase 7 — Smoke test

Place real test calls through the configured number. Verify all three caller paths:

1. **Stay on hold** → agent picks up → task lands in dashboard with caller attributes.
2. **Press `*` → choose callback** → leave number → hang up → task arrives in queue with `taskType: callback` and original-call timestamp preserved (queue position kept).
3. **Press `*` → choose voicemail** → record a message → hang up → task arrives with `taskType: voicemail`, recording URL, and (within ~30 sec) transcript text.
4. **Verify admin email arrives** with audio attachment and transcript.

Test from at least two different caller numbers. Verify **CRM screen-pop** displays the caller's record (not just the no-task fallback).

---

### Phase 8 — Documentation

In your dev-log directory, leave behind:

- `<client>-config-PRE.json` and `-POST.json`
- `cct-config-PRE.json`, `-POST.json` (defensive)
- `devsandbox-config-PRE.json`, `-POST.json` (defensive)
- `<client>-studio-flows-PRE.json`
- `deploy-flex-config.log`
- `deploy-serverless.log`
- `studio-flow-definition.json` (export from Studio API)
- A short `README.md` summarizing what you deployed and the test results

Update `~/projects/connie/rtc/PAC.md` with any new SIDs (Studio Flow SID, Workflow SID).

---

### Common gotchas (reference)

| Gotcha | Symptom | Fix |
|--------|---------|-----|
| Probe path wrong | "url is null/undefined" when checking live config | The path is `ui_attributes.custom_data.features.<feature>.url`, not `ui_attributes.<feature>.url`. |
| Hardcoded CRM url | All callers see the same CRM page regardless of which call they're on | Verify `url` is `{{task.attributes.profile_url}}` exactly. |
| Missing `WorkflowSid` query param | Callbacks/voicemails land in H2H queue regardless of source line | Always include `?WorkflowSid=<this-queue>` in the Wait URL. |
| Mailgun 401 on first attempt | No admin emails | Verify domain-specific (not master) sending key. Domain must be verified in Mailgun console. |
| Mailgun 404 on first attempt | Audio attachment fails first time | Normal — recording isn't ready yet. Function retries. |
| OVERWRITE_CONFIG accidentally true | Live config keys get clobbered | Default to false. Only set true if you specifically want source files to win. |
| Direct config-API write | Drift between source and live; next deploy regresses | NEVER `POST /v1/Configuration` directly. Use `/template-admin` or the deploy pipeline. |

See [Troubleshooting runbook](/getting-started/channels/voice/voice-features/wait-experience-with-email/troubleshoot) for symptoms-and-fixes when something breaks post-deploy.

---

## 6. Definition of Done

Don't declare the deploy complete until **every** item below is verified. "Deploy succeeded" is not the same as "feature works."

- [ ] **Test call from an outside line** to the provisioned number. Verify:
  - Caller hears the configured greeting
  - Hold music plays
  - Pressing `*` mid-hold offers the voicemail/callback options
  - Selecting voicemail records, plays back to caller, then ends call
  - Selecting callback captures the number, confirms to caller, then ends call
- [ ] **Voicemail email arrives** at the admin address within ~60 seconds. Verify the email contains:
  - Recording attachment (`.mp3`) that plays
  - Transcription text
  - Caller ID (E.164)
  - Call timestamp
- [ ] **Callback task lands in Flex** in the correct queue (per `WorkflowSid` query param). Agent can accept and call back.
- [ ] **Source/live config diff is empty** — `GET /v1/Configuration` matches `flex-config/ui_attributes.<account>.json` after merge.
- [ ] **Defensive baselines unchanged** — CCT and DevSandbox `config-PRE.json` and `config-POST.json` are byte-identical (or differ only in unrelated fields). Zero bleed.
- [ ] **Forensic dev-log directory** at `~/projects/connie/rtc/dev-logs/wait-experience-<client>-<date>/` contains all PRE/POST snapshots, deploy logs, Studio Flow export, and a `README.md` summarizing the deploy.
- [ ] **PAC.md updated** with new Studio Flow SID, Workflow SID(s), Mailgun domain, Mailgun API key location.
- [ ] **CEO sign-off received** confirming the live deploy is functional.

If any item above fails, the deploy is **not** done — investigate and fix before declaring complete.

---

## 7. If Your Variant Differs

This runbook is for the full **Wait Experience + Admin Email** config (callback + voicemail options, both with admin email notification). If the request is for a different routing config, do **not** edit this runbook to match — author a new runbook set for the variant.

Common variants and where they belong:

| Request | Routing config | Where the runbook goes |
|---|---|---|
| Voicemail-only (no callback) | Voice Direct → Voicemail-only | `docs/getting-started/channels/voice/voice-features/voicemail-only/` *(📝 TBD)* |
| Callback-only (no voicemail) | Voice Direct → Callback-only | `docs/getting-started/channels/voice/voice-features/callback-only/` *(📝 TBD)* |
| Both options, no admin email | Voice Direct → Voicemail OR Callback (no email) | `docs/getting-started/channels/voice/voice-features/voicemail-or-callback/` *(📝 TBD)* |
| Custom hold music or IVR voice on top of any of the above | Add-on, not a routing change | Add-on doc *(📝 TBD)*; runbook for adding to an existing install |

See the [Voice channel matrix](/getting-started/channels/voice#voice-features-matrix) for the full taxonomy and the [Authoring & Publishing Runbooks](/techops/troubleshooting/authoring-runbooks) guide for how to author the new runbook set following this 7-section template.
