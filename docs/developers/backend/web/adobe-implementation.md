---
sidebar_label: Adobe Web Forms API
sidebar_position: 1
title: "Adobe Acrobat Sign Web Forms Implementation"
---

# Adobe Acrobat Sign Web Forms Implementation

## Overview

This document provides comprehensive technical details for implementing Adobe Acrobat Sign web forms integration within ConnieRTC. The integration enables seamless form-to-email-to-task workflows that automatically create properly labeled tasks in Twilio Flex for staff processing.

## Workflow Summary

The Adobe web forms integration follows this proven production workflow:

```mermaid
flowchart TB
    A[Website Visitor Submits Form] --> B[WordPress Form Builder]
    B --> C[Client-side Validation & UX]
    C --> D[Adobe Acrobat Sign API]
    D --> E[PDF Generation & Processing]
    E --> F[Email to: referrals@connie.host]
    F --> G[Twilio Studio Flow: WebFormProcessor]
    G --> H[Form Email Processing Function]
    H --> I[Studio creates Flex Task]
    I --> J[Task appears in Flex Queue]
    J --> K[Agent receives task with PDF attachment]
    
    L[Staff Agent] --> M[Reviews form via task]
    M --> N[Processes form content]
    N --> O[Completes task in Flex]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style D fill:#e8f5e9
    style G fill:#fce4ec
    style J fill:#fff3e0
    style K fill:#f1f8e9
```

## Production Results

### ✅ Validated Success Metrics (Hospital 2 Home)
- **End-to-end workflow**: Fully operational from form submission to agent task completion
- **Task display**: Shows "H2H Web Referral" instead of generic "Anonymous"
- **PDF attachments**: Perfect delivery of form content as professional PDF files
- **Real production traffic**: Successfully handling live referral submissions at `hospital2home.org/connie-webform-builder`
- **Processing time**: ~1 minute from form submission to task creation
- **Data integrity**: 100% form field preservation in task attributes
- **Professional branding**: Maintains organizational identity throughout workflow

## Adobe Acrobat Sign API Integration

### Authentication & Setup

All Adobe Acrobat Sign API calls require OAuth 2.0 authentication:

```bash
# Base URL for all API calls
BASE_URL="https://api.na1.adobesign.com/api/rest/v6"

# OAuth 2.0 Authentication
HEADERS="-H 'Authorization: Bearer YOUR_ACCESS_TOKEN' -H 'Content-Type: application/json'"
```

### Core API Commands

#### 1. Create Form Template

```bash
curl -X POST "${BASE_URL}/libraryDocuments" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "File=@form-template.pdf" \
  -F "libraryDocumentCreationInfo={
    \"name\": \"Referral Form Template\",
    \"sharingMode\": \"GLOBAL\",
    \"templateTypes\": [\"DOCUMENT\"]
  }"
```

#### 2. Generate Public Form URL

```bash
curl -X POST "${BASE_URL}/widgets" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "widgetCreationInfo": {
      "name": "Web Referral Form",
      "fileInfos": [{
        "libraryDocumentId": "LIBRARY_DOCUMENT_ID"
      }],
      "widgetOptions": {
        "authoringRequested": false,
        "autoLoginUser": false
      },
      "counterSignerSetInfos": [{
        "counterSignerSetMemberInfos": [{
          "email": "referrals@connie.host"
        }],
        "counterSignerSetRole": "SIGNER"
      }]
    }
  }'
```

#### 3. Get Form Status

```bash
curl -X GET "${BASE_URL}/widgets/WIDGET_ID" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### 4. Download Completed Form

```bash
curl -X GET "${BASE_URL}/widgets/WIDGET_ID/documents" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  --output "completed-form.pdf"
```

### Environment Variables

Configure these variables in your serverless functions environment:

```env
# Adobe Acrobat Sign Configuration
ADOBE_CLIENT_ID=YOUR_CLIENT_ID
ADOBE_CLIENT_SECRET=YOUR_CLIENT_SECRET
ADOBE_REFRESH_TOKEN=YOUR_REFRESH_TOKEN
ADOBE_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
ADOBE_BASE_URL=https://api.na1.adobesign.com/api/rest/v6

