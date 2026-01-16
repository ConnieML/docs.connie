---
sidebar_label: Transcription
sidebar_position: 4
title: "Transcription Add-On"
---

# Transcription Add-On

Automatically convert voicemail recordings to text for easier processing, searchability, and accessibility.

## What It Does
- Converts voicemail audio to text automatically
- Provides searchable message content
- Enables quick message review without playback
- Supports multiple languages
- Integrates with email notifications and CRM systems

## When to Use
- High volume of voicemails requiring quick review
- Need searchable message archives
- Accessibility requirements (hearing impaired staff)
- Want to enable automated message routing/classification
- Integration with text-based systems (CRM, ticketing)

## Compatible Workflows
- ✅ **Connie Voice Direct + Wait Experience**: Transcribe voicemails from menu option
- ✅ **Connie Voice Direct + Voicemail**: Transcribe all recorded messages
- ⚠️ **Connie Voice Direct**: Only applicable if voicemail add-on also enabled

## Technical Implementation

### Transcription Services

#### Twilio Transcription (Recommended)
- Built-in integration with Twilio recordings
- Automatic processing
- Multiple language support
- Cost-effective for most use cases

#### Google Speech-to-Text
- Higher accuracy for complex audio
- Advanced language models
- Real-time transcription capabilities
- Custom vocabulary support

#### AWS Transcribe  
- Medical and legal vocabulary specialization
- Speaker identification
- Custom language models
- Advanced punctuation and formatting

### Basic Setup

```javascript
// Enable transcription in Studio Flow
const recordingConfig = {
  transcribe: true,
  transcription_callback: `https://${context.DOMAIN_NAME}/transcription-webhook`,
  play_beep: true,
  max_length: 300
};
```

### Webhook Handler
```javascript
exports.handler = async (context, event, callback) => {
  const {
    TranscriptionText,
    TranscriptionStatus,
    RecordingUrl,
    CallSid,
    From
  } = event;

  if (TranscriptionStatus === 'completed') {
    // Process completed transcription
    await processTranscription({
      text: TranscriptionText,
      caller: From,
      recording_url: RecordingUrl,
      call_sid: CallSid
    });
  }

  callback(null, 'Transcription processed');
};
```

---

## Critical Fix: TranscriptionText May Be Missing

:::danger Critical Implementation Note
Twilio's `transcribeCallback` does **NOT** always include `TranscriptionText` in the event payload. Your function **MUST** fetch it from `TranscriptionUrl` when missing.
:::

This issue was discovered during Connie Care Team 877 setup (December 2025). Without this fix, transcriptions may silently fail.

### The Problem

```javascript
// This WILL fail sometimes - TranscriptionText may be undefined
const transcriptionText = event.TranscriptionText;
// transcriptionText is undefined, but TranscriptionUrl exists
```

### The Solution

```javascript
const axios = require('axios');

exports.handler = async (context, event, callback) => {
  let transcriptionText = event.TranscriptionText;

  // CRITICAL: Fetch transcription if not in payload
  if (!transcriptionText && event.TranscriptionUrl) {
    try {
      const response = await axios.get(event.TranscriptionUrl + '.json', {
        auth: {
          username: context.ACCOUNT_SID,
          password: context.AUTH_TOKEN
        }
      });
      transcriptionText = response.data.transcription_text;
      console.log('Fetched transcription from URL:', transcriptionText?.substring(0, 50));
    } catch (error) {
      console.error('Failed to fetch transcription:', error.message);
    }
  }

  // Now use transcriptionText safely
  if (transcriptionText) {
    await processTranscription({
      text: transcriptionText,
      caller: event.From,
      recording_url: event.RecordingUrl,
      call_sid: event.CallSid
    });
  }

  callback(null, 'Transcription processed');
};
```

### Key Points

1. **Always check** if `TranscriptionText` is undefined
2. **Use TranscriptionUrl** with `.json` suffix to fetch the transcription
3. **Authenticate** with Account SID and Auth Token
4. **Handle errors** gracefully - don't let missing transcription break email delivery

---

## Advanced Features

### Multi-Language Support
```javascript
const detectLanguage = async (caller_number) => {
  // Auto-detect based on caller history or area code
  const callerProfile = await getCRMProfile(caller_number);
  return callerProfile?.preferred_language || 'en-US';
};

