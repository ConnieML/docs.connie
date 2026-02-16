---
sidebar_label: Voice & Voicemail Setup
sidebar_position: 4
title: "Connie Voicemail Setup Guide"
---

# Connie Voicemail Setup Guide

**Version:** 2.0
**Last Updated:** 2026-01-15
**Status:** Production Ready

---

## Overview

ConnieRTC provides three voicemail implementation options, each building on the previous tier. This guide covers complete setup from Mailgun configuration through testing.

### Feature Packages

| Package | Feature Path | Email | Use Case |
|---------|-------------|-------|----------|
| Basic | `callback-and-voicemail` | No | Simple voicemail/callback without notifications |
| Enhanced | `callback-and-voicemail-with-email` | Yes | Full callback/voicemail with admin email alerts |
| Auto-Route | `voicemail-only-with-email` | Yes | All calls go directly to voicemail |

---

## Voice Experience Framework

ConnieRTC implements a progressive 3-tier voice experience model:

### Tier 1: Connie Voice Direct
- Calls immediately accepted and queued for agents
- Rejects calls during non-business hours
- No voicemail capability
- **Implementation:** Basic Studio Flow

### Tier 2: Connie Voice Direct with Voicemail (Auto-Route)
- Custom greeting plays
- All calls automatically routed to voicemail recording
- Task created in Flex queue
- Email notification with recording + transcription
- **Implementation:** `voicemail-only-with-email` feature
- **Best For:** After-hours lines, overflow numbers, dedicated voicemail lines

### Tier 3: Connie Voice Direct with Wait Experience
- Callers hear greeting and hold music
- Press `*` for options menu
- Press `1` for callback request
- Press `2` for voicemail
- Retain queue position while recording
- Email notification with recording + transcription
- **Implementation:** `callback-and-voicemail-with-email` feature
- **Best For:** Full-service lines with maximum caller flexibility

---

## Feature Comparison

| Feature | Basic | Enhanced (with Email) | Auto-Route |
|---------|-------|----------------------|------------|
| Voicemail Recording | Yes | Yes | Yes |
| Callback Request | Yes | Yes | No |
| Email Notifications | No | Yes | Yes |
| Transcription | No | Yes | Yes |
| Wait Experience Menu | Yes | Yes | No |
| Hold Music | Yes | Yes | No |
| Queue Position Retention | Yes | Yes | N/A |
| Mailgun Required | No | Yes | Yes |

---

## Prerequisites

### Required Access
- [ ] Twilio Account with Flex enabled
- [ ] Twilio CLI installed and configured
- [ ] Access to Twilio Console
- [ ] Mailgun account (for email features)
- [ ] GitHub access to ConnieRTC repository

### Required Information
Before starting, gather:

```
Twilio Account:
- Account SID: AC________________________________
- Auth Token: ________________________________
- Workspace SID: WS________________________________
- Workflow SID: WW________________________________ (for task routing)

Phone Number:
- Number to configure: +1________________________________

Mailgun (if using email features):
- Mailgun Domain: ________________________________.connie.center
- Mailgun API Key (domain-specific): ________________________________
- Admin Email: ________________________________
```

### Twilio CLI Profile Setup
```bash
# Create profile for the target account
twilio profiles:create --account-sid AC... --auth-token ...

# List profiles
twilio profiles:list

# Switch to target account
twilio profiles:use [PROFILE_NAME]

# Verify active profile
twilio profiles:list  # Check for asterisk indicating active profile
```

---

## Mailgun Setup

**Skip this section if using `callback-and-voicemail` (basic) without email.**

### Step 1: Create Mailgun Domain

1. Log into Mailgun Dashboard: https://app.mailgun.com
2. Go to **Sending** → **Domains** → **Add New Domain**
3. Enter domain name following convention: `[identifier].connie.center`
   - For phone-number specific: `7025551234.connie.center`
   - For shared voicemail: `voicemail.connie.center`
4. Complete DNS verification (may take up to 48 hours)

### Step 2: Get Domain Sending Key

**CRITICAL: Use domain-specific sending key, NOT your private API key**

1. Go to **Sending** → **Domains** → [Your Domain]
2. Click **Sending Keys** tab
3. Click **Add Sending Key**
4. Name it descriptively (e.g., `connie-voicemail-prod`)
5. Copy the key immediately (only shown once)

Key format: `[32 hex chars]-[8 hex chars]-[8 hex chars]`

