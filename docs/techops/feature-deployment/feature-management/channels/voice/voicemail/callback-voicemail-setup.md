---
sidebar_label: Callback + Wait Setup
sidebar_position: 6
title: "Callback + Wait Experience Setup"
---

# Callback + Wait Experience Setup

This guide covers implementing **Callback + Wait** - the base experience where callers enter a queue and can choose between callback, voicemail, or staying on hold.

:::info Base Experience
This is a **base experience**, not an add-on. Email notifications and transcription can be added to this experience. See [Implementation Guide](./voicemail-implementation-guide) for the full architecture.
:::

---

## What Callers Experience

```
Caller → Queue with Hold Music
         ↓
     Press * anytime
         ↓
┌────────────────────────────────────────┐
│         Options Menu                   │
├────────────────────────────────────────┤
│ 1. Request callback (keep place)       │
│ 2. Leave voicemail                     │
│ 3. Stay on hold                        │
└────────────────────────────────────────┘
         ↓
     Resolution (agent, callback, or voicemail)
```

---

## Choose Your Feature

| Need Email/Transcription? | Feature Directory | Use This |
|---------------------------|-------------------|----------|
| **No** - Flex only | `callback-and-voicemail/` | Simpler setup |
| **Yes** - Email notifications | `callback-and-voicemail-with-email/` | Full features |

---

## Setup: callback-and-voicemail (No Email)

### For Human Developers

#### Step 1: Prepare Environment

1. Navigate to `serverless-functions/` directory
2. Create or update `.env` file with:
   ```
   ACCOUNT_SID=AC...
   AUTH_TOKEN=...
   TWILIO_FLEX_CALLBACK_WORKFLOW_SID=WW...
   ```

#### Step 2: Enable Feature

1. Open `serverless-functions/src/assets/features/features.json`
2. Ensure `callback_and_voicemail` is enabled:
   ```json
   {
     "callback_and_voicemail": {
       "enabled": true,
       "allow_requeue": true,
       "max_attempts": 3,
       "auto_select_task": false
     }
   }
   ```

#### Step 3: Deploy

1. Open terminal in `serverless-functions/`
2. Deploy to your account:
   ```bash
   ./deploy.sh <account-name>
   ```
3. Note the deployed domain

#### Step 4: Configure Studio Flow

1. Navigate to **Twilio Console** → **Studio** → **Flows**
2. Open your voice flow (or create new)
3. In the **Send to ConnieRTC** widget:
   - **Hold Music TwiML URL**:
     ```
     https://[YOUR-DOMAIN]/features/callback-and-voicemail/studio/wait-experience
     ```

#### Step 5: Test

1. Call the number
2. Verify you hear hold music
3. Press `*` to hear options
4. Test each option (callback, voicemail, stay on hold)

---

### For AI Agents

#### Prerequisites Check

```bash
# Verify directory
pwd
# Expected: /path/to/basecamp-v26.02

# Check environment
cat serverless-functions/.env | grep -E "ACCOUNT_SID|WORKFLOW"
```

#### Deploy

```bash
cd serverless-functions

# Enable feature in features.json
cat src/assets/features/features.json | jq '.callback_and_voicemail.enabled = true' > tmp.json && mv tmp.json src/assets/features/features.json

# Deploy
./deploy.sh <account-name>

# Get deployed domain
DEPLOYED_DOMAIN=$(twilio serverless:list --properties domainName -o json | jq -r '.[0].domainName')
echo "Deployed: $DEPLOYED_DOMAIN"
```

#### Update Studio Flow

```bash
# Get current flow
FLOW_SID="FW..."

# Update flow with new hold music URL
# (This typically requires updating the flow JSON and re-publishing)
```

---

## Setup: callback-and-voicemail-with-email (Full Features)

### For Human Developers

#### Step 1: Prepare Environment

1. Navigate to `serverless-functions/` directory
2. Create or update `.env` file with all variables:
   ```
   ACCOUNT_SID=AC...
   AUTH_TOKEN=...
   TWILIO_FLEX_CALLBACK_WORKFLOW_SID=WW...
   MAILGUN_API_KEY=...  (must be SENDING key, not private key)
   MAILGUN_DOMAIN=voicemail.yourorg.com
   NOTIFICATION_EMAIL=admin@yourorg.com
   ```

#### Step 2: Set Up Mailgun

Follow the detailed Mailgun setup in [Email Notifications Add-on](/techops/feature-deployment/feature-management/channels/voice/add-ons/email-notifications):

1. Create Mailgun account
2. Add sending domain (e.g., `voicemail.yourorg.com`)
3. Configure DNS records
4. Get **domain-specific sending key** (NOT the private API key)
5. Test API connectivity

#### Step 3: Enable Feature

1. Open `serverless-functions/src/assets/features/features.json`
2. Enable the feature:
   ```json
   {
     "callback_and_voicemail": {
       "enabled": true,
       "allow_requeue": true,
       "max_attempts": 3,
       "auto_select_task": false
     }
   }
   ```

#### Step 4: Deploy

```bash
./deploy.sh <account-name>
```

#### Step 5: Configure Studio Flow

In your Studio Flow's **Send to ConnieRTC** widget:
- **Hold Music TwiML URL**:
  ```
  https://[YOUR-DOMAIN]/features/callback-and-voicemail-with-email/studio/wait-experience
  ```

#### Step 6: Test

