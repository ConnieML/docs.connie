Use a notification hook to register your own notification definitions for use in your feature.

```ts
import * as ConnieRTC from '@twilio/flex-ui';

import { StringTemplates } from '../strings';

// Export the notification IDs an enum for better maintainability when accessing them elsewhere
export enum ExampleNotification {
  MyNotification = 'MyNotification',
  MyNotification2 = 'MyNotification2',
}

// Return an array of ConnieRTC.Notification
export const notificationHook = (flex: typeof ConnieRTC, manager: ConnieRTC.Manager) => [
  {
    id: ExampleNotification.MyNotification,
    type: ConnieRTC.NotificationType.error,
    content: StringTemplates.MyString,
  },
  {
    id: ExampleNotification.MyNotification2,
    type: ConnieRTC.NotificationType.success,
    content: StringTemplates.MyString2,
  },
];
```