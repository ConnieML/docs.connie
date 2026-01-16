---
sidebar_label: Basic Voicemail Setup
sidebar_position: 5
title: "Basic Voicemail Setup"
---

# Basic Voicemail Setup

:::info Redirected Content
This page has been superseded by the new documentation structure.

**For voicemail-only setup, see:** [Voicemail-Only Configuration](./voicemail-only-configuration)

The new guide covers:
- Dedicated feature deployment (`voicemail-only-with-email/`)
- Parameter approach (`?voicemailOnly=true`)
- Human Developer Track (step-by-step UI instructions)
- AI Agent Track (CLI commands)
:::

## Quick Links

- **[Implementation Guide](./voicemail-implementation-guide)** - Start here to understand the architecture
- **[Voicemail-Only Configuration](./voicemail-only-configuration)** - Full setup guide for direct-to-voicemail
- **[Callback + Wait Setup](./callback-voicemail-setup)** - Queue experience with caller options

## Why the Change?

The previous documentation presented voicemail options as three separate "types" (Options A, B, C). The new structure correctly separates:

1. **Base Experiences** (Voicemail Only vs Callback + Wait)
2. **Add-ons** (Email Notifications, Transcription)

This makes it clear that email and transcription can be added to ANY base experience.
