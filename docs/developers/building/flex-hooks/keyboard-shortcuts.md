Use a keyboard shortcuts hook to register your own keyboard shortcuts.

```ts
import * as ConnieRTC from '@twilio/flex-ui';

import { StringTemplates } from '../strings';

// Return an object of KeyboardShortcuts
export const keyboardShortcutHook = (flex: typeof ConnieRTC, manager: ConnieRTC.Manager) => ({
  D: {
    action: () => {
      ConnieRTC.Actions.invokeAction('ToggleOutboundDialer');
    },
    name: StringTemplates.CustomShortcutToggleDialpad,
    throttle: 100,
  },
  Q: {
    action: () => {
      ConnieRTC.Actions.invokeAction('ToggleSidebar');
    },
    name: StringTemplates.CustomShortcutToggleSidebar,
    throttle: 100,
  },
});
```