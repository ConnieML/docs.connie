---
sidebar_label: Legacy Implementation Guide
sidebar_position: 10
title: "Legacy Voicemail Implementation Guide"
---

:::warning Legacy Documentation
This page contains legacy documentation for the previous voicemail architecture. 

**For new implementations, please use the updated modular voice system:**
- [Voice Channel Overview](./overview) - Modern modular architecture
- [Core Workflows](/developers/building/feature-management/channels/voice/workflows/) - Choose your base workflow
- [Add-On Features](/developers/building/feature-management/channels/voice/add-ons/) - Add email, transcription, etc.
:::

# Legacy Voicemail Implementation Guide

This guide helps you choose and implement the right voicemail solution for older Twilio Professional Services template deployments.

## Migration to New Architecture

The voice system has been restructured for better clarity and modularity. Here's how the old options map to the new system:

### Old Option A: Basic Voicemail → New: [Direct to Voicemail](/developers/building/feature-management/channels/voice/workflows/voicemail-only)
- Same functionality, clearer implementation guide
- Better troubleshooting and configuration options

### Old Option B: Callback + Voicemail → New: [Direct + Options](/developers/building/feature-management/channels/voice/workflows/direct-with-options)
- Enhanced with better hold music and queue management
- More flexible callback options

### Old Option C: Callback + Voicemail + Email → New: [Direct + Options](/developers/building/feature-management/channels/voice/workflows/direct-with-options) + [Email Notifications](/developers/building/feature-management/channels/voice/add-ons/email-notifications)
- Modular approach allows easier customization  
- Better email provider options and setup guides

## Legacy Decision Tree

| Option | Features | Setup Complexity | Best For |
|--------|----------|------------------|----------|
| **A - Basic Voicemail** | Studio recording only | Simple | Quick setup, minimal features |
| **B - Callback + Voicemail** | Voicemail + Flex task creation | Moderate | Most organizations |
| **C - Callback + Voicemail + Email** | Full notifications + email alerts | Advanced | Complete solution |

## Why We Changed

The new modular architecture provides:
- **Clearer Choices**: Pick your core workflow, then add features
- **Better Troubleshooting**: Specific guides for each component
- **Easier Maintenance**: Update individual features without affecting others
- **More Flexibility**: Mix and match features as needed

## Implementation Resources

### New Architecture (Recommended)
- [Voice Overview](./overview) - Start here for new implementations
- [Core Workflows](/developers/building/feature-management/channels/voice/workflows/) - Base call handling patterns
- [Add-On Features](/developers/building/feature-management/channels/voice/add-ons/) - Email, transcription, CRM integration
- [Troubleshooting](./troubleshooting/) - Common issues and solutions

### Legacy Resources (Existing Deployments)
- [Email Provider Setup](./voicemail/) - For existing Option C implementations
- [Legacy Mailgun Setup](./voicemail/email-providers/mailgun-setup) - Detailed legacy guide

## Need Help?

- **New Implementations**: Follow the [Voice Overview](./overview) guide
- **Existing Deployments**: Continue using current setup or plan migration
- **Professional Services**: Contact your Twilio Professional Services representative