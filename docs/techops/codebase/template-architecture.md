---
sidebar_label: Template Architecture
sidebar_position: 1
title: "ConnieRTC Template Architecture"
---

# ConnieRTC Template Architecture

Welcome to ConnieRTC codebase reference! This section covers the template architecture and development patterns used across the platform.

## Development Environment Setup

### Prerequisites
- Node.js 18+
- Twilio CLI
- Git

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/ConnieML/basecamp-v26.02
cd basecamp-v26.02

# Install dependencies
npm install

# Set up environment
npm run generate-env

# Start development server
npm start
```

## Architecture Overview

ConnieRTC follows a modular architecture:

```
├── plugin-flex-ts-template-v2/   # Frontend (React/TypeScript)
├── serverless-functions/         # Backend (Node.js/Twilio)
├── docs/                        # Documentation (Docusaurus)
├── infra-as-code/               # Infrastructure (Terraform)
└── addons/                      # Additional features
```

## Development Workflow

### 1. Set Up Your Environment
Follow the Quick Setup above to get your development environment ready.

### 2. Create a Feature Branch
Always work on a separate branch:

```bash
# Make sure you're on main and up to date
git checkout main
git pull origin main

# Create a new branch for your feature/fix
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes
- Follow coding standards
- Test locally first
- Add tests for new features

### 4. Test Thoroughly
```bash
# Run all tests
npm test

# For documentation changes, test locally
cd docs
npm start  # Check http://localhost:3010
```

### 5. Commit Your Changes
Use clear, descriptive commit messages:

```bash
git add .
git commit -m "Add feature description

- Detail change 1
- Detail change 2"
```

## Key Resources

### Frontend Development
- **React Components** - UI component library
- **Flex Hooks** - Integration with Twilio Flex
- **Styling Guide** - CSS and theming

### Backend Development
- **Serverless Functions** - API and business logic
- **Database Integration** - Data access patterns
- **Security Best Practices** - Secure coding

## Pull Request Guidelines

### What Makes a Good PR?
- **Single focus** - One feature/fix per PR
- **Clear description** - Explain what and why
- **Tests included** - Especially for new features
- **Documentation updated** - If you change functionality
- **Small and reviewable** - Easier to review = faster merge

---

*See individual sections for detailed documentation on each component.*
