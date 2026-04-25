---
sidebar_label: Runbook Index
sidebar_position: 1
title: "Runbook Index"
---

# Runbook Index

**The map for "where is the runbook for X?"**

Every live Connie runbook is listed below. Runbooks themselves live inside their channel or feature page in the docs tree — this index is the one-click lookup that gets you there.

---

## Who this is for

- **End-users (nonprofit staff)** — you don't need this page. Go to [Channels](/getting-started/channels/voice) or the [Feature Library](/getting-started/feature-library/jtbd-feature-grid).
- **Operators (humans or AI agents) deploying, changing, cancelling, or fixing a Connie feature on a live account** — start here. Find the row, jump to the runbook.
- **Authors writing a new runbook** — log it here. See [Authoring rules](#authoring-rules) at the bottom.

---

## Voice

### Voice Direct — routing configs

| Config | Product page | 🛠️ Setup | ✏️ Change | 🗑️ Cancel | 🚨 Troubleshoot |
|---|---|---|---|---|---|
| **Wait Experience + Admin Email** | [Overview](/getting-started/channels/voice/voice-features/wait-experience-with-email/overview) | [Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) | [Change](/getting-started/channels/voice/voice-features/wait-experience-with-email/change) | [Cancel](/getting-started/channels/voice/voice-features/wait-experience-with-email/cancel) | [Troubleshoot](/getting-started/channels/voice/voice-features/wait-experience-with-email/troubleshoot) |
| Voice Direct → Queue *(OOTB default)* | [In channel page](/getting-started/channels/voice#out-of-the-box-voice-direct-to-queue) | — *(no config required)* | — | — | — |
| Voicemail-only | 📝 TBD | — | — | — | — |
| Callback-only | 📝 TBD | — | — | — | — |
| Voicemail OR Callback | 📝 TBD | — | — | — | — |

### Voice — add-ons

| Add-on | Product page | 🛠️ Setup | ✏️ Change | 🗑️ Cancel | 🚨 Troubleshoot |
|---|---|---|---|---|---|
| Admin Email | (paired with Wait Experience above) | — | — | — | — |
| CRM Screen-Pop | 📝 TBD | — | — | — | — |
| Intelligent Routing (IVR) | 📝 TBD | — | — | — | — |
| Custom Hold Music | 📝 TBD | — | — | — | — |
| Custom IVR Voice (TTS) | 📝 TBD | — | — | — | — |

---

## Other channels

| Channel | Product page | Runbooks |
|---|---|---|
| SMS | [Overview](/getting-started/channels/sms) | 📝 TBD |
| Email | [Overview](/getting-started/channels/email) | 📝 TBD |
| Fax | [Overview](/getting-started/channels/fax) | 📝 TBD |
| Web Chat | [Overview](/getting-started/channels/web-chat) | 📝 TBD |
| Social Media | [Overview](/getting-started/channels/social-media) | 📝 TBD |

---

## Symptom-driven quick reference

For common breakage patterns that don't yet have a dedicated runbook (e.g., "calls not reaching Flex," "voicemail emails not arriving"), start at [Common Issues](/techops/troubleshooting/common-issues).

---

## Authoring rules

When you create a new runbook:

1. **Place the file inside the feature's docs tree.** Example: `docs/getting-started/channels/voice/voice-features/<feature>/<runbook>.md`. Don't put runbooks in this `troubleshooting/` directory — that's for symptom-driven references and this index.
2. **Add a row to this index** in the matching channel/feature section above.
3. **Use absolute Docusaurus paths** in the table: `/getting-started/channels/voice/voice-features/.../setup` — never relative (`../setup`).
4. **Use the four standard runbook types:** 🛠️ Setup, ✏️ Change, 🗑️ Cancel, 🚨 Troubleshoot. If a feature only has some of the four, leave the missing ones as `—`.
5. **Mirror the inline runbook table** on the channel/feature hub page (e.g., `/getting-started/channels/voice` has its own runbook table near the top — keep it in sync with this index).

This index is the canonical map. The inline tables on channel pages are convenience entry points. Both should stay in sync.
