---
sidebar_label: Voice
sidebar_position: 1
title: "Voice Channel"
---

# Voice Channel

Connie's Voice channel is how callers reach your CBO by phone. A caller dials a number you provision, the call routes through ConnieRTC, and an agent on the Connie desktop answers. Out of the box this works without any configuration beyond wiring a phone number to a queue. From there, you can layer on optional features — wait experiences, voicemail, callbacks, admin email notifications, CRM screen-pop — to shape the caller experience for the way your organization actually operates.

## Out of the box: Voice Direct to Queue

The default Voice Direct configuration is the simplest possible setup:

> **Caller dials → call hits the TaskRouter queue → first available agent picks up.**

No hold music beyond the carrier default, no IVR, no voicemail option, no callback. If every agent is busy, the caller waits silently until someone is free. If no one is available, the call eventually times out per your queue's SLA. This is the right starting point for small teams with predictable, staffed call volume — and it's what every Connie account ships with.

If you need anything beyond that — a wait experience, a voicemail option, callback support, an admin email when a caller leaves a message, multi-queue IVR routing — you compose those from the **Voice Features** matrix below.

## Voice Features Matrix

Voice Direct comes in **five routing configurations**. Any of them can be combined with one or more **orthogonal add-ons** to shape the caller experience.

### Routing configurations

| Config | One-line | Status |
|---|---|---|
| **Voice Direct → Queue** *(default)* | Caller rings, hits queue, agent picks up. No hold options, no voicemail. | ✅ Live (out of the box) |
| **Voice Direct → Voicemail only** | No agent option. Caller leaves a message; recording + transcript become a task. | 📝 Doc TBD |
| **Voice Direct → Callback only** | No voicemail option. Caller leaves a number; callback becomes a task. | 📝 Doc TBD |
| **Voice Direct → Voicemail OR Callback** | Both options at the entry point, no hold experience. | 📝 Doc TBD |
| **Voice Direct → Wait Experience** | Hold + caller can press `*` to switch to voicemail or callback mid-hold (queue position preserved). | ✅ Live — see [Wait Experience + Admin Email](/getting-started/channels/voice/voice-features/wait-experience-with-email/overview) |

### Orthogonal add-ons (compose with any routing config)

| Add-on | What it does | Status |
|---|---|---|
| **Admin Email** | Voicemail recording + transcript emailed to admin via Mailgun. | ✅ Live (paired with Wait Experience) |
| **CRM Screen-Pop** | Agent's CRM container loads the caller's record automatically when the task arrives. | ✅ Live (`{{task.attributes.profile_url}}` Liquid template) |
| **Attribute Capture** | Task attributes hydrated with caller context (caller ID, time-in-queue, recording URL, transcript). | ✅ Live |
| **Intelligent Routing** | IVR `Gather` widget → multiple `Send to Flex` widgets, each with its own per-flow queue. | ✅ Live (NSS RAMP/PCA pattern) |
| **Custom Hold Music** | Replace the default Wait Experience hold audio with a custom track. | 📝 Doc TBD |
| **Custom IVR Voice (TTS)** | Swap the Polly NTTS voice used by Wait Experience prompts. | 📝 Doc TBD |

## Runbooks — one-click access

Agents working on a live deployment can jump straight to the runbook they need. Each Voice Direct config that's live ships with a product page (caller experience + admin benefit) and four runbooks (Setup, Change, Cancel, Troubleshoot).

| Config | Product page | 🛠️ Setup | ✏️ Change | 🗑️ Cancel | 🚨 Troubleshoot |
|---|---|---|---|---|---|
| **Wait Experience + Admin Email** | [Overview](/getting-started/channels/voice/voice-features/wait-experience-with-email/overview) | [Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) | [Change](/getting-started/channels/voice/voice-features/wait-experience-with-email/change) | [Cancel](/getting-started/channels/voice/voice-features/wait-experience-with-email/cancel) | [Troubleshoot](/getting-started/channels/voice/voice-features/wait-experience-with-email/troubleshoot) |
| *Voicemail-only* | 📝 TBD | — | — | — | — |
| *Callback-only* | 📝 TBD | — | — | — | — |
| *Voicemail OR Callback* | 📝 TBD | — | — | — | — |
| *Voice Direct → Queue (default)* | No config — see ["Out of the box"](#out-of-the-box-voice-direct-to-queue) above | — | — | — | — |

### Voice Direct → Wait Experience

The full-featured Voice Direct configuration. Caller is greeted, placed on hold, and offered the option (at any time) to switch to a callback or voicemail without losing their queue position. Voicemails are recorded, transcribed, and emailed to the admin.

See the [product page](/getting-started/channels/voice/voice-features/wait-experience-with-email/overview) for caller experience details and admin benefits, or jump straight to the runbook table above to deploy, change, or troubleshoot a live install.

*Other routing configs (Voicemail-only, Callback-only, Voicemail-or-Callback) and the standalone add-on docs (Custom Hold Music, Custom IVR Voice) are next on the roadmap.*

## Required to enable any voice feature

- A Voice Direct phone number (provisioned in the client's Twilio sub-account).
- A configured TaskRouter Workflow for each queue.
- For Admin Email: a Mailgun domain + domain-scoped sending API key.
- For CRM Screen-Pop: caller-record URL plumbing into `task.attributes.profile_url`.

## Provider integration

ConnieRTC supports multiple voice providers — Twilio (cloud), traditional carriers (Cox, Xfinity, Verizon, Spectrum), and direct SIP trunking. Voice features described above are exercised through Twilio's TaskRouter + Studio + Serverless stack regardless of which carrier delivers the underlying PSTN minutes.

## Best practices

- Always test IVR flows end-to-end before going live.
- Configure after-hours messaging for every queue.
- Enable voicemail transcription so recordings are searchable.
- Review call recordings periodically for quality and training.
- Watch queue metrics during peak windows to right-size staffing.
