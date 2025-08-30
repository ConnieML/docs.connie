---
sidebar_label: Unified Channel Manager
sidebar_position: 1
title: "Unified Channel Manager"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Unified Channel Manager

**Seamlessly manage all communication channels from a single, intuitive interface**

The Unified Channel Manager is the heart of ConnieRTC, enabling your nonprofit to handle voice calls, text messages, web chats, social media, emails, and faxes all from one unified agent desktop. No more switching between applications or losing context when helping clients across different channels.

## Why It Matters

Your clients reach out through their preferred communication method - some call, others text, many use web chat or social media. The Unified Channel Manager ensures every interaction receives the same high-quality service regardless of the channel, while dramatically simplifying your agents' workflow.

---

<Tabs>
<TabItem value="admins" label="👑 Administrators" default>

## For Administrators

### Overview
As an administrator, you control which channels are available to your organization and how they're configured. The Unified Channel Manager provides centralized control over all communication pathways.

### Key Capabilities
- **Channel Activation** - Enable or disable channels based on your organization's needs
- **Provider Management** - Configure carriers, SMS providers, and social media integrations
- **Cost Control** - Monitor usage and costs across all channels from one dashboard
- **Compliance Settings** - Ensure TCPA, HIPAA, and other regulatory requirements are met

### Configuration Steps

#### 1. Enable Channels
Navigate to **Admin Settings → Channels** to activate the channels your organization needs:
- ✅ Voice (Twilio, Cox, Xfinity, Verizon)
- ✅ SMS/Text (Twilio, Sinch, Bandwidth)
- ✅ Web Chat (embed code for your website)
- ✅ Social Media (Facebook, WhatsApp)
- ✅ Email (Gmail, Outlook, IMAP)
- ✅ Fax (eFax, RingCentral)

#### 2. Set Channel Priorities
Define how channels are weighted for routing:
```
Voice: Priority 1 (immediate)
Web Chat: Priority 1 (immediate)
SMS: Priority 2 (within 5 minutes)
Email: Priority 3 (within 1 hour)
```

#### 3. Configure Business Hours
Set operating hours per channel - some channels can remain "always on" while others follow business hours:
- Voice: Monday-Friday 9 AM - 5 PM
- SMS: Monday-Friday 8 AM - 7 PM  
- Web Chat: 24/7 with after-hours bot
- Email: Always accepting, response during business hours

### Best Practices for Admins
- Start with 1-2 channels and expand gradually
- Ensure adequate agent training before enabling new channels
- Monitor channel performance metrics weekly
- Review costs monthly and optimize based on usage
- Keep provider credentials secure and updated

</TabItem>
<TabItem value="supervisors" label="👥 Supervisors">

## For Supervisors/Program Managers

### Overview
Supervisors use the Unified Channel Manager to monitor team performance, manage queues, and ensure service quality across all channels in real-time.

### Key Capabilities
- **Real-Time Monitoring** - See all active conversations across channels
- **Queue Management** - Balance workload across agents and channels
- **Quality Assurance** - Monitor, coach, and barge into conversations when needed
- **Performance Analytics** - Track response times, resolution rates, and satisfaction by channel

### Managing Your Team

#### Channel Assignment
Assign agents to specific channels based on their skills:
```
Maria: Voice ✓ | SMS ✓ | Web Chat ✓
James: Email ✓ | Web Chat ✓
Sarah: Voice ✓ | Social Media ✓
```

#### Queue Monitoring Dashboard
Your supervisor view shows:
- **Active Conversations**: 12 Voice | 8 Chat | 15 SMS | 22 Email
- **Agents Available**: 5 Voice | 3 Chat | 4 Omnichannel
- **Average Wait Time**: Voice 0:45 | Chat 1:20 | SMS 3:00
- **Longest Wait**: Voice 2:15 (transfer to available agent)

#### Intervention Tools
- **Listen** - Silently monitor any conversation
- **Whisper** - Coach agents without client hearing
- **Barge** - Join conversations that need escalation
- **Take Over** - Assume control of challenging interactions

### Routing Rules
Configure intelligent routing based on:
- **Skill-Based**: Language, topic expertise, certifications
- **Priority-Based**: VIP clients, urgent issues, complaints
- **Load-Balanced**: Distribute evenly across available agents
- **Sticky Routing**: Return clients to previous agents

### Best Practices for Supervisors
- Monitor queue times and redistribute work before bottlenecks form
- Use whisper coaching for real-time agent development
- Review cross-channel metrics to identify training needs
- Celebrate agents who excel at omnichannel support
- Document channel-specific issues for admin review

</TabItem>
<TabItem value="agents" label="🎧 Staff Agents">

## For Staff Agents

### Overview  
The Unified Channel Manager gives you one screen to handle all client communications. No more juggling multiple applications - everything you need is in your ConnieRTC workspace.

