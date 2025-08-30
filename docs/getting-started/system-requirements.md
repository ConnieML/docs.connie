---
sidebar_label: System Requirements
sidebar_position: 1
title: "System Requirements"
---

# System Requirements

Ensure your organization's technology infrastructure meets these requirements for optimal ConnieRTC performance.

## Operating System Requirements

### Windows
- **Windows 10** or newer (recommended)
- **Windows 8.1** (minimum supported)
- **Processor**: Intel Core i3 or AMD equivalent
- **RAM**: 4 GB minimum, 8 GB recommended
- **Storage**: 500 MB available disk space

### macOS
- **macOS 10.15** (Catalina) or newer (recommended)
- **macOS 10.13** (High Sierra) minimum supported
- **Processor**: Intel Core i3 or Apple Silicon (M1/M2)
- **RAM**: 4 GB minimum, 8 GB recommended
- **Storage**: 500 MB available disk space

### Linux
- **Ubuntu 18.04** LTS or newer
- **CentOS 7** or newer
- **Processor**: Intel Core i3 or AMD equivalent
- **RAM**: 4 GB minimum, 8 GB recommended

---

## Supported Browsers

ConnieRTC is optimized for modern web browsers with the latest security features and WebRTC support.

### Primary Support (Recommended)
- **Google Chrome** 90+ ✅
- **Microsoft Edge** 90+ ✅
- **Mozilla Firefox** 88+ ✅

### Limited Support
- **Safari** 14+ (macOS only) - *Some features may be limited*

:::info Browser Requirements
For the best experience and access to all features, we strongly recommend using the latest version of Google Chrome or Microsoft Edge. These browsers provide optimal WebRTC support for voice calling and screen sharing features.
:::

### Unsupported Browsers
- Internet Explorer (all versions)
- Chrome versions older than 90
- Firefox versions older than 88

If you must use a different browser, please contact [support@connie.one](mailto:support@connie.one) for assistance.

---

## Network & Firewall Requirements

### Required Ports
Your network firewall must allow the following ports:

| Port | Protocol | Purpose | Required |
|------|----------|---------|----------|
| 80 | TCP | HTTP traffic | ✅ |
| 443 | TCP | HTTPS traffic (primary) | ✅ |
| 5060-5061 | TCP/UDP | SIP signaling | Voice features |
| 10000-20000 | UDP | RTP media streams | Voice features |

### Firewall Configuration
If you experience connection issues, ensure your firewall allows:
- Outbound HTTPS connections to `*.connie.one`
- WebRTC peer-to-peer connections
- WebSocket connections for real-time messaging

:::warning Firewall Support
If you cannot modify firewall settings, contact your IT administrator. ConnieRTC support cannot adjust your local network firewall settings.
:::

### Common ISP Firewall Documentation
- [Comcast/Xfinity Firewall Settings](https://www.xfinity.com/support/articles/wireless-gateway-firewall)
- [Verizon FiOS Firewall Settings](https://www.verizon.com/support/residential/internet/equipment/routers)
- [AT&T Router Settings](https://www.att.com/support/smallbusiness/internet/u-verse-business/equipment/routers-and-gateways/)
- [Spectrum Firewall Configuration](https://www.spectrum.net/support/internet/modem-router-settings/)

---

## Bandwidth Requirements

ConnieRTC requires stable internet connectivity for optimal performance across all communication channels.

### Minimum Requirements (Per Agent)
- **Download**: 5 Mbps
- **Upload**: 1 Mbps
- **Latency**: Less than 100ms

### Recommended Requirements (Per Agent)
- **Download**: 10 Mbps
- **Upload**: 2 Mbps
- **Latency**: Less than 50ms

### Voice Quality Requirements
For high-quality voice calls:
- **Minimum**: 64 kbps up/down per concurrent call
- **Recommended**: 128 kbps up/down per concurrent call
- **Codec**: G.722 (HD voice) or G.711 (standard)

### Bandwidth Testing
Test your connection speed using:
- [Fast.com](https://fast.com) (Netflix speed test)
- [Speedtest.net](https://speedtest.net) (Ookla speed test)
- [TestMySpeed.onl](https://testmyspeed.onl) (Alternative testing)

:::tip Bandwidth Optimization
- Close unnecessary applications during peak usage
- Use wired Ethernet connections when possible
- Ensure Quality of Service (QoS) prioritizes VoIP traffic
- Consider bandwidth usage of other users on your network
:::

---

## Hardware Recommendations

### For Voice Agents
- **Headset**: USB or wireless headset with noise cancellation
- **Microphone**: Built-in or external microphone with echo cancellation
- **Speakers**: Not recommended for voice work (use headsets)
- **Camera**: HD webcam for video calls (optional)

### For Supervisors
- **Monitor**: Dual monitors recommended for queue management
- **Audio**: Quality speakers or headphones for monitoring
- **Camera**: HD webcam for team meetings

### For Administrators
- **Storage**: Additional storage for call recordings and logs
- **Backup**: Reliable backup solution for configuration data
- **Security**: Hardware security keys for admin accounts (recommended)

---

## Mobile Device Support

ConnieRTC offers limited mobile support for emergency access and basic functions.

### Supported Mobile Browsers
- **iOS Safari** 14+ (iPhone/iPad)
- **Android Chrome** 90+ (Android 8+)

### Mobile Limitations
- Voice calling may be limited
- Full agent desktop not available
- Recommended for admin/supervisor monitoring only

---

## Security Requirements

### SSL/TLS
- **Required**: TLS 1.2 or higher
- **Certificates**: Valid SSL certificates for all ConnieRTC domains
- **HSTS**: HTTP Strict Transport Security enabled

### Authentication
- **Two-Factor Authentication** (2FA) strongly recommended
- **Single Sign-On** (SSO) supported for enterprise customers
- **Password Requirements**: Minimum 8 characters with complexity

---

## Troubleshooting Performance Issues

### Common Performance Problems

**Slow Page Loading**
- Check bandwidth requirements above
- Disable browser extensions temporarily
- Clear browser cache and cookies

**Voice Quality Issues**
- Test bandwidth with tools listed above
- Check for network congestion during peak hours
- Verify firewall ports are open

**Browser Compatibility**
- Update to latest browser version
- Enable JavaScript and cookies
- Disable ad blockers for ConnieRTC domains

### Getting Help

If you continue to experience technical difficulties:

1. **Check Status Page**: [status.connie.one](https://status.connie.one)
2. **Contact Support**: [support@connie.one](mailto:support@connie.one)
3. **Emergency Support**: Available 24/7 for critical issues

Include the following information when contacting support:
- Operating system and version
- Browser name and version
- Network configuration details
- Specific error messages or symptoms

---

*These requirements ensure optimal performance for your nonprofit's communication needs. Regular updates may modify these requirements - check this page quarterly for the latest information.*