const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const robot = require('robotjs');
const { generatePassword } = require('./utils');

let serverPassword;

function startServer(onConnectCallback) {
  const whitelist = [];
  serverPassword = generatePassword(); 

  server.on('error', (err) => {
    console.error(`Server error:\n${err.stack}`);
    server.close();
  });

  server.on('message', (msg, rinfo) => {
    try {
      const object = JSON.parse(msg.toString());

      if (whitelist.find(ip => ip === rinfo.address)) {
        // Device is whitelisted, move the mouse
        if (object.dx !== undefined && object.dy !== undefined) {
           const currentPos = robot.getMousePos();
           robot.moveMouse(currentPos.x + object.dx, currentPos.y + object.dy);
        }
      } else {
        // Device is not whitelisted, check password
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