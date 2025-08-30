// A simple websocket relay server for streaming
// For more info, check src/preloader.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const clients = new Set();

wss.on('connection', ws => {
  clients.add(ws);

  ws.on('message', msg => {
    // Broadcast to all other clients
    for (let client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

console.log('Relay server running on ws://localhost:8080');