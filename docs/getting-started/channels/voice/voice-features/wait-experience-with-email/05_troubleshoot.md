---
sidebar_label: Troubleshooting Runbook
sidebar_position: 5
title: "Wait Experience + Admin Email — Troubleshooting"
---

# Troubleshooting Runbook

**Use this runbook when:** A live Wait Experience + Admin Email deployment is misbehaving — caller complaint, missing email, broken CRM pop, or unexplained config drift. **Find the symptom in the section list, follow the diagnostic steps.** If multiple symptoms apply, start with the most caller-visible one.

---

## 1. Role / Authority

Run as **CTO-Connie**. Diagnostic commands are read-only and safe to run without CEO approval. **Any fix that touches live config, redeploys serverless, or modifies a Studio Flow requires CEO approval first** — no exceptions, even when the fix seems trivial.

If you suspect cross-account contamination (Symptom: "CCT/DevSandbox config changed unexpectedly"), **stop all other work, escalate to CEO immediately**, and follow the high-severity path in that section.

---

## 2. Required Parameters

Gather **before diagnosing**:

| Parameter | Why you need it |
|---|---|
| Connie client account name | Selects the right Twilio profile (`twilio profiles:use <ClientName>`) |
| Reported symptom | Match to a section below; if no match, see [§7 If Your Variant Differs](#7-if-your-variant-differs) |
| When it started | Narrows the timeline; correlate with deploy log and `git log` |
| Sample call SID (if available) | Lets you pull exact Studio execution + serverless logs for that call |
| Reporting party | CEO, client admin, agent, automated alert? Determines escalation path. |
| Reproducibility | One-off, intermittent, or 100% repro? Affects diagnostic strategy. |

If "when it started" coincides with a recent deploy or change-request, **review the dev-log for that deploy first** — most live issues trace to the most recent deploy.

---

## 3. Read First

1. `~/projects/connie/rtc/basecamp-v26.02/CLAUDE.md` — Flex Configuration Safety Protocol applies if you end up making fixes.
2. The dev-log for the most recent deploy/change in `~/projects/connie/rtc/dev-logs/wait-experience-<client>-*` — the most-likely cause is whatever changed last.
3. `~/projects/connie/rtc/PAC.md` — current SIDs, Mailgun domain, env file paths for the target client.
4. [Setup runbook](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) — for understanding what *should* be in place.

---

## 4. Safety Rails for This Change

Troubleshooting is read-only by default. The moment you cross from diagnose to fix, the Setup-runbook safety rails apply in full:

- **Diagnostic commands are safe** (curl GETs, `twilio api:* list`, `twilio serverless:logs --tail`, `jq`-style filters). Run freely.
- **Fix commands are NOT safe without CEO approval.** Redeploy, config write, Studio Flow republish, env file edit — all require explicit go-ahead.
- **Capture a PRE-fix snapshot** before any change, even an "obvious" one. The fix may have unintended consequences worth diffing.
- **NEVER write directly to the Flex Configuration API.** Drift fixes go through the deploy pipeline or `/template-admin`.
- **Cross-account contamination is HIGH severity.** Stop investigating anything else, escalate to CEO, and follow the dedicated section below before further commands.
- **Check the right profile is active.** `twilio profiles:use <ClientName>` before every command. Wrong profile = wrong account = potential second incident.

---

## 5. Procedure

### Diagnostic toolkit (run these first)

```bash
# Confirm correct profile
twilio profiles:list
twilio profiles:use <ClientName>

# Last 5 calls
twilio api:core:calls:list --limit 5

# Studio Flow recent executions
twilio api:studio:v2:flows:executions:list --flow-sid <flow-sid> --limit 5

# Serverless function logs (live tail)
twilio serverless:logs --service-sid <service-sid> --tail

# Live config snapshot
curl -u "$API_KEY:$API_SECRET" https://flex-api.twilio.com/v1/Configuration | jq '.ui_attributes.custom_data.features'
```

---

### Symptom: Caller hears nothing / dead air after greeting

**Most likely cause:** Wait URL is broken, malformed, or unreachable.

**Diagnose:**

1. Open the Studio Flow → click the `Send to Flex` widget → check the `Wait URL`.
2. The URL should look like:
   `https://<serverless-domain>/features/callback-and-voicemail-with-email/studio/wait-experience?WorkflowSid=<workflow-sid>`
3. `curl -X POST <wait-url>` from your terminal — expect TwiML response (XML), not 404 or 5xx.
4. Check serverless logs for errors at the time of the reported call.

**Common fixes:**

- Serverless function not deployed in this environment → redeploy.
- Serverless service deleted → restore from `git`, redeploy.
- DNS/networking blip → retry; if persistent, check Twilio status page.

---

### Symptom: Callbacks/voicemails arrive in the wrong queue

**Most likely cause:** Missing or wrong `WorkflowSid` query param in the Wait URL.

**Diagnose:**

1. Open the Studio Flow → `Send to Flex` widget → Wait URL.
2. Confirm `?WorkflowSid=<workflow-sid>` is present **and** matches the queue you want callbacks/voicemails to land in.

**Fix:**

- Edit the Wait URL on the widget. Append/correct the `WorkflowSid` query param.
- Publish the flow (don't forget — unpublished changes don't take effect).

**Background:** `wait-experience.protected.js` falls back to a hardcoded H2H workflow SID when no query param is provided. Per-flow override is required. See GitHub issue [WO-001 followup #2](https://github.com/ConnieMLF/basecamp-v26.02/issues/2) for the architectural fix.

---

### Symptom: Admin email not arriving

**Most likely cause** (in order of frequency):

1. Mailgun delay (1–6 hours is normal for newly-added recipient addresses).
2. Wrong API key — domain-scope vs master-scope mismatch.
3. Email landing in spam.
4. Domain not verified in Mailgun.
5. `ADMIN_EMAIL` env var empty or malformed.

**Diagnose:**

1. Check Mailgun dashboard → Logs for the relevant domain → filter by recipient.
2. If "delivered" in Mailgun: it's the recipient's spam folder, mail server, or filtering. Out of Connie's control.
3. If "rejected" or "failed": read the error reason. Most commonly invalid recipient or domain not verified.
4. If no log entry at all: the function never called Mailgun. Check serverless logs for errors during the relevant call.

**Common fixes:**

- 401/403 from Mailgun → wrong key. Verify it's a domain-scoped sending key, not the account-master key.
- 400 from Mailgun → domain not verified. Check Mailgun dashboard for DNS verification status.
- No serverless log → check `ADMIN_EMAIL` env var. Empty string disables email.
- Recording attachment 404 on first attempt → normal. The function retries. If it fails repeatedly, check `ACCOUNT_SID` / `AUTH_TOKEN` for recording fetch.

---

### Symptom: Voicemail recording is missing or empty in admin email

**Most likely cause:** The function's recording fetch happened before Twilio finished writing the recording.

**Diagnose:**

1. Find the relevant call in `twilio api:core:recordings:list`.
2. Confirm the recording has a non-zero `duration` and a valid `uri`.
3. Check serverless logs for "fetch recording" errors — 404 or 401.

**Common fixes:**

- 404 → first-attempt timing issue. Function retries. If retries fail, increase the retry delay in the function source.
- 401 → wrong `ACCOUNT_SID`/`AUTH_TOKEN`. Note: recording fetch uses *account credentials*, not API key/secret. Confirm `.env` has the correct token.

---

### Symptom: Transcription text missing from admin email

**Most likely cause:** Twilio transcription service is async; the email may have been sent before transcription completed.

**Diagnose:**

1. Wait 2 minutes after the original call. Check Mailgun for a *follow-up* email or check the agent task — the transcript may have arrived later.
2. Check Twilio Voice → Transcriptions for the recording SID.

**Common fixes:**

- Transcription disabled → re-enable in the Studio `Record Voicemail` widget settings or the function recording config.
- Polly NTTS or transcription quota issues → check Twilio status / billing.
- Transcription completed but email already sent → expected behavior. The agent task gets the transcript on its async update; the admin email is a one-shot.

---

### Symptom: Caller's CRM screen doesn't pop / shows generic page

**Most likely cause:** `profile_url` is not set on the task attributes, OR the CRM container `url` is hardcoded instead of using the Liquid template.

**Diagnose:**

1. Open the agent dashboard during a test call. Right-click the task → Copy Attributes JSON. Look for `profile_url`.
2. If `profile_url` is missing: the task creation logic isn't populating it. This is the upstream problem captured in [GitHub issue #4](https://github.com/ConnieML/basecamp-v26.02/issues/4).
3. If `profile_url` is present but CRM still shows generic: check `enhanced_crm_container.url` in the live `ui_attributes`. It MUST be `{{task.attributes.profile_url}}` — a literal string with the Liquid braces.

**Common fixes:**

- Source file has a hardcoded URL → edit `ui_attributes.<client>.json`, set `url` to `{{task.attributes.profile_url}}`, redeploy with `OVERWRITE_CONFIG=true`.
- Live has hardcoded URL but source is correct → use `/template-admin` to fix live, then verify source matches.
- `profile_url` missing on task attributes → refer to GitHub #4 for the upstream fix; in the meantime callers see the no-task fallback URL.

---

### Symptom: Configuration drift — source files don't match live

**Most likely cause:** Someone wrote directly to the Configuration API, or made changes via `/template-admin` that weren't reflected in source files.

**Diagnose:**

```bash
curl -u "$API_KEY:$API_SECRET" https://flex-api.twilio.com/v1/Configuration | jq '.ui_attributes.custom_data' > live.json
diff <(cat flex-config/ui_attributes.<client>.json | jq '.custom_data') live.json
```

**Fix:**

- Update source files to match live (the source of truth has implicitly become live). Commit.
- Or, if the live state is wrong: deploy with `OVERWRITE_CONFIG=true` to make source win.
- Either way, **document why the drift happened** so it doesn't recur.

**Prevention:** The deploy pipeline's `merge({}, common, env, current)` semantics make live always win on routine deploys. This is intentional. But it means source files can silently drift. A periodic drift check should be part of the monthly Connie audit.

---

### Symptom: Cross-account contamination (CCT/DevSandbox config changed unexpectedly)

**Severity: HIGH.** Stop investigating other things and chase this first.

**Most likely cause:** A deploy ran with the wrong Twilio profile active.

**Diagnose:**

1. Check git log for recent deploys.
2. Compare CCT or DevSandbox PRE/POST snapshots from the most recent deploy.
3. Identify which keys changed.

**Fix:**

- Revert the affected account by re-deploying its source files with `OVERWRITE_CONFIG=true`, OR by manually correcting via `/template-admin`.
- Document the incident in `~/projects/connie/rtc/docs/incidents/`.
- Update CLAUDE.md if a new safety check is needed to prevent recurrence.

**Prevention:** The Phase 0.3 forensic-baseline pattern in [Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) catches this before it reaches a live caller. **Never skip baselines.**

---

### When to escalate

Escalate to CEO immediately if:

- Cross-account contamination is confirmed.
- Live agents are receiving tasks with wrong attributes (caller IDs swapped, queue routing wrong).
- Voicemail recordings are corrupted or missing across multiple calls.
- Mailgun is returning systemic 5xx errors that don't resolve in a retry.
- Any change request involves modifying the H2H direct-to-voicemail flow on NSS production (`+17259999678`).

For lower-severity issues, file a GitHub issue on `ConnieML/basecamp-v26.02` and reference this troubleshooting guide.

---

## 6. Definition of Done

A troubleshooting session is **not** done when "the symptom stopped." It's done when:

- [ ] **Root cause identified** (not just "it's working again now"). If you can't articulate what specifically caused the symptom, you don't have a root cause yet.
- [ ] **Fix applied** (if any) following the §4 Safety Rails — CEO-approved, PRE/POST snapshots captured, defensive baselines unchanged.
- [ ] **Retest verifies the symptom is resolved.** Reproduce the original failing path and confirm it now passes.
- [ ] **No regression introduced.** Run the §6 Definition of Done verification from the [Setup runbook](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup#6-definition-of-done) — at least the test-call + admin-email items — to confirm nothing else broke.
- [ ] **Source/live config diff is empty** if the fix touched flex-config.
- [ ] **Incident logged** in `~/projects/connie/rtc/docs/incidents/` if the issue had customer impact, was caused by a deploy, or surfaces a doctrine gap that needs codifying.
- [ ] **Lessons captured.** If the root cause exposes a doctrine gap, propose a CLAUDE.md update or a new runbook section. If the fix involved a non-obvious step, add a row to the "Common gotchas" section of the relevant runbook.
- [ ] **Reporter notified** of the resolution — CEO, client admin, agent, or whoever opened the ticket. Don't leave the reporter wondering whether the issue is fixed.
- [ ] **CEO sign-off** on the resolution.

If you reach "the symptom stopped but I don't know why," that's **not** done. Intermittent failures with unidentified root causes recur — keep investigating, escalate to CEO if you need to allocate more time.

---

## 7. If Your Variant Differs

This runbook covers symptoms specific to the **Wait Experience + Admin Email** config. If the troubled deployment is a different routing config, the symptoms below may not apply or the diagnostic paths may differ:

| Variant | What likely differs |
|---|---|
| Voicemail-only *(📝 TBD)* | No Wait URL, no `WorkflowSid` query param logic, no Studio hold-experience widgets — symptoms about hold music, callback queues, etc. don't apply. |
| Callback-only *(📝 TBD)* | No voicemail recording symptoms; admin email symptoms differ (no audio attachment) |
| Voicemail OR Callback (no email) | All voicemail/callback diagnostic paths apply, but skip the admin-email section entirely |
| Custom Hold Music add-on | Adds a new failure mode — custom audio file unreachable, wrong format, expired CDN URL. Diagnose at the asset URL level. |

If you're troubleshooting a variant that doesn't yet have its own troubleshoot runbook, **the diagnostic toolkit at the top of this runbook still applies** (Twilio CLI commands, serverless log tail, config snapshot) — they're config-agnostic. But the symptom sections are config-specific. Use them as inspiration, not gospel.

If you discover a new symptom-and-fix pattern while troubleshooting, add it as a new `### Symptom: ...` subsection in the right runbook (this one or the variant's). Future agents will look here first.