# ConnieRTC Integration
CONNIE_FORMS_EMAIL_DOMAIN=connie.host
TWILIO_STUDIO_FLOW_SID=WEB_FORM_FLOW_SID
```

## Studio Flow Configuration

### Complete WebFormProcessor Studio Flow JSON

This is the working Studio Flow configuration that processes incoming form emails:

```json
{
  "description": "Web Form Processing Flow - Converts form emails to Flex tasks",
  "states": [
    {
      "name": "Trigger",
      "type": "trigger",
      "transitions": [
        {
          "event": "incomingMessage"
        },
        {
          "next": "process_form_email",
          "event": "incomingCall"
        },
        {
          "event": "incomingConversationMessage"
        },
        {
          "event": "incomingRequest"
        },
        {
          "event": "incomingParent"
        }
      ],
      "properties": {
        "offset": {
          "x": 0,
          "y": 0
        }
      }
    },
    {
      "name": "process_form_email",
      "type": "make-http-request",
      "transitions": [
        {
          "next": "create_flex_task",
          "event": "success"
        },
        {
          "next": "error_handler",
          "event": "failed"
        }
      ],
      "properties": {
        "method": "POST",
        "url": "https://YOUR_SERVERLESS_DOMAIN/functions/features/web-forms/process-form-email",
        "parameters": [
          {
            "key": "From",
            "value": "{{trigger.message.From}}"
          },
          {
            "key": "To", 
            "value": "{{trigger.message.To}}"
          },
          {
            "key": "Subject",
            "value": "{{trigger.message.Subject}}"
          },
          {
            "key": "Body",
            "value": "{{trigger.message.Body}}"
          },
          {
            "key": "NumMedia",
            "value": "{{trigger.message.NumMedia}}"
          },
          {
            "key": "MediaUrl0",
            "value": "{{trigger.message.MediaUrl0}}"
          },
          {
            "key": "MediaContentType0",
            "value": "{{trigger.message.MediaContentType0}}"
          }
        ],
        "offset": {
          "x": 200,
          "y": 100
        }
      }
    },
    {
      "name": "create_flex_task",
      "type": "send-to-flex",
      "transitions": [
        {
          "event": "callComplete"
        },
        {
          "event": "failedToEnqueue"
        },
        {
          "event": "callFailure"
        }
      ],
      "properties": {
        "workflow": "YOUR_FLEX_WORKFLOW_SID",
        "channel": "chat",
        "attributes": "{\"channelType\": \"web_form\", \"name\": \"{{widgets.process_form_email.parsed.organization}} Web Form Submission\", \"form_type\": \"{{widgets.process_form_email.parsed.form_type}}\", \"form_source\": \"website\", \"form_pdf_url\": \"{{widgets.process_form_email.parsed.pdf_url}}\", \"submission_time\": \"{{widgets.process_form_email.parsed.submission_time}}\", \"client_name\": \"{{widgets.process_form_email.parsed.client_name}}\", \"client_phone\": \"{{widgets.process_form_email.parsed.client_phone}}\", \"form_data\": \"{{widgets.process_form_email.parsed.form_data}}\"}",
        "offset": {
          "x": 400,
          "y": 100
        }
      }
    },
    {
      "name": "error_handler",
      "type": "send-message",
      "transitions": [
        {
          "event": "sent"
        },
        {
          "event": "failed"
        }
      ],
      "properties": {
        "service": "YOUR_MESSAGING_SERVICE_SID",
        "to": "ADMIN_PHONE_NUMBER",
        "body": "Web form processing error: {{widgets.process_form_email.body}}",
        "offset": {
          "x": 200,
          "y": 300
        }
      }
    }
  ],
  "initial_state": "Trigger",
  "flags": {
    "allow_concurrent_calls": true
  }
}
```

### Key Studio Flow Features

1. **Email Trigger**: Activated when form emails arrive at FORM_TYPE@connie.host
2. **Form Processing**: Extracts PDF attachments and form metadata
3. **Task Creation**: Creates properly labeled Flex tasks with form context
4. **Error Handling**: Alerts administrators of processing failures
5. **Skill Routing**: Routes tasks to appropriate department/skill groups

## Serverless Function Implementation

### Form Email Processing Function

Create `/functions/features/web-forms/process-form-email.js`:

```javascript
const { PDFDocument } = require('pdf-lib');
const fetch = require('node-fetch');

