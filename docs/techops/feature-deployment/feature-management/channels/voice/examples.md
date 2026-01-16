---
sidebar_label: Examples
sidebar_position: 6
title: "Voice Channel Examples"
---

# Voice Channel Examples

Real-world implementations showing how different organizations use Connie's voice features.

## Small Organization Examples

### Community Food Bank
**Challenge**: Small staff, limited hours, need to capture volunteer inquiries  
**Solution**: Direct to Voicemail + Email Notifications
- Custom greeting explains hours and services
- Voicemails forwarded to coordinator email
- Transcription helps prioritize responses

**Setup**: [Direct to Voicemail](./workflows/voicemail-only) + [Email Notifications](./add-ons/email-notifications)

---

### Local Legal Aid
**Challenge**: Urgent intake calls, need quick screening  
**Solution**: Direct + Custom Greetings
- Professional greeting explains services
- Calls ring directly to available advocates
- Busy signal prompts callback request

**Setup**: [Direct](./workflows/direct) + [Custom Greetings](./add-ons/custom-greetings)

## Medium Organization Examples

### Crisis Support Center
**Challenge**: 24/7 availability, trained volunteers, overflow handling  
**Solution**: Direct + Options + IVR
- Calls ring to trained volunteers
- Press * during hold for options:
  - Request callback (keeps place in queue)
  - Leave urgent message
  - Access resource directory
- IVR routes to different support lines

**Setup**: [Direct + Options](./workflows/direct-with-options) + [IVR Functions](./add-ons/ivr-functions)

---

### Healthcare Clinic
**Challenge**: Appointment scheduling, prescription refills, urgent concerns  
**Solution**: Custom Build + Integrations
- IVR menu separates call types:
  - Press 1: Schedule appointment → Scheduling queue
  - Press 2: Prescription refills → Pharmacy queue  
  - Press 3: Urgent medical → Nurse line
- Integration with EMR system for caller lookup

**Setup**: [Custom Build](./workflows/custom) + [Integrations](./add-ons/integrations)

## Large Organization Examples

### Regional Social Services
**Challenge**: Multiple programs, different locations, complex routing  
**Solution**: Custom Build + Full Feature Set
- Multi-level IVR:
  - Location selection
  - Program selection  
  - Language preference
- CRM integration shows case history
- Transcription for compliance documentation
- Email notifications to program managers

**Setup**: [Custom Build](./workflows/custom) + All Add-ons

---

### University Counseling Center
**Challenge**: Student privacy, crisis intervention, appointment booking  
**Solution**: Direct + Options + Enhanced Features
- Direct connection to counselors during hours
- After-hours crisis protocol with escalation
- Voicemail transcription for follow-up planning
- Integration with student information system

**Setup**: [Direct + Options](./workflows/direct-with-options) + [Transcription](./add-ons/transcription) + [Integrations](./add-ons/integrations)

## Specialized Use Cases

### Multilingual Services
**Organization**: Immigration assistance nonprofit  
**Challenge**: Serve Spanish and English speakers
- Custom greeting in both languages
- IVR for language selection
- Separate queues for bilingual staff
- Transcription in both languages (coming soon)

### After-Hours Professional Service
**Organization**: Mental health practice  
**Challenge**: Crisis calls outside business hours
- Custom greeting explains emergency procedures
- Direct to voicemail for non-urgent matters
- Integration with answering service for crises
- Email alerts to on-call provider

### Grant-Funded Program
**Organization**: Time-limited federal program  
**Challenge**: Track all interactions for reporting
- Standard workflow with enhanced documentation
- Transcription for all voicemails
- Integration with case management system
- Detailed reporting for compliance

## Common Patterns by Need

| **Primary Need** | **Recommended Workflow** | **Key Add-Ons** |
|---|---|---|
| Simple message taking | Direct to Voicemail | Email Notifications |
| Professional presence | Direct + Custom Greetings | IVR Functions |
| Handle call volume | Direct + Options | All communication features |
| Complex routing | Custom Build | Integrations |
| Compliance/Documentation | Any workflow | Transcription + Email |
| Multilingual support | Custom Build | Custom Greetings |

## Getting Started with These Examples

1. **Identify your closest match** from the examples above
2. **Start with the basic workflow** recommended  
3. **Add features gradually** as you grow
4. **Customize based on your specific needs**

## Need Custom Help?

Don't see your use case? These examples show the flexibility of combining workflows and add-ons. Contact support to discuss your specific requirements and get implementation guidance.