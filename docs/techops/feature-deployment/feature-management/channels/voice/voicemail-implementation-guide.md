---
sidebar_label: Legacy Implementation Guide
sidebar_position: 10
title: "Legacy Voicemail Implementation Guide"
---

:::warning Legacy Documentation
This page contains legacy documentation for the previous voicemail architecture.

**For current implementations, please use:**
- [Voicemail Documentation](/techops/feature-deployment/feature-management/channels/voice/voicemail/) - Complete voicemail guides
- [Implementation Guide](/techops/feature-deployment/feature-management/channels/voice/voicemail/voicemail-implementation-guide) - Architecture and decision charts
:::

# Legacy Voicemail Implementation Guide

This guide helps you choose and implement the right voicemail solution for older Connie Professional Services template deployments.

## Migration to New Architecture

The voice system has been restructured for better clarity and modularity. Here's how the old options map to the new system:

### Old Option A: Basic Voicemail → New: [Voicemail-Only](/techops/feature-deployment/feature-management/channels/voice/voicemail/voicemail-only-configuration)
- Same functionality, clearer implementation guide
- Better troubleshooting and configuration options
- Two implementation paths: dedicated feature or parameter approach

### Old Option B: Callback + Voicemail → New: [Callback + Wait](/techops/feature-deployment/feature-management/channels/voice/voicemail/callback-voicemail-setup)
- Enhanced with better hold music and queue management
- More flexible callback options

### Old Option C: Callback + Voicemail + Email → New: [Callback + Wait](/techops/feature-deployment/feature-management/channels/voice/voicemail/callback-voicemail-setup) + [Email Notifications](/techops/feature-deployment/feature-management/channels/voice/add-ons/email-notifications)
- Modular approach allows easier customization
- Better email provider options and setup guides

## Key Architecture Change

**Old Model:** Three separate "Options" (A, B, C)

**New Model:** Base Experience + Add-ons
- **Base Experiences:** Voicemail Only OR Callback + Wait
- **Add-ons:** Email Notifications, Transcription (apply to ANY base)

This makes it clear that email and transcription are features that can be added to either base experience.

## Legacy Decision Tree

| Option | Features | Setup Complexity | Best For |
|--------|----------|------------------|----------|
| **A - Basic Voicemail** | Studio recording only | Simple | Quick setup, minimal features |
| **B - Callback + Voicemail** | Voicemail + ConnieRTC task creation | Moderate | Most organizations |
| **C - Callback + Voicemail + Email** | Full notifications + email alerts | Advanced | Complete solution |

## Why We Changed

The new modular architecture provides:
- **Clearer Choices**: Pick your core workflow, then add features
- **Better Troubleshooting**: Specific guides for each component
- **Easier Maintenance**: Update individual features without affecting others
- **More Flexibility**: Mix and match features as needed

## Implementation Resources

### New Architecture (Recommended)
- [Voicemail Overview](/techops/feature-deployment/feature-management/channels/voice/voicemail/) - Start here for new implementations
- [Implementation Guide](/techops/feature-deployment/feature-management/channels/voice/voicemail/voicemail-implementation-guide) - Architecture and decision charts
- [Email Notifications Add-On](/techops/feature-deployment/feature-management/channels/voice/add-ons/email-notifications) - Email setup
- [Transcription Add-On](/techops/feature-deployment/feature-management/channels/voice/add-ons/transcription) - Audio-to-text

### Legacy Resources (Existing Deployments)
- [Mailgun Setup](/techops/feature-deployment/feature-management/channels/voice/voicemail/email-providers/mailgun-setup) - Email provider configuration
- [SendGrid Setup](/techops/feature-deployment/feature-management/channels/voice/voicemail/email-providers/sendgrid-setup) - Alternative email provider

## Need Help?

- **New Implementations**: Follow the [Voicemail Overview](/techops/feature-deployment/feature-management/channels/voice/voicemail/)
- **Existing Deployments**: Continue using current setup or plan migration
- **Professional Services**: Contact your Connie Professional Services representative
