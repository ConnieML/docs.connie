---
sidebar_label: Voicemail-Only Configuration
sidebar_position: 3
title: "Voicemail-Only Configuration Guide"
---

# Voicemail-Only Configuration Guide

This guide covers implementing **Voicemail Only** - the base experience where callers go directly to voicemail recording without hold queues or callback options.

:::info Base Experience
This is a **base experience**, not an add-on. Email notifications and transcription can be added to this experience. See [Implementation Guide](./voicemail-implementation-guide) for the full architecture.
:::

---

## Choose Your Implementation Path

There are two ways to implement Voicemail Only:

| Path | When to Use | Deployment | Feature Directory |
|------|-------------|------------|-------------------|
| **Dedicated Feature** | New deployments, clean slate | Deploy `voicemail-only-with-email/` | `serverless-functions/src/functions/features/voicemail-only-with-email/` |
| **Parameter Approach** | Existing `callback-and-voicemail-with-email` deployed | Add `?voicemailOnly=true` to URL | Uses existing deployment |

### Decision Guide

```
┌─────────────────────────────────────────────────────────────────┐
│ Does the account already have callback-and-voicemail deployed? │
├─────────────────────────┬───────────────────────────────────────┤
│ NO                      │ YES                                   │
├─────────────────────────┼───────────────────────────────────────┤
│ → Dedicated Feature     │ → Parameter Approach                  │
│   (new deployment)      │   (zero additional deployment)        │
└─────────────────────────┴───────────────────────────────────────┘
```

---

## Path A: Dedicated Feature

Use this path for new accounts or when you want a clean, dedicated voicemail-only deployment.

### For Human Developers

#### Step 1: Prepare Environment

1. Navigate to your account's serverless directory
2. Copy the example environment file:
   ```
   serverless-functions/.env.example → serverless-functions/.env
   ```
3. Update the following variables:
   - `ACCOUNT_SID`: Your Twilio Account SID
   - `AUTH_TOKEN`: Your Twilio Auth Token
   - `TWILIO_FLEX_CALLBACK_WORKFLOW_SID`: Your workflow SID (e.g., `WW...`)
   - `MAILGUN_API_KEY`: Your Mailgun sending API key
   - `MAILGUN_DOMAIN`: Your sending domain (e.g., `voicemail.yourorg.com`)
   - `NOTIFICATION_EMAIL`: Admin email for notifications

#### Step 2: Deploy Functions

1. Open terminal in `serverless-functions/` directory
2. Run deployment script for your account:
   ```bash
   ./deploy.sh <account-name>
   ```
3. Note the deployed domain (e.g., `custom-flex-extensions-serverless-XXXX-dev.twil.io`)

#### Step 3: Create Studio Flow

1. Navigate to **Twilio Console** → **Studio** → **Flows**
2. Click **Create new Flow**
3. Name it descriptively (e.g., "H2H Voicemail Only Flow")
4. Select **Start from scratch**
5. Add the following widgets:

**Widget 1: Say/Play (Welcome)**
- Widget name: `welcome_message`
- Say: "Thank you for calling [Organization]. Please leave your message after the tone."
- Voice: `Polly.Joanna` or preferred voice

**Widget 2: TwiML Redirect (Send to Voicemail)**
- Widget name: `send_to_voicemail`
- Widget type: `add-twiml-redirect` (NOT `twiml-redirect`)
- URL: `https://[YOUR-DOMAIN]/features/voicemail-only-with-email/studio/voicemail-recording`

6. Connect: **Trigger** → **welcome_message** → **send_to_voicemail**
7. Click **Publish**

#### Step 4: Configure Phone Number

1. Navigate to **Twilio Console** → **Phone Numbers** → **Manage** → **Active Numbers**
2. Click on your voicemail number
3. Under **Voice & Fax**:
   - **Configure with**: Webhooks, TwiML Bins, Functions, Studio, or Proxy
   - **A call comes in**: Studio Flow → Select your new flow
4. Click **Save**

#### Step 5: Test

1. Call the voicemail number from another phone
2. Verify:
   - Welcome message plays
   - Recording prompt plays
   - You can leave a message
   - Task appears in Flex
   - Email is sent (if configured)

---

### For AI Agents

#### Prerequisites Check

```bash
# Verify you're in the correct directory
pwd
# Expected: /path/to/connieRTC-basecamp

# Check account configuration
cat serverless-functions/.env | grep -E "ACCOUNT_SID|MAILGUN"
```

#### Step 1: Configure Environment

```bash
# Create environment file if needed
cp serverless-functions/.env.example serverless-functions/.env

# Edit with required values (use your editor of choice)
# Required variables:
# - ACCOUNT_SID
# - AUTH_TOKEN
# - TWILIO_FLEX_CALLBACK_WORKFLOW_SID
# - MAILGUN_API_KEY
# - MAILGUN_DOMAIN
# - NOTIFICATION_EMAIL
```

