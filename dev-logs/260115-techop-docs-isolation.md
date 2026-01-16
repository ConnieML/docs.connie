# CDO Mission: Documentation Reorganization

**Created:** 2026-01-15
**Priority:** High
**Requested By:** CEO (Christopher Berno)
**Prepared By:** CTO Agent

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
- [ ] Create /techops section in docs
- [ ] Create subsection structure (account-provisioning, feature-deployment, infrastructure, codebase, troubleshooting)
- [ ] Add visual separator in left nav before TechOps

### Phase 2: Content Migration
- [ ] Migrate /developers/install-template → /techops/feature-deployment/template-installation
- [ ] Migrate /developers/run-locally → /techops/feature-deployment/running-locally
- [ ] Migrate /developers/use-specific-feature → /techops/feature-deployment/feature-selection
- [ ] Migrate /developers/building/getting-started → /techops/codebase/template-architecture
- [ ] Migrate /developers/frontend → /techops/codebase/frontend-overview (clean up)
- [ ] Migrate /developers/backend → /techops/codebase/backend-overview (clean up)
- [ ] Migrate /developers/general/debugging-best-practices → /techops/codebase/debugging

### Phase 3: New Content
- [ ] Add Flex + Auth0 SSO Provisioning Guide to /techops/account-provisioning/
- [ ] Add Voice & Voicemail Setup Guide to /techops/feature-deployment/
- [ ] Create TechOps Overview page explaining the section's purpose

### Phase 4: Landing Page
- [ ] Remove "Connie Support Team" / "Platform Developers" from hero boxes
- [ ] Reduce to 3 hero boxes (CBO Users, Getting Started, one more)
- [ ] Update hero descriptions

### Phase 5: Cleanup
- [ ] Remove old /developers section (after redirects set up)
- [ ] Remove "Coming Soon" placeholder text
- [ ] Remove dead beta signup CTAs
- [ ] Set up redirects from old URLs to new locations

### Phase 6: Verification
- [ ] All old URLs redirect properly
- [ ] Navigation works on mobile
- [ ] Search indexes new pages
- [ ] Internal links updated

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

**Document Location:** `/Users/cjberno/projects/connie/docs.connie/dev-logs/260115-techop-docs-isolation.md`
