---
sidebar_label: Troubleshoot
sidebar_position: 5
title: "Canned Responses — Troubleshoot"
---

# Troubleshoot Runbook

> **Read Section 1 every time before authoring or deploying canned responses content.** The filename + path gotchas surface as silent failures (empty dropdown, no console error) and have eaten hours of debugging on past deploys.

---

## 1. Filename + Path Gotchas (FUTURE AGENTS — READ THIS) {#filename-and-path-gotchas}

The Canned Responses plugin loader is **strict about one specific asset path** and provides **no helpful error** when the path is wrong. The dropdown just renders empty. There is no console message, no toast, no failed network request that surfaces in the UI.

### The hardcoded contract

The plugin's serverless function `serverless-functions/src/functions/features/canned-responses/flex/chat-responses.js` reads the asset at exactly this path:

```js
Runtime.getAssets()['/features/canned-responses/responses.json']
```

Which means the source file in the repo **must** be:

```
serverless-functions/src/assets/features/canned-responses/responses.private.json
```

The `.private.json` extension makes it a private asset in Twilio Serverless (auth-gated). The deploy strips `.private` and the file lands in the runtime as `responses.json`.

### The four ways this breaks (all silent)

| What you do | What breaks |
|---|---|
| Rename source file to `responses.<client>.private.json` (thinking per-account naming will help) | Plugin loader cannot find `/features/canned-responses/responses.json`. Empty dropdown, no error. |
| Rename source file to `responses.json` (dropping `.private`) | Asset becomes public-readable AND the deploy pipeline may not pick it up correctly. Brittle and a security drift. |
| Move source file into a subfolder like `lifeline/responses.private.json` | Plugin loader resolves to `/features/canned-responses/lifeline/responses.json` — different path, not found. Empty dropdown. |
| Create per-account JSON archives in the repo at the same level (e.g., `responses.lifeline.private.json` + `responses.nss.private.json` + the canonical `responses.private.json`) | Deploys upload ALL `.private.json` files as assets. Doesn't break the live dropdown but creates dead asset clutter in every account's runtime. |

### The correct discipline

**One canonical source file. Per-account scoping via `.env.<account>`.**

