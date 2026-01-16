---
sidebar_label: Troubleshooting
sidebar_position: 6
title: "Authentication Troubleshooting Guide"
---

# Authentication Troubleshooting Guide

Comprehensive troubleshooting guide for Auth0 + Twilio Flex SSO issues.

## 🎯 Using This Guide

This guide is organized by **symptom** → **diagnosis** → **fix** for common authentication issues.

**Quick Navigation:**
- [Wrong Pattern Issues](#-wrong-pattern-issues)
- [Login Failures](#-login-failures)
- [Team Visibility Problems](#-team-visibility-problems)
- [Permission Issues](#-permission-issues)
- [SAML Errors](#-saml-errors)

---

## 🚨 Wrong Pattern Issues

### Users from Organization B Appearing in Organization A

**Symptom:**
- HHOVV users showing up in NSS's Auth0 tenant
- Users from one nonprofit seeing another nonprofit's teams
- Cross-organization visibility in Flex Teams View

**Root Cause:**
Pattern A (multi-program) architecture used when Pattern B (isolated organizations) was required.

**Diagnosis:**
1. Review [Decision Matrix](/platform-developers/authentication/overview#-decision-matrix-which-pattern)
2. Confirm organizations are legally independent entities
3. Check Auth0 tenant - are users from multiple orgs present?

**Fix: Migrate to Pattern B**

**Step 1: Create Separate Auth0 Tenant for Organization B**
```
Follow: Pattern B Documentation
Guide: /platform-developers/authentication/pattern-b-isolated
```

**Step 2: Recreate Organization B Users**
- Add Organization B users to new Auth0 tenant
- Configure app_metadata with appropriate roles
- Do NOT copy Organization A's team attributes

**Step 3: Configure Separate Flex Instance (if needed)**
- Organization B may need separate Twilio account
- Verify separate Flex instance SID
- Configure SSO with new Auth0 tenant

**Step 4: Test Isolation**
- Login as Organization A user → Should NOT see Organization B
- Login as Organization B user → Should NOT see Organization A
- Verify complete separation

**Step 5: Clean Up**
- Remove Organization B users from Organization A's Auth0
- Update documentation
- Notify users of any URL changes

**Prevention:**
- Always use [Decision Matrix](/platform-developers/authentication/overview#-decision-matrix-which-pattern) before onboarding
- Document pattern choice with rationale
- Review with CEO when uncertain

---

### Over-Complicated Setup for Single Organization

**Symptom:**
- Separate Auth0 tenants for programs within same nonprofit
- Multiple vanity domains for same organization
- Excessive complexity in user management

**Root Cause:**
Pattern B (isolated) used when Pattern A (multi-program) was sufficient.

**Diagnosis:**
1. Are all programs part of same legal entity?
2. Does senior leadership need oversight across all programs?
3. Would team-based segmentation suffice?

**Fix: Consolidate to Pattern A**

**Benefits:**
- Single Auth0 tenant to manage
- Centralized user administration
- Senior staff can see all programs
- Simpler maintenance

**Migration Path:**
```
Follow: Pattern A Documentation
Guide: /platform-developers/authentication/pattern-a-multi-program
```

---

## 🔐 Login Failures

### Login Redirect Loop

**Symptom:**
- User enters credentials successfully
- Redirected to Auth0 repeatedly
- Never reaches Flex UI

**Common Causes:**
1. Incorrect callback URLs in Auth0
2. Wrong Flex instance SID in callback URL
3. SAML metadata mismatch

**Diagnosis Steps:**

**Check 1: Verify Callback URLs in Auth0**
```
Auth0 Dashboard → Applications → [Flex App] → Settings

Expected:
https://iam.twilio.com/v2/saml2/authenticate/[FLEX_INSTANCE_SID]
https://iam.twilio.com/v2/saml2/authenticate/[FLEX_INSTANCE_SID]/callback
```

**Check 2: Verify Flex Instance SID**
```
Twilio Console → Flex → Admin
Note Flex Instance SID (starts with FO...)
Compare to callback URL in Auth0
```

**Check 3: Review Auth0 Logs**
```
Auth0 Dashboard → Monitoring → Logs
Look for: "Callback URL mismatch" errors
```

**Fix:**
1. Update Auth0 callback URLs with correct Flex instance SID
2. Ensure callback URLs match exactly (case-sensitive)
3. Save changes and test login again

---

### "Unauthorized" Error After Login

**Symptom:**
- Login to Auth0 successful
- Redirected to Flex
- "Unauthorized" or "Access Denied" error

**Common Causes:**
1. User has no `flex.roles` in app_metadata
2. Auth0 Action not deployed
3. SAML attributes not mapped in Flex

**Diagnosis Steps:**

**Check 1: Verify User Metadata**
```
Auth0 Dashboard → Users → [User] → app_metadata

Expected:
{
  "flex": {
    "roles": ["agent"] // or supervisor/admin
  }
}

Missing or empty? → Add roles
```

**Check 2: Verify Action Deployed**
```
Auth0 Dashboard → Actions → Library → [Add Flex Roles to SAML]

Status should show: "Deployed"
Not deployed? → Click Deploy button
```

**Check 3: Verify Action in Login Flow**
```
Auth0 Dashboard → Actions → Flows → Login

Your action should be between "Start" and "Complete"
Missing? → Drag action into flow, click Apply
```

**Check 4: Verify Attribute Mapping in Flex**
```
Twilio Console → Flex → Single Sign-On → Attribute Mapping

Verify:
- email → email
- full_name → full_name
- roles → roles

Missing? → Add mapping, save
```

**Fix Priority:**
1. Add roles to user metadata (most common)
2. Deploy Auth0 Action
3. Add action to login flow
4. Verify attribute mapping
5. User must re-login after changes

---

### "Invalid SAML Response" Error

**Symptom:**
- Error message after Auth0 redirect
- Flex rejects SAML response
- Technical error details shown

**Common Causes:**
1. Expired SAML certificate
2. Incorrect Auth0 metadata URL in Flex
3. Clock skew between Auth0 and Twilio
4. Wrong Identity Provider selected

**Diagnosis Steps:**

**Check 1: Verify Auth0 Metadata URL**
```
Twilio Console → Flex → SSO → Identity Providers

Metadata URL should be:
https://YOUR_TENANT.auth0.com/samlp/metadata/YOUR_CLIENT_ID

Incorrect? → Update and save
```

**Check 2: Check Certificate Expiration**
```
Auth0 Dashboard → Applications → [Flex App] → Addons → SAML2

View certificate expiration date
Expired? → Rotate certificate, update Flex metadata
```

**Check 3: Re-fetch Metadata in Flex**
```
Twilio Console → Flex → SSO
Click "Re-fetch Metadata" next to Auth0 IdP
This updates certificate automatically
```

**Fix:**
1. Verify correct metadata URL in Flex
2. Re-fetch metadata to get latest certificate
3. Test login again
4. If still failing, check Twilio SSO logs for specific error

---

## 👥 Team Visibility Problems

### Users See All Teams Instead of Own Team

**Symptom:**
- Team attribute configured in Auth0
- User still sees all teams in Flex Teams View
- Team filtering not working

**Pattern:** This is a Pattern A issue only

**Common Causes:**
1. Auth0 Action doesn't include team attribute code
2. Action not deployed
3. User missing `flex.team` in app_metadata
4. Attribute not mapped in Flex SSO

**Diagnosis Steps:**

**Check 1: Verify User Has Team Attribute**
```
Auth0 Dashboard → Users → [User] → app_metadata

Expected (for non-admin):
{
  "flex": {
    "roles": ["supervisor"],
    "team": "RAMP"  // ← Must be present
  }
}

Missing? → Add team attribute
```

**Check 2: Verify Action Code Includes Team**
```
Auth0 Dashboard → Actions → [Add Flex Roles to SAML] → Code

Must include:
const flexTeam = event.user.app_metadata?.flex?.team;
if (flexTeam) {
  api.samlResponse.setAttribute('team', flexTeam);
}

Missing? → Use Pattern A action code
```

**Check 3: Verify Action Deployed**
```
Auth0 Actions → Library → [Action]
Status: "Deployed"

Not deployed? → Click Deploy
```

**Check 4: Check SAML Response**
```
Auth0 Dashboard → Monitoring → Logs → Success Login

Look for SAML attributes:
- Should include "team": "RAMP"
- Missing? → Action issue

View full SAML response for details
```

**Check 5: Verify Flex Attribute Mapping**
```
Twilio Console → Flex → SSO → Attribute Mapping

Verify mapping exists:
Flex: team ← SAML: team

Missing? → Add mapping, save
```

**Fix Priority:**
1. Add `flex.team` to user app_metadata
2. Update Action code to include team attribute (Pattern A version)
3. Deploy Action
4. Add team attribute mapping in Flex
5. User must re-login for changes to apply

---

### Supervisor Sees Wrong Team Members

**Symptom:**
- Supervisor has team attribute
- Sees different team than expected
- Or sees no team members at all

**Common Causes:**
1. Team name mismatch (case-sensitivity)
2. Agents have different team name
3. Agents not logged in since team attribute added

**Diagnosis Steps:**

**Check 1: Verify Team Name Consistency**
```
Check supervisor metadata:
{
  "flex": {"team": "RAMP"}  // Note exact spelling/case
}

Check agent metadata:
{
  "flex": {"team": "ramp"}  // ← MISMATCH! Case different
}

Team names must match EXACTLY (case-sensitive)
```

**Check 2: Verify Agents Have Logged In Recently**
```
Team attributes only apply after login
If agents haven't logged in since attribute added:
→ Their worker records don't have team attribute yet

Fix: Ask agents to login once
```

**Check 3: Verify Worker Attributes in TaskRouter**
```
Twilio Console → TaskRouter → Workers

For each worker, check attributes:
Should include: "team": "RAMP"

Missing? → User needs to re-login
```

**Fix:**
1. Standardize team names (recommend: UPPERCASE or CamelCase)
2. Update all users in same team to exact same spelling
3. Have all team members re-login
4. Verify team visibility in Flex Teams View

**Recommended Team Naming:**
```
✅ Good: "RAMP", "AdultDayCare", "HomeHealth"
❌ Bad: "ramp", "ADULT day care", "Home_Health"

Use consistent casing and no spaces
```

---

### Admin User Only Sees Own Team

**Symptom:**
- User has admin role
- Expected to see all teams
- Only sees one team or no teams

**Root Cause:**
Admin user incorrectly has team attribute set.

**Diagnosis:**
```
Auth0 Dashboard → Users → [Admin User] → app_metadata

❌ Incorrect:
{
  "flex": {
    "roles": ["admin"],
    "team": "RAMP"  // ← Remove this for admins
  }
}

✅ Correct:
{
  "flex": {
    "roles": ["admin"]
  }
}
```

**Fix:**
1. Remove `team` attribute from admin users
2. Only `roles: ["admin"]` should be present
3. Admin must re-login
4. Should now see all teams

**Rule:** Admins should NEVER have a team attribute. No team = see all teams.

---

## 🔑 Permission Issues

### Agent Has Supervisor Controls

**Symptom:**
- User configured as agent
- Supervisor features visible in UI
- Can monitor other agents

**Root Cause:**
Incorrect role in app_metadata.

**Diagnosis:**
```
Auth0 Dashboard → Users → [User] → app_metadata

Check roles array:
{
  "flex": {
    "roles": ["supervisor"]  // ← Should be ["agent"]
  }
}

Or check for typo:
"roles": ["superviser"]  // ← Typo! Should be "supervisor"
```

**Fix:**
1. Correct role to `["agent"]`
2. Fix any typos in role names
3. User must re-login
4. Supervisor controls should disappear

**Valid Roles:**
- `admin` - Full administrative access
- `supervisor` - Team oversight and monitoring
- `agent` - Frontline task handling

Case-sensitive, must be lowercase.

---

### Supervisor Lacks Expected Features

**Symptom:**
- User configured as supervisor
- Missing barge/coach/monitor features
- Looks like agent view

**Common Causes:**
1. Role misspelled in metadata
2. Flex permissions not configured
3. Feature flags disabled

**Diagnosis Steps:**

**Check 1: Verify Role Spelling**
```
Auth0 → Users → [User] → app_metadata

❌ Wrong: "superviser", "Supervisor", "SUPERVISOR"
✅ Right: "supervisor" (lowercase, correct spelling)
```

**Check 2: Verify SAML Attribute Passed**
```
Auth0 Logs → Success Login → SAML Response

Should show: "roles": "supervisor"
Missing? → Action issue
```

**Check 3: Check Worker Attributes**
```
Twilio TaskRouter → Workers → [Worker]

Attributes should include: "roles": "supervisor"
Missing? → User needs to re-login
```

**Fix:**
1. Correct role spelling to `supervisor`
2. Verify Action passing roles attribute
3. User re-login
4. Check Flex configuration for supervisor features enabled

---

## 🔧 SAML Errors

### "Audience Mismatch" Error

**Symptom:**
- SAML validation fails
- Error mentions "Audience" or "Recipient"

**Root Cause:**
Auth0 SAML config has wrong Flex instance SID.

**Diagnosis:**
```
Auth0 → Applications → [Flex App] → Addons → SAML2

Check "audience" field:
Should be: https://iam.twilio.com/v2/saml2/metadata/[YOUR_FLEX_SID]

Compare Flex SID to actual Flex instance SID
```

**Fix:**
1. Get correct Flex instance SID from Twilio Console
2. Update Auth0 SAML audience URL
3. Update Auth0 SAML recipient URL
4. Save changes
5. Test login

---

### "Certificate Validation Failed"

**Symptom:**
- SAML certificate error
- "Invalid signature" message

**Root Cause:**
SAML certificate expired or Flex has old certificate.

**Fix:**
```
Twilio Console → Flex → SSO → Identity Providers

For Auth0 provider:
→ Click "Re-fetch Metadata"
→ This updates certificate automatically
→ Test login
```

If still failing:
```
Auth0 → Applications → [Flex App] → Addons → SAML2
→ Check certificate expiration date
→ If expired, rotate certificate in Auth0
→ Re-fetch metadata in Flex
```

---

## 🔍 Diagnostic Tools

### Auth0 Real-Time Logs

**Access:**
```
Auth0 Dashboard → Monitoring → Logs
```

**Key Events to Monitor:**
- `Success Login` - Normal SSO flow
- `Failed Login` - Authentication failures
- `Warning` - Non-fatal issues
- `Error` - Critical failures (Actions, SAML)

**Useful Filters:**
```
Type: Failed Login
Type: Error
Application: [Your Flex App]
User: user@example.com
```

---

### SAML Tracer (Browser Extension)

**Tool:** SAML-tracer browser extension

**Purpose:** Inspect SAML requests/responses in real-time

**How to Use:**
1. Install SAML-tracer extension
2. Open extension
3. Attempt SSO login
4. Review SAML request and response
5. Verify attributes present

**What to Check:**
- ✅ SAML request includes correct destination
- ✅ SAML response includes email, full_name, roles
- ✅ SAML response includes team (Pattern A)
- ✅ Certificate signature valid

---

### Twilio SSO Logs

**Access:**
```
Twilio Console → Monitor → Logs → Errors
```

**Filter by:**
```
Product: Flex
Category: SSO
```

**Common Errors:**
- `SAML_VALIDATION_FAILED` - Invalid SAML response
- `ATTRIBUTE_MAPPING_ERROR` - Required attribute missing
- `IDP_UNREACHABLE` - Can't fetch Auth0 metadata

---

## 📋 Troubleshooting Checklist

When authentication issues occur, work through this checklist:

### Level 1: User Metadata
- [ ] User exists in correct Auth0 tenant
- [ ] `flex.roles` array present and valid
- [ ] `flex.team` set correctly (Pattern A, non-admin)
- [ ] Spelling and case correct

### Level 2: Auth0 Action
- [ ] Action exists in Auth0 Library
- [ ] Action deployed (shows "Deployed" status)
- [ ] Action added to Login Flow
- [ ] Action code matches pattern (A or B)
- [ ] No syntax errors in action code

### Level 3: SAML Configuration
- [ ] Auth0 SAML application configured
- [ ] Correct Flex instance SID in audience
- [ ] Callback URLs in Auth0 match Flex
- [ ] SAML certificate not expired
- [ ] Metadata URL correct in Flex

### Level 4: Flex SSO Configuration
- [ ] SSO enabled in Flex
- [ ] Identity Provider added with correct metadata
- [ ] Attribute mapping configured
- [ ] Vanity domain set correctly
- [ ] DNS configured (if custom domain)

### Level 5: Pattern Validation
- [ ] Correct pattern chosen (A vs B)
- [ ] Pattern implementation matches guide
- [ ] No cross-contamination between orgs
- [ ] Team attributes used appropriately

---

## 🆘 Escalation Path

If troubleshooting steps don't resolve the issue:

**Step 1: Check Documentation**
- Review [Overview](/platform-developers/authentication/overview)
- Confirm pattern choice with [Decision Matrix](/platform-developers/authentication/overview#-decision-matrix-which-pattern)
- Re-read applicable pattern guide

**Step 2: Collect Diagnostic Info**
- Auth0 logs (last 10 events)
- Twilio Flex SSO logs
- User's app_metadata (redact sensitive info)
- SAML tracer output (if available)
- Screenshots of error messages

**Step 3: Contact Support**
- **Twilio Support:** For Flex SSO configuration issues
- **Auth0 Support:** For Auth0-specific SAML issues
- **Connie Support:** For pattern guidance and architecture questions

---

## 📖 Related Documentation

- **Overview:** [Identity Architecture](/platform-developers/authentication/overview)
- **Pattern A:** [Multi-Program Setup](/platform-developers/authentication/pattern-a-multi-program)
- **Pattern B:** [Isolated Organizations](/platform-developers/authentication/pattern-b-isolated)
- **Auth0 Config:** [Auth0 Configuration Guide](/platform-developers/authentication/auth0-configuration)
- **Flex SSO:** [Twilio Flex SSO Setup](/platform-developers/authentication/twilio-flex-sso)
- **Testing:** [Testing Checklist](/platform-developers/authentication/testing-checklist)

---

:::tip Prevention is Better Than Cure
Most authentication issues stem from:
1. Wrong pattern choice (use Decision Matrix!)
2. Typos in team names or roles (case-sensitive!)
3. Forgetting to re-login after metadata changes

Take time during initial setup to get it right. Fixing later is more painful!
:::