#### Step 2: Deploy Functions

See [Account-Specific Deployment Guide](/developers/building/deployment/account-specific-deployment) for complete deployment protocol.

```bash
# CRITICAL: Use deploy.sh, not npm run deploy
cd serverless-functions
./deploy.sh <account-name>

# Capture the deployed domain
DEPLOYED_DOMAIN=$(twilio serverless:list --properties domainName -o json | jq -r '.[0].domainName')
echo "Deployed to: $DEPLOYED_DOMAIN"
```

#### Step 3: Create Studio Flow

```bash
# Create Studio Flow via API
# Note: You'll need to create a flow-definition.json first

twilio api:studio:v2:flows:create \
  --friendly-name "Voicemail Only Flow" \
  --status "published" \
  --definition "$(cat flow-definition.json)"
```

**flow-definition.json template:**

```json
{
  "description": "Voicemail Only Flow",
  "states": [
    {
      "name": "Trigger",
      "type": "trigger",
      "transitions": [
        {
          "event": "incomingMessage",
          "next": "welcome_message"
        },
        {
          "event": "incomingCall",
          "next": "welcome_message"
        }
      ],
      "properties": {
        "offset": {"x": 0, "y": 0}
      }
    },
    {
      "name": "welcome_message",
      "type": "say-play",
      "transitions": [
        {
          "event": "audioComplete",
          "next": "send_to_voicemail"
        }
      ],
      "properties": {
        "say": "Thank you for calling. Please leave your message after the tone.",
        "voice": "Polly.Joanna",
        "offset": {"x": 0, "y": 200}
      }
    },
    {
      "name": "send_to_voicemail",
      "type": "add-twiml-redirect",
      "transitions": [
        {
          "event": "return"
        },
        {
          "event": "timeout"
        },
        {
          "event": "fail"
        }
      ],
      "properties": {
        "url": "https://YOUR_DOMAIN/features/voicemail-only-with-email/studio/voicemail-recording",
        "method": "POST",
        "offset": {"x": 0, "y": 400}
      }
    }
  ],
  "initial_state": "Trigger"
}
```

#### Step 4: Configure Phone Number

```bash
# Get the Flow SID from the previous step
FLOW_SID="FW..."

# Update phone number configuration
twilio api:core:incoming-phone-numbers:update \
  --sid PN... \
  --voice-url "https://webhooks.twilio.com/v1/Accounts/AC.../Flows/$FLOW_SID"
```

#### Step 5: Verify Deployment

```bash
# List deployed functions
twilio serverless:list --properties functionSid,friendlyName

# Test the voicemail endpoint
curl -X POST "https://$DEPLOYED_DOMAIN/features/voicemail-only-with-email/studio/voicemail-recording" \
  -d "CallSid=CA_test" \
  -d "From=+15551234567"
```

---

## Path B: Parameter Approach

Use this when `callback-and-voicemail-with-email` is already deployed and you want to add a voicemail-only line without additional deployment.

### For Human Developers

#### Step 1: Create New Studio Flow

1. Navigate to **Twilio Console** → **Studio** → **Flows**
2. Click **Create new Flow**
3. Name it (e.g., "H2H Voicemail Only - Parameter")
4. Select **Start from scratch**

#### Step 2: Configure TwiML Redirect

Add a single widget:

**Widget: TwiML Redirect**
- Widget name: `voicemail_only`
- Widget type: `add-twiml-redirect`
- URL: Add `?voicemailOnly=true` parameter:
  ```
  https://[YOUR-EXISTING-DOMAIN]/features/callback-and-voicemail-with-email/studio/wait-experience?voicemailOnly=true
  ```

Connect: **Trigger** → **voicemail_only**

#### Step 3: Configure Phone Number

1. Navigate to your voicemail phone number
2. Set **A call comes in** to your new Studio Flow
3. Save

#### Step 4: Test

The `voicemailOnly=true` parameter causes the function to:
- Skip all callback and hold queue logic
- Immediately prompt for voicemail recording
- Create ConnieRTC task with voicemail attributes
- Send email to configured admins (uses existing Mailgun setup)

---

### For AI Agents

#### Step 1: Identify Existing Deployment

```bash
# Find existing callback-and-voicemail deployment
twilio serverless:list --properties domainName,friendlyName

# Expected output includes something like:
# custom-flex-extensions-serverless-XXXX-dev.twil.io
```

#### Step 2: Create Studio Flow with Parameter

