---
sidebar_label: "Conversation Transfer API"
title: "Conversation Transfer Implementation"
---

# Conversation Transfer Implementation

Complete technical guide for implementing and customizing conversation transfer functionality in ConnieRTC.

## 🏗️ Architecture Overview

The conversation transfer system uses ConnieRTC's Conversation Based Messaging (CBM) with the Interactions API to orchestrate transfers between agents and maintain conversation state.

### Core Components
- **ConnieRTC Interactions API** - Manages conversation participants
- **TaskRouter Workflows** - Routes transfer requests to appropriate agents/queues
- **Plugin Frontend** - UI components for transfer interface
- **Serverless Functions** - Backend logic for transfer processing

## ⚙️ Configuration

### Feature Configuration
```javascript
// plugin-connie-template/src/feature-library/conversation-transfer/config.js
export default {
  enabled: true,
  cold_transfer: true,        // Enable immediate transfers
  multi_participant: true     // Enable warm transfers with collaboration
}
```

### Environment Variables
```bash
# Required for transfer workflow routing
TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID=WWxxx

# Optional: Custom transfer timeout (seconds)
CONVERSATION_TRANSFER_TIMEOUT=300
```

### NSS Production Implementation Notes

**CRITICAL:** Each CBO requires a unique workflow SID. The workflow SID is account-specific and cannot be shared between CBOs.

**Workflow SID Discovery Process:**
1. Login to Twilio Console for the specific CBO account
2. Navigate to TaskRouter → Workflows
3. Look for workflow named "Chat Transfer" (exact name may vary by CBO)
4. Ensure workflow status is "Active"
5. Copy Workflow SID (format: WWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)
6. Set environment variable: `TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID=WWxxx`

**Common Production Issues (NSS VALIDATED):**
- **"TaskRouter error: Bad Request"** - Primary cause: incorrect workflow SID configuration (most common issue)
- **Silent transfer failures** - Often caused by inactive workflow status in TaskRouter console
- **Cross-CBO transfer failures** - Each account needs its own unique workflow configuration
- **Environment variable persistence** - SIDs may be reset during deployments
- **Workflow SID format validation** - Must be exactly 34 characters starting with WW

## 🔧 TaskRouter Workflow Setup

### Workflow Configuration
Create a TaskRouter workflow named "Chat Transfer" with the following logic:

```json
{
  "task_routing": {
    "filters": [
      {
        "expression": "transferTargetType == 'worker'",
        "targets": [
          {
            "queue": "everyone",
            "known_worker_sid": "{{task.transferTargetSid}}"
          }
        ]
      },
      {
        "expression": "transferTargetType == 'queue'",
        "targets": [
          {
            "queue": "{{task.transferQueueName}}"
          }
        ]
      }
    ]
  }
}
```

### Task Attributes
The plugin sets these attributes on transfer tasks:

```javascript
{
  transferTargetType: 'worker' | 'queue',
  transferTargetSid: 'WKxxx',              // For worker transfers
  transferQueueName: 'support',            // For queue transfers
  workerSidsInConversation: ['WK123', 'WK456'], // Current participants
  originalConversationSid: 'CHxxx',        // Source conversation
  transferReason: 'escalation',            // Optional transfer reason
  transferNotes: 'Customer needs billing help' // Optional notes
}
```

## 🛠️ API Implementation

### Transfer Request Endpoint