const transcriptionConfig = {
  language: await detectLanguage(event.From),
  enable_automatic_punctuation: true,
  enable_word_confidence: true
};
```

### Quality Enhancement
```javascript
// Pre-process audio for better transcription
const enhanceAudio = async (recording_url) => {
  return await processAudio(recording_url, {
    noise_reduction: true,
    volume_normalization: true,
    speech_enhancement: true
  });
};

// Post-process transcription text
const cleanTranscription = (text) => {
  return text
    .replace(/\b(um|uh|like)\b/gi, '') // Remove filler words
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
};
```

### Confidence Scoring
```javascript
const processTranscriptionWithConfidence = (transcriptionData) => {
  const { text, confidence_scores } = transcriptionData;
  const avgConfidence = confidence_scores.reduce((a, b) => a + b) / confidence_scores.length;
  
  return {
    text: text,
    confidence: avgConfidence,
    quality: avgConfidence > 0.8 ? 'high' : avgConfidence > 0.6 ? 'medium' : 'low',
    requires_review: avgConfidence < 0.6
  };
};
```

## Integration Features

### Email Integration
```javascript
// Include transcription in email notifications
const emailContent = `
  <h3>New Voicemail Message</h3>
  <p><strong>From:</strong> ${caller_number}</p>
  <p><strong>Duration:</strong> ${duration} seconds</p>
  
  <h4>Message Transcript:</h4>
  <div style="background: #f5f5f5; padding: 15px; font-family: monospace;">
    ${transcription_text}
  </div>
  
  <p><em>Confidence: ${confidence_score}%</em></p>
  <p><a href="${recording_url}">Listen to Original Recording</a></p>
`;
```

### CRM Integration
```javascript
// Create structured data for CRM
const createCRMEntry = async (transcriptionData) => {
  const keywords = extractKeywords(transcriptionData.text);
  const sentiment = analyzeSentiment(transcriptionData.text);
  
  return {
    caller_number: transcriptionData.caller,
    message_text: transcriptionData.text,
    keywords: keywords,
    sentiment: sentiment,
    confidence: transcriptionData.confidence,
    recording_url: transcriptionData.recording_url,
    created_at: new Date()
  };
};
```

### Search and Analytics
```javascript
// Make transcriptions searchable
const indexTranscription = async (transcriptionData) => {
  await searchIndex.add({
    id: transcriptionData.call_sid,
    content: transcriptionData.text,
    caller: transcriptionData.caller,
    timestamp: new Date(),
    tags: extractTags(transcriptionData.text)
  });
};

// Enable analytics
const analyzeContent = (text) => {
  return {
    word_count: text.split(' ').length,
    topics: extractTopics(text),
    entities: extractEntities(text),
    urgency_level: determineUrgency(text)
  };
};
```

## Custom Vocabulary

### Domain-Specific Terms
```javascript
// Add organization-specific vocabulary
const customVocabulary = [
  { phrase: "Community Health Center", sounds_like: "community health center" },
  { phrase: "SNAP benefits", sounds_like: "snap benefits" },
  { phrase: "housing assistance", sounds_like: "housing assistance" },
  { phrase: "case manager", sounds_like: "case manager" }
];

const transcriptionConfig = {
  vocabulary_name: 'nonprofit_services',
  custom_vocabulary: customVocabulary
};
```

### Medical/Legal Terms
```javascript
// Specialized vocabulary for healthcare organizations
const medicalVocabulary = [
  "Medicaid", "Medicare", "prescription", "diagnosis", 
  "appointment", "referral", "insurance", "copay"
];

