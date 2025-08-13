# ConnieRTC User Flow Documentation System

This directory contains user flow diagrams, navigation guides, and UAT packages for all Connie platform components.

## 📁 Directory Structure

### `/admin-flows/` - Admin & CBO User Flows
**Target Audience**: CBO Administrators, Support Staff, Management
- Navigation diagrams for admin functions
- Training materials for administrative users
- UAT packages for admin feature releases

### `/agent-flows/` - Staff Agent & Volunteer Flows
**Target Audience**: Staff Agents, Volunteers, Frontline Users
- Day-to-day operational workflows
- Quick reference guides
- Training materials for agents

### `/supervisor-flows/` - Supervisor & Management Flows  
**Target Audience**: Supervisors, Managers, Analytics Users
- Management dashboards navigation
- Reporting workflows
- Performance monitoring guides

### `/client-flows/` - Client Onboarding & Setup
**Target Audience**: New Clients, Implementation Teams
- Onboarding process flows
- Setup and configuration guides
- Migration workflows

### `/integration-flows/` - Technical Integration Flows
**Target Audience**: Developers, Technical Staff, Partners
- API workflows
- System integration guides
- Technical implementation flows

## 📋 Naming Conventions

### Flow Files
```
{audience}-{feature}-{version}.{type}
Examples:
- admin-tools-v2.0.mmd
- agent-voicemail-v1.5.mmd  
- supervisor-analytics-v3.0.mmd
```

### Screenshot Collections
```
{audience}-{feature}-screenshots-{version}/
Examples:
- admin-tools-screenshots-v2.0/
- agent-dashboard-screenshots-v1.5/
```

### UAT Packages
```
{audience}-{feature}-uat-{date}/
Examples:
- admin-tools-uat-2025-08-12/
- supervisor-analytics-uat-2025-09-15/
```

## 🎯 Package Contents Standard

Each UAT package should contain:
```
{package-name}/
├── README.md                    # Package overview and instructions
├── email-template.md            # Ready-to-send email template
├── flow-diagram.mmd            # Mermaid source code
├── flow-diagram.png            # Exported diagram image
├── screenshots/                # All referenced screenshots
│   ├── 01-entry-point.png
│   ├── 02-navigation.png
│   └── 03-destination.png
└── release-notes.md            # What's new/changed
```

## 🔄 Version Management

### Major Version (v2.0, v3.0)
- Complete UI redesigns
- New feature sets
- Breaking changes to workflows

### Minor Version (v1.1, v1.2)  
- Feature additions
- UI improvements
- Enhanced functionality

### Patch Version (v1.1.1, v1.1.2)
- Bug fixes
- Small UI tweaks
- Documentation updates

## 👥 Target Audiences Defined

### Admin Flows
- **CBO Administrators**: Nonprofit org admins
- **Platform Admins**: Connie platform administrators  
- **Support Staff**: Help desk and support teams

### Agent Flows
- **Staff Agents**: Full-time nonprofit staff
- **Volunteers**: Part-time helpers
- **Intake Specialists**: First-contact personnel

### Supervisor Flows
- **Department Supervisors**: Team managers
- **Executive Staff**: C-level users
- **Analytics Users**: Data analysts

### Client Flows
- **New Clients**: Organizations setting up
- **Existing Clients**: Expanding services
- **Partners**: Integration partners

### Integration Flows  
- **Developers**: Technical implementers
- **System Admins**: Infrastructure teams
- **Partners**: Third-party integrators

## 🤖 AI Agent Guidelines

### When Creating New Flows:
1. **Identify target audience first**
2. **Use appropriate subdirectory**
3. **Follow naming conventions**
4. **Include complete UAT package**
5. **ALWAYS include "00" starting screenshot** - Show where users currently work
6. **Update this README**

### When Updating Existing Flows:
1. **Increment version number**
2. **Preserve previous version**
3. **Document changes in release-notes.md**
4. **Update email templates**

## 📈 Future Enhancements

### Phase 1 (Current)
- Basic flow documentation
- UAT email packages
- Screenshot collections

### Phase 2 (Q4 2025)
- Interactive flow diagrams
- Video walkthroughs
- Multi-language support

### Phase 3 (2026)
- Automated flow generation
- Integration with docs site
- Analytics on flow usage

## 📞 Support

For questions about this documentation system:
- **CTO**: Technical architecture and implementation
- **CDO**: Documentation standards and content
- **Support Director**: User experience and training materials

---

*This system is designed to scale with Connie's growth from Prototype v2.0 through MVP v1.0 and beyond.*