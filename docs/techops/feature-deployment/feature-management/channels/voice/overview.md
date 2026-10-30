---
sidebar_label: Voice Overview
sidebar_position: 1
title: "Voice Channel"
---

# Voice Channel

Choose how callers connect with your organization using the ThreadConnect Voice experience framework. Start simple, add features as you grow.

## ThreadConnect Voice Experience Framework {#connie-voice-experience-framework}

The ThreadConnect Voice platform provides three core experience levels, each building on the previous with additional features:

<div className="row">
  <div className="col col--4 margin-bottom--lg">
    <div className="card">
      <div className="card__body">
        <h3>📞 ThreadConnect Voice Direct</h3>
        <p>Basic implementation - calls immediately queued, rejected during non-business hours. Works out-of-the-box.</p>
        <p><a href="./workflows/direct">Setup Guide</a> • <a href="./troubleshooting#direct">Troubleshooting</a></p>
      </div>
    </div>
  </div>
  
  <div className="col col--4 margin-bottom--lg">
    <div className="card">
      <div className="card__body">
        <h3>📋 ThreadConnect Voice Direct + Voicemail</h3>
        <p>Custom wait/hold experience, custom greetings, hold music, department routing, off-hours voicemail routing.</p>
        <p><a href="./workflows/voicemail-only">Setup Guide</a> • <a href="./troubleshooting#voicemail">Troubleshooting</a></p>
      </div>
    </div>
  </div>
  
  <div className="col col--4 margin-bottom--lg">
    <div className="card">
      <div className="card__body">
        <h3>⭐ ThreadConnect Voice Direct + Wait Experience</h3>
        <p>Advanced options menu - callers can choose callback or voicemail while retaining queue position.</p>
        <p><a href="./workflows/direct-with-options">Setup Guide</a> • <a href="./troubleshooting#wait-experience">Troubleshooting</a></p>
      </div>
    </div>
  </div>
</div>

### Voice Direct + Wait Experience Outcomes

The most advanced experience provides three possible outcomes for callers:

1. **Accept Callback/Voicemail**: Caller chooses option and completes action (task updated to callback/voicemail)
2. **Hang Up Without Action**: Caller hangs up without selecting an option (abandoned call)
3. **Stay in Queue**: Caller remains on hold until agent answers (normal call handling)

## Studio Flow Implementation

The voice experiences are implemented using renamed Studio Flows with platform-standard naming:

- **ThreadConnect Voice Direct + Voicemail (Auto-Route)**: All calls terminate in voicemail
- **ThreadConnect Voice Direct + Wait Experience (with Email)**: Options menu with email notifications

## Legacy and Custom Options

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__body">
        <h3>🤖 ThreadConnect Copilot</h3>
        <p>AI helps callers find the right service</p>
        <p><span className="badge badge--secondary">Coming Soon</span></p>
      </div>
    </div>
  </div>
  
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__body">
        <h3>🔧 Custom Build</h3>
        <p>Design your unique workflow</p>
        <p><a href="./workflows/custom">Learn More</a> • <a href="./examples">Examples</a></p>
      </div>
    </div>
  </div>
</div>

## Add-On Features

Enhance any workflow with optional features:

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__body">
        <h3>📧 Email Notifications</h3>
        <p>Voicemail alerts to staff</p>
        <p><a href="./add-ons/email-notifications">Setup Guide</a></p>
      </div>
    </div>
  </div>
  
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__body">
        <h3>🎵 IVR Functions</h3>
        <p>Press 1,2,3 menus</p>
        <p><a href="./add-ons/ivr-functions">Setup Guide</a></p>
      </div>
    </div>
  </div>
  
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__body">
        <h3>🗣️ Custom Greetings</h3>
        <p>Professional AI voices</p>
        <p><a href="./add-ons/custom-greetings">Setup Guide</a></p>
      </div>
    </div>
  </div>
  
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__body">
        <h3>📝 Transcription</h3>
        <p>Speech-to-text conversion</p>
        <p><a href="./add-ons/transcription">Setup Guide</a></p>
      </div>
    </div>
  </div>
  
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__body">
        <h3>🔗 Integrations</h3>
        <p>CRM & API connections</p>
        <p><a href="./add-ons/integrations">Setup Guide</a></p>
      </div>
    </div>
  </div>
</div>

## Need Help?

<div className="row">
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__body">
        <h3>🚨 Troubleshooting</h3>
        <p>Quick fixes for voice problems</p>
        <p><a href="./troubleshooting">Common Issues</a> • <a href="./troubleshooting/error-codes">Error Codes</a></p>
      </div>
    </div>
  </div>
  
  <div className="col col--6 margin-bottom--lg">
    <div className="card">
      <div className="card__body">
        <h3>💡 Examples</h3>
        <p>Real-world implementations</p>
        <p><a href="./examples">View Examples</a></p>
      </div>
    </div>
  </div>
</div>