const legalVocabulary = [
  "eviction", "custody", "immigration", "asylum",
  "deportation", "legal aid", "court date"
];
```

## Quality Assurance

### Automatic Review Triggers
```javascript
const needsReview = (transcription) => {
  const triggers = [
    transcription.confidence < 0.6,
    transcription.text.length < 10,
    transcription.text.includes('[inaudible]'),
    detectUrgentKeywords(transcription.text),
    transcription.duration > 180 // 3 minutes
  ];
  
  return triggers.some(trigger => trigger);
};
```

### Human Review Workflow
```javascript
if (needsReview(transcription)) {
  await createReviewTask({
    transcription_id: transcription.id,
    priority: transcription.urgency_level,
    assigned_to: 'transcription_review_team',
    due_date: addHours(new Date(), 4)
  });
}
```

### Accuracy Monitoring
```javascript
// Track transcription accuracy over time
const logAccuracy = async (transcription_id, human_corrected_text) => {
  const original = await getTranscription(transcription_id);
  const accuracy = calculateSimilarity(original.text, human_corrected_text);
  
  await logMetric('transcription_accuracy', accuracy, {
    language: original.language,
    duration: original.duration,
    confidence: original.confidence
  });
};
```

## Privacy and Security

### Data Handling
```javascript
// Ensure PII protection in transcriptions
const sanitizeTranscription = (text) => {
  return text
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]') // Social Security Numbers
    .replace(/\b\d{16}\b/g, '[CARD]') // Credit card numbers
    .replace(/\b\d{3}-\d{3}-\d{4}\b/g, '[PHONE]') // Phone numbers (optional)
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]'); // Email addresses
};
```

### Retention Policies
```javascript
// Automatic cleanup of old transcriptions
const cleanupOldTranscriptions = async () => {
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - 6); // 6 months retention
  
  await deleteTranscriptions({
    created_before: cutoffDate,
    exclude_flagged: true // Keep flagged items longer
  });
};
```

### Access Controls
```javascript
// Role-based access to transcriptions
const canAccessTranscription = (user, transcription) => {
  const permissions = {
    admin: () => true,
    supervisor: () => transcription.department === user.department,
    agent: () => transcription.assigned_to === user.id,
    readonly: () => transcription.public === true
  };
  
  return permissions[user.role]?.() || false;
};
```

## Performance Optimization

### Batch Processing
```javascript
// Process multiple transcriptions efficiently
const batchProcessTranscriptions = async (transcriptions) => {
  const batches = chunk(transcriptions, 10);
  
  for (const batch of batches) {
    await Promise.all(batch.map(processTranscription));
    await sleep(1000); // Rate limiting
  }
};
```

### Caching Strategy
```javascript
// Cache frequently accessed transcriptions
const getCachedTranscription = async (call_sid) => {
  const cacheKey = `transcription:${call_sid}`;
  let transcription = await cache.get(cacheKey);
  
  if (!transcription) {
    transcription = await database.getTranscription(call_sid);
    await cache.set(cacheKey, transcription, 3600); // 1 hour
  }
  
  return transcription;
};
```

## Troubleshooting

### Common Issues

**Poor transcription quality**
- Check audio quality and format
- Verify language settings
- Consider background noise reduction
- Update custom vocabulary

**Missing transcriptions**
- Verify webhook configuration
- Check transcription service status
- Monitor callback delivery
- Review error logs

**High processing delays**
- Monitor service response times
- Implement retry mechanisms
- Consider alternative providers
- Check network connectivity

### Monitoring and Alerts
```javascript
// Monitor transcription health
const monitorTranscription = async () => {
  const metrics = await getTranscriptionMetrics();
  
  if (metrics.success_rate < 0.95) {
    await sendAlert({
      type: 'transcription_failure',
      message: `Transcription success rate dropped to ${metrics.success_rate}%`,
      severity: 'high'
    });
  }
  
  if (metrics.avg_processing_time > 30) {
    await sendAlert({
      type: 'transcription_delay',
      message: `Average processing time: ${metrics.avg_processing_time}s`,
      severity: 'medium'
    });
  }
};
```

## Best Practices

### Audio Optimization
- Use high-quality recording settings
- Minimize background noise
- Ensure proper microphone levels
- Consider audio preprocessing

### Language Configuration
- Set appropriate language models
- Use region-specific variants
- Update vocabulary regularly
- Test with actual caller accents

### Integration Design
- Design for transcription delays
- Provide fallback options
- Handle failures gracefully
- Maintain original recordings