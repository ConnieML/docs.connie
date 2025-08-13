---
sidebar_label: Choose Email Provider
sidebar_position: 2  
title: "Choose Your Email Provider for Option C"
---

import Link from '@docusaurus/Link';

# Choose Your Email Provider

:::warning Legacy Documentation
This page contains legacy email provider setup information. 

**For new implementations, please use:**
- [Email Notifications Add-On](/developers/building/feature-management/channels/voice/add-ons/email-notifications) - Modern setup with multiple provider options

**For existing deployments:** Continue using the information below or plan migration to the new structure.
:::

If you're implementing the legacy **Option C** (Callback + Voicemail + Email Notifications) from the [Legacy Implementation Guide](/developers/building/feature-management/channels/voice/voicemail-implementation-guide), you need to choose an email provider for sending voicemail notifications.

## Supported Email Providers

| Provider | Free Tier | Setup Complexity | Best For |
|----------|-----------|------------------|----------|
| **Mailgun** | 100 emails/day | Simple | Most organizations |
| **SendGrid** | 100 emails/day | Simple | High deliverability needs |
| **SMTP2GO** | 1,000 emails/month | Moderate | *Coming Soon* |

Select your email service provider below:

<div style={{
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
  margin: '40px 0'
}}>
  <Link
    to="/developers/building/feature-management/channels/voice/voicemail/email-providers/mailgun-setup"
    style={{
      textDecoration: 'none',
      color: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      border: '2px solid #e1e4e8',
      borderRadius: '8px',
      backgroundColor: '#f6f8fa',
      transition: 'all 0.3s ease',
      minWidth: '200px',
      maxWidth: '250px'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = '#0366d6';
      e.currentTarget.style.backgroundColor = '#f1f8ff';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '#e1e4e8';
      e.currentTarget.style.backgroundColor = '#f6f8fa';
    }}
  >
    <img 
      src="/img/providers/mailgun-logo.png" 
      alt="Mailgun" 
      style={{
        height: '60px',
        width: 'auto',
        marginBottom: '15px'
      }}
    />
    <strong style={{ fontSize: '16px', marginBottom: '8px' }}>Mailgun</strong>
    <span style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
      Reliable transactional email service
    </span>
  </Link>

  <Link
    to="/developers/building/feature-management/channels/voice/voicemail/email-providers/sendgrid-setup"
    style={{
      textDecoration: 'none',
      color: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      border: '2px solid #e1e4e8',
      borderRadius: '8px',
      backgroundColor: '#f6f8fa',
      transition: 'all 0.3s ease',
      minWidth: '200px',
      maxWidth: '250px'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = '#0366d6';
      e.currentTarget.style.backgroundColor = '#f1f8ff';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '#e1e4e8';
      e.currentTarget.style.backgroundColor = '#f6f8fa';
    }}
  >
    <img 
      src="/img/providers/sendgrid-logo.png" 
      alt="SendGrid" 
      style={{
        height: '60px',
        width: 'auto',
        marginBottom: '15px'
      }}
    />
    <strong style={{ fontSize: '16px', marginBottom: '8px' }}>SendGrid</strong>
    <span style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
      Enterprise-grade email delivery
    </span>
  </Link>

  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '2px dashed #d1d5da',
    borderRadius: '8px',
    backgroundColor: '#fafbfc',
    minWidth: '200px',
    maxWidth: '250px',
    opacity: '0.6'
  }}>
    <img 
      src="/img/providers/smtp2go-logo.png" 
      alt="SMTP2GO" 
      style={{
        height: '60px',
        width: 'auto',
        marginBottom: '15px'
      }}
    />
    <strong style={{ fontSize: '16px', marginBottom: '8px' }}>SMTP2GO</strong>
    <span style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
      Coming Soon
    </span>
  </div>
</div>

## Developer Implementation Overview

This section covers the technical implementation of voicemail email notifications using various email service providers. The integration involves:

- **Twilio Studio Flow Configuration**: Setting up call routing and voicemail recording
- **Serverless Function Development**: Creating email handlers for voicemail processing  
- **Email Service Integration**: Configuring API credentials and delivery settings
- **Testing and Deployment**: Validating the complete notification workflow

## Architecture Pattern

```mermaid
graph LR
    A[Incoming Call] --> B[Studio Flow]
    B --> C[Record Voicemail] 
    C --> D[Trigger Function]
    D --> E[Email Service API]
    E --> F[Admin Notification]
    C --> G[Route to Flex]
```

## Next Steps

1. **Choose your email provider** from the options above
2. **Follow the provider-specific setup guide** for technical implementation
3. **Configure your Twilio Studio Flow** with the provided JSON templates
4. **Deploy and test** the complete notification system