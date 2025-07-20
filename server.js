const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const robot = require('robotjs');
const { generatePassword } = require('./utils');
const path = require('path');
const { spawn } = require('child_process');



let serverPassword;


function getPythonPath() {
    const isDev = process.env.NODE_ENV === 'development';
    
    if (isDev) {
        return 'python';
    } else {
        const resourcesPath = process.resourcesPath;
        return path.join(resourcesPath, 'python-dist', 'python.exe');
    }
}


function getScrollScriptPath() {
    const isDev = process.env.NODE_ENV === 'development';
    
    if (isDev) {
        return path.join(__dirname, 'scroll.py');
    } else {
        const resourcesPath = process.resourcesPath;
        return path.join(resourcesPath, 'scroll.py');
    }
}

function sendMouseWheelScroll(scrollDistance) {
    const pythonPath = getPythonPath();       
    const scriptPath = getScrollScriptPath(); 
    
    const pythonProcess = spawn(pythonPath, [scriptPath, scrollDistance.toString()]);
    
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });
    
    // Add these for better debugging
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python output: ${data}`);
    });
    
    pythonProcess.on('error', (error) => {
        console.error(`Process error: ${error.message}`);
    });
}





function startServer(onConnectCallback, onDisconnectCallback) {
  const whitelist = [];
  serverPassword = generatePassword(); 

  server.on('error', (err) => {
    console.error(`Server error:\n${err.stack}`);
    server.close();
  });

  server.on('message', (msg, rinfo) => {
    try {
      const object = JSON.parse(msg.toString());
      if(object.event !== "stream") {
        console.log(`Received message from ${rinfo.address}:${rinfo.port} - ${JSON.stringify(object)}`);
      }
      if (whitelist.includes(rinfo.address)) {
        // Handle events for whitelisted devices
        switch(object.event) {
          case "stream":
            if (object.dx !== undefined && object.dy !== undefined) {
              const currentPos = robot.getMousePos();
              robot.moveMouse(currentPos.x + object.dx, currentPos.y + object.dy);
            }
            break;
          case "lmb":
            robot.mouseClick('left');
            break;
          case "rmb":
            robot.mouseClick('right');
            break;
          case "mmb":
            robot.mouseClick('middle');
            break;
          case 'lmb_down':
              robot.mouseToggle('down', 'left');
              break;
          case 'rmb_down':
              robot.mouseToggle('down', 'right');
              break;
          case 'lmb_up':
              robot.mouseToggle('up', 'left');
              break;
          case 'rmb_up':
              robot.mouseToggle('up', 'right');
              break;
          case "scroll":
            if (object.dist !== undefined) {
                const scrollDistance = object.dist;
                sendMouseWheelScroll(scrollDistance);
            }
            break;
          case "disconnect":
            console.log(`Device ${rinfo.address} disconnected.`);
            const index = whitelist.indexOf(rinfo.address);
            if (index > -1) {
              whitelist.splice(index, 1);
              if (onDisconnectCallback) {
                onDisconnectCallback(rinfo.address);
              }
            }
            break;
        }
      } else {
        // Handle authentication for non-whitelisted devices
        if (object.password === serverPassword) {
          console.log(`Password correct. Adding ${rinfo.address} to whitelist.`);
          whitelist.push(rinfo.address);

          // Notify the main process of the new connection
          if (onConnectCallback) {
            onConnectCallback(rinfo.address);
          }
          
          const message = Buffer.from("CONNECTED");
          server.send(message, rinfo.port, rinfo.address, (err) => {
            if (err) console.error('Error sending confirmation:', err);
            else console.log(`Connection confirmation sent to ${rinfo.address}`);
          });
        } else {
          console.log(`Invalid password attempt from ${rinfo.address}`);
        }
      }
    } catch (e) {
      console.error('Error parsing message:', e);
    }
  });

  server.on('listening', () => {
    const address = server.address();
    console.log(`UDP Server listening on ${address.address}:${address.port}`);
  });

  server.bind(8765);
  return serverPassword; // Return the generated password
}

module.exports = { startServer };