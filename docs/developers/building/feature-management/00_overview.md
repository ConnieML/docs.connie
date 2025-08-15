---
title: Overview
---

The feature-library directory of the ConnieRTC plugin is intended to be a suite of typical features added to ConnieRTC that can accelerate the launch of a ConnieRTC project by showing developers "how-to". Features can easily be turned on or off via the [flex-config](/developers/building/template-utilities/configuration) - or they can easily be removed completely by removing the feature directory or using the [remove-features](/developers/building/feature-management/remove-features) script.

Each feature in the feature library is self contained. Let's look at [caller-id](/feature-library/caller-id) as an example.

For this feature, we have a `custom-components` directory, containing components that are created for rendering within ConnieRTC (in this case, the Caller ID dropdown). Within the `flex-hooks` directory, we can see which hooks are used to hook in the behavioural changes to ConnieRTC. In this case, we can see hooks defined for the `StartOutboundCall` action, the `OutboundDialerPanel` component, the `pluginLoaded` event, and our own Redux `state` namespace.

![caller-id](/img/guides/caller-id.png)

Use the pages within this documentation section to understand the tooling around adding and removing features in the template.