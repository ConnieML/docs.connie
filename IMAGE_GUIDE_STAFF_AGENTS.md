# Staff Agent Documentation - Image Setup Guide

## 📸 Images Needed (5 Screenshots)

This guide shows you exactly which screenshots to capture and where to place them.

---

## 🗂️ Image Storage Location

**Create this directory:**
```
/static/img/staff-agents/
```

All staff agent images go here following the naming convention below.

---

## 📋 Required Screenshots & Details

### 1. Google Authenticator Setup
**File:** `/static/img/staff-agents/google-authenticator-setup.png`
**Page:** Getting Started (getting-started.md:37)
**What to capture:** The Google Authenticator app setup flow showing:
- Welcome screen with "Get started" button
- QR code scanning interface
- Code entry screen

**Context in docs:**
```markdown
### Download Google Authenticator
Download the Google Authenticator app on your mobile device:
- **iOS**: [App Store](...)
- **Android**: [Google Play Store](...)

[IMAGE GOES HERE]

### Set Up the App
1. **Open the app** - You'll see a welcome screen
2. **Select "Get started"**
...
```

**How to replace:**
```markdown
<div style={{textAlign: 'center', margin: '20px 0'}}>
  <img src="/img/staff-agents/google-authenticator-setup.png" alt="Google Authenticator Setup Process" style={{maxWidth: '800px', border: '1px solid #ddd', borderRadius: '8px'}} />
</div>
```

---

### 2. Status Dropdown Menu
**File:** `/static/img/staff-agents/status-dropdown.png`
**Page:** Getting Started (getting-started.md:81)
**What to capture:** The Connie dashboard showing:
- User control menu at top right corner
- Dropdown menu open with status options (Available, Unavailable, Offline, On a Task)
- "Available" option highlighted

**Context in docs:**
```markdown
## ✅ Step 5: Set Your Status to Available

Before you can start receiving tasks, you need to set your status to "Available":

1. Locate the **user control menu** at the **top right-hand corner**
2. Click the **dropdown menu**
3. Select **"Available"**

[IMAGE GOES HERE]
```

**How to replace:**
```markdown
<div style={{textAlign: 'center', margin: '20px 0'}}>
  <img src="/img/staff-agents/status-dropdown.png" alt="Status Dropdown Menu" style={{maxWidth: '600px', border: '1px solid #ddd', borderRadius: '8px'}} />
</div>
```

---

### 3. Inbox Tab with New Inquiries
**File:** `/static/img/staff-agents/inbox-new-inquiries.png`
**Page:** Handling Tasks (handling-tasks.md:17)
**What to capture:** The Connie inbox showing:
- Inbox tab in navigation
- List of inquiries
- Visual indicators for new/unread inquiries (badges, highlighting, etc.)
- Time stamps, client names visible

**Context in docs:**
```markdown
## 📥 Step 1: Locate New Inquiries

### Navigate to Your Inbox
1. Go to the **Inbox** tab in your Connie dashboard
2. New inquiries are marked with **[visual indicator - to be updated with specific details]**

[IMAGE GOES HERE]
```

**How to replace:**
```markdown
<div style={{textAlign: 'center', margin: '20px 0'}}>
  <img src="/img/staff-agents/inbox-new-inquiries.png" alt="Inbox Tab with New Inquiries" style={{maxWidth: '900px', border: '1px solid #ddd', borderRadius: '8px'}} />
</div>
```

---

### 4. Open Inquiry Details
**File:** `/static/img/staff-agents/inquiry-details.png`
**Page:** Handling Tasks (handling-tasks.md:44)
**What to capture:** An opened inquiry/task showing:
- Client contact information
- Referral source (if applicable)
- Reason for contact/services needed
- Key action buttons (Reply, Assign, etc.)
- Any special notes or priority indicators
- Previous conversation history area

**Context in docs:**
```markdown
### Key Information to Review
When you open an inquiry, look for these important details:

- **Client contact information** (name, phone, email)
- **Referral source** (if applicable - which organization sent the referral)
- **Reason for contact** or services needed
...

[IMAGE GOES HERE]
```

**How to replace:**
```markdown
<div style={{textAlign: 'center', margin: '20px 0'}}>
  <img src="/img/staff-agents/inquiry-details.png" alt="Open Inquiry with Key Fields" style={{maxWidth: '900px', border: '1px solid #ddd', borderRadius: '8px'}} />
</div>
```

---

### 5. Add Note Interface
**File:** `/static/img/staff-agents/add-note.png`
**Page:** Recording Notes (recording-notes.md:28)
**What to capture:** The note-taking interface showing:
- "Add Note" button location
- Note text field (empty or with sample text)
- Save button
- Any note category dropdowns (if available)
- Context of where this appears (in task/conversation view)

**Context in docs:**
```markdown
## ✍️ How to Add a Note

### Quick Steps

1. **Click "Add Note"** in the task or conversation view
2. **Type your notes** in the provided field
3. **Click "Save"**

[IMAGE GOES HERE]
```

**How to replace:**
```markdown
<div style={{textAlign: 'center', margin: '20px 0'}}>
  <img src="/img/staff-agents/add-note.png" alt="Add Note Button and Interface" style={{maxWidth: '800px', border: '1px solid #ddd', borderRadius: '8px'}} />
</div>
```

---

## 🎯 Quick Setup Steps

### Step 1: Create Directory
```bash
mkdir -p /Users/cjberno/projects/connie/docs.connie/static/img/staff-agents
```

### Step 2: Capture & Save Screenshots
Save your 5 screenshots with these exact names:
1. `google-authenticator-setup.png`
2. `status-dropdown.png`
3. `inbox-new-inquiries.png`
4. `inquiry-details.png`
5. `add-note.png`

### Step 3: Let CDO Know
Once images are in place, tell me and I'll replace all placeholder callouts with properly formatted image tags.

---

## 📝 Screenshot Best Practices

### Image Quality
- ✅ **Resolution**: At least 1920x1080 or retina quality
- ✅ **Format**: PNG (best for UI screenshots)
- ✅ **File size**: Optimize to < 500KB if possible (use tools like TinyPNG)

### What to Capture
- ✅ **Clean UI**: Remove any test/sensitive data
- ✅ **Clear context**: Include enough of the interface to orient users
- ✅ **Highlight key elements**: Consider adding subtle arrows/highlights in image editor
- ✅ **Consistent style**: Use same Connie instance for all screenshots

### What to Avoid
- ❌ Real client names or PII (use "Jane Doe", "555-0123" etc.)
- ❌ Real email addresses (use "agent@example.org")
- ❌ Actual phone numbers or sensitive data
- ❌ Browser toolbars or OS elements (crop to just Connie interface)

---

## 🔄 Replacement Process

**Option 1: You Add Images, I Update Markdown**
1. You: Save 5 images to `/static/img/staff-agents/`
2. You: Tell me "images are ready"
3. Me: Replace all 5 placeholder callouts with image tags

**Option 2: Give Me Image Locations**
If you save images elsewhere, just tell me the paths and I'll add them with proper formatting.

---

## ✅ Verification Checklist

After images are added:
- [ ] All 5 image files exist in `/static/img/staff-agents/`
- [ ] File names match exactly (case-sensitive)
- [ ] Images are optimized (< 500KB each)
- [ ] No PII or sensitive data visible
- [ ] Run `npm start` and verify all images load
- [ ] Check mobile responsiveness of images

---

## 📞 Questions?

**Need different screenshots?** Let me know and I'll update the requirements.

**Want to use different locations/names?** Just provide the mapping and I'll adjust.

**Ready to proceed?** Just say "images are in place" and I'll update all 5 pages.