### Step 3: Test Mailgun API

**ALWAYS test before deployment:**

```bash
curl -s -w "\nHTTP Status: %{http_code}\n" \
  --user "api:[YOUR_MAILGUN_API_KEY]" \
  https://api.mailgun.net/v3/[YOUR_DOMAIN]/messages \
  -F from='Test <test@[YOUR_DOMAIN]>' \
  -F to='[YOUR_ADMIN_EMAIL]' \
  -F subject='Mailgun API Test' \
  -F text='Testing Mailgun API credentials before deployment.'
```

**Expected:** HTTP 200 with Mailgun message ID
**If 401/403:** Wrong API key (use domain-specific sending key)

---

## Serverless Functions Deployment

### Step 1: Clone Repository

```bash
git clone https://github.com/ConnieML/basecamp-v26.02.git
cd basecamp-v26.02/serverless-functions
npm install
```

### Step 2: Configure Environment Variables

Create/update `.env` file:

```env
# Twilio Account
ACCOUNT_SID=AC________________________________
AUTH_TOKEN=________________________________

# Flex Configuration
TWILIO_FLEX_WORKSPACE_SID=WS________________________________
TWILIO_FLEX_CALLBACK_WORKFLOW_SID=WW________________________________

# Mailgun Configuration (required for email features)
ADMIN_EMAIL=alerts@[your-domain].connie.center
MAILGUN_DOMAIN=[your-domain].connie.center
MAILGUN_API_KEY=[your-domain-sending-key]

# Optional: Custom greeting (leave blank for default)
VOICEMAIL_GREETING=
```

### Step 3: Deploy Functions

```bash
# Using the deployment script (recommended)
./deploy.sh [account-name]

# Or manually
npm run deploy
```

**Note the deployment domain** (e.g., `custom-flex-extensions-serverless-XXXX-dev.twil.io`)

---

## Studio Flow Configuration

### Option A: Tier 2 - Voicemail Auto-Route

**Use case:** All calls go directly to voicemail

Create Studio Flow JSON (`voicemail-auto-route-flow.json`):

```json
{
  "description": "Connie Voice Direct with Voicemail (Auto-Route)",
  "states": [
    {
      "name": "Trigger",
      "type": "trigger",
      "transitions": [
        {"event": "incomingMessage"},
        {"next": "redirect_to_voicemail", "event": "incomingCall"},
        {"event": "incomingConversationMessage"},
        {"event": "incomingRequest"},
        {"event": "incomingParent"}
      ],
      "properties": {
        "offset": {"x": 0, "y": 0}
      }
    },
    {
      "name": "redirect_to_voicemail",
      "type": "twiml-redirect",
      "transitions": [
        {"event": "return"},
        {"event": "timeout"},
        {"event": "fail"}
      ],
      "properties": {
        "offset": {"x": 0, "y": 200},
        "method": "POST",
        "url": "https://[DEPLOYMENT_DOMAIN]/features/voicemail-only-with-email/voicemail-greeting",
        "timeout": "14400"
      }
    }
  ],
  "initial_state": "Trigger",
  "flags": {
    "allow_concurrent_calls": true
  }
}
```

Deploy:
```bash
twilio api:studio:v2:flows:create \
  --friendly-name "Connie Voice Direct with Voicemail (Auto-Route)" \
  --status published \
  --definition "$(cat voicemail-auto-route-flow.json)"
```

### Option B: Tier 3 - Wait Experience with Callback/Voicemail

**Use case:** Full options menu with callback and voicemail

**Replace:**
- `[DEPLOYMENT_DOMAIN]` with your serverless domain
- `[WORKFLOW_SID]` with your TaskRouter workflow SID

---

## Phone Number Configuration

### Via Twilio Console

1. Go to **Phone Numbers** → **Manage** → **Active Numbers**
2. Click on your phone number
3. Under **Voice Configuration**:
   - **Configure With:** Studio Flow
   - **A Call Comes In:** Select your Studio Flow
4. Click **Save Configuration**

### Via Twilio CLI

```bash
# Get Flow SID
twilio api:studio:v2:flows:list | grep "Connie Voice"

# Update phone number
twilio api:core:incoming-phone-numbers:update \
  --sid PN________________________________ \
  --voice-url "https://webhooks.twilio.com/v1/Accounts/[ACCOUNT_SID]/Flows/[FLOW_SID]"
```

---

## Testing Procedures

