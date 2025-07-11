// renderer.js
const { ipcRenderer } = require('electron');

let isDarkMode = false;

// Function to generate and display the QR code
async function generateQrCode() {
    const canvas = document.getElementById('qr-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const qrDataURL = await ipcRenderer.invoke('get-qr-code', isDarkMode);
    
    const img = new Image();
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    };
    img.src = qrDataURL;
}

// Listen for theme change from main process
ipcRenderer.on('set-theme', (event, shouldUseDarkColors) => {
    isDarkMode = shouldUseDarkColors;
    document.body.classList.toggle('dark-mode', isDarkMode);
    // Regenerate QR code with new theme colors if it's visible
    if (document.getElementById('connect-view').style.display !== 'none') {
        generateQrCode();
    }
});

// Listen for the connection event from the main process
ipcRenderer.on('device-connected', (event, ipAddress) => {
    console.log(`Renderer received connection from: ${ipAddress}`);
    const connectView = document.getElementById('connect-view');
    const connectedView = document.getElementById('connected-view');
    const ipText = document.getElementById('connected-ip-text');

    connectView.style.display = 'none';
    connectedView.style.display = 'flex';
    ipText.textContent = `Connected to device at ${ipAddress}.`;
});

// When the DOM is fully loaded, the 'set-theme' event from main.js 
// will trigger the first QR code generation.
window.addEventListener('DOMContentLoaded', () => {
    // Initial setup is handled by the 'set-theme' event listener
});