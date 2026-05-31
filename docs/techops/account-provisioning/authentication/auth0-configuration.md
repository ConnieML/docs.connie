---
sidebar_label: Auth0 Configuration
sidebar_position: 4
title: "Auth0 Configuration Reference"
---

# Auth0 Configuration Reference

Complete technical reference for configuring Auth0 for Twilio Flex SSO integration.

## 🎯 Purpose

This guide provides detailed Auth0 configuration steps applicable to both Pattern A and Pattern B deployments.

**Prerequisites:**
- Auth0 tenant with admin access
- Understanding of your deployment pattern ([Pattern A](/techops/account-provisioning/authentication/pattern-a-multi-program) or [Pattern B](/techops/account-provisioning/authentication/pattern-b-isolated))
- Twilio Flex instance details

---

## 🏗️ Auth0 Architecture for Flex

```mermaid
graph LR
    A[User] -->|Login| B[Auth0 Tenant]
    B -->|Post-Login Action| C[Add Metadata to SAML]
    C -->|SAML Response| D[Twilio Flex]
    D -->|Authenticated| E[Flex UI]

    style B fill:#fff4e1
    style D fill:#ffd4e5
```

**Flow:**
1. User enters credentials at vanity domain
2. Auth0 authenticates user
3. Post-Login Action adds user metadata to SAML response
4. SAML response sent to Twilio Flex
5. Flex validates and grants access based on attributes

---

## 📋 User Metadata Structure

Auth0 stores Flex-specific metadata in each user's `app_metadata` field.

### Metadata Schema

```json
{
  "flex": {
    "roles": ["admin" | "supervisor" | "agent"],
    "team": "TeamName"  // Optional: Pattern A only
  },
  "program": "ProgramName"  // Optional: Pattern A tracking
}
```

### Field Definitions

| Field | Required | Type | Purpose | Pattern |
|-------|----------|------|---------|---------|
| `flex.roles` | ✅ Yes | Array | Flex permission level | A & B |
| `flex.team` | ⚠️ Conditional | String | Team visibility filter | A only |
| `program` | ❌ Optional | String | Usage tracking | A only |

---

## 👥 Role Definitions

### Admin Role
```json
{
  "flex": {
    "roles": ["admin"]
  }
}
```

**Permissions:**
- ✅ Full Flex administrative access
- ✅ See all teams (Pattern A)
- ✅ Configure workflows and queues
- ✅ Access to supervisor features
- ✅ View all analytics and reports

**Use Case:** Senior executives, platform administrators, IT staff

---

### Supervisor Role
```json
{
  "flex": {
    "roles": ["supervisor"],
    "team": "RAMP"  // Pattern A: Restrict to team
  }
}
```

**Permissions:**
- ✅ Monitor assigned team members
- ✅ View team performance metrics
- ✅ Coach and monitor agents
- ✅ Barge, whisper, transfer capabilities
- ⚠️ Limited to own team (if team attribute set)

**Use Case:** Team leads, program supervisors, department managers

---

### Agent Role
```json
{
  "flex": {
    "roles": ["agent"],
    "team": "RAMP"  // Pattern A: Restrict to team
  }
}
```

**Permissions:**
- ✅ Accept and handle tasks
- ✅ Access agent desktop
- ✅ Change availability status
- ❌ No supervisor features
- ❌ No administrative access

**Use Case:** Frontline staff, call center agents, support representatives

---

## 🔧 Auth0 Post-Login Actions

Auth0 Actions execute during the authentication flow to pass metadata to Flex via SAML.

### Pattern A Action (Multi-Program)

**Use When:** Single organization with multiple programs using team segmentation.

**Action Code:**

