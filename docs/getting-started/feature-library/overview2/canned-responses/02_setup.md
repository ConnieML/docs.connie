---
sidebar_label: Setup
sidebar_position: 2
title: "Canned Responses — Setup (replace defaults with a client library)"
---

# Setup Runbook — Replace defaults with a client's custom library

**Estimated time:** 30 minutes if the JSON content is already authored. Allow 2–4 hours of CEO-side authoring time before this runbook starts, plus an hour of CEO review/iteration on the finished library before live agent rollout.

> **Scope:** This runbook covers replacing the upstream default placeholder canned responses (the "Sales / Support" Lorem-Ipsum-style content shipped by Twilio Professional Services) with a client's custom, brand-aligned library on an account that has never had custom content before. For updating an *existing* custom library, use [Change](./change). For the format spec + example JSON, see [Section 7](#7-format-spec--example-json) below.

---

## 1. Role / Authority

Run as **CTO-Connie**. This is a live config + content change on a customer Twilio sub-account — full CTO-Connie authority required, plus explicit CEO sign-off before each deploy step.

If you are not CTO-Connie, stop here. Activate via "Connie CTO please" in a fresh session.

---

## 2. Required Parameters

Gather from the CEO **before starting**. Do not infer defaults silently.

| Parameter | Why you need it | Example |
|---|---|---|
| Connie client account name | Selects the Twilio CLI profile + the `.env.<account>` deploy target | `lifeline`, `NSS`, `ConnieCareTeam` |
| Authored client library JSON | The actual content to deploy. CEO-authored, brand-aligned, free of template variables unless explicitly required | `/Users/cjberno/Downloads/<client>-canned-responses-<date>.json` |
| Placement preference | Where the dropdown renders for the agent | `"CRM"` or `"MessageInputActions"` (default `"CRM"` if Enhanced CRM Container is disabled, else `"MessageInputActions"`) |
| Plugin version on the account | Confirms the Canned Responses feature code is shipped to this account; if not, plugin must be released first | `twilio flex:plugins:list` |
| Logged-in test agent on the account | Needed for post-deploy smoke | CEO logs in to `<account>.connie.team` and accepts a test task |

If any of these are missing, **stop and ask the CEO**. Wrong content shipped to a live customer-facing account is a brand incident.

---

## 3. Read First

Before touching anything, read these in order:

1. `~/projects/connie/rtc/basecamp-v26.02/CLAUDE.md` — Deployment Safety Protocol + Flex Configuration Safety Protocol.
2. [Canned Responses — Overview](./overview) — wiring diagram and channel coverage matrix.
3. [Troubleshoot](./troubleshoot) — **read Section 1 (the filename + path gotchas) before you create or rename anything.** A wrong filename = silent empty dropdown with no console error.
4. `~/projects/connie/rtc/PAC.md` — credentials for the target sub-account.

---

## 4. Safety Rails for This Change

Specific to a Canned Responses deploy:

