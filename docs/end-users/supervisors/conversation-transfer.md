---
sidebar_label: "Managing Conversation Transfers"
title: "Managing Conversation Transfers"
---

# Managing Conversation Transfers

As a supervisor, you need to understand how conversation transfers work, monitor transfer patterns, and help agents use this feature effectively.

## 📋 Overview for Supervisors

Conversation transfer allows your agents to:
- **Cold transfer:** Immediately move conversations to another agent/queue
- **Warm transfer:** Stay connected until the receiving agent joins
- **Add context notes** to help receiving agents
- **Transfer all conversation types:** Voice, SMS, webchat, WhatsApp

## 👥 Monitoring Agent Transfers

### Transfer Patterns to Watch
- **Excessive transfers:** Agent might need additional training
- **Transfer reasons:** Are agents transferring for the right reasons?
- **Successful completion:** Are transfers being accepted and resolved?

### Key Metrics
- Transfer rate by agent
- Average transfer time
- Transfer success/failure rates
- Client satisfaction after transfers

### NSS Production Success Metrics (Benchmarks)
Based on successful NSS deployment:
- **Transfer Success Rate:** Target >95% (anything below 90% indicates system issues)
- **Transfer Completion Time:** Target under 10 seconds for cold transfers, under 30 seconds for warm transfers
- **Agent Acceptance Rate:** Target >90% (agents accepting transfers when available)
- **Client Satisfaction:** No negative impact from transfers (maintain or improve scores)

### Red Flag Metrics (Immediate Escalation Required - NSS VALIDATED)
- Transfer success rate drops below 90% (NSS threshold)
- ANY "TaskRouter error: Bad Request" reports from agents (indicates workflow SID issues)
- Transfer times consistently over 30 seconds
- Client complaints about multiple transfers or disconnections
- TaskRouter dashboard showing >10% failed transfer tasks
- Agent reports of missing transfer notifications

## 🎯 Training Your Agents

### Best Practices to Teach
1. **Always explain to clients** what's happening during transfer
2. **Use warm transfers** for complex situations
3. **Add helpful notes** for receiving agents
4. **Know when to transfer** vs. when to escalate to you

### Common Agent Mistakes
- **Cold transferring complex issues** without context
- **Not explaining to clients** what's happening
- **Transferring too quickly** without attempting to help first
- **Forgetting to add notes** about the situation

## ⚙️ Supervisor Controls

### When Agents Transfer to You
- You'll receive a notification with the conversation context
- Review any notes the agent added
- You can accept, decline, or redirect to another agent
- Consider if this is a training opportunity for the agent

### Managing Transfer Queues
- Monitor queue wait times
- Ensure adequate staffing for transfer queues
- Train agents on proper queue selection

## 📊 Transfer Analytics

### Reports to Review
- **Transfer volume by time of day**
- **Most common transfer reasons**
- **Agent transfer patterns**
- **Customer satisfaction scores post-transfer**

### Red Flags to Address
- High transfer rates without resolution
- Clients complaining about multiple transfers
- Agents avoiding certain types of conversations
- Long hold times for transfers

## 🛠️ Troubleshooting Agent Issues

### "My transfers aren't working"
1. Check if agent has proper permissions
2. Verify they're not in Do Not Disturb mode
3. Confirm transfer queues are properly configured
4. Test the transfer process yourself

### "Clients are getting frustrated with transfers"
1. Review agent transfer techniques
2. Ensure warm transfers are being used appropriately  
3. Check if agents are explaining the process
4. Consider additional customer service training

### "Other agents aren't accepting transfers"
1. Review team workload distribution
2. Check if receiving agents understand transfer notifications
3. Consider queue-based transfers instead of agent-specific
4. Address any team dynamics issues

## 🎯 Performance Management

### Transfer-Related Coaching Points
- **Transfer frequency:** Too many or too few transfers
- **Transfer timing:** When in the conversation to transfer
- **Client communication:** How transfers are explained
- **Documentation:** Quality of transfer notes

### Recognition Opportunities
- Agents who handle complex transfers well
- Successful warm transfer handoffs
- Agents who reduce transfer rates through skill development
- Creative problem-solving before transferring

## 🔧 System Configuration

### Settings You Can Control
- Transfer timeout periods
- Queue assignments for your team
- Agent availability for receiving transfers
- Transfer notification preferences

### Working with IT/Admin
- Request new transfer queues
- Modify agent permissions
- Update transfer workflows
- Report system issues

## 📞 Escalation Path

**For system issues (NSS Production Guidance):**
- **"TaskRouter error: Bad Request" reports:** IMMEDIATE escalation to Platform Developer
- **Transfer success rate drops below 90%:** Contact Connie Support with URGENT priority
- **Individual agent transfer failures:** Check workflow SID configuration first
- **General system issues:** Contact Connie Support with conversation SIDs and error details

**For training needs:** Work with your manager
**For policy questions:** Refer to CBO Administrator documentation
**For technical configuration:** Contact IT or Platform Administrator

**Information to Gather for Escalations:**
- Conversation SIDs where transfers failed
- Agent names involved in transfer attempts
- Exact timestamp when issues started
- Error messages or screenshots
- Transfer success rate from dashboard

## 💡 Quick Supervisor Checklist

### Daily Operations
- [ ] Agents know when to use cold vs warm transfers
- [ ] Transfer notes are being used effectively
- [ ] Clients are being kept informed during transfers
- [ ] Transfer rates are reasonable for your team
- [ ] Receiving agents are responsive to transfer requests
- [ ] You're monitoring transfer patterns for training opportunities

### Post-System Update Validation (CRITICAL)
When IT notifies you of ConnieRTC updates affecting transfers:

**First 30 Minutes After Update:**
- [ ] **Test transfers yourself** - don't rely on agent reports
- [ ] **Monitor for "TaskRouter error: Bad Request" messages**
- [ ] **Check transfer success rate dashboard** - should maintain >95%
- [ ] **Verify agent notifications working** - agents should receive transfer alerts
- [ ] **Test both cold and warm transfers**

**First 2 Hours After Update:**
- [ ] **Review all transfer attempts** - look for failure patterns
- [ ] **Ask agents to report any issues immediately**
- [ ] **Check client satisfaction scores** - no negative impact from transfers
- [ ] **Monitor queue wait times** - transfers shouldn't increase wait times
- [ ] **Document any issues for IT escalation**

**First Day After Update:**
- [ ] **Analyze transfer patterns** - compare to pre-update baseline
- [ ] **Review agent feedback** - any new confusion or difficulties?
- [ ] **Check error logs** for transfer-related issues
- [ ] **Plan additional training** if new issues emerge