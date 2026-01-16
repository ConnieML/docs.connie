# CDO Mission: Documentation Reorganization

**Created:** 2026-01-15
**Completed:** 2026-01-16
**Priority:** High
**Status:** ✅ COMPLETE
**Requested By:** CEO (Christopher Berno)
**Prepared By:** CTO Agent
**Executed By:** CDO Agent

---

## Executive Summary

Reorganize docs.connie.one to accurately reflect our audiences and product maturity. Remove the premature "Platform Developers" framing and consolidate all internal operational documentation under a new "Connie TechOps" section.

---

## The Problem

The current documentation structure has a "Developers" section that implies:
- There's a developer platform to build on
- External developers would integrate with Connie
- APIs/SDKs are available for third-party use

**Reality:** None of this exists yet. The "developer" docs are actually internal operational setup docs that Connie staff use to provision accounts, deploy features, and maintain infrastructure.

This creates confusion:
- CBO admins might think they need to do this work
- The structure promises capabilities we don't offer
- Internal operations docs are mixed with user-facing content

---

## The Solution

### Remove from Landing Page Hero
Current hero has 4 boxes. Remove "Connie Support Team" from the hero section. The hero should be for **external audiences only**:

1. **CBO Users** (Agents, Supervisors, Administrators)
2. **Platform Developers** → **REMOVE or rename to "Getting Started"**
3. **Getting Started / End Users**

Result: 3 clean boxes for external users.

### New Left Navigation Structure

```
├── Introduction
├── Getting Started
│
├── CBO Users
│   ├── Agents
│   │   └── [existing agent docs]
│   ├── Supervisors
│   │   └── [existing supervisor docs]
│   └── Administrators
│       └── [existing admin docs]
│
├── ─────────────────────────────────────
│   (visual separator - internal below)
│
└── Connie TechOps
    │
    ├── Overview
    │   └── "Internal documentation for Connie staff"
    │
    ├── Account Provisioning
    │   ├── Flex + Auth0 SSO Setup Guide [NEW]
    │   └── User Management (Auth0)
    │
    ├── Feature Deployment
    │   ├── Template Installation
    │   │   └── [migrate from /developers/install-template]
    │   ├── Running Locally
    │   │   └── [migrate from /developers/run-locally]
    │   ├── Feature Selection
    │   │   └── [migrate from /developers/use-specific-feature]
    │   └── Voice & Voicemail Setup [NEW]
    │       ├── Mailgun Configuration
    │       ├── Serverless Deployment
    │       ├── Studio Flow Configuration
    │       └── Testing Procedures
    │
    ├── Infrastructure
    │   ├── AWS Resources (S3, CloudFront, Route53)
    │   ├── Auth0 Tenant Management
    │   ├── Twilio Account Management
    │   └── Mailgun Configuration
    │
    ├── Codebase Reference
    │   ├── Template Architecture
    │   │   └── [migrate from /developers/building/getting-started]
    │   ├── Frontend Overview
    │   │   └── [migrate from /developers/frontend - remove "coming soon"]
    │   ├── Backend Overview
    │   │   └── [migrate from /developers/backend - remove "coming soon"]
    │   └── Debugging Best Practices
    │       └── [migrate from /developers/general/debugging-best-practices]
    │
    └── Troubleshooting & Runbooks
        ├── SSO Issues
        ├── Voice/Voicemail Issues
        ├── Email Delivery Issues
        └── Infrastructure Runbooks
```

---

## Content Migration Map

### From /developers → Connie TechOps

| Current Location | New Location | Notes |
|-----------------|--------------|-------|
| /developers/getting-started | /techops/codebase/template-architecture | Rename to be clearer |
| /developers/install-template | /techops/feature-deployment/template-installation | Move as-is |
| /developers/run-locally | /techops/feature-deployment/running-locally | Move as-is |
| /developers/use-specific-feature | /techops/feature-deployment/feature-selection | Move as-is |
| /developers/frontend/overview | /techops/codebase/frontend-overview | Remove "coming soon" messaging |
| /developers/backend/overview | /techops/codebase/backend-overview | Remove "coming soon" messaging |
| /developers/general/debugging-best-practices | /techops/codebase/debugging | Move as-is |
| /developers/updating-docs | /techops/codebase/updating-documentation | Move as-is |

### New Content to Add

| Document | Source | New Location |
|----------|--------|--------------|
| Flex + Auth0 SSO Provisioning Guide | `/Users/cjberno/projects/connie/connie.tech/acct-provisioning/FLEX-ACCOUNT-PROVISIONING.md` | /techops/account-provisioning/flex-auth0-sso |
| Voice & Voicemail Setup Guide | `/Users/cjberno/projects/connie/connie.tech/features/voicemail/connie-voicemail-setup-guide.md` | /techops/feature-deployment/voice-voicemail |

---

## Content to Remove or Archive

1. **"Platform Developers" from hero** - Remove entirely or rename to generic "Documentation"
2. **"Coming Soon" sections** - Either populate with real content or remove the promises
3. **"Developer Discord" references** - If this doesn't exist, remove
4. **Beta signup emails** - Remove if not actually monitored

---

## Visual Separation in Nav

The left navigation should have a clear visual separator before TechOps:

Option A: Horizontal line/divider
Option B: Different background color for TechOps section
Option C: Collapsible section labeled "Internal"
Option D: Smaller font or different styling

Recommend **Option A or C** - keeps it accessible but clearly different.

---

## Implementation Checklist

### Phase 1: Structure Changes
- [x] Create /techops section in docs
- [x] Create subsection structure (account-provisioning, feature-deployment, infrastructure, codebase, troubleshooting)
- [x] Add visual separator in left nav before TechOps

