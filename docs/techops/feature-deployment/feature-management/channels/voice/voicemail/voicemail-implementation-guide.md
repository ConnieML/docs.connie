---
sidebar_label: Implementation Guide
sidebar_position: 1
title: "Voicemail Implementation Guide"
---

# Voicemail Implementation Guide

This guide helps you select and deploy the right voicemail solution for your client. Understanding the difference between **Base Experiences** and **Add-ons** is critical for making the right choice.

:::tip Key Concept
Email notifications and transcription are **add-ons**, not voicemail types. They can be enabled on top of ANY base experience.
:::

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                      VOICEMAIL ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  STEP 1: Choose Base Experience (pick ONE)                         │
│  ┌─────────────────────┐    ┌─────────────────────────────────┐    │
│  │   Voicemail Only    │    │   Callback + Wait Experience    │    │
│  │                     │    │                                 │    │
│  │ Caller → Greeting   │    │ Caller → Queue → Options Menu   │    │
│  │       → Record      │    │       → (callback/voicemail/    │    │
│  │       → Hang up     │    │          stay) → Resolution     │    │
│  └─────────────────────┘    └─────────────────────────────────┘    │
│                                                                     │
│  STEP 2: Add Features (optional, can apply to EITHER base)         │
│  ┌─────────────────────┐    ┌─────────────────────────────────┐    │
│  │ Email Notifications │    │       Transcription             │    │
│  │                     │    │                                 │    │
│  │ Audio attachment    │    │ Audio → Text conversion         │    │
│  │ sent to staff email │    │ Appears in Flex + email         │    │
│  └─────────────────────┘    └─────────────────────────────────┘    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Select Your Base Experience

### Decision Chart

| Question | Answer | Your Base Experience |
|----------|--------|---------------------|
| Does the caller need options while waiting? | **NO** - Direct to voicemail | → **Voicemail Only** |
| Does the caller need options while waiting? | **YES** - Queue with callback option | → **Callback + Wait** |

### Base Experience: Voicemail Only

**What callers experience:**
- Call comes in → Greeting plays → Record message → Hang up
- No hold queue, no callback option, no waiting

**Best for:**
- Dedicated voicemail lines (e.g., after-hours)
- Overflow handling when all agents busy
- Internal support lines (like Connie Care Team 877)
- Organizations without real-time queue capability

**Codebase feature:**
- `voicemail-only-with-email/` (dedicated feature)
- OR `callback-and-voicemail-with-email?voicemailOnly=true` (parameter approach)

**Setup guide:** → [Voicemail-Only Configuration](./voicemail-only-configuration)

---

### Base Experience: Callback + Wait

**What callers experience:**
- Call comes in → Enter queue with hold music
- Press * anytime → Options menu (callback / voicemail / stay on hold)
- Professional wait experience with caller choice

**Best for:**
- Full-service lines where callers may want to wait
- Organizations with agents available to take callbacks
- High-volume lines needing caller options
- Crisis hotlines with overflow needs

**Codebase feature:**
- `callback-and-voicemail/` (without email)
- `callback-and-voicemail-with-email/` (with email add-on)

**Setup guide:** → [Callback + Wait Setup](./callback-voicemail-setup)

---

## Step 2: Select Your Add-ons

Add-ons enhance the base experience. They are **independent** of which base you choose.

### Decision Chart: Email Notifications

| Question | Answer | Action |
|----------|--------|--------|
| Does staff need email alerts with audio attachment? | **YES** | → Enable Email Add-on |
| Does staff need email alerts with audio attachment? | **NO** | → Skip (voicemails in Flex only) |

**What it provides:**
- Instant email when voicemail recorded
- Audio attachment (MP3) in email
- Caller info (number, timestamp, duration)
- Transcription in email body (if transcription add-on enabled)

**Requirements:**
- Mailgun account and API key
- DNS configuration for sending domain

**Setup guide:** → [Email Notifications Add-on](/techops/feature-deployment/feature-management/channels/voice/add-ons/email-notifications)

---

### Decision Chart: Transcription

| Question | Answer | Action |
|----------|--------|--------|
| Do you need voicemail audio converted to text? | **YES** | → Enable Transcription |
| Do you need voicemail audio converted to text? | **NO** | → Skip |

**What it provides:**
- Automatic audio-to-text conversion
- Transcription appears in Flex task
- Transcription included in email (if email add-on enabled)
- Searchable message content

**Requirements:**
- Twilio's built-in transcription (no additional account needed)
- Proper `transcribeCallback` URL configuration

**Setup guide:** → [Transcription Add-on](/techops/feature-deployment/feature-management/channels/voice/add-ons/transcription)

---

## Common Configurations

### Configuration Matrix

| Use Case | Base Experience | Email | Transcription | Feature Directory |
|----------|-----------------|-------|---------------|-------------------|
| After-hours line, email alerts | Voicemail Only | Yes | Optional | `voicemail-only-with-email/` |
| After-hours line, Flex only | Voicemail Only | No | Optional | `callback-and-voicemail?voicemailOnly=true` |
| Full-service with email | Callback + Wait | Yes | Optional | `callback-and-voicemail-with-email/` |
| Full-service, Flex only | Callback + Wait | No | Optional | `callback-and-voicemail/` |

