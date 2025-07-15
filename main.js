// main.js
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('path');
const os = require('os');
const QRCode = require('qrcode');
const { startServer } = require('./server.js');

let serverPassword; // Store the password globally

function getLocalWifiIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        if (/wlan|wi-fi|en0/i.test(name)) { 
            for (const iface of interfaces[name]) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    return iface.address;
                }
            }
        }
    }
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

function createWindow() {
     const iconPath = nativeTheme.shouldUseDarkColors
    ? path.join(__dirname, "assets/logo_dark.png")
    : path.join(__dirname, "assets/logo_light.png");

    const mainWindow = new BrowserWindow({
        width: 960,
        height: 540, 
        minWidth: 840,
        minHeight: 480,
        resizable: true,
        maximizable: true,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js')
        },
        autoHideMenuBar: true,
        backgroundColor: nativeTheme.shouldUseDarkColors ? '#121212' : '#F0F0F0',
        show: false,
        icon: iconPath,
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.loadFile('index.html');

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('set-theme', nativeTheme.shouldUseDarkColors);
    });

    nativeTheme.on('updated', () => {
        mainWindow.webContents.send('set-theme', nativeTheme.shouldUseDarkColors);
        mainWindow.setBackgroundColor(nativeTheme.shouldUseDarkColors ? '#121212' : '#F0F0F0');
    });

    // Handle device connection and disconnection events
    const handleDeviceConnection = (event, ipAddress) => {
        mainWindow.webContents.send('device-connected', ipAddress);
    };

    const handleDeviceDisconnection = (event, ipAddress) => {
        mainWindow.webContents.send('device-disconnected', ipAddress);
    };

    // Start server and get the generated password
    serverPassword = startServer(
        // Connection callback
        (ipAddress) => {
            mainWindow.webContents.send('device-connected', ipAddress);
        },
        // Disconnection callback
        (ipAddress) => {
            mainWindow.webContents.send('device-disconnected', ipAddress);
        }
    );
}

app.whenReady().then(() => {
    ipcMain.handle('get-qr-code', async (event, isDarkMode) => {
        const qrData = {
            targetIp: getLocalWifiIp(),
            targetPort: 8765,
            password: serverPassword, 
        };
        
        const jsonString = JSON.stringify(qrData);

        const qrOptions = {
            errorCorrectionLevel: 'H',
            type: 'png',
            color: {
                dark: isDarkMode ? '#EDE0D4' : '#3C3C3C',
                light: '#00000000',
            },
            width: 300, 
            margin: 0, 
        };

        return await QRCode.toDataURL(jsonString, qrOptions);
    });

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});