1. Call the number
2. Press `*` and select voicemail option
3. Leave a test message
4. Verify:
   - Task appears in Flex
   - Email received with audio attachment
   - Transcription appears (if enabled)

---

### For AI Agents

#### Prerequisites Check

```bash
# Verify Mailgun configuration
cat serverless-functions/.env | grep MAILGUN

# Test Mailgun API
MAILGUN_API_KEY=$(grep MAILGUN_API_KEY serverless-functions/.env | cut -d= -f2)
MAILGUN_DOMAIN=$(grep MAILGUN_DOMAIN serverless-functions/.env | cut -d= -f2)

curl -s -w "\nHTTP Status: %{http_code}\n" \
  --user "api:$MAILGUN_API_KEY" \
  "https://api.mailgun.net/v3/$MAILGUN_DOMAIN/messages" \
  -F from="test@$MAILGUN_DOMAIN" \
  -F to="test@example.com" \
  -F subject="API Test" \
  -F text="Test message"
```

#### Deploy

```bash
cd serverless-functions

# Verify features enabled
cat src/assets/features/features.json | jq '.callback_and_voicemail'

# Deploy with email feature
./deploy.sh <account-name>

# Capture domain
DEPLOYED_DOMAIN=$(twilio serverless:list --properties domainName -o json | jq -r '.[0].domainName')
echo "Wait Experience URL: https://$DEPLOYED_DOMAIN/features/callback-and-voicemail-with-email/studio/wait-experience"
```

#### Verify Deployment

```bash
# List functions to verify deployment
twilio serverless:list --properties functionSid,friendlyName | grep -i voicemail

# Check function logs for errors
twilio debugger:logs:list --log-level error
```

---

## Configuration Options

### Callback Behavior

```json
{
  "callback_and_voicemail": {
    "enabled": true,
    "allow_requeue": true,      // Allow multiple callback attempts
    "max_attempts": 3,          // Maximum callback attempts
    "auto_select_task": false   // Auto-assign to available agent
  }
}
```

### Hold Music

The default hold music plays while caller waits. To customize:

1. Create a custom TwiML Bin with your hold music
2. Update the wait-experience function to use your music URL

---

## Enabling Add-ons

### Email Notifications

Already included in `callback-and-voicemail-with-email`. Ensure Mailgun is configured.

For `callback-and-voicemail` (no email built-in), you would need to:
1. Add Mailgun configuration to environment
2. Modify the voicemail submission function

See: [Email Notifications Add-on](/techops/feature-deployment/feature-management/channels/voice/add-ons/email-notifications)

### Transcription

Enable in the recording configuration within the feature:

```javascript
const recordingConfig = {
  transcribe: true,
  transcription_callback: `https://${context.DOMAIN_NAME}/features/callback-and-voicemail-with-email/studio/transcription-handler`
};
```

See: [Transcription Add-on](/techops/feature-deployment/feature-management/channels/voice/add-ons/transcription)

---

## Troubleshooting

### No Options Menu After Pressing *

- Verify the wait-experience URL is correct
- Check function logs for errors
- Ensure the Studio Flow is using the correct widget type

### Callbacks Not Working

- Verify `TWILIO_FLEX_CALLBACK_WORKFLOW_SID` is correct
- Check TaskRouter workspace is active
- Ensure agents are available to receive callbacks

### Voicemails Not Appearing in Flex

- Check function logs for task creation errors
- Verify workflow SID is correct
- Ensure voice channel is configured

### Emails Not Sending

See [Email Notifications troubleshooting](/techops/feature-deployment/feature-management/channels/voice/add-ons/email-notifications#troubleshooting)

Common issues:
- Using private API key instead of sending key
- DNS not verified
- Domain not matching configured domain

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    CALLBACK + WAIT FLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐   ┌──────────────┐   ┌─────────────────────┐     │
│  │ Incoming │ → │ Studio Flow  │ → │ Send to ConnieRTC   │     │
│  │   Call   │   │              │   │ (Hold Music URL)    │     │
│  └──────────┘   └──────────────┘   └─────────────────────┘     │
│                                              ↓                  │
│                                    ┌─────────────────────┐     │
│                                    │  wait-experience    │     │
│                                    │  (serverless fn)    │     │
│                                    └─────────────────────┘     │
│                                              ↓                  │
│                     ┌────────────────────────┼────────────────┐ │
│                     ↓                        ↓                ↓ │
│            ┌──────────────┐        ┌──────────────┐   ┌──────┐ │
│            │   Callback   │        │   Voicemail  │   │ Wait │ │
│            │   Request    │        │   Recording  │   │      │ │
│            └──────────────┘        └──────────────┘   └──────┘ │
│                     ↓                        ↓                  │
│            ┌──────────────┐        ┌──────────────┐            │
│            │  Task in     │        │  Task +      │            │
│            │  Flex        │        │  Email       │            │
│            └──────────────┘        └──────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Related Documentation

- [Implementation Guide](./voicemail-implementation-guide) - Architecture overview
- [Voicemail-Only Configuration](./voicemail-only-configuration) - Direct-to-voicemail setup
- [Account-Specific Deployment](/techops/codebase/deployment/account-specific-deployment) - Deployment protocol
- [Email Notifications](/techops/feature-deployment/feature-management/channels/voice/add-ons/email-notifications) - Email add-on
- [Transcription](/techops/feature-deployment/feature-management/channels/voice/add-ons/transcription) - Transcription add-on
- [Mailgun Setup](./email-providers/mailgun-setup) - Detailed Mailgun configuration
