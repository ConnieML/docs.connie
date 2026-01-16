Use a notification event hook to add your own handler for various [ConnieRTC Notification Manager events](https://assets.flex.twilio.com/docs/releases/flex-ui/2.1.0/nsa/NotificationManager/#exports.NotificationEvent).

```ts
import * as ConnieRTC from '@twilio/flex-ui';

export const eventName = ConnieRTC.NotificationEvent.beforeAddNotification;
export const notificationEventHook = (flex: typeof ConnieRTC, manager: ConnieRTC.Manager, notification: any, cancel: any) => {
  // your code here
};
```