---
sidebar_label: Flex + Auth0 SSO Setup
sidebar_position: 1
title: "Twilio Flex Account Provisioning with Auth0 SSO"
---

# Twilio Flex Account Provisioning Guide

**Complete Soup-to-Nuts Guide for Provisioning New Flex Accounts with Auth0 SSO**

```
Version: 1.1
Created: January 15, 2026
Author: CTO Agent
Last Updated: January 15, 2026
Changelog: v1.1 - Added critical "Login using popup" requirement for iframe SSO
```

---

## Overview

This guide documents the complete process for provisioning a new Twilio Flex account with:
- Auth0 SSO authentication (SAML 2.0)
- Vanity domain (e.g., `clientname.connie.team`)
- Professional branded iframe experience
- User accounts with role-based access
- Automated welcome emails

### What You'll Create

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPLETE PROVISIONING                        │
├─────────────────────────────────────────────────────────────────┤
│  ✓ Twilio Flex account configured                               │
│  ✓ Auth0 SAML application with SSO                              │
│  ✓ CloudFront + S3 hosted landing pages                         │
│  ✓ Vanity domain with SSL certificate                           │
│  ✓ User accounts with appropriate roles                         │
│  ✓ Welcome emails sent to new users                             │
└─────────────────────────────────────────────────────────────────┘
```

### Estimated Time

| Experience Level | Time Required |
|-----------------|---------------|
| First time | 2-3 hours |
| Experienced | 45-60 minutes |
| With automation | 20-30 minutes |

---

## Architecture

### High-Level Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         USER AUTHENTICATION FLOW                          │
└──────────────────────────────────────────────────────────────────────────┘

   User                 Vanity Domain              Twilio Flex           Auth0
    │                        │                          │                  │
    │  1. Navigate to        │                          │                  │
    │  client.connie.team    │                          │                  │
    │───────────────────────>│                          │                  │
    │                        │                          │                  │
    │  2. Landing page       │                          │                  │
    │<───────────────────────│                          │                  │
    │                        │                          │                  │
    │  3. Click "Login"      │                          │                  │
    │───────────────────────>│  4. Load Flex iframe     │                  │
    │                        │─────────────────────────>│                  │
    │                        │                          │                  │
    │                        │  5. Click "SSO"          │  6. SAML Request │
    │                        │                          │─────────────────>│
    │                        │                          │                  │
    │                        │                          │  7. Login prompt │
    │<─────────────────────────────────────────────────────────────────────│
    │                        │                          │                  │
    │  8. Enter credentials + MFA                       │                  │
    │─────────────────────────────────────────────────────────────────────>│
    │                        │                          │                  │
    │                        │                          │  9. SAML Response│
    │                        │                          │<─────────────────│
    │                        │                          │                  │
    │                        │  10. Authenticated!      │                  │
    │<───────────────────────│<─────────────────────────│                  │
```

### Component Details

| Component | Purpose | Management |
|-----------|---------|------------|
| Route 53 | DNS management | AWS Console |
| CloudFront | CDN + SSL termination | AWS Console |
| S3 | Static file hosting | AWS CLI |
| Auth0 | Identity provider (SAML SSO) | Auth0 Dashboard / API |
| Twilio Flex | Contact center UI | Twilio Console |
| Resend | Email delivery | Resend API |

---

## Prerequisites

### Required Access

- [ ] Twilio account with Flex provisioned
- [ ] Auth0 tenant access (`dev-kvn1kviua124ipex.us.auth0.com`)
- [ ] AWS CLI configured with appropriate permissions
- [ ] Route 53 access for `connie.team` zone
- [ ] Resend API access for welcome emails

### Required Tools

```bash
# Twilio CLI
npm install -g twilio-cli
twilio plugins:install @twilio-labs/plugin-flex

# AWS CLI
brew install awscli
aws configure

# Verify installations
twilio --version
aws --version
```

### Credentials Location

All credentials are stored at: `~/.claude/credentials/credentials.md`

---

## Phase 1: Twilio Account Setup

### 1.1 Gather Account Information

