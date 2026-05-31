---
sidebar_label: Testing Checklist
sidebar_position: 7
title: "Authentication Testing Checklist"
---

# Authentication Testing Checklist

Comprehensive testing protocol for validating Auth0 + Twilio Flex SSO configuration.

## 🎯 Purpose

This checklist ensures your authentication setup works correctly before declaring deployment complete.

**Use this checklist for:**
- ✅ Initial setup validation
- ✅ Post-configuration changes
- ✅ Adding new users or teams
- ✅ Troubleshooting verification

**Testing Philosophy:** Test with real user accounts in realistic scenarios. Don't assume configuration worked—validate it.

---

## 📋 Pre-Testing Setup

Before beginning tests, ensure these are ready:

### Test Accounts Required

**Pattern A (Multi-Program):**
- [ ] 1 Admin user (no team attribute)
- [ ] 1 Supervisor user (with team attribute)
- [ ] 2 Agent users (same team as supervisor)
- [ ] 1 Agent user (different team, if applicable)

**Pattern B (Isolated Organizations):**
- [ ] 1 Admin user per organization
- [ ] 1 Agent user per organization

### Test Environment Access
- [ ] Auth0 Dashboard open in separate tab
- [ ] Twilio Console open in separate tab
- [ ] Test user credentials documented
- [ ] Vanity domain URL accessible
- [ ] Incognito/private browser windows available

### Documentation Ready
- [ ] [Overview Guide](/techops/account-provisioning/authentication/overview) for reference
- [ ] [Troubleshooting Guide](/techops/account-provisioning/authentication/troubleshooting) for issues
- [ ] Notepad for recording results

---

## ✅ Test Suite 1: Basic Authentication

### Test 1.1: Admin User Login

**Purpose:** Verify basic SSO flow works.

**Test User:** Admin role

**Steps:**
1. Open incognito browser window
2. Navigate to vanity domain (e.g., `https://nss.connie.team`)
3. Should redirect to Auth0 login
4. Enter admin user credentials
5. Click Login

**Expected Results:**
- ✅ Redirects to Auth0 login page
- ✅ Login succeeds without errors
- ✅ Redirects back to Flex UI
- ✅ Flex Desktop loads fully
- ✅ User's name appears in top right corner
- ✅ Admin features visible (Insights, Settings, etc.)