```javascript
/**
 * Auth0 Post-Login Action: Add Flex Roles to SAML Response
 * Pattern: A - Multi-Program Organization
 * Purpose: Pass user metadata including team attributes to Flex
 */
exports.onExecutePostLogin = async (event, api) => {
  // Get Flex roles from user's app_metadata
  const flexRoles = event.user.app_metadata?.flex?.roles || ['agent'];
  const flexTeam = event.user.app_metadata?.flex?.team;
  const program = event.user.app_metadata?.program;

  // Set SAML attributes that Twilio Flex requires
  api.samlResponse.setAttribute('email', event.user.email);

  // Build full name from available user data
  const fullName = event.user.name ||
    [event.user.given_name, event.user.family_name].filter(Boolean).join(' ') ||
    event.user.email.split('@')[0];

  api.samlResponse.setAttribute('full_name', fullName);
  api.samlResponse.setAttribute('roles', flexRoles.join(','));

  // CRITICAL: Add team attribute for Teams View filtering
  if (flexTeam) {
    api.samlResponse.setAttribute('team', flexTeam);
  }

  // Add program attribute for usage tracking
  if (program) {
    api.samlResponse.setAttribute('program', program);
  }
};
```

**SAML Attributes Passed:**
- `email` - User's email address
- `full_name` - Display name in Flex
- `roles` - Comma-separated role list
- `team` - Team name for visibility filtering (if set)
- `program` - Program name for tracking (if set)

**📸 Screenshot Placeholder:**
```
[Screenshot: Auth0 Actions - Pattern A Code]
Description: Shows the complete Pattern A action code with team and program attributes
Location: Auth0 → Actions → Library → Add Flex Roles to SAML
```

---

### Pattern B Action (Isolated Organizations)

**Use When:** Completely independent organizations with no internal team segmentation.

**Action Code:**

```javascript
/**
 * Auth0 Post-Login Action: Add Flex Roles to SAML Response
 * Pattern: B - Isolated Organization
 * Purpose: Pass user metadata without team attributes
 */
exports.onExecutePostLogin = async (event, api) => {
  // Get Flex roles from user's app_metadata
  const flexRoles = event.user.app_metadata?.flex?.roles || ['agent'];

  // Set SAML attributes that Twilio Flex requires
  api.samlResponse.setAttribute('email', event.user.email);

  // Build full name from available user data
  const fullName = event.user.name ||
    [event.user.given_name, event.user.family_name].filter(Boolean).join(' ') ||
    event.user.email.split('@')[0];

  api.samlResponse.setAttribute('full_name', fullName);
  api.samlResponse.setAttribute('roles', flexRoles.join(','));
};
```

**SAML Attributes Passed:**
- `email` - User's email address
- `full_name` - Display name in Flex
- `roles` - Comma-separated role list

**Note:** Team attributes typically not needed for Pattern B since entire organization shares access.

**📸 Screenshot Placeholder:**
```
[Screenshot: Auth0 Actions - Pattern B Code]
Description: Shows the simpler Pattern B action code without team attributes
Location: Auth0 → Actions → Library → Add Flex Roles to SAML
```

---

## 🚀 Action Deployment Steps

### Creating a New Action

**1. Navigate to Actions**
- Auth0 Dashboard: `https://manage.auth0.com/dashboard/`
- Go to **Actions** → **Library**

**2. Create Custom Action**
- Click **Build Custom** (top right)
- **Name:** `Add Flex Roles to SAML - [Organization Name]`
- **Trigger:** Post-Login
- **Runtime:** Node 18 (recommended)

**3. Add Action Code**
- Copy appropriate code (Pattern A or Pattern B above)
- Paste into code editor
- Update comments with organization name

**4. Deploy Action**
- Click **Deploy** button (top right)
- Wait for deployment confirmation

**5. Add to Login Flow**
- Navigate to **Actions** → **Flows** → **Login**
- Click **Custom** tab
- Drag your action into the flow
- Position: Between "Start" and "Complete"
- Click **Apply**

