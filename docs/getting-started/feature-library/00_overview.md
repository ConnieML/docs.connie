---
sidebar_label: Overview
sidebar_position: 0
title: Feature Overview
hide_table_of_contents: true
---
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Empowering Nonprofits to Serve Their Communities

**ConnieRTC** is a comprehensive communication platform designed specifically for nonprofits and community-based organizations. Our features help you **Connect** with your clients, **Engage** your community, and **Deliver** critical services efficiently.

## Feature Categories

Every ConnieRTC feature is designed to support one of three core objectives:

- **🔗 Connect** - Establish and maintain communication channels with those you serve
- **💬 Engage** - Build meaningful interactions and relationships with your community  
- **📦 Deliver** - Provide programs and services effectively to people in need

## Feature Availability

The following tables show all available features organized by communication channel. The **Availability** column indicates each feature's development status:

- ✅ **Production Ready** - Fully tested and ready for deployment
- 🚧 **Beta** - Available for testing with limited support
- 🔬 **Experimental** - Proof of concept requiring customization
- 📅 **Roadmap** - Planned for future release

<Tabs queryString="type">
<TabItem value="voice" label="Voice" default>

| Feature                                                            | Description                                                                                                                                                             | Availability |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| [Unified Channel Manager](unified-channel-manager)                 | _seamlessly manage all communication channels from a single, intuitive interface - handle voice, SMS, chat, email, and social from one unified agent desktop_           | ✅ |
| [Workflow Manager](workflow-manager)                               | _automate complex business processes and client journeys with visual workflow design - create custom routing, escalations, and automated responses_                     | ✅ |
| [Admin UI](overview2/admin-ui)                                               | _adds a feature settings view to ConnieRTC for customizing the template_ <br/> **note by default this is disabled locally as this feature is only intended for hosted ConnieRTC.* |   |
| [Agent Automation](overview2/agent-automation)                               | _adds auto accept and auto wrapup behaviors to agent desktop_                                                                                                           | ✅ |
| [Attribute Viewer](overview2/attribute-viewer)                               | _easily view task and worker attributes within ConnieRTC_                                                                                                                    |   |
| [Canned Responses](overview2/canned-responses)                               | _provide agents with pre-canned chat responses_                                                                                                                         | ✅ |
| [Callbacks and Voicemail](overview2/callback-and-voicemail)                  | _introduce support for callback and voicemail tasks_                                                                                                                    |   |
| [Caller ID](overview2/caller-id)                                             | _provide agents with means to select their caller id when dialing out_                                                                                                  | ✅ |
| [Conference (external)](overview2/conference)                                | _provide agents the ability to conference in external numbers_                                                                                                          | ✅ |
| [Contacts](overview2/contacts)                                               | _adds contact directories and provides a list of recent contacts_                                                                                                       |   |
| [Conversation Transfer](overview2/conversation-transfer)                     | _introduce conversation-based messaging transfer functionality for agents_                                                                                              | ✅ |
| [Custom Transfer Directory](overview2/custom-transfer-directory)             | _customize the agent and queue transfer directories_                                                                                                                    | ✅ |
| [Datadog Log Integration](overview2/datadog-log-integration)                 | _forward logs emitted by the template to datadog_                                                                                                                       |   |
| [Dispositions](overview2/dispositions)                                       | _provide agents the ability to select a disposition/wrap-up code and enter notes_                                                                                       | ✅ |
| [Emoji Picker](overview2/emoji-picker)                                       | _adds an emoji picker for messaging tasks_                                                                                                                              |   |
| [Enhanced CRM Container](overview2/enhanced-crm-container)                   | _optimize the CRM container experience_                                                                                                                                 |   |
| [Hang Up By Reporting](overview2/hang-up-by)                                 | _populates the Hang Up By and Destination attributes in ConnieRTC Insights_                                                                                                  | ✅ |
| [Inline Media](overview2/inline-media)                                       | _render chat message attachments inline_                                                                                                                                |   |
| [Internal Call (Agent to Agent)](overview2/internal-call)                    | _provide agents the ability to dial each other_                                                                                                                         | ✅ |
| [Keyboard Shortcuts](overview2/keyboard-shortcuts)                           | _configure default and custom keyboard shortcuts for Flex_                                                                                                              |   |
| [Park Interaction](overview2/park-interaction)                               | _provide agents the ability to park interactions, preserving conversation history_                                                                                      |   |
| [Pause Recording](overview2/pause-recording)                                 | _provide agents the ability to temporarily pause and resume call recording_                                                                                             | ✅ |
| [Schedule Manager](overview2/schedule-manager)                               | _a flexible, robust, and scalable way to manage open and closed hours for Connie ConnieRTC applications_                                                                     | ✅ |
| [Supervisor Barge & Coach](overview2/supervisor-barge-coach)                 | _introduce advanced supervisor barge and coach features_                                                                                                                | ✅ |
| [Supervisor Capacity](overview2/supervisor-capacity)                         | _allow supervisors to update worker capacity configuration within ConnieRTC_                                                                                                 | ✅ |
| [Supervisor Complete Reservation](overview2/supervisor-complete-reservation) | _allows supervisor to remotely complete agent tasks_                                                                                                                    | ✅ |
| [Teams View Enhancements](overview2/teams-view-enhancements)                 | _adds optional columns (Team, Dept, Location, Skills) to the Workers Table. <br/> enable task highlighting based on task age_                                           |   |
| [Teams View Filters](overview2/teams-view-filters)                           | _adds additional filtering options to the supervisor teams view_                                                                                                        |   |
| [Worker Canvas Tabs](overview2/worker-canvas-tabs)                           | _consolidates the worker canvas sections into tabs_                                                                                                                     |   |
| [Worker Details](overview2/worker-details)                                   | _view or update worker attributes_                                                                                                                                      |   |

