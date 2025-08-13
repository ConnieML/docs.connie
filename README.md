<a  href="https://www.connieconnect.com">
<img  src="https://i.postimg.cc/dVVphpxS/connie-contact-rtc-logo.png"  alt="Connie SaaS For Nonprofits"  width="250"  />
</a>

# Connie Documentation Site

This website is built using [Docusaurus 2](https://docusaurus.io/) and serves as the comprehensive documentation for the Connie platform, organized by user type and communication channels.

**Live Site**: https://docs.connie.one/

---

## 📁 Documentation Structure

The documentation follows a multi-audience approach with clear user pathways:

```
docs/
├── 00_introduction.md          # Landing page
├── getting-started/            # Quick start guides
├── feature-library/            # Technical feature documentation
├── building/                   # Template building guides
├── end-users/                  # End user documentation
│   ├── cbo-admins/            # CBO administrators
│   │   ├── getting-started.md
│   │   ├── voice/             # Voice channel services
│   │   │   └── call-forwarding/
│   │   │       ├── index.md   # Provider selection page
│   │   │       ├── cox-communications.md
│   │   │       └── xfinity-business.md
│   │   ├── messaging/         # Future: SMS, webchat
│   │   ├── socials/           # Future: Facebook, WhatsApp
│   │   ├── fax/               # Future: Fax services
│   │   └── email/             # Future: Email services
│   ├── supervisors/           # Team managers
│   └── staff-agents/          # Call center agents
└── developers/                # Developer documentation
    ├── general/               # Cross-cutting topics
    ├── frontend/              # React/TypeScript development
    └── backend/               # Serverless functions
```

---

## 🚀 Quick Start

### Local Development

```bash
cd docs
npm install
npm start
```

The site will be available at `http://localhost:3010`

### Deploy to Production

Changes pushed to the `main` branch automatically deploy to https://docs.connie.one/ via GitHub Actions.

---

## 📝 Adding New Content

### Adding a New Page

1. **Choose the correct location** based on your audience:
   - End users: `docs/end-users/[user-type]/`
   - Developers: `docs/developers/[area]/`
   - General: `docs/[category]/`

2. **Create the markdown file**:
   ```markdown
   ---
   sidebar_label: Short Name
   sidebar_position: 1
   title: "Full Descriptive Title"
   ---

   # Page Title

   Your content here...
   ```

3. **Follow content guidelines**:
   - Use clear, descriptive headings
   - Include prerequisites section for setup guides
   - Add troubleshooting sections where relevant
   - Use proper accessibility practices (alt text, logical heading hierarchy)

### Adding a New Category

1. **Create the directory structure**:
   ```bash
   mkdir -p docs/end-users/cbo-admins/new-channel
   ```

2. **Create `_category_.json`**:
   ```json
   {
     "label": "Channel Name",
     "position": 2,
     "collapsible": true,
     "collapsed": false,
     "description": "Brief description of the channel"
   }
   ```

3. **Update navigation** if using explicit sidebar configuration in `sidebars.js`

### Adding a New Communication Channel

For CPaaS services, follow the established pattern:

1. **Create channel directory**: `docs/end-users/cbo-admins/[channel-name]/`
2. **Add `_category_.json`** with proper label and position
3. **Create subcategories** as needed (e.g., `call-forwarding/`, `voicemail/`)
4. **Follow provider guide pattern**:
   - Overview/index page with provider selection
   - Individual provider guides (cox-communications.md, etc.)
   - Use provider logos in `/static/img/providers/`

---

## 🔗 Internal Linking Best Practices

### Use Docusaurus Link Component

For clickable elements (logos, buttons), always use the Link component:

```jsx
import Link from '@docusaurus/Link';

<Link to="/end-users/cbo-admins/voice/call-forwarding/cox-communications">
  <img src="/img/providers/cox-logo.png" alt="Cox Business" />
</Link>
```

### Markdown Links

For regular text links, use relative paths with `.md` extension:

```markdown
[Setup Guide](./cox-communications.md)
[Back to Overview](../index.md)
```

### Avoid These Common Mistakes

- ❌ Don't use `<a href="...">` tags for internal links
- ❌ Don't use absolute paths without the Link component
- ❌ Don't forget the `.md` extension for markdown links

---

## 🎨 Adding Provider Logos

1. **Save logo** to `/static/img/providers/provider-name.png`
2. **Optimize image** (recommended: 200px width max, transparent background)
3. **Use in provider selection**:
   ```jsx
   <Link to="/path/to/guide">
     <img 
       src="/img/providers/provider-name.png" 
       alt="Provider Name" 
       style={{maxWidth: '180px', maxHeight: '60px', objectFit: 'contain'}}
     />
   </Link>
   ```

---

## 📊 Content Organization Guidelines

### User-Focused Structure

- **CBO Admins**: Setup, configuration, management tasks
- **Supervisors**: Team management, reporting, oversight
- **Staff Agents**: Daily usage, features, troubleshooting
- **Developers**: Technical implementation, APIs, customization

### Channel-Based Organization

Group features by communication channel:
- **Voice**: Calls, forwarding, voicemail
- **Messaging**: SMS, webchat, automated responses
- **Socials**: Facebook Messenger, WhatsApp integration
- **Fax**: Fax services and management
- **Email**: Email integration and management

### Writing Guidelines

- **Plain language** for end users
- **Action-oriented** instructions
- **Accessibility-first** approach
- **Inclusive language** throughout

---

## 🚀 Deployment

### 🚨 CRITICAL: First-Time GitHub Pages Setup

**If setting up GitHub Pages for the first time, follow these steps EXACTLY:**

#### Step 1: Enable GitHub Pages
1. Navigate to: **Settings → Pages** in your GitHub repository
2. Under **"Source"**, select **"Deploy from a branch"**
3. Select Branch: **`gh-pages`** ⚠️ NOT `main`!
4. Select Folder: **`/ (root)`**
5. Click **Save**

#### Step 2: Configure Custom Domain
1. In the **"Custom domain"** field, enter: `docs.connie.one`
2. Wait for **"DNS check successful"** message (may take 5-10 minutes)
3. Check the box for **"Enforce HTTPS"**
4. Click **Save**

#### Step 3: Create Repository Variable
1. Navigate to: **Settings → Secrets and variables → Actions**
2. Click on **"Variables"** tab
3. Click **"New repository variable"**
4. Add the following:
   - Name: `DEPLOY_DOCS`
   - Value: `true`
5. Click **"Add variable"**

#### Step 4: Create CNAME File
Ensure the file `static/CNAME` exists with your domain:
```bash
echo "docs.connie.one" > static/CNAME
git add static/CNAME
git commit -m "Add CNAME for custom domain"
git push origin main
```

#### Step 5: DNS Configuration
Ensure your DNS provider has a CNAME record:
- **Name**: `docs` (or `@` for apex domain)
- **Value**: `connieml.github.io`
- **TTL**: 3600 (or provider default)

### Automatic Deployment

Once GitHub Pages is configured:

- **Trigger**: Push to `main` branch
- **Platform**: GitHub Pages via `gh-pages` branch
- **URL**: https://docs.connie.one/
- **Build time**: ~2-3 minutes

```bash
# Deploy changes
git add .
git commit -m "Your descriptive message"
git push origin main

# Monitor deployment (requires GitHub CLI)
gh run list --limit 1
```

### Manual Deployment Check

```bash
# Check build locally FIRST
npm run build

# If build succeeds, push to GitHub
git push origin main

# Verify deployment succeeded (after 2-3 minutes)
curl -I https://docs.connie.one/
# Should return: HTTP/2 200
```

### Troubleshooting Deployment

#### Common Issues and Solutions

**Issue: Site shows 404 after successful deployment**
- **Cause**: GitHub Pages is looking at wrong branch
- **Solution**: Ensure GitHub Pages Source is set to `gh-pages` branch, NOT `main`

**Issue: "DEPLOY_DOCS is not true" in GitHub Actions logs**
- **Cause**: Repository variable not set
- **Solution**: Add `DEPLOY_DOCS=true` repository variable (see Step 3 above)

**Issue: Custom domain not working**
- **Cause**: CNAME file missing or DNS misconfigured
- **Solution**: 
  1. Verify `static/CNAME` exists with correct domain
  2. Check DNS CNAME record points to `connieml.github.io`
  3. Wait 10-30 minutes for DNS propagation

**Issue: Deployment succeeds but content doesn't update**
- **Cause**: Browser cache or CDN cache
- **Solution**: 
  1. Clear browser cache or use incognito mode
  2. Wait 5-10 minutes for CDN cache to expire
  3. Add `?v=timestamp` to URL to bypass cache

**Issue: Build fails with "broken links" error**
- **Cause**: Internal documentation links are broken
- **Solution**: 
  1. Run `npm run build` locally to identify broken links
  2. Fix all broken links
  3. Temporarily set `onBrokenLinks: "warn"` in `docusaurus.config.js` if urgent

### Deployment Checklist

Before deploying, verify:
- [ ] **GitHub Pages Source**: Set to `gh-pages` branch
- [ ] **DEPLOY_DOCS variable**: Set to `true`
- [ ] **CNAME file**: Contains your custom domain
- [ ] **Build passes**: `npm run build` succeeds locally
- [ ] **No broken links**: All internal links validated
- [ ] **DNS configured**: CNAME record points to GitHub Pages

---

## 🛠️ Development Tips

### Sidebar Configuration

- **Auto-generated**: Use `_category_.json` files (recommended)
- **Manual**: Edit `sidebars.js` for custom organization
- **Mixed approach**: Use both for complex structures

### Performance Optimization

- **Optimize images**: Use WebP format when possible
- **Lazy loading**: Large images load automatically
- **Search**: Built-in search is included and indexed

### Accessibility

- **Alt text**: Always include for images
- **Heading hierarchy**: Use logical h1→h2→h3 structure
- **Color contrast**: Ensure WCAG 2.1 AA compliance
- **Screen readers**: Test with NVDA or VoiceOver

---

## 📋 Content Checklist

Before publishing new content:

- [ ] Content is in the correct user section
- [ ] `_category_.json` files exist for new directories
- [ ] All images have descriptive alt text
- [ ] Internal links work correctly
- [ ] Content follows established patterns
- [ ] Builds successfully locally (`npm run build`)
- [ ] Follows accessibility guidelines

---

## 🆘 Getting Help

- **Docusaurus Docs**: https://docusaurus.io/docs
- **GitHub Issues**: Report problems in the repository
- **Content Guidelines**: See CLAUDE.md for architectural decisions

---

## 📈 Future Enhancements

Planned improvements:
- [ ] Multi-language support
- [ ] Advanced search with filtering
- [ ] Interactive tutorials
- [ ] Video integration
- [ ] Community contributions workflow

---

*This documentation site is continuously evolving. For major architectural changes, please update both this README and the CLAUDE.md file.*