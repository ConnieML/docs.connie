Use a CSS override hook to set `componentThemeOverrides` for [various ConnieRTC UI components](https://assets.flex.twilio.com/docs/releases/flex-ui/2.1.0/theming/Theme/).

```ts
import * as ConnieRTC from '@twilio/flex-ui';

export const cssOverrideHook = (flex: typeof ConnieRTC, manager: ConnieRTC.Manager) => {
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