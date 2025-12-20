---
sidebar_label: Voicemail Overview
sidebar_position: 2
title: "Voicemail Documentation"
---

# Voicemail Documentation

This section covers voicemail implementation for ConnieRTC, including base experiences and add-on features.

## Understanding the Architecture

Voicemail in ConnieRTC follows a **Base Experience + Add-ons** model:

```
┌─────────────────────────────────────────────────────────────┐
│              VOICEMAIL ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  BASE EXPERIENCES (choose one):                             │
│  ├── Voicemail Only: Caller → Greeting → Record → Done     │
│  └── Callback + Wait: Caller → Queue → Options → Resolve   │
│                                                             │
│  ADD-ONS (apply to either base):                            │
│  ├── Email Notifications: Audio attachment to staff email  │
│  └── Transcription: Audio-to-text conversion                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

1. **[Implementation Guide](/developers/building/feature-management/channels/voice/voicemail/voicemail-implementation-guide)** - Start here to choose your configuration
2. Select your base experience:
   - [Voicemail-Only](/developers/building/feature-management/channels/voice/voicemail/voicemail-only-configuration) - Direct to voicemail
   - [Callback + Wait](/developers/building/feature-management/channels/voice/voicemail/callback-voicemail-setup) - Queue with caller options
3. Add features as needed:
   - [Email Notifications](/developers/building/feature-management/channels/voice/add-ons/email-notifications)
   - [Transcription](/developers/building/feature-management/channels/voice/add-ons/transcription)

## Documentation Index

### Core Guides

| Guide | Description |
|-------|-------------|
| [Implementation Guide](/developers/building/feature-management/channels/voice/voicemail/voicemail-implementation-guide) | Architecture overview, decision charts, use cases |
| [Voicemail-Only Configuration](/developers/building/feature-management/channels/voice/voicemail/voicemail-only-configuration) | Direct-to-voicemail setup (dedicated feature or parameter) |
| [Callback + Wait Setup](/developers/building/feature-management/channels/voice/voicemail/callback-voicemail-setup) | Full queue experience with caller options |

### Add-ons

| Add-on | Description |
|--------|-------------|
| [Email Notifications](/developers/building/feature-management/channels/voice/add-ons/email-notifications) | Send voicemail audio to staff email |
| [Transcription](/developers/building/feature-management/channels/voice/add-ons/transcription) | Convert audio to searchable text |

### Email Provider Setup

| Provider | Description |
|----------|-------------|
| [Mailgun Setup](/developers/building/feature-management/channels/voice/voicemail/email-providers/mailgun-setup) | Recommended provider for most organizations |
| [SendGrid Setup](/developers/building/feature-management/channels/voice/voicemail/email-providers/sendgrid-setup) | Alternative provider |

## Common Configurations

| Use Case | Base | Email | Transcription |
|----------|------|-------|---------------|
| After-hours voicemail | Voicemail Only | Yes | Optional |
| Crisis hotline overflow | Callback + Wait | Yes | Yes |
| Internal support line | Voicemail Only | Yes | Yes |
| High-volume call center | Callback + Wait | Yes | Yes |

## Codebase Reference

| Feature Directory | Base Experience | Email |
|-------------------|-----------------|-------|
| `callback-and-voicemail/` | Callback + Wait | No |
| `callback-and-voicemail-with-email/` | Callback + Wait | Yes |
| `voicemail-only-with-email/` | Voicemail Only | Yes |
| `?voicemailOnly=true` parameter | Voicemail Only | Uses existing |

---

For detailed implementation instructions, start with the [Implementation Guide](./voicemail-implementation-guide).
