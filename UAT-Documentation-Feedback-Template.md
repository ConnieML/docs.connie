# UAT Documentation Feedback Form Template

## Form Title: 
**ConnieRTC Feature Documentation Feedback - Conversation Transfer**

## Form Description:
Help us improve our documentation! After testing the Conversation Transfer feature, please provide feedback on how well our documentation supported your testing process.

---

## Form Questions:

### **Section 1: Test Context**

**1. User Story Reference** *(Required)*
- Dropdown: 
  - CSA-5A3: Cold Transfer Functionality
  - CSA-5B3: Warm Transfer Functionality
  - Both Stories

**2. Documentation Page Used** *(Required)*
- Text field (pre-filled): `/cbo-users/agents/conversation-transfer`

**3. Your Role in Testing** *(Required)*
- Radio buttons:
  - Staff Agent Tester
  - Supervisor Tester  
  - CBO Administrator Tester
  - Other: [text field]

---

### **Section 2: Task Completion**

**4. Were you able to complete the transfer task using our documentation?** *(Required)*
- Radio buttons:
  - Yes, completed successfully
  - Partially completed (some steps worked)
  - No, could not complete
  - Did not attempt yet

**5. If you had difficulties, which step was problematic?** 
- Checkbox (multiple selection):
  - Finding the transfer button
  - Choosing transfer type (cold vs warm)
  - Selecting target agent/queue
  - Adding transfer notes
  - Understanding client communication
  - Completing the transfer process
  - Other: [text field]

---

### **Section 3: Documentation Quality**

**6. Rate the clarity of the documentation** *(Required)*
- Scale 1-5:
  - 1 = Very confusing
  - 2 = Somewhat confusing
  - 3 = Adequate
  - 4 = Clear
  - 5 = Very clear

**7. Rate how well the documentation matched the actual feature**
- Scale 1-5:
  - 1 = Not at all
  - 2 = Somewhat
  - 3 = Mostly accurate
  - 4 = Very accurate
  - 5 = Perfect match

**8. What information was missing from the documentation?**
- Long text field

**9. What information was confusing or incorrect?**
- Long text field

**10. What did the documentation do well?**
- Long text field

---

### **Section 4: Improvement Suggestions**

**11. How could we improve these instructions?**
- Long text field

**12. Would you recommend any additional screenshots or examples?**
- Text field

**13. Any other feedback for the documentation team?**
- Long text field

---

### **Section 5: Test Details** *(For tracking purposes)*

**14. Test Date**
- Date picker (auto-filled to today)

**15. ConnieRTC Environment**
- Radio buttons:
  - Staging
  - Production
  - Local Development
  - Other: [text field]

**16. Browser Used**
- Dropdown:
  - Chrome
  - Firefox
  - Safari
  - Edge
  - Other

---

## Google Form Settings:

### **Response Collection:**
- **Destination:** Google Sheets in your Drive folder
- **File name:** `ConnieRTC-Transfer-Documentation-UAT-Feedback`
- **Location:** `/UAT-Feedback/Transfer-Feature/`

### **Form Behavior:**
- Allow multiple responses per person (for different test scenarios)
- Show progress bar
- Confirmation message: "Thank you! Your feedback helps improve ConnieRTC documentation."

### **Sharing Settings:**
- Anyone with link can respond
- Collect email addresses (optional, for follow-up questions)

---

## Feedback Widget Code

Add this to the bottom of `/cbo-users/agents/conversation-transfer.md`:

```markdown
---

## 📝 Help Improve This Documentation

**Testing the Conversation Transfer feature?** Your feedback makes our docs better!

<div style={{
  backgroundColor: '#f0f8f0',
  border: '1px solid #4CAF50',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0'
}}>
  
**UAT Feedback:** 
<a 
  href="[GOOGLE_FORM_URL]" 
  target="_blank"
  style={{
    display: 'inline-block',
    padding: '12px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    marginLeft: '10px'
  }}
>
  📋 Share Your Testing Experience
</a>

<p style={{fontSize: '14px', marginTop: '12px', marginBottom: '0'}}>
  <strong>Reference:</strong> User Stories CSA-5A3, CSA-5B3 | 
  <strong>Takes:</strong> 3-5 minutes
</p>

</div>
```

---

## Analytics Dashboard Setup

**Track These Metrics:**
1. **Completion Success Rate:** % who completed transfers using docs
2. **Documentation Clarity Score:** Average rating 1-5
3. **Feature-Doc Alignment:** How well docs match reality
4. **Top Pain Points:** Most common missing/confusing items
5. **Improvement Themes:** Patterns in suggestions

**Weekly Report Format:**
- Total responses this week
- Success rate trend
- Top 3 improvement areas  
- Action items for CDO
- Updated documentation changelog

---

Ready to create the actual Google Form? I need:
1. Your Google account email for form ownership
2. Exact Google Drive folder URL for responses
3. Any additional questions specific to your UAT process