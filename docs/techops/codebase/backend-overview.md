---
sidebar_label: Backend Overview
sidebar_position: 3
title: "Backend Architecture"
---

# Backend Architecture

ConnieRTC's backend is built on Twilio Serverless Functions for scalable, secure API operations.

## Technology Stack

- **Twilio Serverless** - Serverless function platform
- **Node.js** - JavaScript runtime
- **Twilio API** - Communication platform APIs
- **Database Connectors** - Multi-database support

## Directory Structure

```
serverless-functions/
├── src/
│   ├── functions/
│   │   ├── common/           # Shared utilities
│   │   └── features/         # Feature-specific functions
│   ├── assets/               # Static files
│   └── utils/                # Helper functions
├── .env                      # Environment variables
└── package.json
```

## Feature Functions Pattern

Each feature's serverless functions follow:

```
features/
└── [feature-name]/
    ├── studio/               # Studio Flow webhooks
    ├── flex/                 # Flex API endpoints
    └── common/               # Shared feature functions
```

## Development

### Running Locally

```bash
cd serverless-functions
npm install
npm start
```

### Environment Configuration

Required environment variables in `.env`:

```env
ACCOUNT_SID=AC...
AUTH_TOKEN=...
TWILIO_FLEX_WORKSPACE_SID=WS...
```

## Function Types

### Protected Functions
Require Twilio signature validation:
```javascript
// filename.protected.js
exports.handler = async function(context, event, callback) {
  // Only accessible via Twilio webhooks
};
```

### Public Functions
Accessible without authentication:
```javascript
// filename.js
exports.handler = async function(context, event, callback) {
  // Accessible to any client
};
```

## Deployment

```bash
# Deploy to Twilio
npm run deploy

# Deploy specific environment
./deploy.sh [account-name]
```

---

*For debugging and troubleshooting, see the [Debugging Best Practices](/techops/codebase/debugging) guide.*