---

## Real-World Use Cases

### Example 1: Nonprofit After-Hours Line

**Scenario:** Community food bank needs after-hours voicemail for donation inquiries

| Decision | Choice | Reason |
|----------|--------|--------|
| Base Experience | Voicemail Only | No agents available after-hours to receive callbacks |
| Email Add-on | Yes | Morning staff sees overnight messages in email |
| Transcription | Optional | Nice-to-have but not required |

**Result:** Callers hear greeting → leave message → task created in Flex → email sent to admin

---

### Example 2: Crisis Hotline Overflow

**Scenario:** Mental health org needs overflow when all counselors busy

| Decision | Choice | Reason |
|----------|--------|--------|
| Base Experience | Callback + Wait | Callers may want to wait for next available counselor |
| Email Add-on | Yes | Ensure no messages missed |
| Transcription | Yes | Quick triage without listening to full audio |

**Result:** Caller enters queue → can request callback, leave voicemail, or stay on hold → all options documented

---

### Example 3: Internal Support Line (Connie Care Team 877)

**Scenario:** Internal support for child accounts

| Decision | Choice | Reason |
|----------|--------|--------|
| Base Experience | Voicemail Only | All inquiries should be documented, no real-time queue needed |
| Email Add-on | Yes | Team needs immediate notification |
| Transcription | Yes | Quick review and routing |

**Result:** Direct to voicemail → transcription in Flex task → email with audio and transcript

---

### Example 4: Adding Second Line to Existing Account

**Scenario:** NSS already has callback-and-voicemail deployed, wants to add voicemail-only line

| Decision | Choice | Reason |
|----------|--------|--------|
| Approach | Parameter (`?voicemailOnly=true`) | Zero additional deployment, reuses existing infrastructure |
| Email Add-on | Uses existing | Same Mailgun configuration |
| Transcription | Uses existing | Same transcription setup |

**Result:** New phone number → new Studio Flow → add parameter to URL → done

---

## Deployment Checklist

:::tip Full Deployment Guide
For complete deployment instructions including troubleshooting and account setup, see the [Account-Specific Deployment Guide](/techops/codebase/deployment/account-specific-deployment).
:::

### For All Configurations

```bash
# 1. Ensure you're in the correct account directory
cd /path/to/basecamp-v26.02/serverless-functions

# 2. Deploy serverless functions (CRITICAL: use deploy.sh, not npm run deploy)
./deploy.sh <account-name>

# 3. Verify deployment
twilio serverless:list --properties functionSid,friendlyName
```

Available accounts: `nss`, `conniecareteam`, `hhovv`, `devsandbox`

:::danger Account-Specific Deployment
**WRONG:** `npm run deploy` (uses default .env, may deploy to wrong account)

**RIGHT:** `./deploy.sh <account>` (loads account-specific .env)

See [Why This Matters](/techops/codebase/deployment/account-specific-deployment#why-this-matters) for the incident that created this protocol.
:::

---

## Critical Technical Notes

### Studio Flow Widget Type

When creating Studio Flows with TwiML redirect widgets:

```json
// WRONG - This type doesn't exist
"type": "twiml-redirect"

// RIGHT - Use the correct type
"type": "add-twiml-redirect"
```

### Workflow SID Variable

The environment variable for workflow is:

```bash
# CORRECT
TWILIO_FLEX_CALLBACK_WORKFLOW_SID=WW...

# NOT this (doesn't exist)
VOICEMAIL_WORKFLOW_SID=WW...
```

### TranscriptionText Fetch

Twilio's `transcribeCallback` doesn't always include `TranscriptionText` in the payload. Your function must fetch it:

```javascript
// If TranscriptionText is missing, fetch from TranscriptionUrl
if (!transcriptionText && event.TranscriptionUrl) {
  const response = await axios.get(event.TranscriptionUrl + '.json', {
    auth: {
      username: context.ACCOUNT_SID,
      password: context.AUTH_TOKEN
    }
  });
  transcriptionText = response.data.transcription_text;
}
```

---

## Next Steps

1. **Choose your base experience** using the decision chart above
2. **Select your add-ons** based on client requirements
3. **Follow the specific setup guide** for your configuration
4. **Test thoroughly** before production deployment
5. **Document the configuration** for future reference

---

## Quick Reference Links

### Base Experiences
- [Voicemail-Only Configuration](./voicemail-only-configuration)
- [Callback + Wait Setup](./callback-voicemail-setup)

### Add-ons
- [Email Notifications](/techops/feature-deployment/feature-management/channels/voice/add-ons/email-notifications)
- [Transcription](/techops/feature-deployment/feature-management/channels/voice/add-ons/transcription)

### Email Provider Setup
- [Mailgun Setup](./email-providers/mailgun-setup)
- [SendGrid Setup](./email-providers/sendgrid-setup)

### Troubleshooting
- [Voice Troubleshooting](/techops/feature-deployment/feature-management/channels/voice/troubleshooting/)

:::tip Professional Services
If you prefer to have our team handle the implementation, professional services are available for all voicemail configurations. Contact your Connie representative for details.
:::