### Phase 2: Content Migration
- [x] Migrate /developers/install-template → /techops/feature-deployment/template-installation
- [x] Migrate /developers/run-locally → /techops/feature-deployment/running-locally
- [x] Migrate /developers/use-specific-feature → /techops/feature-deployment/feature-selection
- [x] Migrate /developers/building/getting-started → /techops/codebase/template-architecture
- [x] Migrate /developers/frontend → /techops/codebase/frontend-overview (clean up)
- [x] Migrate /developers/backend → /techops/codebase/backend-overview (clean up)
- [x] Migrate /developers/general/debugging-best-practices → /techops/codebase/debugging

### Phase 3: New Content
- [x] Add Flex + Auth0 SSO Provisioning Guide to /techops/account-provisioning/
- [x] Add Voice & Voicemail Setup Guide to /techops/feature-deployment/
- [x] Create TechOps Overview page explaining the section's purpose
- [x] Create Common Issues & Runbooks page in /techops/troubleshooting/

### Phase 4: Landing Page
- [x] Remove "Connie Support Team" / "Platform Developers" from hero boxes
- [x] Reduce to 3 hero boxes (End Users, Getting Started, AI Agents)
- [x] Update hero descriptions

### Phase 5: Cleanup
- [x] Remove old /developers section
- [x] Remove old /platform-developers section
- [x] Remove old /support-team section
- [x] Remove "Coming Soon" placeholder text from frontend/backend overviews

### Phase 6: Verification
- [x] Build passes without errors
- [x] Navigation works correctly
- [x] Internal links updated

---

## Success Criteria

1. **Clear audience separation** - CBO users never see TechOps docs in their flow
2. **Honest structure** - No "Platform Developers" section until we have a platform
3. **Findable operations docs** - Connie staff can easily locate provisioning/setup guides
4. **No dead ends** - No "Coming Soon" pages without clear timelines

---

## Notes

This reorganization reflects the current product maturity. When Connie does offer a true developer platform (APIs, SDKs, integrations), we can add a proper "Developers" section. Until then, let's be honest about what we have.

---

## Completed Work Summary

### Phase 1: Structure Changes ✅
- Created `/docs/techops/` directory with full subsection structure
- Created `_category_.json` files for proper sidebar organization
- Added visual separator in sidebars.js using HTML injection for "Internal Only" label

### Phase 2: Content Migration ✅
- Migrated all `/developers/` content to `/techops/`:
  - `install-template.md` → `techops/feature-deployment/template-installation.md`
  - `run-locally.md` → `techops/feature-deployment/running-locally.md`
  - `use-specific-feature.md` → `techops/feature-deployment/feature-selection.md`
  - `building/getting-started.md` → `techops/codebase/template-architecture.md`
  - Frontend/backend overviews → `techops/codebase/`
  - Debugging best practices → `techops/codebase/debugging.md`
- Updated all internal links across the documentation

### Phase 3: New Content ✅
- **Flex + Auth0 SSO Provisioning Guide** (`techops/account-provisioning/flex-auth0-sso.md`)
  - Complete step-by-step guide sourced from connie.tech repository
  - Covers Twilio Flex setup, Auth0 configuration, and SSO integration
- **Voice & Voicemail Setup Guide** (`techops/feature-deployment/voice-voicemail-setup.md`)
  - 3-tier architecture documentation (Twilio, Mailgun, Serverless)
  - Studio flow configuration and testing procedures
- **TechOps Overview** (`techops/overview.md`)
  - Landing page explaining internal documentation purpose
- **Common Issues & Runbooks** (`techops/troubleshooting/common-issues.md`)
  - SSO, voice, email, and infrastructure troubleshooting guides

### Phase 4: Landing Page ✅
- Removed "Platform Developers" hero card
- Removed "Connie Support Team" hero card
- Updated to 3 clean hero boxes: End Users, Getting Started, AI Agents
- Updated "Not Sure Where to Start?" section links

### Phase 5: Cleanup ✅
- Deleted entire `/developers/` directory
- Deleted `/platform-developers/` directory
- Deleted `/support-team/` directory
- Removed all "Coming Soon" placeholder text

### Phase 6: Verification ✅
- Build passes without errors
- All navigation works correctly
- All internal links updated and functional

### Additional Work (Post-Mission Scope)

#### CBO Users / End Users Consolidation ✅
Audit revealed confusing duplicate categories. Merged into unified structure:
- Merged `/cbo-users/staff-agents/` into `/end-users/staff-agents/`
- Renamed `/end-users/cbo-admins/` to `/end-users/administrators/`
- Consolidated supervisors content
- Deleted `/cbo-users/` directory entirely
- Updated all cross-references and links

#### Visual Distinction Enhancements ✅
- Added emoji icons to main categories:
  - "👥 End Users"
  - "⚙️ Connie TechOps"
- Added CSS styling in `custom.css`:
  - Bold category headers (font-weight: 700)
  - Green color (#2e7d32) for End Users
  - Gray color (#555) for TechOps
- Added "Internal Only" visual separator with border styling

### Git Commits
1. Initial TechOps structure and content migration
2. Landing page updates and old directory cleanup
3. Fixed empty troubleshooting category build error
4. CBO Users / End Users merge
5. Visual styling enhancements

### Deployment
- Pushed to `main` branch
- GitHub Actions workflow deployed successfully
- Live at: https://docs.connie.one

---

**Document Location:** `/Users/cjberno/projects/connie/docs.connie/dev-logs/260115-techop-docs-isolation.md`