- Repo holds exactly one file: `serverless-functions/src/assets/features/canned-responses/responses.private.json`.
- Per-account authored libraries live **outside the deploy path** (e.g., on the CEO's Desktop, or in a per-client `~/projects/connie/clients/<client>/canned-responses-<date>.json` archive). They are sources of truth for *content*, not deploy artifacts.
- When deploying to account X, `cp` the account-X authored file into the canonical `responses.private.json`, then run `ENVIRONMENT=<account> npm run deploy`. The canonical file becomes whatever-was-last-deployed; that's expected, not a problem.
- After deploying to account X, the repo's `responses.private.json` holds account X's content. If you next deploy to account Y, copy account Y's authored file in first, then deploy. **The repo file is a scratchpad; the live runtime asset on each account is the source of truth for that account's library.**

### Why this discipline exists

Each Connie sub-account has its own Twilio Serverless runtime. Deploying `responses.json` to account A's runtime does **not** touch account B's runtime — they are fully isolated at the Twilio account level. But the *source file in the repo* is shared at the repo level.

It is tempting to introduce per-account filename variants ("for safety / clarity / so we don't lose NSS's content when we deploy to Lifeline"). **Don't.** The plugin loader is hardcoded to one path. Per-account content lives in your authored-file archive outside the repo, not in per-account filename variants inside the repo.

---

## 2. Symptom — Dropdown renders empty

### Likely causes (in order)

1. **Asset deploy didn't include the JSON.** `curl https://${SERVICE_DOMAIN}/features/canned-responses/responses.json` — if this returns 404 or HTML, the asset was not deployed to this account's runtime.
2. **JSON is malformed.** Asset URL returns content, but the response is invalid JSON. Plugin's fetch succeeds, parse fails silently. Run `curl ... | python3 -m json.tool` to confirm.
3. **JSON shape doesn't match the schema.** Asset is valid JSON but top-level isn't `{"categories": [...]}`. Plugin's render loop iterates over nothing and the dropdown stays empty. See [Setup Section 7](./setup#7-format-spec--example-json).
4. **Filename gotcha** (see Section 1 above). Source file was renamed and the asset never landed at the expected path.
5. **`flex-config` feature flag is off.** `canned_responses.enabled: false` means the plugin doesn't even attempt to render.

### Quick diagnosis

```bash
# 1. Asset live?
curl -I "https://${SERVICE_DOMAIN}/features/canned-responses/responses.json"
# Expect HTTP 200

# 2. Valid JSON with the right shape?
curl -s "https://${SERVICE_DOMAIN}/features/canned-responses/responses.json" | \
  python3 -c "import sys,json; d=json.load(sys.stdin); print('categories:', len(d.get('categories', [])))"
# Expect "categories: N" where N >= 1

# 3. Feature flag on?
grep -A 3 '"canned_responses"' ~/projects/connie/rtc/basecamp-v26.02/flex-config/ui_attributes.<account>.json
# Expect "enabled": true
```

---

## 3. Symptom — Dropdown renders, but wrong content

Account is serving a different library than expected. Causes:

- **Deploy went to the wrong account.** Re-check `twilio profiles:list` — was the active profile what you intended?
- **`.env.<account>` file points at the wrong account credentials.** Open `serverless-functions/.env.<account>` and confirm the `ACCOUNT_SID` matches the intended account.
- **Asset was deployed weeks ago and is stale.** The source repo holds someone else's content; you assumed it was your client's. Deploy fresh from the authored file archive.

---

## 4. Symptom — Insert works but Send does nothing (email tasks)

This is **expected behavior on email tasks**. The Send button on an email task intentionally falls back to Insert (does not auto-dispatch the email). The agent must use Flex's native email Send affordance to confirm Subject/To/CC before dispatching.

If the agent is confused, retrain them — this is by design, not a bug. Codified in `plugin-flex-ts-template-v2/src/feature-library/canned-responses/custom-components/CannedResponsesCRM/Response/Response.tsx` (the `isEmailTask` branch).

If Send is broken on **chat** tasks (not email), that's a real bug. Check the browser console — likely a `SendMessage` action error or a missing `conversationSid` on the task attributes.

---

## 5. Symptom — Insert appends `[object Object]` or a literal `{{variable}}` string

The response text contains a template variable, and the variable doesn't resolve.

- `{{task.X}}` form is correct; `{{task.attributes.X}}` is **wrong** (the basecamp G4 gotcha). Wrong form → variable does not substitute → literal string appears in the composer.
- `{{worker.X}}` should resolve to the agent's worker attribute. If it doesn't, the attribute name is misspelled or doesn't exist on this worker.

Fix the JSON, re-deploy.

---

## 6. Symptom — Dropdown shows but Enhanced CRM Container hides it

If `enhanced_crm_container.enabled: true` on the account, the CRM Panel slot is occupied by the hosted CRM iframe. The Canned Responses CRM hook bails out (see `CRMContainer.tsx` line 25).

**Fix:** switch the placement to `"MessageInputActions"` in `flex-config`:

```json
"canned_responses": {
    "enabled": true,
    "configuration": {
        "location": "MessageInputActions"
    }
}
```

Re-deploy flex-config.

---

## 7. When to escalate

- **Asset URL returns 200 with correct content, feature flag is on, but plugin still renders empty.** Plugin bundle issue — check `twilio flex:plugins:list` to confirm `plugin-flex-ts-template-v2` is released to this account at a version that includes the canned-responses feature.
- **Send works on one account but fails on another with identical config.** Likely a per-account `flex-config` drift; diff `ui_attributes.<account>.json` against a known-working sibling.
- **Repeated silent-empty-dropdown after every fix attempt.** Re-read Section 1 of this runbook. The filename gotcha is the #1 cause of "I changed something and now it's broken in a way I can't explain."

If none of the above resolves it, escalate to CTO-Connie with: account name, service domain URL, current `responses.json` content (first 200 chars), and the `ui_attributes.<account>.json` `canned_responses` block.
