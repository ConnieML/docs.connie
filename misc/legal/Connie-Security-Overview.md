# Connie Security Overview

**Last Updated:** [DATE]

This Security Overview ("Security Overview") is incorporated into and made a part of the agreement between ConnieML, Inc. ("Connie") and Customer covering Customer's use of the Services (as defined below), including any terms applicable to the processing of personal data set forth therein (collectively, "Agreement"). Any capitalized term used but not defined has the meaning provided in the Agreement.

## 1. Definitions

**"Customer Data"** means any data (a) provided by Customer, or any user of the Services, including via any products and services provided by Customer, to Connie in connection with Customer's use of the Services or (b) generated for Customer's use as part of the Services.

**"Services"** means the Connie communication platform services including voice, fax, email, web chat, and related application programming interfaces.

**"Security Incident"** means any unauthorized access, use, disclosure, or theft of Customer Data or disruption to the Services.

## 2. Purpose

This Security Overview describes Connie's security program, including Connie's security certifications and self-attestations and technical and organizational security controls to protect:
- Customer Data from unauthorized use, access, disclosure, or theft
- The Services and platform infrastructure

As security threats change over time, Connie continues to update its security program and strategy to protect Customer Data and the Services in accordance with industry best practices. As such, Connie reserves the right to update this Security Overview from time to time; provided, however, any update will not materially reduce the overall protections set forth in this Security Overview. The then-current terms of this Security Overview are available at [SECURITY_OVERVIEW_URL].

This Security Overview does not apply to any:
- Services identified as alpha, beta, not generally available, limited release, developer preview, or similar Services
- Services provided by telecommunications providers or third-party vendors

## 3. Security Organization and Program

Connie maintains a risk-based assessment security program based on the ISO/IEC 27001 Information Security Management System (ISMS), which includes administrative, technical, organizational, and physical safeguards reasonably designed to protect the Services and the security, confidentiality, integrity, and availability of Customer Data.

### 3.1 Program Management
- Security program appropriate to the nature of Services and size of operations
- Dedicated Information Security team managing security initiatives
- Chief Information Security Officer reporting to executive management
- Regular security reviews with executive leadership
- Annual review and approval of security policies and standards

### 3.2 Special Considerations for Nonprofits
Given Connie's focus on serving nonprofit and community-based organizations, our security program includes additional considerations for:
- Protection of vulnerable population data
- Compliance with sector-specific regulations (HIPAA, FERPA, etc.)
- Enhanced privacy controls for beneficiary information
- Support for grant compliance and audit requirements

## 4. People Security and Onboarding

Connie maintains comprehensive policies, procedures, and controls that are regularly updated to align with industry best practices. All Connie employees are subject to the following minimum security measures:

### 4.1 Pre-Employment
- Background checks administered by recognized third-party providers
- Education and employment verification
- Reference checks
- Criminal, credit, and right-to-work verification (where permitted by law)

### 4.2 Ongoing Requirements
- Execution of confidentiality agreements
- Annual completion of mandatory security and privacy training
- Extended deadlines for employees on leave of absence
- Continuous monitoring through anonymous ethics hotline
- Regular security awareness training including simulated incidents (e.g., phishing campaigns)
- Controlled access to Customer Data strictly for authorized employees

## 5. Physical Security

### 5.1 Office Security
Connie maintains strong physical security controls at its offices, guided by a regularly reviewed physical security policy that establishes baseline controls for:
- Access controls and badge requirements
- Securing IT equipment
- After-hours monitoring
- Visitor management procedures
- Clean desk policy enforcement

### 5.2 Data Center Security
Connie requires its infrastructure providers to maintain physical security standards that are, at minimum, aligned with SOC 2 standards, including:
- 24/7 security personnel
- Multi-factor authentication for facility access
- Environmental monitoring and controls
- Video surveillance and intrusion detection

## 6. Third Party Vendor Management

