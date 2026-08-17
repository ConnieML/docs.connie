---
sidebar_label: Getting Started
sidebar_position: 1
title: "CBO Admins - Getting Started"
---

import RoleHero from '@site/src/components/RoleHero';

# Getting Started for CBO Administrators

<RoleHero avatar="/img/avatars/admin-avatar.png" role="CBO Administrator">
You set up and run your organization's Connie account — users and roles, phone numbers, routing, and reporting. This guide takes you from a brand-new account to <strong>live</strong>.
</RoleHero>

<div style={{display: 'flex', gap: '28px', alignItems: 'flex-start', flexWrap: 'wrap'}}>
  <div style={{flex: '1 1 320px'}}>

Welcome! As a **Community-Based Organization (CBO) Administrator**, you configure and monitor Connie for your nonprofit — and you're the person your team turns to when they need access or changes.

Everything runs in your browser. There's **nothing to install** and no third-party software to download — every Connie feature is accessed directly from any modern browser.

  </div>
  <img src="/img/avatars/admin-persona.png" alt="A friendly CBO Administrator" style={{width: '160px', flexShrink: 0, alignSelf: 'center'}} />
</div>

## 👋 What a CBO Administrator does

| Area | What you manage |
|------|-----------------|
| 👥 **People** | Add and manage users, assign roles, organize groups |
| ☎️ **Phone & routing** | Phone numbers, IVR menus, business hours, call recording |
| 🔌 **Data** | Connect a CRM or database, configure Reporting & Analytics |
| 🔒 **Account** | Security & compliance, sign-on, general settings |

## ✅ Before you begin

Make sure you have:

- A **Connie account** — new or existing
- **Administrator access** to that account
- About **30 minutes** for the initial setup

:::info Your account starts in *test mode*
When your account is first provisioned, you'll receive Administrator login credentials at the email address used to register. Your account stays in **test mode** until you complete the setup tasks below — then it moves to **Active**.
:::

## 🚀 How setup works: 3 steps

<div style={{display: 'flex', gap: '16px', margin: '20px 0', flexWrap: 'wrap'}}>
  <div style={{flex: '1 1 220px', padding: '20px', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '12px', background: 'var(--ifm-background-surface-color)'}}>
    <div style={{fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', color: 'var(--ifm-color-primary)'}}>STEP 1</div>
    <h3 style={{margin: '6px 0'}}>🔒 Security & Compliance</h3>
    <p style={{margin: 0}}>Confirm your organization details and accept Connie's terms of use and regulatory-compliance statement.</p>
  </div>
  <div style={{flex: '1 1 220px', padding: '20px', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '12px', background: 'var(--ifm-background-surface-color)'}}>
    <div style={{fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', color: 'var(--ifm-color-primary)'}}>STEP 2</div>
    <h3 style={{margin: '6px 0'}}>🔌 Configure & Connect Data</h3>
    <p style={{margin: 0}}>Connect your data source (CRM or database) and configure the core features your team will use.</p>
  </div>
  <div style={{flex: '1 1 220px', padding: '20px', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '12px', background: 'var(--ifm-background-surface-color)'}}>
    <div style={{fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', color: 'var(--ifm-color-primary)'}}>STEP 3</div>
    <h3 style={{margin: '6px 0'}}>✅ Activate</h3>
    <p style={{margin: 0}}>Complete the initial setup tasks. Your account flips from test mode to <strong>Active</strong> and you're live.</p>
  </div>
</div>

{/* SCREENSHOT SLOT (CCTO): admin dashboard / setup checklist view goes here once captured. Follow /img/staff-agents/ embed style. */}

## 👥 Adding your team: 3 ways to provision users

Connie gives you three ways to create users. Each person you add receives an **invitation email** with instructions to log in on their desktop and mobile devices.

| Method | Best for | How it works |
|--------|----------|--------------|
| **Manually add users** | A handful of users | Add people one at a time; each gets an invite email |
| **Bulk upload** | Onboarding a whole team | Invite up to **100 users at once** via a single upload |
| **Directory Sync (LDAP)** | Orgs on Azure, Okta, or Workday | Auto-provision from your corporate directory — *coming soon* |

:::tip Roles are assigned per user
Every Connie account is provisioned with three roles — **Administrator**, **Supervisor**, and **Agent**. You control the permissions for each role and which role each user is assigned. (Those three roles map to the three guides in this documentation.)
:::

{/* SCREENSHOT SLOT (CCTO): "Add user" / "Bulk upload" admin screens go here once captured. */}

## 💻 System requirements

Connie runs in any modern web browser — there's nothing to install. For the best experience:

- **Browser:** the latest version of **Google Chrome** is recommended (and the supported browser for the current release). Modern Edge, Firefox, and Safari also work.
- **Connection:** a stable broadband connection — minimum **1.5 Mbps down / 384 kbps up**.
- **Network:** ports **80 (HTTP)** and **443 (HTTPS)** open. Connecting a local database or a third-party app (EHR/CRM) may require a firewall adjustment — loop in your IT administrator if needed.

:::note Troubleshooting a remote staff member?
A quick **internet speed test** is the best first step when someone reports Connie running slowly.
:::

## 📊 Reporting & Analytics

As an Administrator you provision and configure reporting for your team. Real-time and historical reporting (**Basic**, included) plus the **Connie Data Center (Advanced)** upgrade are documented here:

➡️ **[Reporting & Analytics → Administrators](/reporting-analytics/administrators/basic)**

## 🎯 Next steps

- **[Conversation Transfer](/end-users/administrators/conversation-transfer)** — configure how your team hands off conversations
- **[Manage your team](/end-users/administrators/managing-your-team/display-names)** — display names and how agents appear across surfaces
- **[Reporting & Analytics](/reporting-analytics)** — set up dashboards and reports
- **[Supervisor guide](/end-users/supervisors/overview)** · **[Staff Agent guide](/end-users/staff-agents/getting-started)** — the other two roles

---

**Need help?** Visit **[Get Support](/get-support/overview)** or reach out to your Connie representative for help getting your CBO up and running.