### Your Unified Workspace

#### Active Conversation Panel
Your current interaction displays prominently with:
- Client information and history
- Conversation thread (voice transcription, chat messages, emails)
- Quick actions (transfer, hold, conference, escalate)
- Resource panel (knowledge base, canned responses, forms)

#### Channel Indicators
Each task shows its channel clearly:
- 📞 **Voice** - Answer incoming calls, click-to-dial
- 💬 **SMS** - Two-way texting with full conversation history
- 🌐 **Web Chat** - Real-time chat with typing indicators
- 📧 **Email** - Threaded conversations with attachments
- 📱 **Social** - Facebook and WhatsApp messages
- 📠 **Fax** - Digital fax viewing and sending

### Handling Omnichannel Interactions

#### Accepting Tasks
1. New tasks appear in your queue with channel icon
2. Click "Accept" or auto-accept based on your settings
3. Customer context loads automatically
4. Previous interactions across ALL channels are visible

#### Channel Switching
Sometimes clients start in one channel but need another:
- **Chat → Voice**: "This is complex, may I call you?"
- **Voice → SMS**: "I'll text you the confirmation"
- **Email → Chat**: "Let's resolve this quickly via chat"

Use the **Channel Transfer** button to maintain context while switching.

#### Using Channel-Specific Features

**Voice Calls**
- Use soft phone or desk phone
- Conference in specialists
- Warm/cold transfer options
- Call recording controls

**Text/SMS**
- 160 character limit per message
- Send images and documents (MMS)
- Use templates for common responses
- Schedule follow-up messages

**Web Chat**
- Co-browse customer's screen
- Share files and screenshots  
- Use canned responses
- Transfer with full chat history

**Email**
- Rich text formatting
- Attach multiple documents
- Use email templates
- Set follow-up reminders

### Productivity Tips
- **Use Templates**: Save time with pre-written responses for each channel
- **Keyboard Shortcuts**: 
  - Alt+A = Accept task
  - Alt+T = Transfer
  - Alt+H = Hold/Resume
  - Alt+E = End interaction
- **Status Management**: Set "After Call Work" to complete notes
- **Context Matters**: Always review previous interactions before responding

### Best Practices for Agents
- Acknowledge receipt quickly, even if resolution takes time
- Match the channel's expected response pace (immediate for voice/chat, considered for email)
- Always check client's preferred channel in their profile
- Document interactions thoroughly for cross-channel continuity
- Ask for help when unsure - supervisors can whisper coach

</TabItem>
</Tabs>

---

## Technical Specifications

### Supported Integrations
- **Voice**: Twilio, Amazon Connect, Genesys Cloud
- **SMS**: Twilio, MessageBird, Bandwidth, Sinch
- **Web Chat**: Custom widget, Salesforce, Zendesk
- **Email**: Exchange, Gmail API, IMAP/SMTP
- **Social**: Facebook Graph API, WhatsApp Business API
- **Fax**: eFax, RingCentral, Fax.Plus

### Performance Metrics
- Channel switch time: &lt;2 seconds
- Context load time: &lt;1 second  
- Maximum concurrent channels per agent: 6
- Message delivery reliability: 99.9%

### Security & Compliance
- End-to-end encryption for all channels
- HIPAA compliant for healthcare organizations
- PCI DSS for payment processing
- TCPA compliance for SMS/calls
- GDPR ready for international operations

---

## ROI & Impact

Organizations using the Unified Channel Manager report:
- **40% increase** in agent productivity
- **60% reduction** in response times
- **25% improvement** in client satisfaction
- **50% decrease** in training time for new agents
- **30% reduction** in missed interactions

---

## Getting Started

### Quick Start for Your Role

**Administrators**
1. Review channel options with your team
2. Start with 2-3 primary channels
3. Configure providers and test thoroughly
4. Train supervisors on management tools
5. Roll out to agents in phases

**Supervisors**
1. Learn the monitoring dashboard
2. Set up routing rules for your team
3. Practice intervention tools in test environment
4. Create channel-specific quality standards
5. Schedule regular performance reviews

**Agents**
1. Complete omnichannel training module
2. Practice with each channel in sandbox
3. Master keyboard shortcuts
4. Build your template library
5. Shadow experienced omnichannel agents

---

## Support Resources

- **Video Tutorial**: [Unified Channel Manager Overview](#)
- **Admin Guide**: [Channel Configuration Manual](#)
- **Supervisor Playbook**: [Queue Management Best Practices](#)
- **Agent Quick Reference**: [Channel Cheat Sheet](#)
- **Troubleshooting**: [Common Issues & Solutions](#)

---

*The Unified Channel Manager transforms how your nonprofit serves its community - bringing all conversations together to ensure no one falls through the cracks.*