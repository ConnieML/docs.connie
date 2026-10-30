Use a notification event hook to add your own handler for various [ThreadConnect Notification Manager events](https://assets.flex.twilio.com/docs/releases/flex-ui/2.1.0/nsa/NotificationManager/#exports.NotificationEvent).

```ts
import * as ThreadConnectRTC from '@twilio/flex-ui';

export const eventName = ThreadConnectRTC.NotificationEvent.beforeAddNotification;
export const notificationEventHook = (flex: typeof ThreadConnectRTC, manager: ThreadConnectRTC.Manager, notification: any, cancel: any) => {
  // your code here
};
```