import { renderer } from "../three/context";


let ws = null;
let quality = 0.7;
let lastSent = 0;
let fps = 15;

export function setQuality(value) {
    quality = value;
}

export function setFPS(newFPS) {
    fps = newFPS;
}

export function closeWebsocket() {
    if (ws) {
        ws.close();
        ws = null;
    }
}

export function initializeWebsocket(address) {
    ws = new WebSocket(address);

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        alert('Unable to connect to the server. Please check the address and try again.');
        closeWebsocket();
    };

    ws.onclose = (event) => {
        console.warn('WebSocket connection closed:', event);
        ws = null;
    };

    ws.binaryType = 'arraybuffer';

    function sendFrame() {
        if (performance.now() - lastSent > 1000 / fps) {
            lastSent = performance.now();
            
            // Capture the current frame as JPEG
            renderer.domElement.toBlob(blob => {
                if (ws && ws.readyState === WebSocket.OPEN) {
                    ws.send(blob);
                }
            }, 'image/jpeg', quality);
        }

        if (ws) {
            requestAnimationFrame(sendFrame);
        }
    }

    ws.onopen = () => {
        console.log('Connected to relay server');
        sendFrame();
    };
}