```javascript
// serverless/functions/conversation-transfer/transfer-conversation.js
exports.handler = async (context, event, callback) => {
  const {
    conversationSid,
    targetType,      // 'worker' or 'queue' 
    targetSid,       // Worker SID or Queue name
    transferReason,
    transferNotes
  } = event;

  try {
    // Create interaction invite
    const invite = await client.flexApi.v1
      .interaction(conversationSid)
      .channels('chat')
      .invites
      .create({
        routing: {
          properties: {
            task_channel_unique_name: 'chat',
            workspace_sid: context.TWILIO_WORKSPACE_SID,
            workflow_sid: context.TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID,
            attributes: JSON.stringify({
              transferTargetType: targetType,
              transferTargetSid: targetSid,
              transferQueueName: targetType === 'queue' ? targetSid : undefined,
              transferReason,
              transferNotes,
              workerSidsInConversation: getCurrentParticipants(conversationSid)
            })
          }
        }
      });

    callback(null, {
      success: true,
      inviteSid: invite.sid
    });
  } catch (error) {
    callback(error);
  }
};
```

### Remove Agent from Conversation

```javascript
// Remove transferring agent after successful invite
const removeParticipant = async (conversationSid, participantSid) => {
  await client.flexApi.v1
    .interaction(conversationSid)
    .channels('chat')
    .participants(participantSid)
    .remove();
};
```

## 🎨 Frontend Implementation

### Transfer Button Component

```jsx
// src/components/TransferButton/TransferButton.jsx
import React, { useState } from 'react';
import { Button, Menu } from '@twilio-paste/core';

const TransferButton = ({ task, onTransfer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [transferType, setTransferType] = useState('cold');

  const handleTransfer = async (target) => {
    try {
      await onTransfer({
        conversationSid: task.attributes.conversationSid,
        targetType: target.type,
        targetSid: target.sid,
        transferType
      });
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  return (
    <Menu 
      button={
        <Button variant="secondary" size="small">
          Transfer
        </Button>
      }
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <Menu.Group label="Transfer Type">
        <Menu.Item onClick={() => setTransferType('cold')}>
          Cold Transfer
        </Menu.Item>
        <Menu.Item onClick={() => setTransferType('warm')}>
          Warm Transfer
        </Menu.Item>
      </Menu.Group>
      <Menu.Separator />
      <Menu.Group label="Agents">
        {availableAgents.map(agent => (
          <Menu.Item 
            key={agent.sid}
            onClick={() => handleTransfer({
              type: 'worker',
              sid: agent.sid,
              name: agent.friendlyName
            })}
          >
            {agent.friendlyName}
          </Menu.Item>
        ))}
      </Menu.Group>
      <Menu.Group label="Queues">
        {availableQueues.map(queue => (
          <Menu.Item
            key={queue.sid}
            onClick={() => handleTransfer({
              type: 'queue', 
              sid: queue.friendlyName,
              name: queue.friendlyName
            })}
          >
            {queue.friendlyName}
          </Menu.Item>
        ))}
      </Menu.Group>
    </Menu>
  );
};
```

### Multi-Participant Panel

```jsx
// src/components/ParticipantsPanel/ParticipantsPanel.jsx
import React from 'react';
import { Box, Text, Button } from '@twilio-paste/core';

const ParticipantsPanel = ({ participants, onInvite, onRemove }) => {
  return (
    <Box padding="space40">
      <Text as="h3" fontSize="fontSize30">
        Conversation Participants
      </Text>
      
      {participants.map(participant => (
        <Box 
          key={participant.sid}
          display="flex" 
          justifyContent="space-between"
          alignItems="center"
          paddingY="space30"
        >
          <Text>{participant.friendlyName}</Text>
          {participant.type === 'agent' && (
            <Button 
              variant="destructive_link"
              size="small"
              onClick={() => onRemove(participant.sid)}
            >
              Remove
            </Button>
          )}
        </Box>
      ))}
      
      <Button 
        variant="primary"
        onClick={onInvite}
      >
        Invite Agent
      </Button>
    </Box>
  );
};
```

## 🔌 ConnieRTC Hooks Integration

### Actions Hook
```javascript
// src/feature-library/conversation-transfer/hooks/actions.js
export const conversationTransferActions = (manager) => {
  manager.strings = {
    ...manager.strings,
    TransferButton: 'Transfer',
    ColdTransfer: 'Transfer Now',
    WarmTransfer: 'Invite to Join'
  };

  // Add custom transfer action
  manager.workerClient.on('reservationCreated', (reservation) => {
    if (reservation.task.attributes.transferTargetType) {
      // This is a transfer task - handle appropriately
      handleTransferReservation(reservation);
    }
  });
};
```

