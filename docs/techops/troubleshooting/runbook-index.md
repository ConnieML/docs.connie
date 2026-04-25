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

## Standards & Templates

| Resource | Where it lives | What it is |
|---|---|---|
| **Runbook Authoring Standard v1.0** | [vault.chrisberno.dev/techops/standards/runbook-authoring](https://vault.chrisberno.dev/techops/standards/runbook-authoring) | Enterprise standard (CDO-owned). Defines the 5-file anatomy and the mandatory 7-section action-runbook template that applies to every project, every docs platform. |
| **Action Runbook Template (canonical)** | `chrisberno-dev-vault/techops/templates/runbook-action-template.md` | Copy-and-fill template implementing the standard. Use this as the starting file for any new Setup/Change/Cancel/Troubleshoot runbook. |
| **Connie / Docusaurus authoring guide** | [Authoring & Publishing Runbooks](/techops/troubleshooting/authoring-runbooks) | This-platform-specific implementation of the enterprise standard. Adds Docusaurus gotchas, the docs.connie publishing pipeline, and the cross-link rules. |
| **Connie reference implementation** | [Wait Experience + Admin Email Setup](/getting-started/channels/voice/voice-features/wait-experience-with-email/setup) | The canonical Connie example of the 7-section template applied to a real shipped feature. Pattern-match against this when authoring new Connie runbooks. |

**When the enterprise standard updates,** the Connie authoring guide and any retroactive runbook upgrades roll forward from there. Project-level deviations from the 7-section template are not allowed without CDO escalation.

---

## Authoring rules

**Full guide:** [Authoring & Publishing Runbooks](/techops/troubleshooting/authoring-runbooks) — file structure, frontmatter, cross-link rules, build/deploy pipeline, gotchas.

Quick rules:

1. **Place the file inside the feature's docs tree.** Example: `docs/getting-started/channels/voice/voice-features/<feature>/<runbook>.md`. Don't put runbooks in this `troubleshooting/` directory — that's for symptom-driven references and this index.
2. **Add a row to this index** in the matching channel/feature section above.
3. **Use absolute Docusaurus paths** in the table: `/getting-started/channels/voice/voice-features/.../setup` — never relative (`../setup`). Also strip numeric prefixes (`/setup` not `/02_setup`).
4. **Use the four standard runbook types:** 🛠️ Setup, ✏️ Change, 🗑️ Cancel, 🚨 Troubleshoot. If a feature only has some of the four, leave the missing ones as `—`.
5. **Mirror the inline runbook table** on the channel/feature hub page (e.g., `/getting-started/channels/voice` has its own runbook table near the top — keep it in sync with this index).

This index is the canonical map. The inline tables on channel pages are convenience entry points. Both should stay in sync.
