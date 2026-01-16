---
sidebar_label: Common Issues
sidebar_position: 1
title: "Common Issues & Runbooks"
---

# Common Issues & Runbooks

Quick reference guide for common ConnieRTC support issues and their resolutions.

---

## Voice Issues

### Calls Not Reaching Flex

**Symptoms:** Callers hear ringing but no task appears in Flex

**Investigation:**
```bash
# Check phone number configuration
twilio api:core:incoming-phone-numbers:list | grep [PHONE_NUMBER]

# Verify Studio Flow is published
twilio api:studio:v2:flows:list
```

**Common Causes:**
- Phone number not configured with Studio Flow
- Studio Flow in draft status
- Webhook URL incorrect

---

### Voicemail Not Recording

**Symptoms:** Callers report leaving voicemail but no recording appears

**Investigation:**
```bash
# Check recent recordings
twilio api:core:recordings:list --limit 10

# Check function logs
twilio serverless:logs --service-sid [SERVICE_SID] --tail
```

**Common Causes:**
- Recording callback URL misconfigured
- Storage permissions issue
- Transcription service timeout

---

## SSO Issues

### "Session not found" Error

**Symptoms:** Users see session errors when logging into Flex via SSO

**Root Cause:** "Login using popup" not enabled in Twilio SSO settings

**Fix:**
1. Go to Flex → Admin → Single Sign-On
2. Enable "Login using popup" checkbox
3. Save configuration

This is required for iframe-embedded Flex instances due to third-party cookie restrictions.

---

### SAML Response Invalid

**Symptoms:** Auth0 returns error during SSO login

**Investigation:**
- Verify Auth0 certificate matches Twilio configuration
- Check SSO URL is exactly correct
- Verify Issuer matches Auth0 domain

---

## Task Issues

### Tasks Not Routing to Agents

**Symptoms:** Tasks appear in queue but agents don't receive them

**Investigation:**
```bash
# Check workflow configuration
twilio api:taskrouter:v1:workspaces:workflows:list --workspace-sid [WS_SID]

# Check agent status
twilio api:taskrouter:v1:workspaces:workers:list --workspace-sid [WS_SID]
```

**Common Causes:**
- Workflow filter doesn't match task attributes
- Agent not in correct queue
- Agent status not "Available"

---

## Email Notifications

### Voicemail Emails Not Arriving

**Symptoms:** Voicemails recorded but admin doesn't receive email

**Investigation:**
```bash
# Test Mailgun API
curl -s --user "api:[KEY]" \
  "https://api.mailgun.net/v3/[DOMAIN]/events?event=delivered&limit=5"
```

**Common Causes:**
- Wrong Mailgun API key (using private key instead of domain-specific)
- ADMIN_EMAIL environment variable not set
- Domain not verified in Mailgun

---

## Quick Diagnostic Commands

```bash
# Real-time function logs
twilio serverless:logs --service-sid [SERVICE_SID] --tail

# Recent failed calls
twilio api:core:calls:list --limit 10 --status failed

# Studio Flow executions
twilio api:studio:v2:flows:executions:list --flow-sid [FLOW_SID] --limit 10

# TaskRouter tasks
twilio api:taskrouter:v1:workspaces:tasks:list --workspace-sid [WS_SID] --limit 10
```

---

*For detailed debugging guidance, see [Debugging Best Practices](/techops/codebase/debugging).*
