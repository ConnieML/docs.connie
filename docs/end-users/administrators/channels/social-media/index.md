---
sidebar_label: Social Media Overview
sidebar_position: 1
title: "Social Media Channels"
---

# Social Media Channels

Connect with your community on the platforms they use every day. ConnieRTC integrates with major social messaging platforms, routing conversations directly into your Flex agent queue alongside voice, email, fax, and web channels.

## How Social Media Channels Work

```mermaid
flowchart LR
    A[Community Member] --> B[Social Platform]
    B --> C[Twilio Conversations API]
    C --> D[Studio Flow]
    D --> E[Department Routing]
    E --> F[Flex Agent Queue]

    style A fill:#e1f5fe
    style B fill:#e8f5e9
    style C fill:#f3e5f5
    style D fill:#fff3e0
    style E fill:#fce4ec
    style F fill:#f1f8e9
```

**The Complete Process**:
- **Community Member** sends a message via WhatsApp or Facebook Messenger
- **Twilio Conversations API** receives the inbound message from the social platform
- **Studio Flow** presents an interactive menu (department selection) to the sender
- **Department Routing** sets task attributes based on the sender's selection
- **Flex Agent Queue** receives the task with full channel branding and context

## Available Social Media Channels

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__header">
        <h3>💬 WhatsApp</h3>
      </div>
      <div className="card__body">
        <p>The world's most popular messaging app with 2+ billion users. Route WhatsApp Business messages directly into Flex with department-based routing.</p>
        <ul>
          <li><strong>Status</strong>: ✅ Live</li>
          <li><strong>Requirements</strong>: Meta Business Manager, WhatsApp Business Account</li>
          <li><strong>Routing</strong>: Interactive department menu</li>
        </ul>
        <a href="/end-users/administrators/channels/social-media/whatsapp"><strong>WhatsApp Setup Guide →</strong></a>
      </div>
    </div>
  </div>

  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__header">
        <h3>💙 Facebook Messenger</h3>
      </div>
      <div className="card__body">
        <p>Reach community members through your organization's Facebook Page. Messages route into Flex as tasks with full conversation history.</p>
        <ul>
          <li><strong>Status</strong>: ✅ Live</li>
          <li><strong>Requirements</strong>: Facebook Page, Meta Business Manager</li>
          <li><strong>Routing</strong>: Interactive department menu</li>
        </ul>
        <a href="/end-users/administrators/channels/social-media/facebook-messenger"><strong>Facebook Messenger Setup Guide →</strong></a>
      </div>
    </div>
  </div>
</div>

## Key Benefits

### Meet People Where They Are
- **No App Downloads**: Clients use platforms they already have on their phones
- **Familiar Interface**: Messaging feels natural — no learning curve for clients
- **Asynchronous Communication**: Clients can message anytime, agents respond when available

### Unified Agent Experience
- **Single Dashboard**: Social media messages appear in the same Flex queue as voice, email, and web
- **Consistent Routing**: Department-based routing works identically across all social channels
- **Full Context**: Agents see channel type, department selection, and conversation history

### Per-CBO Architecture
Each CBO gets its own dedicated setup:
- **Own Phone Number** (WhatsApp) or **Own Facebook Page** (Messenger)
- **Own Studio Flow** with customized department menus
- **Own Conversations Address** linking the channel to the flow
- **Reusable Templates**: The setup process is identical for every new CBO

## Technical Architecture

```mermaid
flowchart TD
    subgraph "Social Platforms"
        WA[WhatsApp Business API]
        FB[Facebook Messenger]
    end

    subgraph "Twilio Layer"
        SENDER[WhatsApp Sender / FB Page]
        MS[Messaging Service]
        CA[Conversations Address]
        CONV[Conversations API]
    end

    subgraph "Routing Layer"
        SF[Studio Flow]
        TR[TaskRouter]
    end

    subgraph "Agent Layer"
        FLEX[Flex UI]
        PLUGIN[Channel Plugin]
    end

    WA --> SENDER
    FB --> SENDER
    SENDER --> MS
    MS --> CA
    CA --> CONV
    CONV --> SF
    SF --> TR
    TR --> FLEX
    FLEX --> PLUGIN

    style WA fill:#25D366
    style FB fill:#0084FF
    style SENDER fill:#e1f5fe
    style MS fill:#e1f5fe
    style CA fill:#e1f5fe
    style CONV fill:#f3e5f5
    style SF fill:#fff3e0
    style TR fill:#fff3e0
    style FLEX fill:#fce4ec
    style PLUGIN fill:#fce4ec
```

## Getting Started

1. **Choose your channel**: [WhatsApp](/end-users/administrators/channels/social-media/whatsapp) or [Facebook Messenger](/end-users/administrators/channels/social-media/facebook-messenger)
2. **Follow the setup guide**: Each guide walks through every step from account setup to testing
3. **Test end-to-end**: Send a test message and verify it appears in Flex
4. **Train your team**: Ensure agents know how to handle social media tasks

---

*Social media channels extend your organization's reach to where your community already communicates. Follow the channel-specific guides to get started.*