**📸 Screenshot Placeholders:**
```
[Screenshot: Auth0 Actions - Create Custom Action]
Description: Shows the "Build Custom" button and action creation form
Location: Auth0 → Actions → Library

[Screenshot: Auth0 Actions - Deployment Confirmation]
Description: Shows successful deployment message and Deploy button
Location: Auth0 → Actions → [Action] → Code Editor

[Screenshot: Auth0 Actions - Login Flow]
Description: Shows action added to login flow between Start and Complete
Location: Auth0 → Actions → Flows → Login
```

---

## 📝 Managing User Metadata

### Via Auth0 Dashboard (Manual)

**For Individual Users:**

1. **Navigate to User**
   - Auth0 Dashboard → **User Management** → **Users**
   - Search for user by email
   - Click user to open profile

2. **Edit Metadata**
   - Scroll to **Metadata** section
   - Click **app_metadata** tab
   - Click **Edit** (pencil icon)

3. **Add Flex Metadata**
   ```json
   {
     "flex": {
       "roles": ["supervisor"],
       "team": "RAMP"
     },
     "program": "RAMP"
   }
   ```

4. **Save Changes**
   - Click **Save**
   - User must login again for changes to take effect

**📸 Screenshot Placeholder:**
```
[Screenshot: Auth0 - User Metadata Editor]
Description: Shows the app_metadata JSON editor with example metadata
Location: Auth0 → Users → [User] → Metadata → app_metadata
```

---

### Via Auth0 Management API (Automated)

**For Bulk Operations or Automation:**

