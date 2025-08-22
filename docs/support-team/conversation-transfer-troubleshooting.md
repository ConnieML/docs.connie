---
sidebar_label: "Conversation Transfer Issues"
title: "Troubleshooting Conversation Transfers"
---

# Troubleshooting Conversation Transfers

Complete troubleshooting guide for resolving conversation transfer issues reported by CBO users.

## 🚨 Common Issues and Quick Fixes

### Issue: "Transfer Button is Missing"

**Symptoms:**
- Agent reports they can't see the transfer button
- Transfer option not available in conversation window

**Quick Diagnosis:**
1. Check if feature is enabled for this CBO
2. Verify agent has transfer permissions
3. Confirm conversation type supports transfers

**Resolution Steps:**
```bash
# Check feature status
Admin Panel → Features → Conversation Transfer → Enabled?

# Check agent permissions
Admin Panel → Users → [Agent Name] → Permissions → conversations.transfer.send

# Verify conversation type
SMS, Webchat, WhatsApp = ✅ Supported
Voice calls = ✅ Supported  
Email = ❌ Not supported
```

**Escalation:** If feature is enabled and permissions are correct, escalate to Platform Developer.

---

### Issue: "Transfer Gets Stuck Loading"

**Symptoms:**
- Agent clicks transfer but it never completes
- "Transferring..." status shows indefinitely
- Client reports being on hold for extended time

**Quick Diagnosis:**
1. Check if target agent is available
2. Verify TaskRouter workflow is running
3. Look for timeout issues

**Resolution Steps:**
```bash
# Check target agent status
Admin Panel → Agents → [Target Agent] → Status = Available?

# Check TaskRouter
ConnieRTC Console → TaskRouter → Workflows → "Chat Transfer" → Active?

# Cancel stuck transfer
Agent Interface → Conversations → [Stuck Conversation] → Cancel Transfer
```

**Escalation:** If workflow is active and target is available, contact Platform Developer with conversation SID.

---

### Issue: "Agent Says They Didn't Get Transfer Notification"

**Symptoms:**
- Transfer appears successful but receiving agent doesn't know about it
- Conversation sits in queue with no one handling it
- Client reports no response after transfer

**Quick Diagnosis:**
1. Check if agent has notifications enabled
2. Verify agent is actually available (not in hidden busy state)
3. Look for queue assignment issues

**Resolution Steps:**
```bash
# Check agent notification settings
Agent Account → Settings → Notifications → Transfer Requests = On?

# Check true availability
Admin Panel → Real-time Dashboard → [Agent Name] → 
Status = Available AND not on other tasks?

# Check queue assignments
Admin Panel → Queues → [Transfer Queue] → 
Members → [Agent Name] = Present?

# Manual assignment
Admin Panel → Live Conversations → [Transfer] → Assign to [Agent]
```

**Escalation:** If agent is properly configured, escalate to Platform Developer.

---

### Issue: "Transfers Keep Failing with Errors"

**Symptoms:**
- Agent gets error message when attempting transfer
- Transfer button works but shows "Transfer Failed" message
- Multiple agents reporting same issue
- **COMMON:** "TaskRouter error: Bad Request" messages

**Quick Diagnosis:**
1. Check system status and recent deployments
2. Look for TaskRouter service issues  
3. Verify workflow configuration
4. **CRITICAL:** Check TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID configuration

**Resolution Steps:**
```bash
# Check system status
ConnieRTC Console → Account Health → All Services = Operational?

# MOST IMPORTANT: Check workflow SID configuration
Admin Panel → Environment Variables → TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID
# Should be format: WWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Check workflow exists and is active
Twilio Console → TaskRouter → Workflows → Find "Chat Transfer" workflow
# Status should be "Active"
# Copy SID and compare to environment variable

# Check workflow configuration  
TaskRouter → Workflows → "Chat Transfer" → JSON valid?

# Check recent changes
Admin Panel → System Log → Filter: "transfer" → Last 24 hours

# Test with admin account
Admin Panel → Test Mode → Create test conversation → Attempt transfer
```

**NSS Production Fix Process (VALIDATED RESOLUTION):**
1. **Identify Correct Workflow SID (PROVEN METHOD):**
   - Login to Twilio Console for the specific CBO account
   - Navigate to TaskRouter → Workflows
   - Find workflow named "Chat Transfer" or similar (exact name varies by CBO)
   - **CRITICAL:** Verify Status is "Active" (inactive workflows cause silent failures)
   - Copy Workflow SID (format: WWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx - exactly 34 characters)
   - **Note:** Each CBO has unique workflow SIDs - cannot be shared between accounts

