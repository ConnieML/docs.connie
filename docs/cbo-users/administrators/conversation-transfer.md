---
sidebar_label: "Conversation Transfer Configuration"
title: "Conversation Transfer System Configuration"
---

# Conversation Transfer System Configuration

As a CBO Administrator, you control how conversation transfers work across your organization, set up transfer queues, and ensure your staff can effectively move conversations when needed.

## 🎛️ System Overview

The conversation transfer feature allows your staff to:
- Transfer calls, SMS, webchat, and WhatsApp conversations
- Use cold transfers (immediate) or warm transfers (collaborative)
- Transfer to specific agents or to queues/teams
- Include contextual notes with transfers

## ⚙️ Initial Setup and Configuration

### Enable Conversation Transfers
1. Navigate to **Admin Panel** → **Features**
2. Find **Conversation Transfer** feature
3. Enable the following options:
   - `cold_transfer`: Allows immediate transfers
   - `multi_participant`: Enables warm transfers with collaboration
   - `enabled`: Master switch for the entire feature

### Configuration Options
```javascript
conversation_transfer: {
  enabled: true,              // Master enable/disable
  cold_transfer: true,        // Allow immediate transfers
  multi_participant: true     // Allow warm transfers
}
```

## 👥 Queue Management

### Setting Up Transfer Queues
Transfer queues organize your staff by skill or department:

1. **Sales Queue** - For sales-related transfers
2. **Support Queue** - For technical support transfers  
3. **Supervisor Queue** - For escalations
4. **Billing Queue** - For billing and payment issues

### Queue Configuration Steps
1. Go to **Admin Panel** → **Queues**
2. Create new queue or modify existing ones
3. Assign agents to appropriate queues
4. Set queue priorities and routing rules
5. Configure working hours for each queue

## 🔐 Permission Management

### Agent Permissions
Control who can transfer and receive transfers:

**Standard Agent:**
- Can transfer conversations
- Can receive transfers in their assigned queues
- Cannot modify transfer settings

**Senior Agent:**
- All standard permissions
- Can receive transfers from any queue
- Can view transfer analytics

**Supervisor:**
- All agent permissions
- Can intercept any transfer
- Can modify queue assignments
- Can view team transfer reports

### Setting Permissions
1. **Admin Panel** → **Users** → Select user
2. Navigate to **Permissions** tab
3. Configure transfer-related permissions:
   - `conversations.transfer.send`
   - `conversations.transfer.receive`
   - `conversations.transfer.manage`

## 📊 Monitoring and Analytics

### Key Metrics to Track
- **Transfer Volume:** How many transfers per day/week
- **Transfer Success Rate:** Percentage of accepted transfers
- **Average Transfer Time:** How long transfers take
- **Queue Performance:** Which queues handle transfers best
- **Agent Performance:** Who transfers most/least effectively

### Setting Up Reports
1. Navigate to **Admin Panel** → **Reports**
2. Create custom report for transfers
3. Select metrics: transfer count, success rate, timing
4. Set up automated delivery to supervisors
5. Configure alert thresholds for unusual patterns

## 🚨 Troubleshooting Common Issues

### Transfers Not Working
**Symptoms:** Agents can't see transfer button or transfers fail

**Solutions:**
1. Verify feature is enabled in configuration
2. Check agent permissions
3. Confirm TaskRouter workflow is properly configured
4. **CRITICAL:** Verify TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID environment variable
5. Test with admin account to isolate issue

**NSS Production Resolution Process:**
1. **Check Workflow SID Configuration:**
   ```bash
   # Verify environment variable is set
   echo $TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID
   
   # Should return format: WWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

2. **Discover Correct Workflow SID:**
   - Login to Twilio Console for your CBO account
   - Navigate to **TaskRouter** → **Workflows**
   - Look for workflow named "Chat Transfer" (exact name varies by CBO)
   - Copy the Workflow SID (starts with WW)
   - Update your environment variable: `TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID=WWxxx`

3. **Common Workflow Issues:**
   - **Wrong SID:** Each CBO has unique workflow SIDs
   - **Inactive Workflow:** Ensure status is "Active" in TaskRouter console
   - **Missing Workflow:** May need to create new Chat Transfer workflow

### Long Transfer Wait Times
**Symptoms:** Clients wait too long when being transferred

**Solutions:**
1. Review queue staffing levels
2. Check agent availability settings
3. Consider adding overflow queues
4. Adjust queue timeout settings

### Agents Not Receiving Transfers
**Symptoms:** Transfers go unanswered or fail

**Solutions:**
1. Verify agents are in Available status
2. Check queue assignments
3. Review notification settings
4. Ensure agents understand how to accept transfers

## 🔧 Advanced Configuration

### Multi-Account Setup
If you have multiple CBOs or departments:
1. Create separate transfer workflows per account
2. Configure cross-account transfer permissions
3. Set up account-specific queues
4. Implement proper routing between accounts

**IMPORTANT - NSS Implementation Experience (PRODUCTION VALIDATED):**
Each CBO account requires its own unique workflow SID. You cannot share workflow SIDs between accounts. This was the primary cause of the "TaskRouter error: Bad Request" issues resolved in NSS production.

**Multi-Account Workflow SID Management (PROVEN APPROACH):**
```bash
# Example for multiple CBOs (NSS production pattern)
TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID_CBO1=WWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID_CBO2=WWyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID_CBO3=WWzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz

