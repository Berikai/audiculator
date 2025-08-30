import "./gui/gui"

import { initMic } from "./audio/context";
import { camera, renderer, initializeTHREE } from "./three/context";
import { initializeComposer, composer } from "./three/composer";
import { animate } from "./three/animate";

// Initialize three.js
initializeTHREE();

// Initialize composer for GLOW
initializeComposer();

// Request microphone access
await initMic();

// Update loop
await animate();

// Update screen size and aspect ratio on resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    initializeComposer(composer);
});