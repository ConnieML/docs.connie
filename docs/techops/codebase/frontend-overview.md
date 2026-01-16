---
sidebar_label: Frontend Overview
sidebar_position: 2
title: "Frontend Architecture"
---

# Frontend Architecture

ConnieRTC's frontend is built with modern web technologies for contact center functionality.

## Technology Stack

- **React** - Component-based UI library
- **TypeScript** - Type-safe JavaScript
- **Twilio Flex** - Contact center framework
- **Twilio Paste** - Design system components

## Directory Structure

```
plugin-flex-ts-template-v2/
├── src/
│   ├── feature-library/      # Feature implementations
│   ├── types/                # TypeScript definitions
│   ├── utils/                # Utility functions
│   └── FlexTSTemplatePlugin.tsx
├── public/
│   └── appConfig.js          # Local dev configuration
└── package.json
```

## Feature Library Pattern

Each feature follows a consistent structure:

```
feature-library/
└── [feature-name]/
    ├── flex-hooks/           # Flex integration points
    ├── custom-components/    # React components
    ├── types/                # Feature-specific types
    └── index.ts              # Feature entry point
```

## Development

### Running Locally

```bash
cd plugin-flex-ts-template-v2
npm install
npm start
```

### Local Configuration

Edit `public/appConfig.js` to toggle features during local development:

```javascript
var appConfig = {
  features: {
    "feature-name": {
      enabled: true,
      // feature-specific config
    }
  }
};
```

## Integration Points

### Flex Actions
Override or extend Flex actions for custom behavior.

### Flex Components
Replace or add to Flex UI components.

### Flex Reducers
Manage custom state alongside Flex state.

---

*For feature-specific frontend documentation, see the individual feature guides in the Feature Library.*
