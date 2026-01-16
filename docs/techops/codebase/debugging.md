---
sidebar_label: "Debugging Best Practices"
sidebar_position: 4
title: "Debugging Best Practices & Emergency Response"
---

# Debugging Best Practices & Emergency Response

## Overview

This guide provides comprehensive debugging strategies for Connie serverless functions and features. Following these practices will prevent debugging emergencies and enable rapid resolution when issues occur.

## Emergency Response Protocol

### When Connie Features Break in Production

**Step 1: Immediate Diagnostics (First 2 minutes)**
```bash
# Primary diagnostic tool - START HERE
twilio serverless:logs --service-sid [SERVICE_SID] --tail

# Check recent call activity
twilio api:core:calls:list --limit 5 --status failed
```

**Step 2: Function-Specific Investigation**
```bash
# Get recent function executions
twilio serverless:logs --service-sid [SERVICE_SID] --function-sid [FUNCTION_SID] --limit 20

# Check specific function health
curl -X POST https://[DEPLOYMENT_DOMAIN]/[FUNCTION_PATH] \
  -d "CallSid=test&mode=debug" \
  -H "Content-Type: application/x-www-form-urlencoded"
```

**Step 3: Studio Flow Analysis**
```bash
# Check flow executions
twilio api:studio:v2:flows:executions:list --flow-sid [FLOW_SID] --limit 10

# Get execution details
twilio api:studio:v2:flows:executions:fetch --flow-sid [FLOW_SID] --sid [EXECUTION_SID]
```

## Mandatory Logging Standards

### Required Logging Pattern for ALL Functions

Every Connie serverless function MUST implement this logging pattern:

```javascript
exports.handler = async function(context, event, callback) {
  // 1. ENTRY LOGGING (Always include)
  console.log('=== [FUNCTION_NAME] DEBUG START ===');
  console.log('Event parameters:', JSON.stringify(event, null, 2));
  console.log('Context domain:', context.DOMAIN_NAME);
  console.log('Timestamp:', new Date().toISOString());

  try {
    // 2. PARAMETER VALIDATION LOGGING
    console.log('Validating required parameters...');
    const requiredParams = ['CallSid', 'From', 'To'];
    for (const param of requiredParams) {
      if (!event[param]) {
        console.error(`VALIDATION ERROR: Missing ${param}`);
        return callback(new Error(`Missing required parameter: ${param}`));
      }
    }
    console.log('Parameter validation passed');

    // 3. BUSINESS LOGIC LOGGING
    console.log('Processing mode:', event.mode || 'initial');
    console.log('Caller info:', { from: event.From, to: event.To, callSid: event.CallSid });

    // Your function logic here...

    // 4. SUCCESS LOGGING
    console.log('Function completed successfully');
    console.log('Result:', JSON.stringify(result, null, 2));
    console.log('=== [FUNCTION_NAME] DEBUG END ===');
    return callback(null, result);

  } catch (error) {
    // 5. ERROR LOGGING (Critical!)
    console.error('=== [FUNCTION_NAME] ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Event data:', JSON.stringify(event, null, 2));
    console.error('=== ERROR END ===');

    return callback(error);
  }
};
```

## Diagnostic Commands Reference

### Essential Twilio CLI Commands

```bash
# Real-time function logs (PRIMARY DIAGNOSTIC TOOL)
twilio serverless:logs --service-sid [SERVICE_SID] --tail

# Function-specific logs
twilio serverless:logs --service-sid [SERVICE_SID] --function-sid [FUNCTION_SID]

# Studio Flow execution analysis
twilio api:studio:v2:flows:executions:list --flow-sid [FLOW_SID] --limit 10

# Recent call analysis
twilio api:core:calls:list --limit 10 --status completed
twilio api:core:calls:list --limit 10 --status failed

# TaskRouter debugging
twilio api:taskrouter:v1:workspaces:tasks:list --workspace-sid [WORKSPACE_SID] --limit 10
twilio api:taskrouter:v1:workspaces:workflows:list --workspace-sid [WORKSPACE_SID]
```

### Advanced Debugging Commands

```bash
# Specific call investigation
twilio api:core:calls:fetch --sid [CALL_SID]
twilio api:core:calls:recordings:list --call-sid [CALL_SID]

# Studio Flow deep dive
twilio api:studio:v2:flows:executions:steps:list --flow-sid [FLOW_SID] --execution-sid [EXECUTION_SID]

# TaskRouter task details
twilio api:taskrouter:v1:workspaces:tasks:fetch --workspace-sid [WORKSPACE_SID] --sid [TASK_SID]

# Function deployment verification
twilio serverless:functions:list --service-sid [SERVICE_SID]
twilio serverless:environments:list --service-sid [SERVICE_SID]
```

## Pre-Deployment Testing Checklist

Before deploying ANY Connie feature:

- [ ] **Entry/exit logging present** - Function logs start and completion
- [ ] **Error handling with full context** - Comprehensive error logging
- [ ] **Parameter validation with logging** - Log all validation steps
- [ ] **Business logic steps logged** - Key decision points logged
- [ ] **External API calls logged** - Full request/response logging
- [ ] **Success/failure states logged** - Clear outcome logging
- [ ] **Environment variables validated** - Required config present
- [ ] **Function responds to test calls** - Basic functionality verified

## Common Debugging Scenarios

### Scenario 1: "Option not available at this time"

**Symptoms**: Callers hear this message when trying to use voicemail or callback features

**Investigation Steps**:
1. Check workflow SID configuration in Studio Flow
2. Verify workflow exists and is active
3. Check function logs for workflow lookup errors
4. Validate TaskRouter workspace configuration

**Common Causes**:
- Hardcoded workflow SID in wrong environment
- Workflow disabled or deleted
- Queue configuration mismatch

### Scenario 2: Email notifications not sending

**Symptoms**: Voicemails recorded but no email notifications sent

**Investigation Steps**:
1. Check Mailgun API credentials and domain configuration
2. Verify function logs for email sending attempts
3. Test Mailgun API independently
4. Check email attachment processing

**Common Causes**:
- Wrong Mailgun API key (private vs domain-specific)
- Domain not verified in Mailgun
- Attachment size limits exceeded

### Scenario 3: Studio Flow not executing

**Symptoms**: Calls not reaching Flex or functions

**Investigation Steps**:
1. Verify phone number webhook configuration
2. Check Studio Flow publication status
3. Review Flow execution logs
4. Validate webhook URL format

**Common Causes**:
- Phone number not configured with Studio Flow
- Flow in draft status, not published
- Invalid webhook URLs in Flow widgets

## Troubleshooting Decision Tree

```
1. Is the function receiving requests?
   ├── NO → Check phone number webhook configuration
   └── YES → Continue to step 2

2. Are parameters being passed correctly?
   ├── NO → Check Studio Flow widget configuration
   └── YES → Continue to step 3

3. Is parameter validation passing?
   ├── NO → Review required parameter list and validation logic
   └── YES → Continue to step 4

4. Are external API calls succeeding?
   ├── NO → Check API credentials and network connectivity
   └── YES → Continue to step 5

5. Is business logic executing correctly?
   ├── NO → Review function logic and error handling
   └── YES → Check result handling and callback execution
```

## Conclusion

Following these debugging practices ensures:
- Rapid emergency response (minutes vs hours/days)
- Comprehensive diagnostic information
- Consistent troubleshooting approach
- Prevention of future emergencies

**Remember**: Without proper logging, emergencies take days to solve. With proper logging, they take minutes.

Every Connie feature must be "emergency-ready" with comprehensive diagnostic logging.
