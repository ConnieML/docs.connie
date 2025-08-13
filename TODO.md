# ConnieRTC Documentation TODO

*Last Updated: July 30, 2025*  
*CDO: Chief Documents Officer*

## 🚨 HIGH PRIORITY - Critical Path Items

### Accessibility & Compliance (BLOCKER for MVP)
- [ ] **Full WCAG 2.1 AA Compliance Audit** (Effort: Large)
  - [ ] Run automated accessibility scanner on all pages
  - [ ] Test with screen readers (NVDA, JAWS, VoiceOver)
  - [ ] Verify color contrast ratios meet 4.5:1 standard
  - [ ] Ensure all images have descriptive alt text
  - [ ] Validate keyboard navigation throughout site
  - [ ] Check heading hierarchy (h1→h2→h3) consistency
  - [ ] Test with browser zoom at 200%
  - **File locations**: All files in `/docs/docs/`

### Admin Platform Documentation (Funding Critical)
- [ ] **Convert HTML mockups to user documentation** (Effort: Large)
  - [ ] Admin Dashboard guide (`/end-users/cbo-admins/admin-platform/dashboard.md`)
  - [ ] Client Onboarding Wizard tutorial (`/end-users/cbo-admins/admin-platform/onboarding.md`)
  - [ ] Deployment Pipeline safety guide (`/end-users/cbo-admins/admin-platform/deployment.md`)
  - [ ] Billing & Usage Analytics guide (`/end-users/cbo-admins/admin-platform/billing.md`)
  - [ ] Client Management detail guide (`/end-users/cbo-admins/admin-platform/client-management.md`)
  - **Source**: `/static/mockups/admin-ui-mockups/`

- [ ] **Create developer implementation docs** (Effort: Large)
  - [ ] Admin Platform architecture overview (`/developers/backend/admin-platform/`)
  - [ ] Multi-tenant database design patterns
  - [ ] OKTA SSO integration guide
  - [ ] Deployment safety implementation
  - [ ] Billing integration with Twilio usage API

### Channel Documentation Gaps (Revenue Enablement)
- [ ] **Complete SMS/Messaging Channel** (Effort: Medium)
  - [ ] End-user guides (`/end-users/cbo-admins/channels/messaging/`)
  - [ ] Developer implementation (`/developers/building/feature-management/channels/messaging/`)
  - [ ] Provider-specific setup (Twilio SMS, WhatsApp Business)
  
- [ ] **Complete Email Channel** (Effort: Medium)
  - [ ] End-user guides (`/end-users/cbo-admins/channels/email/`)
  - [ ] Complete existing index.md placeholder
  - [ ] Mailgun integration guide
  - [ ] Email routing and automation

- [ ] **Complete Socials Channel** (Effort: Large)
  - [ ] Create channel structure (`/end-users/cbo-admins/channels/socials/`)
  - [ ] Facebook Messenger integration
  - [ ] Instagram DM support
  - [ ] Twitter/X integration

## 📊 MEDIUM PRIORITY - Growth Enablement

### Provider Documentation Expansion
- [ ] **Spectrum Voice Provider** (Effort: Quick)
  - [ ] Create `/end-users/cbo-admins/channels/voice/call-forwarding/spectrum.md`
  - [ ] Add Spectrum logo to `/static/img/providers/`
  - [ ] Update provider selection page
  
- [ ] **Verizon Voice Provider** (Effort: Quick)
  - [ ] Create `/end-users/cbo-admins/channels/voice/call-forwarding/verizon.md`
  - [ ] Add Verizon logo (already exists)
  - [ ] Update provider selection page

- [ ] **Add fax provider visual selection interface** (Effort: Medium)
  - [ ] Add logos for Sinch, eFax, and iFax to `/static/img/providers/` (180px width each)
  - [ ] Create visual provider selection section similar to voice provider selection
  - [ ] Update `/docs/docs/end-users/cbo-admins/fax/select-provider.md` (new file)
  - [ ] Implement clickable logos that navigate to each provider's setup guide
  - **Note**: Replicate the visual selection pattern from voice providers but for fax services

### UX Enhancement Tasks
- [ ] **Fax Task UX Enhancement (Phase 1: Inline Preview → Phase 2: CRM Container)** (Effort: Medium)
  - [ ] Phase 1: Add PDF thumbnail/preview to email task display (8-12 hours, Low Risk)
  - [ ] Phase 2: Embed PDF viewer in Enhanced CRM Container (16-24 hours, Low-Medium Risk)
  - [ ] Avoid Option C (Custom Task Component) - too risky for working system
  - **Current**: Agent clicks PDF → new tab (friction point)
  - **Goal**: Seamless PDF viewing within ConnieRTC interface
  - **Reference**: [Chat conversation from July 30, 2025 fax testing session]
  - **Files**: Flex Plugin task display components, Enhanced CRM Container
  - **Success Criteria**: Agents can view fax without leaving ConnieRTC interface

