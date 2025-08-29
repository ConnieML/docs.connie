# Connie Service Level Agreement (SLA)

**Last Updated:** [DATE]  
**Effective Date:** [DATE]

This Service Level Agreement ("SLA") applies to the Connie communication platform services ("Services") provided by ConnieML, Inc. ("Connie") to customers ("Customer") pursuant to the Connie Terms of Service ("Agreement"). This SLA does not apply to free trials, beta services, or services provided at no charge.

## 1. Service Availability Commitment

### 1.1 Uptime Target
Connie commits to maintaining the following availability levels for covered Services:

| Service Component | Monthly Uptime Target |
|------------------|----------------------|
| Core Platform API | 99.5% |
| Voice Services (via Twilio) | 99.5% |
| Messaging Services (via Sinch/Twilio) | 99.5% |
| Email Delivery (via Mailgun/SendGrid) | 99.0% |
| Admin Dashboard | 99.0% |
| Fax Services | 98.0% |

### 1.2 Measurement Period
Availability is calculated on a calendar month basis using the formula:

**Uptime % = (Total Minutes in Month - Downtime Minutes) / Total Minutes in Month × 100**

### 1.3 Service Credits
If Connie fails to meet the uptime commitment, Customer may be eligible for service credits:

| Monthly Uptime Percentage | Service Credit |
|---------------------------|----------------|
| 99.0% - < 99.5% | 10% of monthly fee |
| 95.0% - < 99.0% | 25% of monthly fee |
| 90.0% - < 95.0% | 50% of monthly fee |
| < 90.0% | 100% of monthly fee |

## 2. Service Definitions

### 2.1 Covered Services
This SLA covers:
- Connie API endpoints
- Voice call routing and delivery
- SMS/MMS message delivery
- Email transmission services
- Fax transmission services
- Admin dashboard accessibility
- Agent dashboard functionality

### 2.2 Service Components Not Covered
This SLA does not cover:
- Customer's internet connectivity
- Customer's equipment or software
- Third-party integrations not managed by Connie
- Services explicitly labeled as "beta" or "experimental"
- Free tier services

## 3. Downtime Definition

### 3.1 What Constitutes Downtime
"Downtime" means:
- Complete unavailability of the Service
- Error rates exceeding 5% for API calls
- Inability to make or receive calls/messages
- Dashboard inaccessibility for authorized users

### 3.2 Downtime Exclusions
Downtime does not include:
- Scheduled maintenance (with 5 days advance notice)
- Emergency maintenance (with maximum 4 hours duration per month)
- Force majeure events
- Customer-caused issues
- Issues with upstream providers beyond Connie's control
- DNS or routing issues outside Connie's network
- Suspension for Agreement violations

## 4. Support Response Times

### 4.1 Severity Levels and Response Targets

| Severity | Definition | Initial Response | Resolution Target |
|----------|------------|-----------------|-------------------|
| **Severity 1 (Critical)** | Complete service outage affecting all users | 30 minutes | 4 hours |
| **Severity 2 (High)** | Major functionality degraded, affecting multiple users | 2 hours | 8 hours |
| **Severity 3 (Medium)** | Limited impact, workaround available | 8 business hours | 2 business days |
| **Severity 4 (Low)** | Minor issue, no immediate impact | 24 business hours | 5 business days |

### 4.2 Support Availability
- **24/7 Support:** Severity 1 and 2 issues
- **Business Hours Support:** Severity 3 and 4 issues (Monday-Friday, 9 AM - 6 PM [TIMEZONE])
- **Emergency Hotline:** [EMERGENCY_PHONE] (Severity 1 only)

## 5. Service Credit Process

### 5.1 Credit Request Requirements
To receive service credits, Customer must:
- Submit a request within 30 days of the incident
- Provide incident details and impact description
- Include relevant logs or error messages
- Reference ticket numbers from reported issues

### 5.2 Credit Application
- Credits apply only to future invoices
- Credits cannot exceed total monthly service fees
- Credits are the sole remedy for SLA failures
- Credits not redeemable for cash

### 5.3 Credit Request Submission
Submit credit requests to: [SLA_CREDIT_EMAIL]

## 6. Maintenance Windows

### 6.1 Scheduled Maintenance
- **Frequency:** Maximum once per month
- **Duration:** Maximum 4 hours per window
- **Timing:** Weekends, 2 AM - 6 AM [TIMEZONE]
- **Notice:** Minimum 5 business days advance notice