2. **Update Environment Variable (IMMEDIATE ACTION):**
   - Set TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID=WWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   - **Verify format:** Must be exactly 34 characters starting with WW
   - Restart ConnieRTC service (required for environment variable changes)
   - **Document change:** Note old SID vs new SID for rollback if needed

3. **Immediate Validation (WITHIN 15 MINUTES):**
   - Test cold transfer agent-to-agent (should complete under 10 seconds)
   - Test warm transfer with multiple participants (all should see each other)
   - Verify no "TaskRouter error: Bad Request" errors
   - Check TaskRouter dashboard for successful transfer task creation
   - Monitor agent reports for next 2 hours
   - **Success criteria:** >95% transfer success rate restored

**Escalation:** If workflow SID is correct and system appears healthy, escalate immediately to Platform Developer with:
- Current and previous workflow SID values
- Error messages and screenshots
- Conversation SIDs from failed transfers
- Affected CBO account information
- Timeline of when issues started
- Steps already attempted

---

## 🔍 Advanced Troubleshooting

### Diagnosing Warm Transfer Issues

**Problem:** Multi-participant transfers not working properly

**Investigation Steps:**
1. **Check Feature Configuration:**
   ```
   Admin Panel → Features → Conversation Transfer
   ✅ enabled: true
   ✅ cold_transfer: true  
   ✅ multi_participant: true ← This must be enabled
   ```

2. **Verify Agent Understanding:**
   - Cold Transfer = immediate handoff
   - Warm Transfer = agent stays until new agent joins
   - Many agents confuse these concepts

3. **Test the Flow:**
   - Create test conversation
   - Invite second agent (warm transfer)
   - Both agents should see each other
   - Original agent should be able to leave when ready

### Analyzing Transfer Performance

**When CBOs report "transfers are slow":**

1. **Check Queue Metrics:**
   ```
   Admin Panel → Analytics → Queues
   - Average wait time per queue
   - Agent response time to transfers
   - Queue abandonment rate
   ```

2. **Analyze Transfer Patterns:**
   ```
   Reports → Custom → Transfer Analytics
   - Peak transfer times
   - Most transferred-from agents (training needed?)
   - Most transferred-to agents (overloaded?)
   - Common transfer reasons
   ```

3. **System Resource Check:**
   ```
   ConnieRTC Console → Runtime Logs
   Look for: timeout errors, resource constraints
   ```

### Cross-Account Transfer Issues

**For CBOs with multiple departments/locations:**

1. **Check Account Configuration:**
   ```
   Each account needs:
   - Own transfer workflow
   - Cross-account permissions
   - Proper queue setup
   ```

2. **Verify Inter-Account Permissions:**
   ```
   Admin Panel → Accounts → [Source Account] → 
   Cross-Account Permissions → [Target Account] = Allow Transfers
   ```

3. **Test Account-to-Account Transfer:**
   ```
   Use admin accounts from each department
   Attempt transfer between accounts
   Monitor for permission errors
   ```

## 📞 Customer Communication Scripts

### When Transfer is Delayed
**Script for agents to use:**
> "I'm connecting you with my colleague who specializes in this area. This may take just a moment while I reach them. Please stay on the line."

### When Transfer Fails
**Script for agents to use:**
> "I'm having a technical issue with our transfer system. Let me get your information and have the right person call you back within [timeframe], or I can continue helping you myself."

### When Multiple Transfers Occur
**Script for agents to use:**
> "I apologize that you've been transferred multiple times. Let me make sure I have all the information I need to resolve this for you right now, or connect you directly with my supervisor."

## 📊 Data Collection for Escalations

### Information to Gather Before Escalating

**For Transfer Failures:**
- Conversation SID (from Admin Panel → Live Conversations)
- Agent involved (transferring and target)
- Timestamp of attempted transfer
- Error message (screenshot if possible)
- Browser and device information

**For Performance Issues:**
- CBO account information
- Time period when issues occurred
- Affected queues or agent groups
- Transfer volume during issue period
- Any recent configuration changes

**For Feature Requests:**
- Current workflow description
- Desired workflow description
- Business justification
- Number of agents affected
- Priority level from CBO

### Creating Effective Support Tickets