- **Confirm the Twilio CLI profile matches the deploy target** (`twilio profiles:use <account>`) before every serverless deploy. A wrong profile = library shipped to the wrong client.
- **Confirm the `.env.<account>` file exists** at `serverless-functions/.env.<account>` before running the deploy. The deploy script reads this file; if missing, it falls back to `.env` (which may target a different account or fail).
- **Per-account isolation is real but the SOURCE file is shared.** `responses.private.json` is one file in the repo. When you replace it for account A and deploy, you have *temporarily* replaced what the repo holds — but each account's runtime is independent. Do not panic-revert the source file between deploys; just deploy your intended content per account in sequence. See [Troubleshoot Section 1](./troubleshoot#filename-and-path-gotchas) for the full filename discipline.
- **No template variables (`{{task.X}}`, `{{worker.X}}`) without explicit CEO ask.** Static text is safer for client-authored content. If the CEO requests a variable, use `{{task.X}}` form NOT `{{task.attributes.X}}` — see [basecamp Flex template variable form discipline](https://github.com/ConnieML/connieRTC-basecamp/blob/main/CLAUDE.md) (G4). Wrong form = blank iframe / blank fill, no console error.
- **No brand-firewall violations.** Connie client libraries must not reference SPOK, onreb, PeoplePerson, BeaverDam, or any cross-tenant brand. Client name and Connie contact details only.
- **CEO approval before deploy.** No exceptions, even when the JSON is "obviously correct."

---

## 5. Procedure

### Phase 0 — Pre-flight

#### 0.1 Confirm deploy target

```bash
twilio profiles:list
twilio profiles:use <account>
# Verify the table prints "<account>  ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  true"
```

#### 0.2 Confirm plugin is released to this account

```bash
twilio flex:plugins:list
# Look for plugin-flex-ts-template-v2 vN.N.N — must be present
```

If the plugin is not released, **stop**. The Canned Responses feature is in the plugin code; without the plugin deployed, no UI surface will render the library no matter how good your JSON is.

#### 0.3 Verify `.env.<account>` exists for serverless deploy

```bash
ls ~/projects/connie/rtc/basecamp-v26.02/serverless-functions/.env.<account>
```

If this file does not exist, **stop and ask the CEO** for the account's serverless deploy credentials. Do not create it from a sibling account's file.

#### 0.4 Snapshot the current asset URL (defensive baseline)

```bash
# Get current asset content from the live runtime BEFORE deploy
SERVICE_DOMAIN=$(twilio api:serverless:v1:services:list -o json | \
  python3 -c "import sys,json; [print(s['domainBase']+'-'+s['environments'][0]['domainSuffix']+'.twil.io') for s in json.load(sys.stdin) if 'custom-flex-extensions-serverless' in s['friendlyName']]" 2>/dev/null | head -1)
curl -s "https://${SERVICE_DOMAIN}/features/canned-responses/responses.json" \
  > ~/Desktop/<account>-canned-responses-PRE-$(date +%Y-%m-%d).json
```

Save this baseline. If the deploy goes wrong, this is your rollback content.

### Phase 1 — Validate the authored JSON

#### 1.1 Lint the JSON

```bash
python3 -m json.tool < /path/to/<client>-canned-responses-<date>.json > /dev/null && echo OK
```

If this fails, the file is malformed — fix or send back to CEO. Do not deploy malformed JSON; the plugin's fetch will return content but the parser will fail silently and the dropdown will be empty.

#### 1.2 Standard compliance check

Walk the JSON manually against [Section 7 — Format Spec](#7-format-spec--example-json):

- [ ] Top-level key is `categories` (an array)
- [ ] Each category has `section` (string) + `responses` (array)
- [ ] Each response has `label` (string, ≤40 chars recommended) + `text` (string, no hard line breaks)
- [ ] No template variables unless explicitly requested (and if so, `{{task.X}}` form, not `{{task.attributes.X}}`)
- [ ] No brand-firewall violations (SPOK, onreb, etc.)
- [ ] Contact references use Connie-routed identities (`<client>.connie.host`, `<client>.connie.team`, etc.) — not raw vendor or cross-tenant subdomains

If anything fails, send the file back to the CEO with the specific concerns called out. Don't silently fix and deploy.

### Phase 2 — Replace source file + deploy

#### 2.1 Copy authored JSON to canonical source path

```bash
cp /path/to/<client>-canned-responses-<date>.json \
   ~/projects/connie/rtc/basecamp-v26.02/serverless-functions/src/assets/features/canned-responses/responses.private.json
```

**Important:** keep the canonical filename `responses.private.json`. Do not create per-account variants like `responses.<client>.private.json` — the plugin loader is hardcoded to `/features/canned-responses/responses.json` and will not find variants. See [Troubleshoot Section 1](./troubleshoot#filename-and-path-gotchas).

#### 2.2 CEO sign-off gate

Show the CEO the diff:

```bash
diff ~/Desktop/<account>-canned-responses-PRE-$(date +%Y-%m-%d).json \
     ~/projects/connie/rtc/basecamp-v26.02/serverless-functions/src/assets/features/canned-responses/responses.private.json | head -100
```

**Do not proceed without explicit CEO "go".**

#### 2.3 Deploy to the target account

```bash
cd ~/projects/connie/rtc/basecamp-v26.02/serverless-functions
ENVIRONMENT=<account> npm run deploy
```

This pushes `responses.private.json` as an asset to the account's serverless runtime. The deploy script is `twilio serverless:deploy --override-existing-project --env ".env.<account>"`.

#### 2.4 Verify asset is live

```bash
curl -s "https://${SERVICE_DOMAIN}/features/canned-responses/responses.json" | \
  python3 -m json.tool | head -20
```

Should print the new content. If you see the old content, wait 30 seconds and retry — CDN propagation is near-instant but not literally instant.

### Phase 3 — Enable in `flex-config` (if not already)

If this is the first time Canned Responses is enabled on the account, also add the feature flag to `flex-config/ui_attributes.<account>.json`:

```json
"canned_responses": {
    "enabled": true,
    "configuration": {
        "location": "CRM"
    }
}
```

(Use `"MessageInputActions"` instead of `"CRM"` if Enhanced CRM Container is enabled on this account.)

Then deploy via the standard flex-config deploy pipeline (see basecamp `CLAUDE.md` — Flex Configuration Safety Protocol). **Do not POST directly to `/v1/Configuration` — this is a hard safety rail.**

---

## 6. Definition of Done

Not "deploy succeeded" — **agent-side smoke confirmed**. Run all four:

- [ ] **CEO logs in to `<account>.connie.team` as a Support Team rep**, available, skilled for at least one queue.
- [ ] **CEO sends a test webchat in** (or accepts an inbound chat task).
- [ ] **Dropdown renders** with the new client's content — section names match what the CEO authored, not the default Sales/Support placeholder.
- [ ] **Insert** appends the chosen response into the composer; **Send** dispatches it into the conversation (chat only — on email, Send acts as Insert per design).

If any of these fail, do **not** mark this runbook complete. Open [Troubleshoot](./troubleshoot).

---

## 7. Format Spec + Example JSON

The library is a single JSON object with one top-level key, `categories`, holding an array of sections. Each section has a `section` (display label) and a `responses` array. Each response has a `label` (button text in the dropdown) and `text` (what gets inserted or sent).

### Minimal example (2 sections, 2 responses each)

```json
{
  "categories": [
    {
      "section": "Donor Services",
      "responses": [
        {
          "label": "Make a Donation",
          "text": "Thank you for supporting [CLIENT NAME]. You can make a secure donation online by selecting an amount and completing the donation form. Your gift directly supports our community programs."
        },
        {
          "label": "Donation Receipt",
          "text": "We are happy to help with your donation receipt. Please send us the donor name, email address used for the gift, donation date, and amount so our team can locate the record and resend the receipt."
        }
      ]
    },
    {
      "section": "Volunteer Services",
      "responses": [
        {
          "label": "Volunteer Sign-Up",
          "text": "We would love to have you volunteer with [CLIENT NAME]. Please send your name, email, phone number, availability, and program interests so we can match you with the right opportunity."
        },
        {
          "label": "Contact Volunteer Team",
          "text": "Our volunteer team can answer questions about opportunities, scheduling, and orientation. You can reach [CLIENT NAME] at volunteer@[client].connie.host or call (XXX) XXX-XXXX."
        }
      ]
    }
  ]
}
```

### Production reference (Lifeline)

Lifeline's live library has 5 sections (Donor / Community / Volunteer / Partner / Program Services) with 6–7 responses each, totaling 34 responses across 165 lines of JSON. That's a reasonable upper bound — agents start scrolling past ~40 responses. If you're authoring a larger library, consider splitting by Team Skill (one library per agent role) rather than packing everything into one dropdown.

Lifeline source: `~/projects/connie/rtc/basecamp-v26.02/serverless-functions/src/assets/features/canned-responses/responses.private.json` (whichever account was deployed-to most recently; this is the file's current state, not a per-account archive).

### Authoring guidance for the CEO/client

- **Tone:** professional, warm, written for someone seeking help — not a sales pitch.
- **Length:** 1–3 sentences per response. Longer than that and agents start editing before sending, which defeats the point.
- **No template variables** by default. The plugin supports `{{task.X}}` and `{{worker.X}}` substitution but most client libraries are clearer as static text. Add variables only for high-value cases (e.g., personalized greeting).
- **Always include a "Contact [Team]" response** with the routed Connie email + phone for the program. Agents use this to gracefully escalate when the question is out of scope.
- **One section per service line** the client offers. Don't over-fragment — agents scan section names first to narrow the dropdown.

---

## 8. If Your Variant Differs

If your account or content situation differs materially from this runbook (e.g., per-team libraries, multi-language, dynamic content sourced from CRM), don't edit this file. Author a new runbook in the same folder structure per [Authoring & Publishing Runbooks](/techops/troubleshooting/authoring-runbooks). This file stays the canonical "first-time replace defaults" path.
