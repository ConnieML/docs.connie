---
sidebar_label: Overview (Product)
sidebar_position: 1
title: "Wait Experience + Admin Email — Product Page"
---

# Wait Experience + Admin Email

**The full-featured Voice Direct configuration.** A caller who reaches your line is greeted by a Connie agent voice, placed on hold, and offered the option — at any time — to switch to a callback or voicemail without losing their place in the queue. If they choose voicemail, the recording and transcript are immediately emailed to your admin email address.

This is what most Connie clients run on their main intake line.

---

## What the caller experiences

1. **Call connects.** Caller hears the configured greeting in the configured voice.
2. **Hold begins.** Caller hears your custom hold music (or generic music if no custom track is configured).
3. **Periodic prompts.** Connie reminds the caller they can press `*` to switch to callback or voicemail.
4. **Three possible outcomes:**
   - **Caller stays on hold** until an agent picks up (normal call flow).
   - **Caller presses `*`** and chooses **callback** — leaves their number, hangs up, keeps their place in queue. When their place comes up, an agent calls them back.
   - **Caller presses `*`** and chooses **voicemail** — records a message, hangs up, keeps their place in queue. When their place comes up, an agent listens to the voicemail and calls back.
5. **Voicemail recordings** are transcribed and emailed to the admin email address along with the audio attachment.
6. **Tasks land in the agent dashboard** with full caller context (caller ID, time-in-queue, recording URL if voicemail, transcript if available).

## What the client admin gets

- Reduced call abandonment — callers who can't wait on hold can leave voicemail or request a callback instead of hanging up frustrated.
- Real-time email notification of every voicemail with audio attachment and transcript.
- Compliance trail — every interaction (live, callback, voicemail) creates a task with timestamps and recording.
- No queue position lost when caller switches modes.

## Who this is for

- **Multi-staff lines** with predictable but variable call volume.
- **Organizations with after-hours or volume spikes** where waiting on hold isn't always feasible for the caller.
- **Compliance-sensitive deployments** that need an audit trail of every contact attempt.
- **Organizations whose admins need to be notified** of voicemails in near-real-time without logging into the agent console.

## What this is NOT

- Not for lines that should always go straight to voicemail (use **Voicemail only** instead).
- Not for lines with no admin email recipient (use **Wait Experience** without the email add-on — TODO: doc not yet drafted).
- Not for lines without a staffed queue (callback option assumes someone will eventually call back).

## Required to enable

- A Voice Direct phone number (provisioned in the client's Twilio sub-account).
- An admin email address (or comma-separated list).
- A Mailgun domain + API key with sending permission (Mailgun is the current email provider).
- A configured TaskRouter Workflow for the queue.
- The Connie deployment with the `callback-and-voicemail-with-email` feature flag enabled.

See the [Setup runbook](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) for step-by-step provisioning.

## Related runbooks

- **[Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup)** — first-time provisioning of this config on a Connie account.
- **[Change request](/getting-started/channels/voice/voice-features/wait-experience-with-email/change)** — modifying an existing deployment (swap hold music, add a queue, change admin email, etc.).
- **[Cancellation](/getting-started/channels/voice/voice-features/wait-experience-with-email/cancel)** — tearing down or reverting to a simpler config.
- **[Troubleshooting](/getting-started/channels/voice/voice-features/wait-experience-with-email/troubleshoot)** — what to check when callers report problems or admin emails stop arriving.