**Template for Platform Developer Escalation:**
```
Subject: [CBO Name] - Conversation Transfer Issue - [Priority]

Summary: Brief description of the issue

Environment:
- CBO Account: [Account Name/SID]
- Affected Users: [Number] agents
- Conversation Types: SMS/Voice/Webchat/WhatsApp
- Browser/Device: [If relevant]

Issue Details:
- What happened: [Detailed description]
- When it happened: [Timestamp/time range]
- Steps to reproduce: [If applicable]
- Error messages: [Exact text/screenshots]

Investigation Performed:
- Configuration checked: [What you verified]
- Tests performed: [What you tried]
- Logs reviewed: [Any findings]

Impact:
- Business impact: [How this affects CBO operations]
- User experience impact: [How clients are affected]
- Urgency: [Why this needs priority attention]

Conversation SIDs: [For specific examples]
Agent Information: [Affected users]

Next Steps Requested:
[What you need the Platform Developer to do]
```

## 🎯 Training Support Staff

### Knowledge Areas Support Staff Should Master

1. **Basic ConnieRTC Architecture:**
   - How conversations work
   - Agent status and availability
   - Queue management basics

2. **Transfer Feature Specifics:**
   - Cold vs warm transfers
   - Queue vs agent transfers
   - Multi-participant functionality

3. **Common CBO Workflows:**
   - Typical transfer scenarios
   - Department-specific needs
   - Peak usage patterns

### Setting Up Training Scenarios

**Create Test Environment:**
```
1. Set up demo CBO account with transfer enabled
2. Create multiple test agents
3. Set up typical queues (Sales, Support, Supervisor)
4. Practice common scenarios:
   - Agent-to-agent transfer
   - Queue transfers
   - Failed transfer recovery
   - Multi-participant scenarios
```

**Role-Playing Exercises:**
- Support staff plays different agent roles
- Practice escalation decision-making
- Work through communication scripts
- Handle difficult customer situations

## 🚀 Proactive Support Strategies

### Monitoring Dashboard Setup

**Key Metrics to Watch:**
- Transfer success rate by CBO
- Average transfer time
- Queue abandonment after transfer
- Agent transfer patterns
- Error frequency

**Alert Thresholds (NSS Production Validated):**
- Transfer success rate < 95% (RED ALERT - likely system issue)
- Average transfer time > 60 seconds
- Any CBO with > 10% transfer failures
- Individual agent with > 20% transfer rate
- **CRITICAL:** Any "TaskRouter error: Bad Request" reports (IMMEDIATE escalation - workflow SID configuration issue)
- **NEW:** TaskRouter dashboard showing >5% failed transfer tasks
- **NEW:** Multiple agents from same CBO reporting transfer button missing or grayed out

### Post-Deployment Monitoring Protocol

**First 15 Minutes After Any ConnieRTC Update (NSS PROTOCOL):**
1. **Monitor transfer success rates across all CBOs** - should maintain >95%
2. **Watch for "TaskRouter error: Bad Request" spikes** - IMMEDIATE escalation required
3. **Check TaskRouter dashboard** for new transfer task failures and routing issues
4. **Review agent reports** - any unusual transfer behavior or missing transfer buttons
5. **Test transfers yourself** in staging environment first, then production validation
6. **Verify environment variables persistence** after service restarts

**First 30 Minutes:**
7. **Monitor error logs** for transfer-related issues
8. **Check workflow SID configurations** haven't been reset or corrupted
9. **Validate agent notifications** are being delivered properly
10. **Test cross-queue transfers** to ensure routing logic intact

**First 2 Hours:**
1. **Analyze error patterns** - are failures CBO-specific or system-wide?
2. **Monitor customer satisfaction scores** - transfers shouldn't impact experience
3. **Check with supervisors** - are they seeing transfer-related agent issues?
4. **Document any anomalies** for trend analysis

**First 24 Hours:**
1. **Full transfer analytics review** - compare to pre-update baseline
2. **Agent feedback collection** - any new confusion or difficulties?
3. **Update troubleshooting procedures** based on new issues discovered
4. **Plan training updates** if configuration changes affected user experience

### Regular Health Checks

**Weekly:**
- Review transfer analytics for all CBOs
- Check for new error patterns
- Update FAQ based on support tickets
- Test transfer functionality in staging

**Monthly:**
- Analyze transfer trends and seasonality
- Review agent training effectiveness
- Update troubleshooting procedures
- Coordinate with Platform Developers on improvements

### Documentation Maintenance

**Keep These Updated:**
- Common error messages and solutions
- New feature releases affecting transfers
- CBO-specific configuration notes
- Contact information for escalations

Remember: Most transfer issues are configuration or training related, not technical bugs. Focus on understanding the CBO's workflow before diving into technical solutions.