# Primary workflow SID (for main CBO)
TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID=WWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Deployment Best Practices for Multi-Account (NSS VALIDATED):**
1. **Test each account separately** before enabling transfers across accounts
2. **Document workflow SIDs** for each CBO in your deployment notes with account names
3. **Set up monitoring** for transfer success rates per account (target >95% each)
4. **Plan rollback procedure** if one account fails (disable transfers vs full rollback)
5. **Verify workflow SID format** - must be exactly 34 characters starting with WW
6. **Test workflow discovery process** for each CBO before production deployment
7. **Schedule validation window** - have admin available for first 2 hours post-deployment

### Custom Transfer Reasons
Add dropdown options for why transfers occur:
1. Language preference
2. Technical expertise needed
3. Supervisor escalation
4. Billing inquiry
5. Service complaint

### Integration with External Systems
- **CRM Integration:** Transfer notes sync to client records
- **Ticketing System:** Automatic ticket creation on transfers
- **Analytics Platform:** Export transfer data for analysis

## 📋 Maintenance Tasks

### Daily
- Monitor transfer queue performance
- Review failed transfer reports
- Check for agent availability issues

### Weekly  
- Analyze transfer patterns and trends
- Review agent transfer training needs
- Update queue assignments as needed

### Monthly
- Comprehensive transfer analytics review
- Agent performance evaluations
- System configuration optimization

## 🎓 Training and Support

### Staff Training Requirements
Ensure all staff understand:
- When to use cold vs warm transfers
- How to add helpful transfer notes
- Proper client communication during transfers
- Queue selection guidelines

### Creating Training Materials
1. Use actual transfer scenarios from your organization
2. Include screenshots of your specific ConnieRTC setup
3. Create quick reference cards for common transfers
4. Develop role-playing exercises for practice

## 📞 Getting Help

**Technical Issues:** Contact Connie Support with:
- Error messages or screenshots
- Steps to reproduce the problem
- Affected user accounts
- System configuration details

**Training Needs:** Work with your supervisors to:
- Identify skill gaps
- Develop training materials
- Schedule practice sessions
- Monitor improvement

## 🔍 Quick Configuration Checklist

### Pre-Deployment
- [ ] Conversation transfer feature enabled in configuration
- [ ] Transfer queues created and configured
- [ ] Agent permissions properly assigned
- [ ] TaskRouter workflow configured for transfers
- [ ] **CRITICAL:** TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID environment variable set
- [ ] Transfer analytics and reporting set up
- [ ] Staff trained on transfer procedures

### Post-Deployment (NSS Production Validation)
- [ ] **Test cold transfers within 15 minutes of deployment**
- [ ] **Test warm transfers with multiple participants**
- [ ] **Verify no "TaskRouter error: Bad Request" messages**
- [ ] **Check conversation history preservation**
- [ ] **Monitor transfer success rate (target: >95%)**
- [ ] **Validate agent transfer notifications working**
- [ ] **Test cross-queue transfer routing**

### Ongoing Maintenance
- [ ] Troubleshooting procedures documented
- [ ] Regular maintenance schedule established
- [ ] Transfer success rate monitoring dashboard configured
- [ ] Escalation procedures for transfer failures defined

## 🚀 Best Practices Summary

1. **Start Simple:** Enable basic transfers first, add complexity gradually
2. **Train Thoroughly:** Ensure all staff understand the process before going live
3. **Monitor Closely:** Watch transfer patterns in the first few weeks
4. **Optimize Regularly:** Adjust queues and routing based on actual usage
5. **Document Everything:** Keep configuration and procedure documentation current

## 🚨 Emergency Contact Protocol

**For Critical Transfer Failures (NSS Production Guidance):**
- **"TaskRouter error: Bad Request" across multiple agents:** IMMEDIATE escalation to Platform Developer
- **Complete transfer system failure:** Contact Connie Support with URGENT priority
- **Single CBO transfer issues:** Start with workflow SID verification process above
- **Cross-account transfer failures:** Check workflow SID configuration for each account

**Information to Provide in Escalations:**
- CBO account name and Twilio account SID
- Current TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID value
- TaskRouter workflow status from console
- Sample conversation SIDs where transfers failed
- Timestamp of when issues started
- Number of agents affected

Need technical assistance with configuration? Contact Connie Support or your Platform Developer with the above information ready.