### Feature Documentation Updates
- [ ] **Callback and Voicemail with Email** (Effort: Medium)
  - [ ] Complete end-user guide based on proven deployment protocol
  - [ ] Add troubleshooting for common authentication issues
  - [ ] Include email template customization
  - **Reference**: Main CLAUDE.md deployment protocol

- [ ] **Enhanced CRM Container** (Effort: Medium)
  - [ ] Document iframe configuration
  - [ ] Security and CORS setup
  - [ ] Custom CRM integration examples

### Audience-Specific Content
- [ ] **Supervisor Portal Documentation** (Effort: Large)
  - [ ] Dashboard overview (`/end-users/supervisors/dashboard.md`)
  - [ ] Team performance monitoring
  - [ ] Report generation and analytics
  - [ ] Quality assurance workflows

- [ ] **Staff Agent Quick Reference** (Effort: Medium)
  - [ ] Daily startup checklist
  - [ ] Common call scenarios
  - [ ] Keyboard shortcuts guide
  - [ ] Troubleshooting quick fixes

## 🔧 LOW PRIORITY - Quality Improvements

### Developer Experience
- [ ] **API Reference Documentation** (Effort: Large)
  - [ ] Serverless function endpoints
  - [ ] Authentication patterns
  - [ ] Rate limiting and quotas
  - [ ] WebSocket event reference

- [ ] **Contribution Guidelines** (Effort: Quick)
  - [ ] Create CONTRIBUTING.md
  - [ ] PR template with documentation checklist
  - [ ] Style guide for technical writing

### Infrastructure & Tooling
- [ ] **Automated Quality Checks** (Effort: Medium)
  - [ ] Implement broken link checker in CI/CD
  - [ ] Add spell check automation
  - [ ] Create documentation coverage reports
  
- [ ] **Search Optimization** (Effort: Medium)
  - [ ] Configure Algolia DocSearch
  - [ ] Add search analytics
  - [ ] Optimize content for common queries

- [ ] **Versioning Strategy** (Effort: Medium)
  - [ ] Implement Docusaurus versioning
  - [ ] Create version migration guides
  - [ ] Archive deprecated content

### Content Maintenance
- [ ] **Screenshot Updates** (Effort: Medium)
  - [ ] Audit all existing screenshots for currency
  - [ ] Create screenshot capture guidelines
  - [ ] Establish quarterly update schedule

- [ ] **Video Content Creation** (Effort: Large)
  - [ ] Admin platform walkthrough
  - [ ] Call forwarding setup tutorial
  - [ ] Voicemail configuration guide
  - [ ] Accessibility features demo

## 📋 ONGOING TASKS - Continuous Improvement

### Regular Audits
- [ ] **Monthly**: Review and update provider information
- [ ] **Quarterly**: Full accessibility compliance check
- [ ] **Semi-Annual**: User feedback integration
- [ ] **Annual**: Complete content accuracy review

### Community Engagement
- [ ] Monitor GitHub issues for documentation requests
- [ ] Respond to community forum questions
- [ ] Create FAQ based on common support tickets
- [ ] Gather testimonials from successful implementations

## 🎯 Success Metrics

### Documentation Health Indicators
- **Coverage**: 75% of features have complete documentation
- **Freshness**: No content older than 6 months without review
- **Accessibility**: 100% WCAG 2.1 AA compliance
- **Completeness**: All guides have prerequisites, examples, and troubleshooting
- **User Satisfaction**: 4.5+ star rating from documentation feedback

### Key Deliverables by Phase
1. **Prototype v3.0 Launch** (Q3 2025)
   - Admin platform documentation complete
   - All channels documented for end-users
   - Developer onboarding guide ready

2. **MVP v1.0 Launch** (Q4 2025)
   - Full API documentation
   - Video tutorials available
   - Multi-language support plan

3. **Growth Phase** (2026)
   - Partner integration guides
   - Advanced customization docs
   - Enterprise deployment patterns

## 🚧 Known Blockers & Dependencies

### Technical Dependencies
- Admin platform UI finalization (affects screenshot capture)
- OKTA SSO implementation completion (blocks auth docs)
- Billing system integration (needed for billing guides)

### Resource Dependencies
- Subject matter expert availability for provider guides
- Design team input for accessibility improvements
- Video production resources for tutorials

### External Dependencies
- Provider API documentation updates
- Twilio Paste framework changes
- Docusaurus platform updates

---

*This TODO list should be reviewed weekly by the CDO and updated based on project priorities and stakeholder feedback. Items marked as HIGH PRIORITY directly impact funding, compliance, or revenue generation.*