### 6.1 Vendor Assessment
Connie implements a comprehensive vendor management program that:
- Applies security controls proportional to service type and risk
- Thoroughly vets prospective vendors through security assessments
- Ensures compliance with confidentiality, security, and privacy requirements
- Requires contractual security obligations for vendors processing Customer Data

### 6.2 Ongoing Monitoring
Regular reviews include:
- Vendor compliance with security standards
- Access to Customer Data and protection controls
- Evolving legal and regulatory requirements
- Business continuity capabilities

### 6.3 Sub-processors
Current third-party vendors that are sub-processors are available at [SUBPROCESSORS_URL]. Telecommunication providers are not considered third-party vendors or sub-processors of Connie.

## 7. Security Certifications and Attestations

Connie holds or is working toward the following security-related certifications and attestations:

| Certification or Attestation | Covered Services | Status |
|----------------------------|------------------|---------|
| SOC 2 Type 2 | All Services | [STATUS] |
| ISO/IEC 27001 | Core Platform Services | [STATUS] |
| HIPAA Compliance | Healthcare-related Services | [STATUS] |

For additional information relating to Connie's security certifications and attestations, please visit the Connie Trust Center at [TRUST_CENTER_URL].

## 8. Hosting Architecture and Data Segregation

### 8.1 Infrastructure Providers
Connie Services are hosted by industry-leading infrastructure providers:

| Infrastructure Provider | Covered Services | Security Documentation |
|------------------------|------------------|----------------------|
| Amazon Web Services (AWS) | Core Platform Services | https://aws.amazon.com/security/ |
| Google Cloud Platform (GCP) | Analytics and Reporting Services | https://cloud.google.com/security |
| [PROVIDER_NAME] | [SERVICES] | [URL] |

### 8.2 Production Environment and Customer Data Access
- Production environment logically isolated in Virtual Private Cloud (VPC)
- Customer Data encrypted at all times
- Infrastructure hosted in the United States
- Network access restricted using principle of least privilege
- Access control lists managing network segregation
- Customer Data separated using logical identifiers and unique tags
- APIs designed to prevent cross-customer data access

## 9. Security by Design

Connie follows security by design principles when developing Services:

### 9.1 Secure Software Development Lifecycle (SSDLC)
Security activities across product lifecycle include:
- Security requirements gathering
- Threat modeling for new features
- Security code reviews
- Static and dynamic security testing
- Penetration testing by independent third parties
- Security review before deployment

### 9.2 Continuous Security
- Regular security assessments
- Automated security scanning
- Dependency vulnerability management
- Security training for developers

## 10. Access Controls

### 10.1 Provisioning Access
Connie follows least privilege principles:
- Team-based access control mechanisms
- Access approval required before granting
- Quarterly reviews of production access rights
- Prompt removal upon employment termination
- Multi-factor authentication required
- Management approval for production access
- Mandatory training before access granted
- Logging of high-risk actions and changes
- Automated anomaly detection and alerting

### 10.2 Password Controls
- Compliance with NIST 800-63B guidance
- Minimum password length and complexity requirements
- Multi-factor authentication required
- Password hashing before storage
- Customer accounts require two-factor authentication (2FA)

## 11. Change Management

### 11.1 Formal Process
Connie maintains a formal change management process:
- Review and evaluation in test environment
- Documentation using auditable system of record
- Risk assessment for high-risk changes
- Stakeholder approval requirements
- Rollback plans and procedures

### 11.2 Deployment Controls
- Separation of development and production environments
- Automated testing and deployment pipelines
- Change advisory board for significant changes
- Post-implementation review

## 12. Encryption

### 12.1 Encryption in Transit
- Customer Data encrypted using TLS v1.2 or higher
- Certificate pinning for mobile applications
- Opportunistic TLS for email services
- Enforced TLS option available for email
- VPN requirements for administrative access

### 12.2 Encryption at Rest
- Customer Data encrypted using Advanced Encryption Standard (AES-256)
- Key management using industry best practices
- Regular key rotation procedures
- Hardware security modules for sensitive operations

