const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const robot = require('robotjs');
const { generatePassword } = require('./utils');

let serverPassword;

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
          case "scroll":
            if (object.dist !== undefined) {
               //TODO
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