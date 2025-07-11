# Cursair Desktop

Cursair is a cross-platform desktop application that transforms your mobile device into a wireless mouse controller for your computer. Using a secure QR code connection system, it enables seamless and intuitive cursor control from your smartphone.

![Cursair Logo](assets/foreground.png)

## Features

- 🔒 Secure QR code-based pairing system
- 🌓 Automatic dark/light theme support
- 📱 Wireless mobile device control
- 🔐 Unique session password generation
- 🌐 Works over local WiFi network
- 💻 Cross-platform support (Windows, macOS, Linux)

## Tech Stack

### Desktop Application
- [Electron](https://www.electronjs.org/) - Cross-platform desktop framework
- [Node.js](https://nodejs.org/) - Runtime environment
- [RobotJS](https://robotjs.io/) - Native system automation
- [QRCode](https://www.npmjs.com/package/qrcode) - QR code generation

## Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher
- Your computer and mobile device must be on the same WiFi network

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cursair-desktop.git
cd cursair-desktop
```

2. Install dependencies:
```bash
npm install
```

## Development

Run the application in development mode:
```bash
npm start
```

## Building for Production

### Windows
```bash
npm run build:win
```

### macOS
```bash
npm run build:mac
```

### Linux
```bash
npm run build:linux
```

The built applications will be available in the `dist` directory.

## Mobile Companion App

Cursair requires the Cursair mobile app to function. The mobile app is available for:
- Android: https://cursair.vercel.app

### How it Works

1. Launch the Cursair desktop application
2. Open the Cursair mobile app
3. Use the mobile app to scan the QR code displayed on your desktop
4. Once connected, your mobile device becomes a wireless mouse controller

## Security

Cursair uses a secure connection system:
- Unique session passwords are generated for each connection
- Device whitelisting after successful authentication
- Local network-only operation
- Encrypted communication between devices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Support

For support, bug reports, and feature requests, please open an issue on the GitHub repository.