### Component Hook
```javascript
// src/feature-library/conversation-transfer/hooks/components.js
export const conversationTransferComponents = (manager) => {
  // Add transfer button to task header
  manager.componentRegistry.add(
    'TaskCanvasHeader',
    <TransferButton key="transfer-button" />,
    {
      sortOrder: 1,
      if: (props) => props.task?.taskChannelUniqueName === 'chat'
    }
  );

  // Add participants panel to chat interface  
  manager.componentRegistry.add(
    'TaskCanvasTabs',
    <Tab key="participants-tab" label="Participants">
      <ParticipantsPanel />
    </Tab>,
    {
      if: (props) => props.task?.taskChannelUniqueName === 'chat'
    }
  );
};
```

## 🐛 Error Handling

### Common Error Scenarios

```javascript
// Transfer timeout handling
const TRANSFER_TIMEOUT = 300000; // 5 minutes

const handleTransferTimeout = (inviteSid) => {
  setTimeout(async () => {
    try {
      // Cancel the invite if still pending
      await cancelInvite(inviteSid);
      showErrorNotification('Transfer timeout - please try again');
    } catch (error) {
      console.error('Failed to cancel expired transfer:', error);
    }
  }, TRANSFER_TIMEOUT);
};

// Agent unavailable handling
const handleTransferFailure = (error, targetAgent) => {
  if (error.code === 20001) {
    showErrorNotification(`${targetAgent} is not available. Try transferring to a queue instead.`);
  } else if (error.code === 20404) {
    showErrorNotification('Transfer target not found. Please refresh and try again.');
  } else {
    showErrorNotification('Transfer failed. Please contact support if this continues.');
  }
};
```

### Logging and Monitoring

```javascript
// Enhanced logging for transfer events
const logTransferEvent = (eventType, data) => {
  console.log(`[ConversationTransfer] ${eventType}:`, {
    timestamp: new Date().toISOString(),
    conversationSid: data.conversationSid,
    fromAgent: data.fromAgent,
    toTarget: data.toTarget,
    transferType: data.transferType,
    ...data
  });

  // Send to analytics if configured
  if (window.analytics) {
    window.analytics.track('Conversation Transfer', {
      event_type: eventType,
      ...data
    });
  }
};
```

## 🚀 Advanced Customizations

### Custom Transfer Reasons

```javascript
// Add dropdown for transfer reasons
const transferReasons = [
  { value: 'language', label: 'Language Preference' },
  { value: 'expertise', label: 'Technical Expertise Needed' },
  { value: 'escalation', label: 'Supervisor Escalation' },
  { value: 'billing', label: 'Billing Inquiry' },
  { value: 'complaint', label: 'Service Complaint' }
];

const TransferWithReason = ({ onTransfer }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onTransfer({
      transferReason: selectedReason,
      transferNotes: notes,
      // ... other transfer parameters
    });
  };
};
```

### Multi-Account Transfer Support

```javascript
// Cross-account transfer configuration
const getTransferWorkflow = (fromAccount, toAccount) => {
  if (fromAccount === toAccount) {
    return context.TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID;
  } else {
    return context[`TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID_${toAccount.toUpperCase()}`];
  }
};
```

## 🧪 Testing

