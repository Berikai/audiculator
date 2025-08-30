import * as THREE from 'three';

import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

import { visualiserOptions } from '../visualiser/visualiser';
import { scene, camera, renderer } from './context';

export const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

let bloomPass = null;

export function initializeComposer() {
    composer.removePass(bloomPass);

    bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        visualiserOptions.glow.strength,
        visualiserOptions.glow.radius,
        visualiserOptions.glow.threshold
    );

    composer.setSize(window.innerWidth, window.innerHeight);
    composer.setPixelRatio(window.devicePixelRatio);

    composer.addPass(bloomPass);
}
