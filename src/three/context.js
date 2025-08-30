import * as THREE from "three";

export let scene = new THREE.Scene();
export let camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.1, 1000);
export let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

export function initializeTHREE() {
    // Add light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 25);
    scene.add(directionalLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    
    // Setup the scene
    scene.background = null;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.querySelector('.app').appendChild(renderer.domElement);
}

camera.updateProjectionMatrix();