---
sidebar_label: Updating Documentation
sidebar_position: 10
title: "Updating Documentation"
---

# Updating Documentation

This guide explains how to update the ConnieRTC documentation site. Perfect for Connie staff who need to add new features, fix content, or improve the documentation.

## Quick Reference

**For urgent updates:**
```bash
# 1. Edit files in docs/docs/ folder
# 2. Commit and push
git add docs/docs/your-file.md
git commit -m "Update documentation: describe your changes"
git push origin main
```

**Site updates automatically** via GitHub Pages in ~2-3 minutes.

## Documentation Structure

Our documentation is organized by audience:

```
docs/docs/
├── 00_introduction.md           # Landing page with audience selection
├── end-users/                   # End-user documentation
│   ├── administrators/             # CBO administrators
│   ├── supervisors/            # Team supervisors
│   └── staff-agents/           # Call center agents
├── techops/                     # Internal operations (this section)
│   ├── account-provisioning/   # New account setup
│   ├── feature-deployment/     # Feature installation
│   ├── infrastructure/         # AWS, Auth0, Twilio config
│   ├── codebase/               # Code reference
│   └── troubleshooting/        # Runbooks
├── feature-library/            # Feature documentation
└── getting-started/            # Onboarding guides
```

## Local Development

### Prerequisites
- Node.js 18+ (Node.js 20+ recommended)
- This repository cloned locally

### Running Docs Locally

```bash
# Navigate to docs directory
cd docs

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

The docs will be available at `http://localhost:3010` with live reload.

### Testing Your Changes Locally

**Always test locally before deploying!** Here's what to check:

1. **Landing Page** - Verify the audience selection boxes work and look correct
2. **Navigation** - Test clicking through different sidebar sections
3. **Links** - Check that internal links work (some may 404 if pages don't exist yet - that's expected)
4. **Content Formatting** - Ensure Markdown renders correctly
5. **Responsive Design** - Check how it looks on different screen sizes
6. **Live Reload** - Make a small edit and verify changes appear immediately

## Making Changes

### 1. Edit Content

Edit Markdown files in `docs/docs/` using your preferred editor:

```bash
# Example: Update CBO admin getting started guide
vim docs/docs/end-users/administrators/getting-started.md
```

### 2. Preview Changes

If running locally:
- Changes appear instantly at `http://localhost:3010`
- Check formatting and links work correctly

### 3. Commit Changes

```bash
# Stage your changes
git add docs/docs/your-modified-file.md

# Commit with descriptive message
git commit -m "Update CBO admin setup guide with new screenshots"

# Push to trigger deployment
git push origin main
```

### 4. Verify Deployment

- **GitHub Pages** automatically rebuilds the site
- Check https://docs.connie.one in ~2-3 minutes
- Look for your changes to confirm deployment

## Content Guidelines

### Writing Style
- **Clear and concise** - Users are often under pressure
- **Action-oriented** - Tell users what to do, not just what things are
- **Audience-specific** - CBO admins need different info than Connie staff

### Markdown Best Practices
- Use **descriptive headings** for easy navigation
- Include **code blocks** with syntax highlighting
- Add **links** to related documentation
- Use **callouts** for important information

## Adding New Pages

### 1. Create the File
```bash
# Example: Add new troubleshooting guide
touch docs/docs/techops/troubleshooting/sso-issues.md
```

### 2. Add Front Matter
```markdown
---
sidebar_label: SSO Issues
sidebar_position: 1
title: "SSO Troubleshooting"
---

# Content goes here...
```

## Deployment Process

### Automatic Deployment
1. **Push to main branch** triggers GitHub Actions
2. **GitHub Pages** rebuilds the site automatically
3. **Live site** updates in ~2-3 minutes

### Manual Deployment (if needed)
```bash
# Build the site locally
cd docs
npm run build

# Deploy to GitHub Pages (rarely needed)
npm run deploy
```

## Common Issues

### **Links Don't Work**
- Check that file paths match exactly
- Use relative paths: `../other-page.md`
- Verify sidebar configuration

### **Images Not Loading**
- Ensure images are in `docs/static/img/`
- Use correct path: `![Alt text](../../../static/img/image.png)`

### **Build Fails**
- Check Markdown syntax
- Verify front matter is valid YAML
- Look for broken links

### **Changes Not Appearing**
- Check GitHub Actions for build errors
- Clear browser cache
- Verify you pushed to `main` branch

## Getting Help

- **GitHub Issues**: Report documentation bugs
- **Slack**: Real-time help from the team

---

*Questions about updating documentation? Ask in Slack or open a GitHub issue!*