**On Failure:**
- Check callback URLs in Auth0
- Verify user has `flex.roles: ["admin"]`
- Review Auth0 logs for errors
- See: [Login Failures](/techops/account-provisioning/authentication/troubleshooting#-login-failures)

---

### Test 1.2: Supervisor User Login

**Purpose:** Verify non-admin role authentication.

**Test User:** Supervisor role

**Steps:**
1. Open NEW incognito window
2. Navigate to vanity domain
3. Enter supervisor credentials
4. Login

**Expected Results:**
- ✅ Login succeeds
- ✅ Flex Desktop loads
- ✅ Supervisor features visible (Teams View, Monitor, Coach, Barge)
- ✅ No admin features (Settings, Insights)

**On Failure:**
- Verify `flex.roles: ["supervisor"]` in user metadata
- Check Auth0 Action passes `roles` attribute
- Check SAML attribute mapping in Flex
- See: [Permission Issues](/techops/account-provisioning/authentication/troubleshooting#-permission-issues)

---

### Test 1.3: Agent User Login

**Purpose:** Verify agent-level authentication.

**Test User:** Agent role

**Steps:**
1. Open NEW incognito window
2. Navigate to vanity domain
3. Enter agent credentials
4. Login

**Expected Results:**
- ✅ Login succeeds
- ✅ Flex Desktop loads
- ✅ Agent interface visible (Task list, Available/Unavailable toggle)
- ✅ NO supervisor features (no Teams View monitor controls)
- ✅ NO admin features

**On Failure:**
- Verify `flex.roles: ["agent"]` in user metadata
- Ensure no extra roles accidentally assigned
- See: [Permission Issues](/techops/account-provisioning/authentication/troubleshooting#-permission-issues)

---

## ✅ Test Suite 2: Team Visibility (Pattern A Only)

:::info Pattern B Users
If you're using Pattern B (Isolated Organizations), skip this test suite. Team visibility is not applicable.
:::

### Test 2.1: Supervisor Sees Only Own Team

**Purpose:** Verify team-based filtering works for supervisors.

**Test User:** Supervisor with team attribute (e.g., `team: "RAMP"`)

**Prerequisites:**
- [ ] At least 2 agents in supervisor's team logged in once
- [ ] At least 1 agent in different team logged in once (if multi-team org)

**Steps:**
1. Login as supervisor
2. Click **Teams View** in left sidebar
3. Expand team list

**Expected Results:**
- ✅ Teams View loads successfully
- ✅ Only supervisor's team appears (e.g., "RAMP")
- ✅ Only agents from supervisor's team visible
- ✅ Agent names, statuses, and activities shown
- ❌ Other teams NOT visible (if multi-team org)
- ❌ Agents from other teams NOT visible

**Actual Results Table:**

| Team/Agent | Expected Visible? | Actually Visible? | ✅/❌ |
|------------|-------------------|-------------------|-------|
| RAMP Team  | ✅ Yes            |                   |       |
| Agent: Afia| ✅ Yes            |                   |       |
| Agent: [Name] | ✅ Yes         |                   |       |
| Other Team | ❌ No             |                   |       |

**On Failure:**
- Verify supervisor has `flex.team` in metadata
- Verify team name spelling matches exactly (case-sensitive!)
- Verify agents have same `flex.team` value
- Verify agents have logged in at least once
- Check Auth0 Action includes team attribute code
- See: [Team Visibility Problems](/techops/account-provisioning/authentication/troubleshooting#-team-visibility-problems)

---

### Test 2.2: Admin Sees All Teams

**Purpose:** Verify admins override team filtering.

**Test User:** Admin user (NO team attribute)

**Steps:**
1. Login as admin user
2. Click **Teams View**
3. Review visible teams

**Expected Results:**
- ✅ ALL teams visible (RAMP, Program B, etc.)
- ✅ ALL agents visible across all teams
- ✅ Complete organizational view

**On Failure:**
- Verify admin user does NOT have `flex.team` in metadata
- If team attribute present, remove it
- Admin must re-login after metadata change
- See: [Admin User Only Sees Own Team](/techops/account-provisioning/authentication/troubleshooting#admin-user-only-sees-own-team)

---

### Test 2.3: Agent Team Membership

**Purpose:** Verify agents appear in correct team for supervisors.

**Test Users:**
- Supervisor (team: RAMP)
- Agent A (team: RAMP)
- Agent B (team: RAMP)

**Steps:**
1. Ensure both agents logged in at least once
2. Login as supervisor
3. Open Teams View

**Expected Results:**
- ✅ Agent A visible in supervisor's Teams View
- ✅ Agent B visible in supervisor's Teams View
- ✅ Agents' status shown (Available, Offline, etc.)
- ✅ Agents' task information visible

**On Failure:**
- Verify agents have exact same `flex.team` value as supervisor
- Have agents re-login to update worker attributes
- Check Twilio TaskRouter → Workers for team attributes
- See: [Supervisor Sees Wrong Team Members](/techops/account-provisioning/authentication/troubleshooting#supervisor-sees-wrong-team-members)

---

## ✅ Test Suite 3: Organizational Isolation (Pattern B Only)

:::info Pattern A Users
If you're using Pattern A (Multi-Program), skip this test suite. This validates complete organizational separation.
:::

### Test 3.1: Organization A User Isolation

**Purpose:** Verify Organization A users see only Organization A data.

**Test User:** Any user from Organization A

**Steps:**
1. Login as Organization A user
2. Navigate through Flex:
   - Teams View
   - Insights/Reports (if accessible)
   - Task lists
   - Agent lists

**Expected Results:**
- ✅ Only Organization A users visible
- ✅ Only Organization A tasks visible
- ✅ Only Organization A data in reports
- ❌ NO Organization B users visible
- ❌ NO Organization B data accessible

**On Failure:**
- Verify separate Auth0 tenants are being used
- Check Twilio account SIDs are different
- Verify Flex instances are separate
- See: [Users from Organization B Appearing in Organization A](/techops/account-provisioning/authentication/troubleshooting#users-from-organization-b-appearing-in-organization-a)

---

### Test 3.2: Organization B User Isolation

**Purpose:** Verify Organization B users see only Organization B data.

**Test User:** Any user from Organization B

**Steps:**
1. Login as Organization B user via Organization B's vanity domain
2. Navigate through Flex
3. Attempt to access Organization A's vanity domain (should fail or redirect)

**Expected Results:**
- ✅ Only Organization B users visible
- ✅ Only Organization B tasks visible
- ❌ Cannot access Organization A resources
- ❌ NO Organization A users visible

**On Failure:**
- Verify using separate Auth0 tenant for Organization B
- Check vanity domains point to correct Flex instances
- Verify SSO configuration references correct tenant
- See: [Pattern B Documentation](/techops/account-provisioning/authentication/pattern-b-isolated)

---

## ✅ Test Suite 4: SAML Attribute Validation

### Test 4.1: Verify SAML Attributes in Auth0 Logs

**Purpose:** Confirm Auth0 Action passes correct attributes.

**Test User:** Any user

**Steps:**
1. Login as test user
2. Open Auth0 Dashboard → **Monitoring** → **Logs**
3. Find most recent "Success Login" event
4. Click to expand
5. Look for SAML Response section

**Expected Attributes:**

**Pattern A:**
```json
{
  "email": "user@organization.org",
  "full_name": "First Last",
  "roles": "supervisor",
  "team": "RAMP",
  "program": "RAMP"
}
```

**Pattern B:**
```json
{
  "email": "user@organization.org",
  "full_name": "First Last",
  "roles": "agent"
}
```

**Validation Checklist:**
- [ ] `email` attribute present and correct
- [ ] `full_name` attribute present and correct
- [ ] `roles` attribute present with valid role
- [ ] `team` attribute present (Pattern A, non-admin)
- [ ] `program` attribute present (Pattern A, optional)

**On Failure:**
- Verify Auth0 Action is deployed
- Check Action code matches pattern (A or B)
- Verify user's app_metadata has required fields
- See: [Auth0 Configuration](/techops/account-provisioning/authentication/auth0-configuration)

---

### Test 4.2: Verify Worker Attributes in Twilio

**Purpose:** Confirm Flex receives and stores SAML attributes.

**Test User:** Any user who has logged in

**Steps:**
1. Open Twilio Console → **TaskRouter** → **Workers**
2. Find worker by email address
3. Click worker to view details
4. Check **Attributes** section

**Expected Attributes:**

```json
{
  "email": "user@organization.org",
  "full_name": "First Last",
  "roles": "supervisor",
  "team": "RAMP",  // Pattern A only
  "routing": {...}  // Flex auto-generated
}
```

**Validation Checklist:**
- [ ] Worker record exists for user
- [ ] `email` matches user's email
- [ ] `full_name` populated
- [ ] `roles` matches user's role
- [ ] `team` matches (Pattern A)

**On Failure:**
- User needs to re-login to create/update worker
- Check attribute mapping in Flex SSO settings
- Verify SAML attributes passed by Auth0
- See: [Twilio Flex SSO](/techops/account-provisioning/authentication/twilio-flex-sso)

---

## ✅ Test Suite 5: Logout and Re-authentication

### Test 5.1: Normal Logout

**Purpose:** Verify logout flow works correctly.

**Steps:**
1. Login as any user
2. Click user menu (top right)
3. Click **Logout**

**Expected Results:**
- ✅ Session terminated in Flex
- ✅ Redirected to login page or Auth0
- ✅ Cannot access Flex without re-authentication
- ✅ Re-login works normally

**On Failure:**
- Check logout URLs in Auth0 application settings
- Verify Flex logout redirect configured
- See Auth0 and Flex SSO documentation

---

### Test 5.2: Session Timeout

**Purpose:** Verify session timeout configured appropriately.

**Steps:**
1. Login as any user
2. Leave browser open and idle
3. Wait for configured timeout period (e.g., 8 hours)
4. Attempt to interact with Flex

**Expected Results:**
- ✅ After timeout, session expired
- ✅ Prompted to re-authenticate
- ✅ Re-login works normally

**Configuration:**
- Session timeout set in Flex Admin → Settings
- Recommended: 8-12 hours for agents

---

## ✅ Test Suite 6: Error Handling

### Test 6.1: Invalid Credentials

**Purpose:** Verify authentication properly rejects invalid credentials.

**Steps:**
1. Navigate to vanity domain
2. Enter valid email but wrong password
3. Attempt login

**Expected Results:**
- ✅ Auth0 displays error message
- ❌ Login fails (not granted access)
- ✅ Can retry with correct password

---

### Test 6.2: Non-Existent User

**Purpose:** Verify authentication handles unknown users.

**Steps:**
1. Navigate to vanity domain
2. Enter email not in Auth0
3. Attempt login

**Expected Results:**
- ✅ Auth0 displays "invalid email/password" or similar
- ❌ No access granted
- ❌ No confusing error messages

---

### Test 6.3: User With No Roles

**Purpose:** Verify Flex handles missing role metadata gracefully.

**Test Setup:**
1. Create test user in Auth0
2. Do NOT add `flex.roles` to metadata
3. Attempt login

**Expected Results:**
- ✅ Login to Auth0 succeeds
- ⚠️ Flex may show "Unauthorized" or assign default "agent" role
- ✅ User does not get unintended permissions

**After Test:**
- Add proper `flex.roles` to test user
- Verify proper access after metadata fix

---

## 📊 Testing Results Template

Use this template to document your testing results:

```markdown
# Authentication Testing Results

**Date:** YYYY-MM-DD
**Tester:** [Name]
**Pattern:** A (Multi-Program) / B (Isolated)
**Organization:** [Organization Name]

## Configuration Details
- Auth0 Tenant: `tenant-name.auth0.com`
- Twilio Account SID: `AC...`
- Flex Instance SID: `FO...`
- Vanity Domain: `org.connie.team`

## Test Suite 1: Basic Authentication
- [ ] Test 1.1: Admin Login - PASS / FAIL / SKIP
- [ ] Test 1.2: Supervisor Login - PASS / FAIL / SKIP
- [ ] Test 1.3: Agent Login - PASS / FAIL / SKIP

## Test Suite 2: Team Visibility (Pattern A)
- [ ] Test 2.1: Supervisor Sees Only Own Team - PASS / FAIL / SKIP
- [ ] Test 2.2: Admin Sees All Teams - PASS / FAIL / SKIP
- [ ] Test 2.3: Agent Team Membership - PASS / FAIL / SKIP

## Test Suite 3: Organizational Isolation (Pattern B)
- [ ] Test 3.1: Organization A Isolation - PASS / FAIL / SKIP
- [ ] Test 3.2: Organization B Isolation - PASS / FAIL / SKIP

## Test Suite 4: SAML Validation
- [ ] Test 4.1: Auth0 Logs Show Correct Attributes - PASS / FAIL
- [ ] Test 4.2: Twilio Worker Attributes Correct - PASS / FAIL

## Test Suite 5: Logout/Re-auth
- [ ] Test 5.1: Normal Logout - PASS / FAIL
- [ ] Test 5.2: Session Timeout - PASS / SKIP

## Test Suite 6: Error Handling
- [ ] Test 6.1: Invalid Credentials - PASS / FAIL
- [ ] Test 6.2: Non-Existent User - PASS / FAIL
- [ ] Test 6.3: User With No Roles - PASS / FAIL

## Issues Found
[Document any issues discovered during testing]

## Resolution Actions
[Document how issues were resolved]

## Sign-Off
- [ ] All critical tests passed
- [ ] Known issues documented
- [ ] Configuration approved for production use

**Tester Signature:** _______________  **Date:** _______
**Approver Signature:** _____________  **Date:** _______
```

---

## 🎯 Post-Testing Actions

After completing all tests successfully:

### Immediate Actions
1. **Document Configuration**
   - Save Auth0 tenant details
   - Record Flex instance SID
   - Document team names and structure
   - Save test user credentials securely

2. **Update SPOK State**
   - Record successful deployment in `/Users/cjberno/SPOK/state/`
   - Document lessons learned
   - Note any deviations from standard process

3. **User Onboarding Preparation**
   - Prepare end-user documentation (login URL, credentials)
   - Schedule training sessions if needed
   - Provide supervisor with team management guide

### Ongoing Monitoring

**First Week Post-Deployment:**
- [ ] Monitor Auth0 logs daily for errors
- [ ] Check Twilio Flex SSO logs
- [ ] Verify subaccount usage data (Pattern A)
- [ ] Collect user feedback on login experience

**First Month:**
- [ ] Review session timeout settings
- [ ] Audit user roles and team assignments
- [ ] Check for any security anomalies
- [ ] Document any configuration adjustments

---

## 🆘 When Tests Fail

If any test fails:

1. **Stop Testing**
   Don't continue to later tests if foundational tests fail

2. **Diagnose Issue**
   Use [Troubleshooting Guide](/techops/account-provisioning/authentication/troubleshooting)

3. **Fix Configuration**
   Make necessary changes to Auth0, Flex, or user metadata

4. **Re-Test from Beginning**
   After fixes, start testing from Test Suite 1 again

5. **Document Changes**
   Note what was changed and why in results template

---

## 📖 Related Documentation

- **Overview:** [Identity Architecture](/techops/account-provisioning/authentication/overview)
- **Pattern A:** [Multi-Program Setup](/techops/account-provisioning/authentication/pattern-a-multi-program)
- **Pattern B:** [Isolated Organizations](/techops/account-provisioning/authentication/pattern-b-isolated)
- **Auth0 Config:** [Auth0 Configuration](/techops/account-provisioning/authentication/auth0-configuration)
- **Flex SSO:** [Twilio Flex SSO](/techops/account-provisioning/authentication/twilio-flex-sso)
- **Troubleshooting:** [Authentication Troubleshooting](/techops/account-provisioning/authentication/troubleshooting)

---

:::tip Testing Best Practice
Test with real user accounts that will be used in production. Testing with dummy accounts can miss issues that only appear with actual users and realistic metadata.
:::

:::warning Critical
Do NOT consider deployment complete until:
1. All relevant test suites pass
2. CEO/stakeholder validates working URLs
3. Test results documented and approved

Remember the CDO standard: **No "mission complete" without validated deliverables!**
:::
