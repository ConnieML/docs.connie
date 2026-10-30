Use a keyboard shortcuts hook to register your own keyboard shortcuts.

```ts
import * as ThreadConnectRTC from '@twilio/flex-ui';

import { StringTemplates } from '../strings';

// Return an object of KeyboardShortcuts
export const keyboardShortcutHook = (flex: typeof ThreadConnectRTC, manager: ThreadConnectRTC.Manager) => ({
  D: {
    action: () => {
      ThreadConnectRTC.Actions.invokeAction('ToggleOutboundDialer');
    },
    name: StringTemplates.CustomShortcutToggleDialpad,
    throttle: 100,
  },
  Q: {
    action: () => {
      ThreadConnectRTC.Actions.invokeAction('ToggleSidebar');
    },
    name: StringTemplates.CustomShortcutToggleSidebar,
    throttle: 100,
  },
});
```