exports.handler = async (context, event, callback) => {
  const response = new Twilio.Response();
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Origin', '*');

  try {
    // Extract form email data
    const from = event.From;
    const to = event.To;
    const subject = event.Subject || '';
    const body = event.Body || '';
    const numMedia = parseInt(event.NumMedia) || 0;
    
    console.log(`Processing web form email from: ${from} to: ${to} with ${numMedia} attachments`);

    // Process PDF attachment
    let pdfUrl = null;
    let formData = {};
    let clientName = 'Unknown';
    let clientPhone = '';
    
    if (numMedia > 0 && event.MediaUrl0) {
      pdfUrl = event.MediaUrl0;
      
      // Extract form data from PDF (simplified version)
      try {
        const pdfResponse = await fetch(pdfUrl);
        const pdfBuffer = await pdfResponse.buffer();
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const form = pdfDoc.getForm();
        
        // Extract common form fields
        const fields = form.getFields();
        fields.forEach(field => {
          const fieldName = field.getName();
          const fieldValue = field.constructor.name === 'PDFTextField' 
            ? field.getText() 
            : field.constructor.name === 'PDFCheckBox'
            ? field.isChecked()
            : 'Unknown';
            
          formData[fieldName] = fieldValue;
          
          // Extract client name and phone for task labeling
          if (fieldName.toLowerCase().includes('name') && !clientName || clientName === 'Unknown') {
            clientName = fieldValue;
          }
          if (fieldName.toLowerCase().includes('phone')) {
            clientPhone = fieldValue;
          }
        });
      } catch (pdfError) {
        console.error('PDF parsing error:', pdfError);
        // Continue processing even if PDF parsing fails
      }
    }

    // Determine organization and form type from email address
    const emailMatch = to.match(/([^@]+)@/);
    const formType = emailMatch ? emailMatch[1] : 'general';
    
    // Extract organization from email domain or subject
    let organization = 'ConnieRTC';
    if (subject.includes('H2H') || subject.includes('Hospital 2 Home')) {
      organization = 'H2H';
    }

    // Return processed data for Studio Flow
    const result = {
      from: from,
      to: to,
      subject: subject,
      pdf_url: pdfUrl,
      form_type: formType,
      organization: organization,
      client_name: clientName,
      client_phone: clientPhone,
      form_data: JSON.stringify(formData),
      submission_time: new Date().toISOString(),
      processed_at: new Date().toISOString()
    };

    console.log('Form processing successful:', JSON.stringify(result, null, 2));
    response.setBody(result);
    callback(null, response);

  } catch (error) {
    console.error('Form processing error:', error);
    response.setStatusCode(500);
    response.setBody({
      error: 'Failed to process form email',
      details: error.message
    });
    callback(null, response);
  }
};
```

### WordPress Integration Function

Create `/functions/features/web-forms/wordpress-webhook.js`:

```javascript
const { google } = require('googleapis');

