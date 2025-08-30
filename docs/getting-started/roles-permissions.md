---
sidebar_label: Roles & Permissions
sidebar_position: 2
title: "User Roles & Permissions"
---

# User Roles & Permissions

Control access to your Connie platform through a comprehensive role-based permission system designed specifically for nonprofit organizations.

## Overview

Every user in your Connie instance must be assigned a role. Each role comes with specific permissions that control access levels and capabilities within the platform. This ensures your team members have appropriate access to features based on their responsibilities.

:::info Default Setup
Upon provisioning of a new Connie account, default roles are automatically created for your organization. As an administrator, you have full control over roles, permissions, and user assignments.
:::

---

## Standard Roles

Connie comes with five pre-configured roles designed to match typical nonprofit organizational structures:

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__header">
        <h3>🔧 CBO Administrator</h3>
      </div>
      <div className="card__body">
        <p><strong>Full organizational control</strong></p>
        <ul>
          <li>Manage all users and roles</li>
          <li>Configure channels and providers</li>
          <li>Access billing and account settings</li>
          <li>Set up integrations and workflows</li>
          <li>Generate reports and analytics</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__header">
        <h3>👥 Program Manager</h3>
      </div>
      <div className="card__body">
        <p><strong>Program-specific oversight</strong></p>
        <ul>
          <li>Manage program team members</li>
          <li>Configure program-specific settings</li>
          <li>Access program performance metrics</li>
          <li>Set up program workflows</li>
          <li>Generate program reports</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__header">
        <h3>👁️ Supervisor</h3>
      </div>
      <div className="card__body">
        <p><strong>Team monitoring and coaching</strong></p>
        <ul>
          <li>Monitor agent activities in real-time</li>
          <li>Listen, whisper, and barge into calls</li>
          <li>Manage queue assignments</li>
          <li>Generate team performance reports</li>
          <li>Conduct quality assurance reviews</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__header">
        <h3>🎧 Staff Agent</h3>
      </div>
      <div className="card__body">
        <p><strong>Direct client interaction</strong></p>
        <ul>
          <li>Handle inbound and outbound interactions</li>
          <li>Access client information and history</li>
          <li>Use communication channels (voice, chat, email)</li>
          <li>Update client records and notes</li>
          <li>Transfer interactions when needed</li>
        </ul>
      </div>
    </div>
  </div>
</div>

:::warning Super Admin Access
**Super Admin** role is reserved for Connie platform staff only and provides system-level access for technical support and maintenance.
:::

---

## Permission Management

### Core Permission Categories

**Channel Access**
- Voice calling and management
- SMS/Text messaging
- Web chat and social media
- Email handling
- Fax sending and receiving

**Administrative Functions**
- User management and provisioning
- Role and permission configuration
- Provider and integration setup
- Billing and subscription management
- Security and compliance settings

**Monitoring & Reporting**
- Real-time dashboard access
- Performance analytics and reports
- Call recording playback
- Quality assurance tools
- Historical data access

**Client Data Access**
- View client profiles and history
- Edit client information
- Access sensitive data (based on HIPAA/privacy rules)
- Export client data
- Integration with external CRMs

### Custom Permissions

Administrators can create custom permission sets for specialized roles:

- **Volunteer Coordinators** - Limited access for managing volunteer interactions
- **Grant Writers** - Access to outcome metrics and reporting data
- **Board Members** - High-level analytics without operational access
- **Interns** - Supervised access with limited permissions

---

## CRM Integration & Data Context

### Dynamic Task Context

Connie's CRM Container Component enhances agent productivity by providing real-time client context:

<div style={{
  width: '100%',
  height: '300px',
  backgroundColor: '#f8f9fa',
  border: '2px dashed #dee2e6',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  color: '#6c757d',
  marginBottom: '20px'
}}>
  📊 CRM Integration Flow Diagram<br/>
  <small>(Coming Soon)</small>
</div>

### How CRM Integration Works

1. **Data Collection**: During client onboarding, Connie collects identifying information
2. **External Lookup**: System queries your CRM or database for additional client context
3. **Task Context Attributes**: Retrieved data is packaged with the incoming interaction
4. **Dynamic Display**: Agent workspace updates automatically with relevant client information
5. **Real-Time Updates**: Changes in CRM reflect immediately in agent interface

### Supported CRM Platforms

- **HubSpot** ✅ - Full integration with contact management
- **Salesforce** ✅ - Custom object support and workflow automation
- **Microsoft Dynamics** - Contact and case management integration
- **Custom Database** - API-based integration for proprietary systems

### Data Security & Compliance

All CRM integrations maintain strict security standards:

- **Encrypted Data Transfer** - All API calls use TLS 1.3 encryption
- **HIPAA Compliance** - Healthcare data handling meets HIPAA requirements
- **Role-Based Access** - CRM data visibility controlled by user permissions
- **Audit Logging** - Complete audit trail of data access and modifications

---

## User Provisioning Workflow

### Adding New Users

1. **Create User Account**
   - Enter basic user information
   - Assign primary role
   - Set initial permissions

2. **Role Assignment**
   - Select appropriate role based on responsibilities
   - Customize permissions if needed
   - Set up team or program assignments

3. **Training & Onboarding**
   - Provide role-specific training materials
   - Schedule system walkthrough
   - Set up mentoring with experienced users

4. **Security Setup**
   - Enable two-factor authentication
   - Configure single sign-on (if available)
   - Set password policy compliance

### Role Change Process

When users change roles within your organization:

1. **Document Request** - Formal role change request with justification
2. **Administrator Approval** - CBO Administrator or Program Manager approval
3. **Permission Update** - Modify user permissions to match new role
4. **Data Access Review** - Ensure appropriate data access for new responsibilities
5. **Training** - Provide additional training for new role capabilities

---

## Best Practices

### Security Recommendations

- **Principle of Least Privilege** - Grant minimum permissions necessary for job function
- **Regular Access Reviews** - Quarterly review of user permissions and access
- **Role-Based Training** - Ensure users understand their permission boundaries
- **Incident Response** - Clear procedures for permission-related security incidents

### Organizational Structure

- **Clear Role Definitions** - Document responsibilities for each role
- **Escalation Paths** - Define who users contact for permission-related issues
- **Cross-Training** - Ensure multiple people can handle critical administrative functions
- **Succession Planning** - Plan for administrator role transitions

### Compliance Considerations

- **Data Privacy Laws** - Ensure permissions align with GDPR, CCPA requirements
- **Industry Regulations** - Meet HIPAA, FERPA, or other industry-specific requirements
- **Grant Requirements** - Configure permissions to meet funder reporting needs
- **Board Oversight** - Provide board members appropriate visibility without operational access

---

## Getting Help

### Role Configuration Support

- **Documentation**: [Complete Role Management Guide](#)
- **Video Tutorials**: [Permission Setup Walkthrough](#)
- **Best Practices**: [Nonprofit Security Framework](#)

### Technical Support

For assistance with role configuration or permission issues:

- **Email**: [support@connie.one](mailto:support@connie.one)
- **Priority Support**: Available for CBO Administrators
- **Emergency Access**: 24/7 support for user lockout situations

### Training Resources

- **New Administrator Training** - Complete setup and management course
- **Role-Specific Guides** - Tailored documentation for each role
- **Video Library** - Step-by-step permission configuration tutorials

---

*Proper role and permission management ensures your nonprofit maintains security, compliance, and operational efficiency while empowering your team to serve your community effectively.*