### Unit Tests
```javascript
// __tests__/conversation-transfer.test.js
describe('Conversation Transfer', () => {
  test('should create transfer invite with correct attributes', async () => {
    const mockTransfer = {
      conversationSid: 'CHxxx',
      targetType: 'worker',
      targetSid: 'WKxxx',
      transferReason: 'expertise'
    };

    const result = await transferConversation(mockTransfer);
    
    expect(result.success).toBe(true);
    expect(result.inviteSid).toBeDefined();
  });

  test('should handle transfer failures gracefully', async () => {
    const mockTransfer = {
      conversationSid: 'CHxxx',
      targetType: 'worker', 
      targetSid: 'INVALID'
    };

    await expect(transferConversation(mockTransfer))
      .rejects.toThrow('Invalid target worker');
  });
});
```

### Integration Testing
```javascript
// Test full transfer flow
const testTransferFlow = async () => {
  // 1. Create test conversation
  const conversation = await createTestConversation();
  
  // 2. Add test participants
  await addParticipant(conversation.sid, 'agent1');
  await addParticipant(conversation.sid, 'customer1');
  
  // 3. Initiate transfer
  const transfer = await transferConversation({
    conversationSid: conversation.sid,
    targetType: 'worker',
    targetSid: 'agent2'
  });
  
  // 4. Verify transfer state
  expect(transfer.success).toBe(true);
  
  // 5. Accept transfer as target agent
  await acceptTransfer(transfer.inviteSid);
  
  // 6. Verify final participant state
  const finalParticipants = await getParticipants(conversation.sid);
  expect(finalParticipants).toContain('agent2');
  expect(finalParticipants).not.toContain('agent1');
};
```

## 📊 Performance Optimization

### Caching Strategies
```javascript
// Cache available agents/queues to reduce API calls
const agentCache = new Map();
const CACHE_DURATION = 60000; // 1 minute

const getAvailableAgents = async () => {
  const cacheKey = 'available_agents';
  const cached = agentCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const agents = await fetchAvailableAgents();
  agentCache.set(cacheKey, {
    data: agents,
    timestamp: Date.now()
  });
  
  return agents;
};
```

### Bundle Size Optimization
```javascript
// Lazy load transfer components
const TransferButton = React.lazy(() => 
  import('./components/TransferButton/TransferButton')
);

const ParticipantsPanel = React.lazy(() =>
  import('./components/ParticipantsPanel/ParticipantsPanel')
);
```

## 🔐 Security Considerations

### Input Validation
```javascript
// Validate transfer parameters
const validateTransferRequest = (request) => {
  const { conversationSid, targetType, targetSid } = request;
  
  if (!conversationSid || !conversationSid.startsWith('CH')) {
    throw new Error('Invalid conversation SID');
  }
  
  if (!['worker', 'queue'].includes(targetType)) {
    throw new Error('Invalid target type');
  }
  
  if (targetType === 'worker' && !targetSid.startsWith('WK')) {
    throw new Error('Invalid worker SID');
  }
  
  return true;
};
```

### Permission Checks
```javascript
// Verify agent can transfer to target
const canTransferToTarget = async (fromWorker, targetType, targetSid) => {
  const permissions = await getWorkerPermissions(fromWorker);
  
  if (targetType === 'queue') {
    return permissions.queues.includes(targetSid);
  } else {
    return permissions.workers.includes(targetSid);
  }
};
```

## 🚀 Production Deployment Guide

### Pre-Deployment Checklist
```bash
# 1. Verify workflow SID configuration
echo $TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID
# Should return: WWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 2. Test workflow exists and is active in Twilio Console
# TaskRouter → Workflows → "Chat Transfer" → Status: Active

# 3. Validate workflow JSON configuration
# Ensure routing logic includes both worker and queue transfer types

# 4. Test in staging environment
# - Cold transfers (agent-to-agent, agent-to-queue)
# - Warm transfers (multi-participant)
# - Error handling scenarios
```

### Deployment Validation Process
```javascript
// Post-deployment validation script
const validateTransferDeployment = async () => {
  try {
    // Test workflow SID configuration
    const workflowTest = await fetch('/conversation-transfer/test-workflow');
    console.log('Workflow validation:', workflowTest.success);
    
    // Test transfer functionality
    const transferTest = await initiateTestTransfer();
    console.log('Transfer test:', transferTest.success);
    
    // Monitor for errors in first 15 minutes
    setTimeout(checkErrorRates, 900000); // 15 minutes
    
  } catch (error) {
    console.error('Deployment validation failed:', error);
    // Immediate rollback required
  }
};
```

