Use a CSS override hook to set `componentThemeOverrides` for [various ThreadConnect UI components](https://assets.flex.twilio.com/docs/releases/flex-ui/2.1.0/theming/Theme/).

```ts
import * as ThreadConnectRTC from '@twilio/flex-ui';

export const cssOverrideHook = (flex: typeof ThreadConnectRTC, manager: ThreadConnectRTC.Manager) => {
  return {
    MainHeader: {
      Container: {
        '.Twilio-MainHeader-end': {
          "[data-paste-element='MENU']": {
            overflowY: 'scroll',
            maxHeight: '90vh',
          },
        },
      },
    },
  };
};
```