```bash
# Create the flow definition with voicemailOnly parameter
cat > voicemail-only-param-flow.json << 'EOF'
{
  "description": "Voicemail Only (Parameter)",
  "states": [
    {
      "name": "Trigger",
      "type": "trigger",
      "transitions": [
        {"event": "incomingCall", "next": "voicemail_only"}
      ],
      "properties": {"offset": {"x": 0, "y": 0}}
    },
    {
      "name": "voicemail_only",
      "type": "add-twiml-redirect",
      "transitions": [
        {"event": "return"},
        {"event": "timeout"},
        {"event": "fail"}
      ],
      "properties": {
        "url": "https://YOUR_EXISTING_DOMAIN/features/callback-and-voicemail-with-email/studio/wait-experience?voicemailOnly=true",
        "method": "POST",
        "offset": {"x": 0, "y": 200}
      }
    }
  ],
  "initial_state": "Trigger"
}
EOF

# Create the flow
twilio api:studio:v2:flows:create \
  --friendly-name "Voicemail Only (Parameter)" \
  --status "published" \
  --definition "$(cat voicemail-only-param-flow.json)"
```

#### Step 3: Configure Phone Number

```bash
# Get new flow SID
FLOW_SID="FW..."

# Update phone number
twilio api:core:incoming-phone-numbers:update \
  --sid PN... \
  --voice-url "https://webhooks.twilio.com/v1/Accounts/AC.../Flows/$FLOW_SID"
```

---

## How the Parameter Works

When `voicemailOnly=true` is passed to the wait-experience function:

```javascript
// In wait-experience.protected.js
if (voicemailOnly === 'true' && (mode === 'initialize' || mode === undefined)) {
  // Skip queue lookup and redirect directly to voicemail recording
  twiml.redirect(
    `${baseUrl}?mode=record-voicemail&CallSid=${CallSid}&enqueuedTaskSid=${voicemailOnlyTaskSid}&voicemailOnly=true`
  );
  return callback(null, twiml);
}
```

The parameter is preserved through all callbacks:
- Initial wait experience URL
- Recording action URL
- Transcription callback URL
- Submit voicemail URL

---

## Enabling Add-ons

Both paths support the same add-ons:

### Email Notifications

**Dedicated Feature:** Built-in, configure `MAILGUN_*` environment variables

**Parameter Approach:** Uses existing Mailgun configuration from `callback-and-voicemail-with-email`

See: [Email Notifications Add-on](/developers/building/feature-management/channels/voice/add-ons/email-notifications)

### Transcription

**Both Paths:** Enable in the recording configuration:

```javascript
const recordingConfig = {
  transcribe: true,
  transcription_callback: `https://${context.DOMAIN_NAME}/transcription-webhook`
};
```

See: [Transcription Add-on](/developers/building/feature-management/channels/voice/add-ons/transcription)

---

## Troubleshooting

### Caller Still Gets Hold Options

- **Check:** Parameter is exactly `voicemailOnly=true` (case-sensitive)
- **Verify:** URL includes the parameter after `?`
- **Confirm:** Using correct serverless domain

### No Email Sent

- Check Mailgun dashboard for errors
- Verify `MAILGUN_API_KEY` is a **sending key**, not the private API key
- Confirm DNS records are verified
- Test Mailgun API directly:

```bash
curl -s -w "\nHTTP Status: %{http_code}\n" \
  --user "api:$MAILGUN_API_KEY" \
  https://api.mailgun.net/v3/$MAILGUN_DOMAIN/messages \
  -F from="test@$MAILGUN_DOMAIN" \
  -F to="admin@yourorg.com" \
  -F subject="Test" \
  -F text="Test message"
```

### Task Not Created

- Check Twilio Function logs in Console
- Verify `TWILIO_FLEX_CALLBACK_WORKFLOW_SID` is correct
- Ensure TaskRouter workspace is active

### Studio Flow Widget Type Error

```json
// WRONG - This type doesn't exist in Studio validation
"type": "twiml-redirect"

// CORRECT - Use add-twiml-redirect
"type": "add-twiml-redirect"
```

---

## Multiple Voicemail-Only Lines

To add more voicemail-only numbers:

1. Create new Studio Flow for each number
2. Use the same parameter approach or dedicated feature URL
3. All lines share the same email and transcription configuration
4. No additional serverless deployments needed

---

## Rollback

### Remove Parameter (Instant)
1. Edit Studio Flow
2. Remove `?voicemailOnly=true` from the URL
3. Save - reverts to normal callback/voicemail behavior

### Restore Original Function (if modified)
```bash
# Restore from backup
cp wait-experience.protected.js.backup wait-experience.protected.js
./deploy.sh <account-name>
```

---

## Related Documentation

- [Implementation Guide](./voicemail-implementation-guide) - Architecture overview
- [Callback + Wait Setup](./callback-voicemail-setup) - Full queue experience
- [Account-Specific Deployment](/developers/building/deployment/account-specific-deployment) - Deployment protocol
- [Email Notifications](/developers/building/feature-management/channels/voice/add-ons/email-notifications) - Email add-on
- [Transcription](/developers/building/feature-management/channels/voice/add-ons/transcription) - Transcription add-on
