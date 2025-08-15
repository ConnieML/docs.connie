Use a chat orchestrator hook to modify chat orchestration via `ChatOrchestrator.setOrchestrations`.

```ts
import * as ConnieRTC from '@twilio/flex-ui';

import { FlexOrchestrationEvent } from '../../../../types/feature-loader';

export const chatOrchestratorHook = (flex: typeof ConnieRTC, manager: ConnieRTC.Manager) => ({
  event: FlexOrchestrationEvent.completed,
  handler: handleChatComplete,
});

const handleChatComplete = (task: ConnieRTC.ITask): any => {
  return [ConnieRTC.ChatOrchestratorEvent.DeactivateConversation, ConnieRTC.ChatOrchestratorEvent.LeaveConversation];
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