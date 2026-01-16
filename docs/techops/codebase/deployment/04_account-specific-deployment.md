---
title: Account-Specific Serverless Deployment
sidebar_label: Account-Specific Deployment
sidebar_position: 4
---

# Account-Specific Serverless Deployment

This guide documents the **mandatory protocol** for deploying serverless functions to ConnieRTC accounts. Following this protocol prevents production outages caused by cross-account configuration errors.

:::danger Critical Protocol
**NEVER** run `npm run deploy` directly. **ALWAYS** use `./deploy.sh <account>` to ensure you deploy to the correct account with the correct configuration.
:::

---

## Why This Matters

### The Incident

On December 20, 2025, we discovered that deploying serverless functions with the wrong `.env` file **breaks production systems**. The `.env` file contains account-specific SIDs (workspace, workflows, etc.) and deploying with mismatched values causes:

- **404 errors** when completing tasks
- **Failed voicemail creation**
- **Broken callback systems**
- **Hours of debugging**

This happened because a single `.env` file was being used for multiple Twilio accounts, and deployments would overwrite correct environment variables with wrong ones.

### The Solution

We now have:
1. **Separate environment files** for each Twilio account
2. **A deployment script** that ensures you deploy to the right account with the right configuration
3. **Verification steps** before any deployment proceeds

---

## Account Reference

### Available Accounts

| Account | Command | CLI Profile |
|---------|---------|-------------|
| Nevada Senior Services | `./deploy.sh nss` | NSS |
| Connie Care Team | `./deploy.sh conniecareteam` | ConnieCareTeam |
| Helping Hands of Vegas Valley | `./deploy.sh hhovv` | HHOVV |
| Development Sandbox | `./deploy.sh devsandbox` | DevSandBox |

### Environment Files

| File | Account |
|------|---------|
| `.env.nss` | Nevada Senior Services |
| `.env.conniecareteam` | Connie Care Team |
| `.env.hhovv` | Helping Hands of Vegas Valley |
| `.env.devsandbox` | Development Sandbox |

### Critical Environment Variables

Each account has **unique values** for these SIDs - they are **NOT interchangeable**:

```bash
TWILIO_FLEX_WORKSPACE_SID          # TaskRouter workspace
TWILIO_FLEX_CALLBACK_WORKFLOW_SID  # Callback/voicemail workflow
TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID
TWILIO_FLEX_INTERNAL_CALL_WORKFLOW_SID
```

---

## For Human Developers

### Step 1: Navigate to serverless-functions

Open your terminal and navigate to the serverless functions directory:

```bash
cd /path/to/connieRTC-basecamp/serverless-functions
```

### Step 2: Run the deployment script

```bash
./deploy.sh <account>
```

Replace `<account>` with one of:
- `nss` - Nevada Senior Services
- `conniecareteam` - Connie Care Team
- `hhovv` - Helping Hands of Vegas Valley
- `devsandbox` - Development Sandbox

### Step 3: Confirm deployment

The script will display:
- Account name and SID
- CLI profile being used
- Environment file being used

**Example output:**

```
========================================
  ConnieRTC Serverless Deployment
========================================

Account:      Connie Care Team
Account SID:  AC...
CLI Profile:  ConnieCareTeam
Env File:     .env.conniecareteam

WARNING: You are about to deploy to Connie Care Team
This will update serverless functions for Account: AC...

Are you sure you want to continue? (yes/no):
```

Type `yes` to confirm and proceed.

### Step 4: Verify success

