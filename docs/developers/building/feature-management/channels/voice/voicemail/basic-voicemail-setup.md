---
sidebar_label: Basic Voicemail Setup
sidebar_position: 5
title: "Option A: Basic Voicemail Setup"
---

# Option A: Basic Voicemail Setup

This guide shows you how to implement basic voicemail functionality using the ConnieRTC template features.

:::info Coming Soon
This setup guide is currently under development. For now, basic voicemail functionality is available through the standard callback-and-voicemail template feature.

Contact your Connie support team for assistance with basic voicemail configuration.
:::

## Quick Setup

Basic voicemail is included in the standard `callback-and-voicemail` template feature. Simply enable it with minimal configuration:

```json
{
  "features": {
    "callback_and_voicemail": {
      "enabled": true,
      "allow_requeue": false,
      "max_attempts": 1,
      "auto_select_task": true
    }
  }
}
```

## Next Steps

:::warning Legacy Documentation
This page is for legacy implementations. **For new implementations:**
- [Voice Overview](../overview) - Modern modular voice system
- [Direct to Voicemail Workflow](../workflows/voicemail-only) - Clean implementation guide
:::

For more advanced voicemail options, see:
- [Legacy Implementation Guide](../voicemail-implementation-guide) - Legacy architecture overview
- [Callback + Voicemail Setup](./callback-voicemail-setup) - Professional wait experience  
- [Email-Enabled Voicemail](./email-providers/mailgun-setup) - With email notifications