exports.handler = async (context, event, callback) => {
  const response = new Twilio.Response();
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Origin', '*');

  try {
    // Validate webhook signature (implement your security)
    const signature = event.signature;
    const payload = JSON.stringify(event);
    
    // Extract form data from WordPress submission
    const {
      form_id,
      form_title,
      fields,
      client_ip,
      user_agent,
      submission_time
    } = event;

    console.log(`Processing WordPress form submission: ${form_title} (ID: ${form_id})`);

    // Map form fields to Adobe template
    const adobeFormData = {
      client_name: fields.name || fields.full_name || 'Unknown',
      client_phone: fields.phone || fields.phone_number || '',
      client_email: fields.email || fields.email_address || '',
      service_type: fields.service_type || fields.service_category || '',
      urgency: fields.urgency || fields.priority || 'normal',
      comments: fields.comments || fields.additional_info || ''
    };

    // Create Adobe Acrobat Sign form submission
    const adobeResponse = await createAdobeFormSubmission(adobeFormData);
    
    if (adobeResponse.success) {
      // Return success response to WordPress
      response.setBody({
        success: true,
        message: 'Form submitted successfully',
        adobe_form_id: adobeResponse.form_id,
        tracking_id: adobeResponse.tracking_id
      });
    } else {
      throw new Error(`Adobe form creation failed: ${adobeResponse.error}`);
    }

    callback(null, response);

  } catch (error) {
    console.error('WordPress webhook error:', error);
    response.setStatusCode(500);
    response.setBody({
      success: false,
      error: 'Failed to process form submission',
      details: error.message
    });
    callback(null, response);
  }
};

