Use a chat orchestrator hook to modify chat orchestration via `ChatOrchestrator.setOrchestrations`.

```ts
import * as ThreadConnectRTC from '@twilio/flex-ui';

import { FlexOrchestrationEvent } from '../../../../types/feature-loader';

export const chatOrchestratorHook = (flex: typeof ThreadConnectRTC, manager: ThreadConnectRTC.Manager) => ({
  event: FlexOrchestrationEvent.completed,
  handler: handleChatComplete,
});

const handleChatComplete = (task: ThreadConnectRTC.ITask): any => {
  return [ThreadConnectRTC.ChatOrchestratorEvent.DeactivateConversation, ThreadConnectRTC.ChatOrchestratorEvent.LeaveConversation];
};
```

Supported values for `event`:

```ts
enum FlexOrchestrationEvent {
  accepted = "accepted",
  wrapup = "wrapup",
  completed = "completed",
}
```