## 13. Vulnerability Management

### 13.1 Continuous Monitoring
Connie maintains controls to mitigate security vulnerabilities:
- Regular vulnerability scanning of infrastructure
- Third-party security assessment tools
- Critical patch evaluation and testing
- Automated patch deployment
- Vulnerability prioritization based on risk

### 13.2 Remediation Timelines
- Critical vulnerabilities: 24-48 hours
- High vulnerabilities: 7 days
- Medium vulnerabilities: 30 days
- Low vulnerabilities: 90 days

## 14. Penetration Testing

### 14.1 Testing Program
- Annual penetration tests by independent third parties
- Application-level security assessments
- Infrastructure penetration testing
- Social engineering assessments
- Prompt remediation of findings

### 14.2 Bug Bounty Program
Connie maintains a Bug Bounty Program that allows security researchers to report vulnerabilities on an ongoing basis through [BUG_BOUNTY_URL].

## 15. Security Incident Management

### 15.1 Prevention Measures
- Security incident management per NIST SP 800-61
- Security Incident Response Team (SIRT)
- Security log retention for 180 days
- DDoS detection and mitigation
- 24/7 security monitoring
- Threat intelligence integration

### 15.2 Incident Response
- Prompt investigation upon discovery
- Customer notification per Agreement terms
- Email notifications to designated contacts
- Coordination with law enforcement when appropriate
- Regulatory compliance for notifications
- Post-incident review and improvement

## 16. Resilience and Service Continuity

### 16.1 Resilience Architecture
- Multiple geographically diverse regions
- Fault-independent availability zones
- Real-time issue detection and routing
- Automated host regeneration
- Load balancing across regions

### 16.2 Service Continuity
- Performance monitoring tools
- Automatic capacity scaling
- Traffic shifting capabilities
- Immediate alerting for issues
- Business continuity planning
- Regular disaster recovery testing

### 16.3 Nonprofit-Specific Continuity
- Priority restoration for critical nonprofit services
- Special provisions for disaster response organizations
- Coordination with emergency management agencies

## 17. Customer Data Backups

### 17.1 Backup Procedures
- Regular automated backups of Customer Data
- Redundant storage across multiple availability zones
- Encryption of backups in transit and at rest
- Tested restoration procedures
- Point-in-time recovery capabilities

### 17.2 Retention Policies
- Standard retention period: [DAYS]
- Extended retention available upon request
- Customer-initiated backup options
- Data export capabilities

## 18. Compliance and Auditing

### 18.1 Compliance Programs
- GDPR compliance for EU data
- CCPA compliance for California residents
- HIPAA compliance for healthcare data
- Sector-specific compliance support

### 18.2 Audit Support
- Annual third-party security audits
- Customer audit rights (per Agreement)
- Compliance documentation available
- Security questionnaire support

## 19. Data Residency and Sovereignty

### 19.1 Data Location
- Primary data storage in United States
- Customer notification of data location
- No offshore data processing without consent
- Compliance with data localization requirements

## 20. Security Training and Awareness

### 20.1 Employee Training
- Security onboarding for all employees
- Annual security awareness training
- Role-specific security training
- Incident response training
- Privacy and compliance training

### 20.2 Customer Resources
- Security best practices documentation
- Implementation guides
- Security configuration recommendations
- Regular security advisories

---

**ConnieML, Inc.**  
[ADDRESS]  
[CITY, STATE ZIP]  
[COUNTRY]

**Security Contact:** [SECURITY_EMAIL]  
**Trust Center:** [TRUST_CENTER_URL]  
**Bug Bounty Program:** [BUG_BOUNTY_URL]

---

*This document is subject to change. The most current version is available at [SECURITY_OVERVIEW_URL]. This document is a template and must be reviewed by legal counsel before use. Replace all bracketed placeholders with appropriate information.*