Watch for "Deployment Successful!" message. If you see errors, check the [Troubleshooting](#troubleshooting) section.

### Step 5: Validate deployment

After deployment, verify the functions are working:

1. Navigate to **Twilio Console** → **Functions & Assets** → **Services**
2. Find the deployed service (e.g., `custom-flex-extensions-serverless`)
3. Click on it and verify the Environment tab shows correct variables

---

## For AI Agents

### Pre-flight Checks

```bash
# Verify you're in the correct directory
pwd
# Expected: .../connieRTC-basecamp/serverless-functions

# Verify deploy script exists and is executable
ls -la deploy.sh

# List available accounts
grep -E "nss|conniecareteam|hhovv|devsandbox" deploy.sh | head -10
```

### Deploy to Specific Account

```bash
# Navigate to serverless-functions
cd /path/to/connieRTC-basecamp/serverless-functions

# Deploy with auto-confirm (pipe "yes" to script)
./deploy.sh <account> <<< "yes"
```

**Examples:**

```bash
# Deploy to Nevada Senior Services
./deploy.sh nss <<< "yes"

# Deploy to Connie Care Team
./deploy.sh conniecareteam <<< "yes"

# Deploy to HHOVV
./deploy.sh hhovv <<< "yes"

# Deploy to Dev Sandbox
./deploy.sh devsandbox <<< "yes"
```

### Verify Deployment

```bash
# Check active Twilio CLI profile matches target account
twilio profiles:list | grep ACTIVE

# List deployed functions
twilio serverless:list --properties domainName,serviceSid,environmentSid

# Verify specific environment variables
twilio api:serverless:v1:services:environments:variables:list \
  --service-sid <SERVICE_SID> \
  --environment-sid <ENV_SID> | grep -E "WORKSPACE|WORKFLOW"
```

### Diagnostic Commands (If Deployment Fails)

```bash
# Check what workspace SID Flex expects
twilio api:flex:v1:configuration:fetch -o json | jq '.taskrouterWorkspaceSid'

# Compare with what's in serverless environment
twilio api:serverless:v1:services:environments:variables:list \
  --service-sid <SERVICE_SID> \
  --environment-sid <ENV_SID> | grep TWILIO_FLEX_WORKSPACE_SID

# If they don't match, you deployed with wrong config
```

---

## What NOT To Do

### NEVER run npm deploy directly

```bash
# WRONG - Uses whatever .env happens to exist
npm run deploy

# WRONG - No account verification
cd serverless-functions && npm run deploy
```

### NEVER manually edit .env without knowing which account

```bash
# WRONG - Which account is this for?
vim .env
npm run deploy
```

### NEVER deploy without verification

```bash
# WRONG - Skipping confirmation is dangerous
./deploy.sh nss --force  # Don't do this
```

### ALWAYS use the deployment script

```bash
# CORRECT - Explicit account targeting with verification
./deploy.sh conniecareteam

# CORRECT - Read confirmation before typing yes
./deploy.sh nss
# (Read the output, verify account, then type "yes")
```

---

## Troubleshooting

### Common Failure Scenarios

| Symptom | Cause | Fix |
|---------|-------|-----|
| 404 errors on task operations | Wrong `TWILIO_FLEX_WORKSPACE_SID` | Update serverless env var to match Flex config |
| "Option not available" in voicemail | Wrong `TWILIO_FLEX_CALLBACK_WORKFLOW_SID` | Update workflow SID env var |
| Deployment says success but wrong account | CLI profile mismatch | Run `twilio profiles:use <PROFILE>` first |
| Functions not updating | Cached deployment | Clear and redeploy |

### Fixing Wrong Workspace SID

If you deployed with the wrong workspace SID:

```bash
# 1. Check what workspace SID Flex expects
twilio api:flex:v1:configuration:fetch -o json | grep taskrouterWorkspaceSid

# 2. List current serverless variables
twilio api:serverless:v1:services:environments:variables:list \
  --service-sid <SERVICE_SID> \
  --environment-sid <ENV_SID>

# 3. Find the variable SID for TWILIO_FLEX_WORKSPACE_SID

# 4. Update with correct value
twilio api:serverless:v1:services:environments:variables:update \
  --service-sid <SERVICE_SID> \
  --environment-sid <ENV_SID> \
  --sid <VARIABLE_SID> \
  --value <CORRECT_WORKSPACE_SID>
```

### Fixing Wrong Workflow SID

Same process as workspace SID, but update `TWILIO_FLEX_CALLBACK_WORKFLOW_SID`.

---

## Adding a New Account

When onboarding a new client account:

### Step 1: Create Environment File

Create `.env.<accountname>` with all required variables:

```bash
cp .env.template .env.newaccount

# Edit with account-specific values:
# - ACCOUNT_SID
# - AUTH_TOKEN
# - TWILIO_FLEX_WORKSPACE_SID
# - TWILIO_FLEX_CALLBACK_WORKFLOW_SID
# - MAILGUN_API_KEY (if using voicemail email)
# - etc.
```

### Step 2: Update deploy.sh

Add the new account to the deployment script:

```bash
# Add to ACCOUNTS array
ACCOUNTS=("nss" "conniecareteam" "hhovv" "devsandbox" "newaccount")

# Add to PROFILES array (Twilio CLI profile name)
PROFILES=("NSS" "ConnieCareTeam" "HHOVV" "DevSandBox" "NewAccount")

# Add to DISPLAY_NAMES array
DISPLAY_NAMES=("Nevada Senior Services" "Connie Care Team" "Helping Hands" "Dev Sandbox" "New Account Name")
```

### Step 3: Create Twilio CLI Profile

```bash
twilio profiles:create --account-sid AC... --auth-token ... --profile NewAccount
```

### Step 4: Update .gitignore

Add the new environment file to `.gitignore`:

```bash
echo ".env.newaccount" >> .gitignore
```

### Step 5: Test Deployment

```bash
./deploy.sh newaccount
```

---

## Key Resource SIDs (Reference)

Account-specific SIDs are stored in each `.env.<account>` file. Key resources include:

| Resource Type | SID Prefix | Purpose |
|---------------|------------|---------|
| Workspace | `WS...` | TaskRouter workspace |
| Workflow | `WW...` | Callback/voicemail workflow |
| Serverless Service | `ZS...` | Deployed functions service |
| Serverless Environment | `ZE...` | Deployment environment |

To find SIDs for a specific account, check the corresponding `.env.<account>` file or use:

```bash
# Get workspace SID from Flex config
twilio api:flex:v1:configuration:fetch -o json | jq '.taskrouterWorkspaceSid'

# List serverless services
twilio serverless:list --properties serviceSid,friendlyName
```

---

## Related Documentation

- [CI Deployment](/techops/codebase/deployment/ci-deployment) - GitHub Actions deployment
- [Local Deployment](/techops/codebase/deployment/local-deployment) - Local development deployment
- [Voicemail Implementation](/techops/feature-deployment/feature-management/channels/voice/voicemail/voicemail-implementation-guide) - Uses this deployment protocol
- [Twilio Profile Management](/developers/building/twilio-profile-management) - CLI profile setup

---

## Questions?

If you're unsure which account to deploy to or what values to use, **stop and ask**. It's better to delay a deployment than to break production.

---

*Last updated: December 20, 2025*
*Created after the Great Workspace SID Incident of 2025*
