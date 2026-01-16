---
sidebar_label: "Transferring Tasks"
title: "Transferring Tasks"
sidebar_position: 4
---

# Transferring Tasks

As a staff agent, you can transfer conversations (calls and chats) to other agents or supervisors when you need help or when a client needs specialized assistance.

## 🔧 What You Need to Know

- Works with calls, SMS, webchat, and WhatsApp
- You can transfer to specific agents or to a queue (team)
- Two types: **Cold transfer** (immediate) and **Warm transfer** (stay connected until they join)
- Your conversation history transfers with the client

## 📞 How to Transfer a Call or Chat

### Step 1: Click the Transfer Button
Look for the **Transfer** icon in your conversation window (usually looks like an arrow or forward symbol).

### Step 2: Choose Your Transfer Type

**Cold Transfer (Quick):**
- Select the agent or queue from the dropdown
- Click **Transfer**
- You're immediately disconnected and the call/chat goes to them

**Warm Transfer (Recommended):**
- Select the agent or queue from the dropdown  
- Click **Invite to Join**
- Stay in the conversation until the new agent accepts
- Brief them on the situation
- Leave when ready

### Step 3: Add a Note (Optional but Helpful)
Before transferring, add a quick note about:
- Why you're transferring
- What the client needs
- Any important background information

## 💡 Best Practices

### When to Transfer
- Client needs specialized help you can't provide
- Escalation to supervisor required
- Language barrier (transfer to bilingual agent)
- You're going off-shift and conversation isn't resolved

### Transfer Tips
- **Always explain to the client** what's happening
- **Use warm transfers** when the situation is complex
- **Add helpful notes** for the receiving agent
- **Stay professional** - avoid saying "I don't know how to help"

### ConnieRTC-Specific Best Practices (NSS PRODUCTION INSIGHTS)
- **Test after any system updates** - transfers are sensitive to configuration changes (workflow SID issues common)
- **If transfers start failing** - stop trying and notify supervisor immediately (likely system issue, not agent error)
- **Use queue transfers over agent transfers** when possible - more reliable routing and better load distribution
- **Keep transfer notes brief but specific** - helps receiving agent get up to speed quickly
- **Don't transfer multiple times** - if first transfer fails, escalate to supervisor instead of retrying
- **"TaskRouter error: Bad Request" = System Issue** - this error means backend configuration problem, not something you did wrong
- **Monitor transfer success rate** - if multiple transfers fail in short time, alert supervisor of possible system issue

### What to Say to Clients
**For Calls:**
"I'm going to connect you with [Name/my supervisor] who can better assist you with this. Please hold for just a moment."

**For Chats:**
"I'm bringing in my colleague [Name] who specializes in this area. They'll join our conversation in just a moment."

## 🔍 What Happens Next

1. **If transferring to a specific agent:** They get a notification and can accept or decline
2. **If transferring to a queue:** The next available agent in that team gets it
3. **Your conversation history:** Automatically transfers with the client
4. **Your stats:** The transfer is recorded in your activity

## ⚠️ Common Issues

**"Transfer button is grayed out"**
- You might have an active warm transfer waiting
- Cancel any pending invites first

**"Agent didn't accept the transfer"**
- They might be busy or offline
- Try transferring to a queue instead
- Ask your supervisor for help

**"Transfer fails with error message" (NSS PRODUCTION EXPERIENCE)**
- **Most common cause:** System configuration issue (workflow SID problem)
- **What you see:** "TaskRouter error: Bad Request" or similar error messages
- **What to do:** Contact your supervisor immediately - this is NOT an agent error
- **Important:** Note the exact time and take a screenshot if possible
- **Don't worry:** This is usually fixed quickly by IT/Admin team (typically 5-15 minutes)
- **NSS Learning:** This error indicates backend configuration needs updating, not user error

**"Client got disconnected during transfer"**
- For calls: They should get a callback automatically
- For chats: The conversation continues when they reconnect
- Log the issue with your supervisor

## ✅ How to Test Your Transfers

### After ConnieRTC System Updates (NSS VALIDATION PROTOCOL)
If your IT team tells you there was a system update, test transfers right away:

**Quick Transfer Test (2 minutes) - CRITICAL FOR NSS:**
1. **Find a colleague** who can help test
2. **Start a test chat** (use ConnieRTC test mode if available)
3. **Try a cold transfer** to your colleague
4. **Verify they receive it** and can accept within 5 seconds
5. **Test a warm transfer** - both of you should see each other in the conversation
6. **Test conversation history** - make sure all previous messages transfer
7. **Report results** to supervisor immediately

**What Success Looks Like (NSS Benchmarks):**
- Transfer completes in under 10 seconds
- No error messages appear (especially no "TaskRouter error: Bad Request")
- Receiving agent gets notification within 5 seconds
- Both agents can see complete chat history
- Client stays connected throughout
- Transfer button remains available for additional transfers

**If Something's Wrong (NSS ESCALATION PROCESS):**
- Take a screenshot of any error messages immediately
- Note the exact time when you tested (include timezone)
- Note which type of transfer failed (cold vs warm)
- Report to supervisor with: "Transfer test failed at [time] with [error message]"
- **CRITICAL:** If you see "TaskRouter error: Bad Request" - this indicates system configuration issue requiring immediate IT attention

## 🚀 Quick Reference

| Action | Steps |
|--------|--------|
| **Cold Transfer** | Transfer button → Select agent/queue → Transfer |
| **Warm Transfer** | Transfer button → Select agent/queue → Invite → Brief → Leave |
| **Add Note** | Select transfer option → Type in note field → Transfer |
| **Cancel Transfer** | Find pending invite → Click Cancel |

Need help with transfers? Ask your supervisor or contact Connie Support!