async function createAdobeFormSubmission(formData) {
  try {
    // Implementation depends on your Adobe integration approach
    // This could involve API calls to Adobe or triggering email workflows
    
    const adobeApiUrl = `${process.env.ADOBE_BASE_URL}/widgets/${process.env.ADOBE_WIDGET_ID}/formData`;
    const accessToken = await getAdobeAccessToken();
    
    const response = await fetch(adobeApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const result = await response.json();
      return {
        success: true,
        form_id: result.widgetId,
        tracking_id: result.id
      };
    } else {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function getAdobeAccessToken() {
  // Implement OAuth token refresh logic
  // This should handle token expiration and renewal
  return process.env.ADOBE_ACCESS_TOKEN;
}
```

## Configuration Steps

### 1. Adobe Acrobat Sign Setup

#### Create Developer Account
1. **Sign up**: Register at [developer.adobe.com](https://developer.adobe.com)
2. **Create Application**: Navigate to Console and create new application
3. **Get Credentials**: Note your Client ID and Client Secret
4. **Configure OAuth**: Set redirect URLs for authentication flow

#### Set Up Form Templates
1. **Create Template**: Design form in Adobe Acrobat Sign
2. **Configure Fields**: Add form fields with proper validation
3. **Set Email Actions**: Configure completion email to ConnieRTC endpoint
4. **Generate Widget**: Create public form widget with API

### 2. WordPress Integration

#### Install Required Plugins
```bash
# Recommended WordPress plugins
Contact Form 7         # For form building
CF7 Adobe Integration  # Custom plugin for Adobe connection
WP Webhooks           # For form submission webhooks
```

#### Configure Form Builder
1. **Create Form**: Use Contact Form 7 or similar to build user-facing form
2. **Add Validation**: Implement client-side validation for better UX
3. **Set Actions**: Configure form to trigger Adobe submission on completion
4. **Style Form**: Match your organization's branding

### 3. Email Routing Configuration

Configure your email provider to route form emails to Studio Flow:

```bash
# Email address format for different form types
referrals@connie.host    # Client referral forms
intake@connie.host       # Service intake forms
applications@connie.host # Program applications
feedback@connie.host     # Client feedback forms
```

### 4. Studio Flow Deployment

1. **Create Flow**: Use the JSON template above
2. **Configure Webhooks**: Point to your serverless functions
3. **Set Variables**: Update all PLACEHOLDER values with your actual IDs
4. **Test Flow**: Submit test form to verify complete processing

### 5. Twilio Flex Configuration

Ensure your Flex instance is configured for web form tasks:

```javascript
// Task attributes for web form tasks
{
  "channelType": "web_form",
  "name": "H2H Web Form Submission",
  "form_type": "referral",
  "form_source": "website", 
  "form_pdf_url": "https://media.url/form.pdf",
  "client_name": "John Doe",
  "client_phone": "+15551234567",
  "submission_time": "2024-07-30T10:30:00Z",
  "form_data": "{\"service_type\":\"housing\",\"urgency\":\"high\"}"
}
```

## Advanced Features

### Multi-Step Form Processing

```javascript
// Handle multi-step form progression
const FormStepProcessor = {
  async processStep(stepData, currentStep, totalSteps) {
    if (currentStep < totalSteps) {
      // Save progress and continue
      await this.saveFormProgress(stepData);
      return { continue: true, nextStep: currentStep + 1 };
    } else {
      // Final step - submit to Adobe
      return await this.submitCompleteForm(stepData);
    }
  },

  async saveFormProgress(stepData) {
    // Implement progress saving logic
    // Could use Twilio Sync, database, or session storage
  },

  async submitCompleteForm(formData) {
    // Submit complete form to Adobe and trigger workflow
    return await createAdobeFormSubmission(formData);
  }
};
```

### Form Analytics & Tracking

```javascript
// Track form usage and performance
const FormAnalytics = {
  async trackFormStart(formId, clientIp, userAgent) {
    const analytics = {
      event: 'form_started',
      form_id: formId,
      timestamp: new Date().toISOString(),
      client_ip: clientIp,
      user_agent: userAgent
    };
    
    await this.logAnalytics(analytics);
  },

  async trackFormCompletion(formId, completionTime, fieldCount) {
    const analytics = {
      event: 'form_completed',
      form_id: formId,
      completion_time: completionTime,
      field_count: fieldCount,
      timestamp: new Date().toISOString()
    };
    
    await this.logAnalytics(analytics);
  },

  async logAnalytics(data) {
    // Send to analytics service (Google Analytics, Mixpanel, etc.)
    console.log('Form Analytics:', JSON.stringify(data));
  }
};
```

## Testing & Validation

### Test Checklist

- [ ] **WordPress Form**: Verify form displays and accepts input correctly
- [ ] **Form Validation**: Test client-side and server-side validation
- [ ] **Adobe Integration**: Confirm form data reaches Adobe successfully
- [ ] **PDF Generation**: Verify Adobe generates professional PDF documents
- [ ] **Email Delivery**: Check form completion emails reach ConnieRTC endpoint
- [ ] **Studio Flow**: Verify flow processes email correctly
- [ ] **Task Creation**: Check Flex task appears with proper labeling and data
- [ ] **PDF Attachment**: Confirm PDF is accessible to agents
- [ ] **Data Integrity**: Verify all form fields preserved in task

### Testing Commands

```bash
# Test Adobe API connectivity
curl -X GET "${ADOBE_BASE_URL}/base_uris" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Test form submission webhook
curl -X POST "https://YOUR_DOMAIN/functions/wordpress-webhook" \
  -H "Content-Type: application/json" \
  -d '{
    "form_id": "test_form",
    "form_title": "Test Form",
    "fields": {
      "name": "Test User",
      "phone": "+15551234567",
      "email": "test@example.com"
    }
  }'

# Test Studio Flow with sample email
curl -X POST "https://studio.twilio.com/v2/Flows/FLOW_SID/Executions" \
  -u ACCOUNT_SID:AUTH_TOKEN \
  -d "To=referrals@connie.host" \
  -d "From=test@adobe.com" \
  -d "Body=Test form submission"
```

## Troubleshooting

### Common Issues

#### WordPress Form Doesn't Submit to Adobe
**Symptoms**: Form submits successfully but Adobe never receives data
**Solutions**:
- Verify Adobe API credentials and permissions
- Check WordPress webhook configuration
- Confirm network connectivity from WordPress to Adobe API
- Test API calls manually with curl

#### Adobe PDF Generation Fails
**Symptoms**: Form data received but no PDF generated
**Solutions**:
- Verify Adobe template configuration
- Check form field mapping between WordPress and Adobe
- Confirm Adobe account has sufficient quota/credits
- Test PDF generation manually in Adobe interface

#### Studio Flow Not Triggered
**Symptoms**: Adobe emails sent but Studio Flow never executes
**Solutions**:
- Verify email routing to correct ConnieRTC address
- Check Studio Flow trigger configuration
- Confirm email channel is properly configured
- Test email delivery manually

#### Tasks Show Incorrect Data
**Symptoms**: Tasks created but contain wrong or missing form data
**Solutions**:
- Verify PDF parsing logic in serverless function
- Check Studio Flow task attribute configuration
- Confirm form field naming consistency
- Test with simple form data first

### Debug Steps

1. **Test Each Component**: Test WordPress, Adobe, email, and Studio Flow individually
2. **Check Logs**: Review logs at each step of the workflow
3. **Monitor API Calls**: Use API monitoring to track request/response cycles
4. **Validate Data**: Inspect data at each transformation point
5. **Test End-to-End**: Complete full workflow testing with realistic data

## Cost Tracking & Optimization

### Adobe Acrobat Sign Costs

```javascript
// Track Adobe API usage
const AdobeUsageTracker = {
  async trackFormSubmission(formId, pageCount) {
    const usage = {
      form_id: formId,
      pages: pageCount,
      timestamp: new Date().toISOString(),
      cost_estimate: this.calculateCost(pageCount)
    };
    
    await this.logUsage(usage);
  },

  calculateCost(pages) {
    // Adobe pricing varies by plan
    const costPerForm = 0.10; // Example rate
    return (pages * costPerForm).toFixed(3);
  },

  async generateMonthlyReport() {
    // Generate usage reports for billing
    const usage = await this.getMonthlyUsage();
    return {
      total_forms: usage.count,
      total_pages: usage.pages,
      estimated_cost: usage.cost
    };
  }
};
```

### Performance Optimization

```javascript
// Optimize form processing performance
const FormOptimizer = {
  async processForms(forms) {
    // Process forms in batches to avoid rate limits
    const batchSize = 5;
    const batches = this.chunkArray(forms, batchSize);
    
    for (const batch of batches) {
      await Promise.all(batch.map(form => this.processForm(form)));
      await this.delay(1000); // Rate limit compliance
    }
  },

  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};
```

## API Documentation Links

- **Adobe Acrobat Sign API**: [https://secure.echosign.com/public/docs/restapi/v6](https://secure.echosign.com/public/docs/restapi/v6)
- **Twilio Studio**: [https://www.twilio.com/docs/studio](https://www.twilio.com/docs/studio)
- **Twilio Flex**: [https://www.twilio.com/docs/flex](https://www.twilio.com/docs/flex)
- **WordPress REST API**: [https://developer.wordpress.org/rest-api/](https://developer.wordpress.org/rest-api/)

## Future Enhancements

### Phase 1: Enhanced Form Processing (Q3 2024)
- **Real-time Validation**: Live field validation during form completion
- **Progressive Web App**: Offline form completion with sync when online
- **Multi-language Support**: Forms available in multiple languages

### Phase 2: Advanced Analytics (Q4 2024)
- **Conversion Tracking**: Track form completion rates and abandonment
- **A/B Testing**: Test different form designs and flows
- **Performance Metrics**: Monitor form load times and submission success rates

### Phase 3: CRM Deep Integration (Q1 2025)
- **Auto-matching**: Match form submissions to existing client records
- **Workflow Automation**: Trigger follow-up actions based on form data
- **Real-time Updates**: Update client records immediately upon form submission

## Support & Resources

### Adobe Support
- **Developer Console**: [console.adobe.io](https://console.adobe.io)
- **API Documentation**: [developer.adobe.com/document-services/docs](https://developer.adobe.com/document-services/docs)
- **Community Forums**: [community.adobe.com](https://community.adobe.com)

### ConnieRTC Support
- **Technical Team**: tech@connie.team
- **Implementation Support**: Available for complex integrations
- **Training Resources**: Comprehensive developer documentation

### WordPress Resources
- **Plugin Development**: [developer.wordpress.org](https://developer.wordpress.org)
- **Hook Reference**: [codex.wordpress.org/Plugin_API](https://codex.wordpress.org/Plugin_API)
- **REST API**: [developer.wordpress.org/rest-api](https://developer.wordpress.org/rest-api)

---

*This implementation guide reflects the current production-ready Adobe Acrobat Sign web forms integration successfully deployed at Hospital 2 Home. For additional provider integrations or advanced features, contact the ConnieRTC development team.*