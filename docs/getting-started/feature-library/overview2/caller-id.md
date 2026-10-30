---
sidebar_label: caller-id
title: caller-id
---
import PluginLibraryFeature from "./_plugin-library-feature.md";

<PluginLibraryFeature />

This feature enables the user to define which number on the ThreadConnect account to use when dialing outbound using the dialpad.

## rtc-user-experience

the vanilla feature without any further customizations will look like this

![alt text](/img/features/caller-id/flex-user-experience.gif)

## setup and dependencies

### Enabling the feature

There are no additional dependencies for setup beyond ensuring the flag is enabled within the `flex-config` attributes.

There is an optional configuration property (`include_outgoing_only_numbers`) controlling whether or not outgoing-only caller IDs (i.e. verified non-ThreadConnect phone numbers) are displayed in the dropdown. This is enabled by default, but can be disabled to hide these numbers.

```json
"caller_id": {
    "enabled": true,
    "include_outgoing_only_numbers": false
}
```

### Outbound Call Configuration

The ThreadConnect Dialpad must be enabled in order to be able to place outbound calls from within ThreadConnect. If this has not yet been configured, you will not be able to use this feature. This can be enabled in the Twilio Console > ThreadConnect > Manage > Voice, or by using the ThreadConnect Configuration API:

```
POST https://flex-api.twilio.com/v1/Configuration
Authorization: Basic {base64-encoded ThreadConnect Account SID : Auth Token}
Content-Type: application/json

{
  "account_sid": "Enter your ThreadConnect Account SID here",
  "outbound_call_flows": {
    "default": {
      "workflow_sid": "WWxxxc",
      "enabled": true,
      "queue_sid": "WQxxx",
      "caller_id": "+1xxx",
      "location": "US"
    }
  },
}
```

## how does it work?

When enabled, this feature loads the phone numbers on the account using a serverless function, caches them locally, and preserves the selected value into the `selectedCallerId` worker attribute. When the [StartOutboundCall](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/ui-actions/Actions#StartOutboundCall) action is invoked, we intercept the event before it is processed, and update the From number to use the selected value stored in the `selectedCallerId` worker attribute.