```javascript
// Example: Update user metadata via Management API
const axios = require('axios');

const updateUserMetadata = async (userId, metadata) => {
  const auth0Domain = 'YOUR_AUTH0_TENANT.us.auth0.com';
  const managementToken = 'YOUR_MANAGEMENT_API_TOKEN';

  const response = await axios.patch(
    `https://${auth0Domain}/api/v2/users/${userId}`,
    {
      app_metadata: metadata
    },
    {
      headers: {
        'Authorization': `Bearer ${managementToken}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};

// Usage
await updateUserMetadata('auth0|691e32d4889ef6e2a3f0626f', {
  flex: {
    roles: ['supervisor'],
    team: 'RAMP'
  },
  program: 'RAMP'
});
```

**API Reference:** [Auth0 Management API - Users](https://auth0.com/docs/api/management/v2#!/Users/patch_users_by_id)

---

## 🔍 Debugging SAML Attributes

### View SAML Response in Auth0 Logs

**1. Initiate Test Login**
- Attempt login via vanity domain
- Complete authentication flow

**2. View Real-Time Logs**
- Auth0 Dashboard → **Monitoring** → **Logs**
- Find recent "Success Login" event
- Click to expand details

**3. Inspect SAML Attributes**
- Look for "SAML Response" section
- Verify attributes are present:
  - `email`
  - `full_name`
  - `roles`
  - `team` (Pattern A)
  - `program` (Pattern A)

**4. Troubleshoot Missing Attributes**
- If attributes missing: Action not deployed or not in login flow
- If attributes wrong: Check user's app_metadata
- If user sees wrong team: Case sensitivity or typo in team name

**📸 Screenshot Placeholder:**
```
[Screenshot: Auth0 Logs - SAML Response]
Description: Shows expanded log entry with SAML attributes visible
Location: Auth0 → Monitoring → Logs → [Success Login Event]
```

---

## 🔐 Security Best Practices

### Protect Management API Tokens

**Never commit tokens to git:**
```bash
# .gitignore
.env
config/secrets.json
**/auth0-credentials.json
```

**Use environment variables:**
```javascript
const auth0Domain = process.env.AUTH0_DOMAIN;
const managementToken = process.env.AUTH0_MGMT_TOKEN;
```

**Rotate tokens regularly:**
- Management API tokens should rotate every 90 days
- Set calendar reminders for rotation

---

### Audit User Metadata Changes

**Enable logging:**
- Auth0 Dashboard → **Monitoring** → **Logs**
- Filter by "Update User" events
- Review metadata changes regularly

**Track who made changes:**
- Management API calls include user context
- Dashboard changes logged with admin email

---

## 📊 Metadata Validation

### Required Fields Checklist

Before declaring configuration complete:

**For Every User:**
- ✅ `flex.roles` array present with at least one role
- ✅ Role is valid: `admin`, `supervisor`, or `agent`
- ✅ Email verified in Auth0

**For Pattern A Users (except admins):**
- ✅ `flex.team` string present
- ✅ Team name matches exactly (case-sensitive)
- ✅ `program` attribute set for tracking

**For Supervisors:**
- ✅ At least one agent exists in same team
- ✅ Team attribute matches exactly between supervisor and agents

---

## 🔄 Common Metadata Patterns

### Senior Executive (Sees All Teams)
```json
{
  "flex": {
    "roles": ["admin"]
  }
}
```
**No team attribute** = sees all teams

---

### Program Supervisor (Sees Own Team)
```json
{
  "flex": {
    "roles": ["supervisor"],
    "team": "RAMP"
  },
  "program": "RAMP"
}
```

---

### Agent (Team Member)
```json
{
  "flex": {
    "roles": ["agent"],
    "team": "RAMP"
  },
  "program": "RAMP"
}
```

---

### Multi-Role User (Advanced)
```json
{
  "flex": {
    "roles": ["supervisor", "agent"],
    "team": "RAMP"
  },
  "program": "RAMP"
}
```
**Use Case:** Supervisors who also take calls

---

## 🆘 Troubleshooting Auth0 Configuration

### Issue: Auth0 Action Not Executing

**Symptoms:**
- SAML attributes missing in Flex
- Users have no roles in Flex
- Team filtering not working

**Diagnosis:**
1. Check if Action deployed: Actions → Library → [Action] → should show "Deployed"
2. Check if Action in login flow: Actions → Flows → Login → verify action present
3. Check Auth0 Logs for action errors

**Fix:**
- Deploy action if not deployed
- Add action to login flow if missing
- Review action code for syntax errors

---

### Issue: Team Attribute Not Working

**Symptoms:**
- Users see all teams instead of their own
- Supervisors see wrong team members

**Diagnosis:**
1. Verify user has `flex.team` in app_metadata
2. Check team name spelling and case (case-sensitive!)
3. Verify Action includes team attribute code
4. Check SAML response in Auth0 logs

**Fix:**
- Add `flex.team` to user metadata
- Correct team name spelling/case
- Ensure Pattern A action code is deployed
- User must re-login after metadata changes

---

### Issue: Wrong Role Permissions

**Symptoms:**
- Agent sees supervisor controls
- Supervisor lacks expected features

**Diagnosis:**
1. Check user's `flex.roles` array in app_metadata
2. Verify role name is valid: `admin`, `supervisor`, `agent`
3. Check for typos: `superviser` (wrong) vs `supervisor` (right)

**Fix:**
- Correct role name in app_metadata
- User must re-login after changes
- Verify roles passed in SAML response via logs

---

## 📖 Related Documentation

- **Pattern A Setup:** [Multi-Program Configuration](/techops/account-provisioning/authentication/pattern-a-multi-program)
- **Pattern B Setup:** [Isolated Organizations](/techops/account-provisioning/authentication/pattern-b-isolated)
- **Flex SSO:** [Twilio Flex SSO Configuration](/techops/account-provisioning/authentication/twilio-flex-sso)
- **Testing:** [Testing Checklist](/techops/account-provisioning/authentication/testing-checklist)
- **Troubleshooting:** [Authentication Troubleshooting](/techops/account-provisioning/authentication/troubleshooting)

---

## 📚 External References

- [Auth0 Actions Documentation](https://auth0.com/docs/customize/actions)
- [Auth0 Management API](https://auth0.com/docs/api/management/v2)
- [Auth0 SAML Configuration](https://auth0.com/docs/authenticate/protocols/saml)
- [Twilio Flex SSO Documentation](https://www.twilio.com/docs/flex/admin-guide/setup/sso-configuration)