### Pre-Deployment Checklist

- [ ] Mailgun API test returns HTTP 200
- [ ] Environment variables set in serverless
- [ ] Functions deployed successfully
- [ ] Studio Flow created and published
- [ ] Phone number configured to use Studio Flow

### Test Procedure

1. **Call the configured number** from an external phone
2. **For Tier 2 (Auto-Route):**
   - Hear greeting
   - Leave voicemail (10-15 seconds with identifiable content)
   - Hang up or press `*`
3. **For Tier 3 (Wait Experience):**
   - Hear greeting and hold music
   - Press `*` for options
   - Press `2` for voicemail
   - Leave voicemail
   - Hang up or press `*`

### Verify Results

**Email Verification:**
- [ ] Email received at admin address
- [ ] Audio recording attached (.wav file)
- [ ] Transcription included in email body
- [ ] Caller/called number correct
- [ ] Timestamp accurate

**Flex Task Verification:**
- [ ] Task appears in Flex queue
- [ ] Task type shows "voicemail"
- [ ] Recording URL accessible
- [ ] Caller information correct

---

## Troubleshooting

### Email Not Arriving

| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| 401/403 errors in logs | Wrong Mailgun API key | Use domain-specific sending key, not private key |
| 404 on first attempt | Recording not ready | Normal - email sends on transcription callback |
| Delayed delivery (1-6 hours) | Mailgun/network congestion | Check spam folder, wait, or check Mailgun logs |
| No email at all | ADMIN_EMAIL not set | Verify environment variable in serverless |

### "Option Not Available" Error

| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| After pressing `*` | Missing workflow SID | Set `TWILIO_FLEX_CALLBACK_WORKFLOW_SID` env var |
| Intermittent failures | Workflow not found | Verify workflow SID exists in TaskRouter |

### Task Not Created

| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| No task in Flex | Workspace SID wrong | Verify `TWILIO_FLEX_WORKSPACE_SID` matches Flex config |
| 404 errors in logs | Function path mismatch | Check Studio Flow waitUrl matches deployed function |

---

## Environment Variable Reference

### Required for All Features

| Variable | Description | Example |
|----------|-------------|---------|
| `ACCOUNT_SID` | Twilio Account SID | `AC...` |
| `AUTH_TOKEN` | Twilio Auth Token | `...` |
| `TWILIO_FLEX_WORKSPACE_SID` | Flex TaskRouter Workspace | `WS...` |

### Required for Email Features

| Variable | Description | Example |
|----------|-------------|---------|
| `ADMIN_EMAIL` | Email recipient(s) | `alerts@voicemail.connie.center` |
| `MAILGUN_DOMAIN` | Mailgun sending domain | `voicemail.connie.center` |
| `MAILGUN_API_KEY` | Domain-specific sending key | `fcfa08fa...` |

### Required for Wait Experience (Tier 3)

| Variable | Description | Example |
|----------|-------------|---------|
| `TWILIO_FLEX_CALLBACK_WORKFLOW_SID` | TaskRouter Workflow for callbacks | `WW...` |

---

## Quick Reference Commands

### Account Management
```bash
twilio profiles:list                    # List all profiles
twilio profiles:use [NAME]              # Switch account
twilio profiles:create                  # Create new profile
```

### Serverless Operations
```bash
npm run deploy                          # Deploy functions
twilio serverless:logs --tail           # Stream function logs
```

### Studio Flow Management
```bash
twilio api:studio:v2:flows:list         # List all flows
twilio api:studio:v2:flows:executions:list --flow-sid [SID] --limit 5
```

### TaskRouter Operations
```bash
twilio api:taskrouter:v1:workspaces:list
twilio api:taskrouter:v1:workspaces:workflows:list --workspace-sid [WS_SID]
twilio api:taskrouter:v1:workspaces:tasks:list --workspace-sid [WS_SID] --limit 10
```

### Mailgun Operations
```bash
# Test API
curl -s --user "api:[KEY]" https://api.mailgun.net/v3/[DOMAIN]/messages \
  -F from='Test <test@[DOMAIN]>' \
  -F to='[EMAIL]' \
  -F subject='Test' \
  -F text='Test message'

# Check delivery events
curl -s --user "api:[KEY]" \
  "https://api.mailgun.net/v3/[DOMAIN]/events?event=delivered&limit=5"
```

---

*For questions or issues, contact ConnieRTC Engineering or escalate to CTO.*
