import { websocketStream } from "./websocket/stream";

// If the user is on the streaming page, show the streamed frame buffers
// This is useful for relaying the display to browser contexts that don't support WebGL
if (window.location.pathname === '/stream') {
    // Example: http://localhost:5173/stream?ws=ws://192.168.1.4:8080

    // Quick note: Can't connect to local websocket server while using Vite for who knows whatever reason.
    // Use your ip address at local network, eg. ws://192.168.1.4:8080
    const wsUrl = new URLSearchParams(window.location.search).get('ws') || 'ws://localhost:8080';
    websocketStream(wsUrl);
} else {
    import('./main.js');
}