# NSS Admin Tools v2.0 - User Flow Guide for UAT Testing

## Overview
This directory contains a professional screenshot-based flow diagram designed to guide Nevada Senior Services (NSS) UAT testers through the complete navigation path of the new Admin Tools v2.0 features.

## Files Included

### 📸 Screenshots (./screenshots/)
- `00-default-connieRTC.png` - Starting point: ConnieRTC ConnieRTC view
- `01-admin-tools-entry.png` - Admin Tools & Data page
- `02-channel-manager.png` - Channel Manager with NSS phone numbers
- `03-data-center-hub.png` - Data Center with Analytics & Playback
- `04-voicemail-playback.png` - Voicemail list with controls
- `05-fax-viewer.png` - Fax viewer with PDF display
- `06-nss-dashboard.png` - Live analytics dashboard

### 📊 Flow Diagram Files
- `flow-diagram-viewer.html` - **Main deliverable**: Interactive HTML viewer
- `nss-admin-tools-flow-diagram.excalidraw.json` - Excalidraw source file for editing

## How to Use

### For NSS UAT Team (Immediate Use)
1. Open `flow-diagram-viewer.html` in any web browser
2. Follow the numbered steps and colored arrows
3. Use the testing instructions at the bottom of the page
4. Print or screenshot the page for reference during testing

### For Email Distribution
1. Open `flow-diagram-viewer.html` in Chrome or Firefox
2. Use browser's Print function (Ctrl+P / Cmd+P)
3. Select "Save as PDF" or "Print to PDF"
4. Attach the PDF to your email to NSS team

### For Future Editing
1. Go to [Excalidraw.com](https://excalidraw.com)
2. Click "Open" and upload `nss-admin-tools-flow-diagram.excalidraw.json`
3. Make your edits
4. Export as PNG or save updated JSON

## Flow Structure

```
Start (Step 1) → Entry Point (Step 2) → Two Paths:
├── Path A: Channel Manager (Step 3A)
└── Path B: Data Center (Step 3B) → Three Destinations:
    ├── Voicemail Playback (Step 4A)
    ├── Fax Viewer (Step 4B)
    └── Analytics Dashboard (Step 4C)
```

## Testing Paths for NSS

### Path A: Channel Management (Green arrows)
**Purpose**: Test phone number and channel configuration features
1. Start → Admin Tools → Channel Manager
2. Verify NSS phone numbers are displayed correctly
3. Test channel status and configuration options

### Path B: Data & Analytics (Red/Purple arrows)
**Purpose**: Test reporting and media playback features
1. Start → Admin Tools → Data Center Hub
2. **Voicemail Testing**: Load and playback voicemail messages
3. **Fax Testing**: View and download fax documents
4. **Analytics Testing**: Review live contact center performance data

## Color Coding
- **Blue**: Initial navigation (Steps 1-2)
- **Green**: Channel Manager path (Step 3A)
- **Red**: Data Center access (Step 3B)
- **Purple**: Data Center features (Steps 4A-4C)

## Professional Features
- Clean, uncluttered layout
- Clear navigation arrows with descriptive labels
- Professional appearance suitable for client communication
- Readable screenshot sizing optimized for email attachment
- Consistent styling and color coordination
- Practical testing instructions included

## Technical Notes
- All screenshots captured at optimal resolution for clarity
- HTML file uses relative paths to screenshots for portability
- Responsive design works on different screen sizes
- Print-friendly CSS for PDF generation
- Excalidraw JSON preserves editability for future updates

## Success Criteria
✅ NSS testers can follow the visual guide without getting lost  
✅ Professional appearance suitable for client communication  
✅ Screenshot integration enhances understanding vs. text-only diagrams  
✅ Easily attachable to email communications  
✅ Reusable template for future UAT packages  

## Contact
For questions about this flow diagram or to request updates, contact the CTO or development team.

---
*Generated for NSS UAT Testing - Admin Tools v2.0 Deployment - August 12, 2025*