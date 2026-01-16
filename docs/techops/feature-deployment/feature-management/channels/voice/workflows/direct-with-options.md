---
sidebar_label: Connie Voice Direct + Wait Experience Setup
sidebar_position: 3
title: "Connie Voice Direct + Wait Experience Setup"
---

# Connie Voice Direct + Wait Experience Setup

**Connie Voice Direct + Wait Experience** provides the most advanced options menu where callers can choose callback or voicemail while retaining their queue position. This creates three possible outcomes for callers.

## Caller Experience & Three Outcomes

When callers use this experience, they have three possible outcomes:

### 1. Accept Callback/Voicemail Prompt
- Caller dials your number
- Call queued with hold music
- Caller presses * for options and selects either:
  - **Callback request**: Keeps place in queue, receives callback later
  - **Voicemail**: Leaves message instead of waiting
- **Result**: Task updated to callback/voicemail type

### 2. Hang Up Without Action  
- Caller waits in queue but hangs up before agent answers
- No interaction with options menu
- **Result**: Abandoned call

### 3. Stay in Queue Until Agent Answers
- Caller waits through hold music and options
- Agent becomes available and answers call
- **Result**: Normal call handling

## When to Use
- Busy organizations with varying call volumes
- Professional service delivery requirements
- Need callback functionality during peak times
- Want full featured call center capabilities

## Technical Implementation

### Studio Flow Configuration

This workflow requires a more sophisticated Studio Flow:

1. **Incoming Call** → **Play Greeting** → **Queue with Options**
2. **While Queued**: Hold music + listen for * key
3. **Options Menu**: Route to callback or voicemail
4. **Callback**: Create task + disconnect gracefully
5. **Voicemail**: Record message + created task

### Required Components
- TaskRouter Queue with callback capabilities
- Advanced Studio Flow with Gather widgets
- Hold music assets
- Callback management system
- Voicemail recording capabilities

### Setup Steps

1. **Configure Enhanced TaskRouter Queue**
   ```json
   {
     "queue_name": "Support_With_Options",
     "target_workers": "routing.skills HAS 'support'",
     "max_reserved_workers": 3,
     "task_order": "FIFO"
   }
   ```

2. **Upload Hold Music**
   - Professional hold music file (MP3/WAV)
   - Upload to Twilio Assets or external hosting
   - Configure in Studio Flow

3. **Create Advanced Studio Flow**
   - Start: Trigger Widget
   - Greeting: Play welcome message
   - Queue: Send to TaskRouter with hold music
   - Gather: Listen for * key during hold
   - Options: Present callback/voicemail menu
   - Callback: Create task + polite disconnect
   - Voicemail: Record + create task

4. **Configure Callback Logic**
   - Create callback tasks in TaskRouter
   - Include original caller information
   - Set appropriate priority and routing

## Features Included

### Hold Music
- Professional audio during wait times
- Customizable music or messaging
- Seamless transition when agent answers

### Callback System
- Caller keeps place in line
- Agent receives callback task with context
- Reduces abandoned calls during busy periods

### Voicemail Option
- Alternative to waiting when time is limited
- Creates task for agent follow-up
- Includes recorded message

### Queue Management
- FIFO (First In, First Out) ordering
- Priority routing capabilities
- Real-time queue position updates

## Advantages
- **Professional**: Full call center experience
- **Flexible**: Multiple options for callers
- **Scalable**: Handles varying call volumes
- **Efficient**: Reduces abandoned calls

## Implementation Complexity
- **Medium to High**: Requires multiple components
- **Testing Required**: More scenarios to validate
- **Maintenance**: Additional systems to monitor

## Studio Flow Implementation

The Connie Voice Direct + Wait Experience is implemented using the Studio Flow:
- **"Connie Voice Direct + Wait Experience (with Email)"** - Advanced options menu with email notifications

## Current NSS Implementation

The NSS (Northeastern Social Services) deployment provides a working example:
- **Test Line** (+17254447060): Uses "Connie Voice Direct + Wait Experience (with Email)" Studio Flow
- **Features**: Full options menu with email notification capabilities
- **Outcomes**: Demonstrates all three caller outcome scenarios

## Adding Features

This workflow supports all add-ons:
- [Email Notifications](../add-ons/email-notifications) - Email alerts for voicemails/callbacks
- [IVR Functions](../add-ons/ivr-functions) - Advanced menu systems
- [Custom Greetings](../add-ons/custom-greetings) - Professional voice prompts
- [Transcription](../add-ons/transcription) - Voicemail speech-to-text
- [Integrations](../add-ons/integrations) - CRM lookup and data enrichment

## Migration Paths

### From Connie Voice Direct + Voicemail
- Add options menu during wait time
- Implement callback system with queue retention
- Test wait experience and outcome tracking

### To Advanced Features
- Add department routing (IVR)
- Implement skill-based routing
- Add business hours handling
- Email integration for notifications

## Troubleshooting

### Common Issues
- **Hold music not playing**: Check audio file format and Studio Flow configuration
- **Options menu not working**: Verify Gather widget timeout and key detection
- **Callback tasks not created**: Check TaskRouter configuration and serverless functions
- **Queue position not updating**: Verify TaskRouter webhook configuration

### Performance Optimization
- Monitor queue wait times
- Adjust agent capacity settings
- Optimize hold music file size
- Review callback success rates

### Quick Fixes
- Restart Studio Flow if widgets hang
- Check Twilio Console for error logs
- Verify all webhook endpoints are responding
- Test individual flow components separately