### 6.2 Emergency Maintenance
- **Duration:** Maximum 4 hours per month cumulative
- **Notice:** Best effort advance notice
- **Communication:** Status page updates every 30 minutes

## 7. Performance Metrics

### 7.1 API Response Times
Target response times under normal load:

| Endpoint Type | Target Response Time (95th percentile) |
|--------------|---------------------------------------|
| Authentication | < 200ms |
| Read Operations | < 500ms |
| Write Operations | < 1000ms |
| Voice Call Setup | < 3 seconds |
| Message Delivery | < 5 seconds |

### 7.2 Quality Metrics
- **Voice Call Quality:** MOS score > 3.5
- **Message Delivery Rate:** > 98% successful delivery
- **Email Delivery Rate:** > 95% successful delivery
- **Fax Success Rate:** > 90% successful transmission

## 8. Customer Responsibilities

To qualify for this SLA, Customer must:
- Report issues promptly through official support channels
- Provide reasonable cooperation in troubleshooting
- Maintain current account standing
- Use Services within documented limits
- Implement recommended error handling
- Maintain compatible software versions

## 9. Monitoring and Reporting

### 9.1 Service Status Page
Real-time status available at: [STATUS_URL]

### 9.2 Monthly Reports
Upon request, Connie will provide:
- Monthly uptime statistics
- Incident summaries
- Performance metrics
- Maintenance schedule

### 9.3 Monitoring Methodology
- External monitoring from multiple geographic locations
- 1-minute interval health checks
- Synthetic transaction monitoring
- Real user monitoring (RUM) data

## 10. Nonprofit-Specific Provisions

### 10.1 Enhanced Support for Critical Services
For nonprofits providing critical services:
- Priority queue for Severity 1 issues
- Dedicated support contact during emergencies
- Disaster recovery assistance

### 10.2 Flexible Maintenance Windows
- Accommodation for nonprofit operating hours
- Avoidance of critical service periods
- Coordination with major nonprofit events

## 11. Escalation Procedures

### 11.1 Support Escalation Path

**Level 1:** Initial Support Team
- Email: [SUPPORT_EMAIL]
- Phone: [SUPPORT_PHONE]

**Level 2:** Technical Lead
- Available for Severity 1-2 issues
- Response within 1 hour of escalation

**Level 3:** Engineering Manager
- Available for unresolved Severity 1 issues
- Response within 2 hours of escalation

**Level 4:** VP of Engineering
- Critical customer impact situations
- Response within 4 hours of escalation

### 11.2 Executive Escalation
For SLA disputes or critical situations:
- Contact: [EXECUTIVE_ESCALATION_EMAIL]
- Response: Within 24 business hours

## 12. Limitations

### 12.1 Maximum Liability
Total service credits for any month shall not exceed 100% of monthly service fees.

### 12.2 Sole Remedy
Service credits are Customer's sole remedy for SLA failures.

### 12.3 Force Majeure
Connie is not liable for failures caused by factors beyond reasonable control.

## 13. SLA Modifications

### 13.1 Update Process
- 30 days advance notice for material changes
- Notification via email and dashboard announcement
- Current version always available at [SLA_URL]

### 13.2 Acceptance
Continued use of Services after SLA updates constitutes acceptance.

## 14. Definitions

**"API"** means Application Programming Interface  
**"Business Day"** means Monday-Friday, excluding holidays  
**"Business Hours"** means 9 AM - 6 PM [TIMEZONE]  
**"Downtime"** means period of unavailability as defined in Section 3  
**"MOS"** means Mean Opinion Score for voice quality  
**"Service Credit"** means credit toward future Services  
**"Uptime"** means period Services are available  

## 15. Contact Information

### Support Contacts
**General Support:** [SUPPORT_EMAIL]  
**Emergency Hotline:** [EMERGENCY_PHONE]  
**SLA Credits:** [SLA_CREDIT_EMAIL]  
**Status Page:** [STATUS_URL]

### Business Hours
Monday - Friday: 9 AM - 6 PM [TIMEZONE]  
24/7 for Severity 1 issues

---

**ConnieML, Inc.**  
[ADDRESS]  
[CITY, STATE ZIP]  
[COUNTRY]

---

*This SLA is subject to the terms of the Agreement. In case of conflict, the Agreement prevails except for specific SLA commitments stated herein.*

*This document is a template and must be reviewed by legal counsel before use. Replace all bracketed placeholders with appropriate information.*