Before starting, collect:
- Twilio Account SID (format: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
- Twilio Auth Token
- Flex-friendly name (e.g., `clientname.connie.team`)

### 1.2 Add Account to Twilio CLI

```bash
# Add new profile
twilio profiles:create <ACCOUNT_SID> \
  --auth-token <AUTH_TOKEN> \
  -p <profile-name>

# Verify
twilio profiles:list
```

### 1.3 Verify Flex Configuration

```bash
# Fetch Flex config to verify account is set up
twilio api:flex:v1:configuration:fetch -p <profile-name>

# Get the Flex URL slug (runtime domain)
twilio api:flex:v1:configuration:fetch -p <profile-name> -o json | grep runtime_domain
```

---

## Phase 2: Auth0 SAML Application

### 2.1 Get Management API Token

```python
import urllib.request
import json

auth0_domain = "dev-kvn1kviua124ipex.us.auth0.com"
m2m_client_id = "BViCXzqlwzRHRkpmxmfvAqFDzta7f5nt"
m2m_client_secret = "<YOUR_CLIENT_SECRET>"

token_data = json.dumps({
    "client_id": m2m_client_id,
    "client_secret": m2m_client_secret,
    "audience": f"https://{auth0_domain}/api/v2/",
    "grant_type": "client_credentials"
}).encode()

req = urllib.request.Request(
    f"https://{auth0_domain}/oauth/token",
    data=token_data,
    headers={"Content-Type": "application/json"}
)

with urllib.request.urlopen(req) as response:
    token_response = json.loads(response.read().decode())
    access_token = token_response.get("access_token")
    print(f"Token obtained: {access_token[:20]}...")
```

### 2.2 Create SAML Application

```python
# Create the application
app_data = json.dumps({
    "name": "Twilio Flex <ClientName>",
    "description": "SAML SSO for <clientname>.connie.team Flex instance",
    "app_type": "regular_web",
    "callbacks": [],
    "allowed_origins": [
        "https://<clientname>.connie.team",
        "https://flex.twilio.com"
    ],
    "web_origins": [
        "https://<clientname>.connie.team",
        "https://flex.twilio.com"
    ],
    "grant_types": ["authorization_code", "implicit", "refresh_token"],
    "oidc_conformant": True
}).encode()
```

**Save the Client ID** - you'll need it for the SAML configuration.

### 2.3 Download SAML Certificate

```bash
curl -o ~/Downloads/<clientname>-auth0-cert.pem \
  "https://dev-kvn1kviua124ipex.us.auth0.com/pem"
```

---

## Phase 3: Twilio Flex SSO Configuration

### 3.1 Access Twilio Console

1. Go to: https://console.twilio.com
2. Switch to the target account
3. Navigate to: **Flex → Admin → Single Sign-On**

### 3.2 Create New SSO Configuration

Click **"Create new SSO/IdP Configuration"**

Twilio will provide:
- **Entity ID**: `urn:flex:JQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **ACS URL**: `https://login.flex.us1.twilio.com/login/callback?connection=JQxxxxxxxxx`

**Copy these values** - you'll need them to update Auth0.

### 3.3 Enter Auth0 IdP Information

| Field | Value |
|-------|-------|
| Friendly Name | `<clientname>.connie.team` |
| Identity Provider Issuer | `dev-kvn1kviua124ipex.us.auth0.com` |
| Single Sign-On URL | `https://dev-kvn1kviua124ipex.us.auth0.com/samlp/<AUTH0_CLIENT_ID>` |
| X.509 Certificate | (paste contents of the .pem file) |
| Default redirect URL | `https://<clientname>.connie.team` |

### 3.4 CRITICAL: Enable Login Using Popup

> **THIS IS REQUIRED FOR IFRAME EMBEDDING TO WORK**

In the Twilio SSO settings, find the **"Login using popup"** checkbox and **ENABLE IT**.

Without this setting, Auth0 will fail with session/cookie errors when accessed via iframe due to third-party cookie restrictions in modern browsers.

### 3.5 Configure Iframe Embedding

Navigate to **Flex → Contact Center Settings → Embed Flex as iFrame**

Add the vanity domain to the allowed URLs:
- `https://<clientname>.connie.team`

---

## Phase 4: Iframe Landing Pages

### 4.1 Directory Structure

```
/Users/cjberno/projects/connie/connie.team/iframe/<clientname>/
├── landing-professional.html      # Landing page (becomes index.html)
├── agent-desktop-professional.html # Flex iframe container
└── logout-success-professional.html # Post-logout page
```

See existing implementations for templates:
- `/Users/cjberno/projects/connie/connie.team/iframe/nss/`
- `/Users/cjberno/projects/connie/connie.team/iframe/southside/`

---

## Phase 5: AWS Infrastructure (S3 + CloudFront)

### 5.1 Create S3 Bucket

```bash
# Create bucket (use us-east-1 for CloudFront compatibility)
aws s3 mb s3://<clientname>-connie-team --region us-east-1

# Configure static website hosting
aws s3 website s3://<clientname>-connie-team \
  --index-document index.html \
  --error-document index.html
```

### 5.2 Upload Files

```bash
cd /Users/cjberno/projects/connie/connie.team/iframe/<clientname>

# Upload landing page as index.html
aws s3 cp landing-professional.html \
  s3://<clientname>-connie-team/index.html \
  --content-type "text/html"

# Upload agent desktop
aws s3 cp agent-desktop-professional.html \
  s3://<clientname>-connie-team/agent-desktop/index.html \
  --content-type "text/html"

# Upload Connie collateral (logos/images)
aws s3 cp /Users/cjberno/projects/connie/connie.team/Connie-Collateral/ \
  s3://<clientname>-connie-team/Connie-Collateral/ \
  --recursive
```

---

## Phase 6: DNS Configuration

### 6.1 Create DNS Record

```bash
cat > /tmp/dns-record.json <<'EOF'
{
    "Changes": [
        {
            "Action": "CREATE",
            "ResourceRecordSet": {
                "Name": "<clientname>.connie.team.",
                "Type": "CNAME",
                "TTL": 300,
                "ResourceRecords": [
                    {
                        "Value": "<cloudfront-domain>.cloudfront.net"
                    }
                ]
            }
        }
    ]
}
EOF

aws route53 change-resource-record-sets \
  --hosted-zone-id Z0761753LA835CJR31QV \
  --change-batch file:///tmp/dns-record.json
```

### 6.2 Verify DNS Propagation

```bash
dig <clientname>.connie.team +short
curl -sI https://<clientname>.connie.team
```

---

## Phase 7: User Provisioning

### 7.1 Create User via Auth0 Management API

```python
user_data = json.dumps({
    "email": "user@example.com",
    "email_verified": True,
    "name": "User Name",
    "password": "TempPassword123!",
    "connection": "Username-Password-Authentication",
    "app_metadata": {
        "flex": {
            "roles": ["admin"]  # or ["supervisor"] or ["agent"]
        }
    }
}).encode()
```

### 7.2 User Roles

| Role | Permissions |
|------|-------------|
| `admin` | Full access - configure, manage users, view all analytics |
| `supervisor` | Monitor agents, view team metrics, coach/barge |
| `agent` | Handle tasks, change availability, basic access |

---

## Verification Checklist

### Pre-Launch Checklist

```
[ ] Twilio Account
    [ ] CLI profile created and verified
    [ ] Flex configuration accessible
    [ ] Flex URL identified (flex.twilio.com/<slug>)

[ ] Auth0 Configuration
    [ ] SAML application created
    [ ] Client ID recorded
    [ ] SAML addon enabled
    [ ] Certificate downloaded

[ ] Twilio SSO
    [ ] SSO configuration created
    [ ] Auth0 IdP metadata entered
    [ ] **"Login using popup" ENABLED** (critical for iframe)
    [ ] Iframe embedding URLs configured

[ ] AWS Infrastructure
    [ ] S3 bucket created
    [ ] HTML files uploaded
    [ ] CloudFront distribution created
    [ ] SSL certificate attached

[ ] DNS
    [ ] CNAME record created
    [ ] DNS propagation verified
    [ ] HTTPS accessible
```

### Smoke Test

1. Open incognito browser
2. Navigate to `https://<clientname>.connie.team`
3. Click "Access Agent Desktop"
4. Click "Single Sign-On"
5. Enter user credentials
6. Complete MFA setup
7. Verify Flex loads with correct permissions

---

## Troubleshooting

### "Session not found" / Cookie errors

**MOST COMMON CAUSE:** "Login using popup" is NOT enabled in Twilio SSO settings

**Fix:**
1. Go to Flex → Manage → Single Sign-On
2. Enable the "Login using popup" checkbox
3. This is REQUIRED for iframe embedding

### "flex.twilio.com refused to connect" (CSP error)

**Fix:**
1. Go to Flex → Contact Center Settings → Embed Flex as iFrame
2. Add `https://<clientname>.connie.team` to the allowed URLs

### Invalid SAML Response

- Verify Auth0 certificate matches what's in Twilio
- Check SSO URL is exactly correct
- Verify Issuer matches

---

## Quick Reference Commands

```bash
# Get Auth0 Management Token
curl -s --request POST \
  --url "https://dev-kvn1kviua124ipex.us.auth0.com/oauth/token" \
  --header 'content-type: application/json' \
  --data '{"client_id":"BViCXzqlwzRHRkpmxmfvAqFDzta7f5nt","client_secret":"<SECRET>","audience":"https://dev-kvn1kviua124ipex.us.auth0.com/api/v2/","grant_type":"client_credentials"}'

# List S3 Buckets
aws s3 ls | grep connie

# Check CloudFront Distributions
aws cloudfront list-distributions --query "DistributionList.Items[*].{Id:Id,Domain:DomainName,Alias:Aliases.Items[0]}" --output table

# Invalidate CloudFront Cache
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"

# Check DNS
dig <clientname>.connie.team +short
```

---

**Document Version:** 1.1
**Last Updated:** January 15, 2026