### NSS Production Learnings

**Issue Resolution Timeline (NSS Validated):**
- **Workflow SID issues** - 5-10 minutes once identified (most common resolution)
- **Environment variable updates** - 2-5 minutes to update + service restart time
- **Routing configuration** - 10-15 minutes depending on complexity
- **Permission issues** - 5-10 minutes for admin access updates
- **Workflow status changes** - 1-2 minutes to activate in TaskRouter console
- **Cross-account configuration** - 15-30 minutes for multi-CBO setups

**Success Metrics (NSS Production Validated):**
- Transfer success rate >95% within first 15 minutes of deployment
- Zero "TaskRouter error: Bad Request" messages
- Transfer completion time under 10 seconds for cold transfers
- Agent notification delivery under 5 seconds
- TaskRouter dashboard showing successful task creation and routing
- Conversation history preservation 100%

**Rollback Triggers (NSS Experience):**
- Transfer success rate below 90% for more than 15 minutes
- ANY "TaskRouter error: Bad Request" messages appearing consistently
- Multiple agent reports of consistent failures across CBOs
- Client satisfaction impact detected through monitoring
- TaskRouter error rate >5% in dashboard
- Environment variable configuration corruption detected

### Multi-Account Deployment
```javascript
// Environment variable management for multiple CBOs
const getWorkflowSid = (cboAccount) => {
  const envVar = `TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID_${cboAccount.toUpperCase()}`;
  return process.env[envVar] || process.env.TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID;
};

// Example usage
const nssWorkflowSid = getWorkflowSid('nss');
const clientAWorkflowSid = getWorkflowSid('clienta');
```

## 📞 Support and Troubleshooting

### Common Issues (NSS Production Experience)
1. **"TaskRouter error: Bad Request"** - MOST COMMON - incorrect or missing workflow SID configuration
2. **Transfers not routing correctly** - Check TaskRouter workflow configuration and active status
3. **UI components not appearing** - Verify plugin hooks are registered and feature is enabled
4. **Timeouts occurring** - Adjust timeout settings in environment variables
5. **Performance issues** - Implement caching and lazy loading
6. **Silent failures** - Workflow exists but is inactive in TaskRouter console
7. **Cross-account routing failures** - Workflow SID sharing between CBOs (not supported)

### Production Issue Response
```javascript
// Emergency transfer disabling (if needed)
const disableTransfers = () => {
  localStorage.setItem('connie_transfers_disabled', 'true');
  // Reload ConnieRTC interface to apply
  window.location.reload();
};

// Re-enable after fix
const enableTransfers = () => {
  localStorage.removeItem('connie_transfers_disabled');
  window.location.reload();
};
```

### Debug Mode
```javascript
// Enable debug logging
localStorage.setItem('connie_transfer_debug', 'true');

// Debug information will appear in browser console
if (localStorage.getItem('connie_transfer_debug')) {
  console.log('[DEBUG] Transfer initiated:', transferData);
}

// Enhanced debugging for production issues
const debugTransferIssue = (conversationSid, error) => {
  console.group(`Transfer Debug: ${conversationSid}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Workflow SID:', process.env.TWILIO_FLEX_CHAT_TRANSFER_WORKFLOW_SID);
  console.log('Error details:', error);
  console.log('Timestamp:', new Date().toISOString());
  console.groupEnd();
};
```

### Getting Help
- **Production issues:** Contact Connie Support immediately with conversation SID and error details
- **Feature requests:** Submit via GitHub issues
- **Integration help:** Consult Platform Developer community forums
- **Workflow configuration:** Provide Twilio Console access for faster resolution