---

</TabItem>
<TabItem value="sms" label="SMS/Text">

| Feature                                                      | Description                                                                                                                                                                | Availability |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| [Activity Reservation Handler](overview2/activity-reservation-handler) | _synchronize agent activities to reservation states_                                                                                                                       | ✅ |
| [Activity Skill Filter](overview2/activity-skill-filter)               | _manage visibility for activities based on agent skills_                                                                                                                   | ✅ |
| [Branding](overview2/branding)                                         | _customize the ConnieRTC interface for your brand_                                                                                                                              |   |
| [Chat Transfer](overview2/chat-transfer)                               | _introduce programmable chat transfer functionality for agents_                                                                                                            |   |
| [Conditional Recording](overview2/conditional-recording)               | _prevent recording certain calls based on task attributes or queue when using the native recording functionality_                                                          |   |
| [Custom Hold Music](overview2/custom-hold-music)                       | _customize the experience when an agent places a call on hold_                                                                                                             |   |
| [Device Manager](overview2/device-manager)                             | _provide agents the ability to select the audio output device_                                                                                                             |   |
| [Dual Channel Recording](overview2/dual-channel-recording)             | _automatically record both inbound and outbound calls in dual channel_                                                                                                     | ✅ |
| [Force Conference Region](overview2/force-conference-region)           | _force conference creation to a specific region_                                                                                                                           |   |
| [Localization](overview2/localization)                                 | _adds the ability to view ConnieRTC in a different language_                                                                                                                    |   |
| [Metrics Data Tiles](overview2/metrics-data-tiles)                     | _add custom Data Tiles with real-time channel metrics (Task Counts, SLA%) to the Queues View.  <br/> add custom Task and Activity Summary by team tiles to the Teams View_ |   |
| [Omni Channel Management](overview2/omni-channel-capacity-management)  | _method for mixing chat and voice channels_                                                                                                                                |   |
| [Queues Stats Metrics](overview2/queues-stats-metrics)                 | _add custom metrics columns to the Queues View_                                                                                                                            |   |
| [Ring Notification](overview2/ring-notification)                       | _plays a ringtone sound for incoming tasks_                                                                                                                                |   |
| [Scrollable Activities](overview2/scrollable-activities)               | _allow the scrolling of the activities list_                                                                                                                               |   |
| [SIP Support](overview2/sip-support)                                   | _adds call control functionality when using a non-WebRTC phone_                                                                                                            |   |

</TabItem>
<TabItem value="webchat" label="Web Chat">

| Feature                                                      | Description                                                                                                                                                                | Availability |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| [Canned Responses](overview2/canned-responses)                         | _provide agents with pre-canned chat responses_                                                                                                                           | ✅ |
| [Chat Transfer](overview2/chat-transfer)                               | _introduce chat transfer functionality for agents_                                                                                                                         | ✅ |
| [Conversation Transfer](overview2/conversation-transfer)               | _introduce conversation-based messaging transfer functionality for agents_                                                                                                 | ✅ |

</TabItem>
<TabItem value="social" label="Social Media">

| Feature                                                      | Description                                                                                                                                                                | Availability |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| [Conversation Transfer](overview2/conversation-transfer)               | _introduce conversation-based messaging transfer functionality for agents_                                                                                                 | ✅ |

</TabItem>
<TabItem value="email" label="Email">

| Feature                                                      | Description                                                                                                                                                                | Availability |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| [Conversation Transfer](overview2/conversation-transfer)               | _introduce conversation-based messaging transfer functionality for agents_                                                                                                 | ✅ |

</TabItem>
<TabItem value="fax" label="Fax">

| Feature                                                      | Description                                                                                                                                                                | Availability |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| [Conversation Transfer](overview2/conversation-transfer)               | _introduce conversation-based messaging transfer functionality for agents_                                                                                                 | ✅ |

</TabItem>
<TabItem value="experimental" label="Experimental features">

:::caution Caution

These features will require modification for usage in a production setting. They are intended to serve as starting points or examples to jump-start your use case.

::: 

| Feature                                              | Description                                                                                         | Availability |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------ |
| [Chat-to-Video Escalation](chat-to-video-escalation) | _provide agents ability to elevate a chat conversation to a video conversation with screen sharing_ | 🔬 |
| [Multi-call](multi-call)                             | _allow agents to receive a transferred call while already on a call_                                | 🔬 |

</TabItem>
</Tabs>
