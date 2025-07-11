<div align="center">
  <img src="assets/foreground.png" alt="Cursair Logo" width="60" height="60" align="center">
  
  <!-- Title with intended styling: font-family: Poppins, font-size: 48px, color: #EDE0D4 -->
  <h1 align="center">𝗖𝘂𝗿𝘀𝗮𝗶𝗿</h1>

  <p align="center">
    Transform your smartphone into a wireless mouse with secure, low-latency control
    <br />
    <a href="#features"><strong>Explore Features »</strong></a>
    ·
    <a href="#installation">Installation</a>
    ·
    <a href="https://github.com/Yogesh-Surya-G/cursair-desktop/issues">Report Bug</a>
    ·
    <a href="https://github.com/Yogesh-Surya-G/cursair-desktop/issues">Request Feature</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/github/license/Yogesh-Surya-G/cursair-desktop" alt="License">
    <img src="https://img.shields.io/github/stars/Yogesh-Surya-G/cursair-desktop" alt="Stars">
    <img src="https://img.shields.io/github/issues/Yogesh-Surya-G/cursair-desktop" alt="Issues">
  </p>
</div>

---

## 🎯 Overview

Cursair is a cross-platform desktop application that transforms your mobile device into a wireless mouse controller. Using a secure QR code connection system and UDP protocol for ultra-low latency, it enables seamless and intuitive cursor control from your smartphone.

## ✨ Features

- 🔒 **Secure QR Code Pairing** - One-time secure connection through QR code scanning
- ⚡ **Ultra-Low Latency** - UDP-based communication for real-time cursor control
- 🌓 **Adaptive Theming** - Automatic dark/light theme support
- 📱 **Wireless Control** - Use your smartphone as a wireless trackpad
- 🔐 **Enhanced Security** - Unique session passwords and device whitelisting
- 🌐 **Network Friendly** - Works over local WiFi network
- 💻 **Cross-Platform** - Supports Windows, macOS, and Linux

## 🛠️ Technology Stack

### Desktop Application
- ⚛️ [Electron](https://www.electronjs.org/) - Cross-platform desktop framework
- 🟩 [Node.js](https://nodejs.org/) - Runtime environment
- 🤖 [RobotJS](https://robotjs.io/) - Native system automation
- 📱 [QRCode](https://www.npmjs.com/package/qrcode) - QR code generation

### Network Protocol
Cursair uses UDP (User Datagram Protocol) for its network communications, offering several advantages:
- ⚡ **Low Latency** - Minimal overhead for real-time cursor movement
- 🎯 **Fast Processing** - No connection establishment required
- 📊 **Efficient Packets** - Small packet size for movement data
- 🔄 **Real-time Updates** - Continuous cursor position updates

## 📋 Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher
- Computer and mobile device on the same WiFi network

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Yogesh-Surya-G/cursair-desktop.git
cd cursair-desktop
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the application in development mode:
```bash
npm start
```

### Building

Please ensure you have the required dependencies before installing:

#### Windows
- windows-build-tools npm package:
```bash
npm install --global --production windows-build-tools  # Run in elevated PowerShell or CMD
```

#### macOS
- Xcode Command Line Tools

#### Linux
- Python (v2.7 recommended, v3.x.x is not supported)
- make
- GCC or other C/C++ compiler
- Required dev packages:
```bash
sudo apt-get install libxtst-dev libpng++-dev
```

#### For all platforms
Install node-gyp:
```bash
npm install -g node-gyp
```

Then build:
```bash
node-gyp rebuild
```

After setting up the build environment, build the application on the respective platform:

> **Note**: For best results, build the application on the platform you're targeting. Cross-platform building might not work correctly due to native dependencies.

```bash
# Run this command on the platform you want to build for
npm run dist
```

For example:
- On Windows: Run `npm run dist` to build Windows executable
- On macOS: Run `npm run dist` to build macOS app
- On Linux: Run `npm run dist` to build Linux package

Built applications will be available in the `dist` directory.

## 📱 Mobile Companion App

Cursair requires the mobile app companion to function:
- Android: [Available on Web](https://cursair.vercel.app)
- iOS: Coming Soon

### How it Works

1. 💻 Launch Cursair desktop application
2. 📱 Open Cursair mobile app
3. 📸 Scan the QR code with your mobile device
4. ✨ Start controlling your cursor wirelessly!

## 🔒 Security Features

- 🔐 **Session Security**
  - Unique password generation for each session
  - Secure QR code-based pairing system
  
- 🛡️ **Network Security**
  - Device whitelisting after authentication
  - Local network-only operation
  - Encrypted communication channels

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

Need help? Found a bug? Have a feature request?
- 🐛 [Open an issue](https://github.com/Yogesh-Surya-G/cursair-desktop/issues)
- 📧 [Send us an email](mailto:yogesh.gorrepati30@gmail.com)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/Yogesh-Surya-G">Yogesh Surya G</a>
</div>
