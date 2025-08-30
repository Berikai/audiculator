import * as THREE from 'three';
import { scene } from "../three/context";
import { dataArray } from "../audio/context";
import { visualiserOptions } from './visualiser';

export function createCircles(circleCount, {
    size = 0.2, 
    segments = 32, 
    color = 0xffffff
}) {
    let circles = [];
    const _color = color;
    for (let i = 0; i < circleCount; i++) {
        let geometry = null;

        switch (segments) {
            case 16: // Sphere
                geometry = new THREE.SphereGeometry(size, segments, segments);
                break;
            case 2: // Square (3D)
                geometry = new THREE.BoxGeometry(size, size, size);
                break;
            case 4: // Square
                geometry = new THREE.PlaneGeometry(size, size);
                break;
            case 1: // Triangle
                geometry = new THREE.CircleGeometry(size, segments);
                break;
            default: // Circle
                geometry = new THREE.CircleGeometry(size, segments);
        }   

        if (typeof visualiserOptions.circle.colorShift === "number") {
            const brightness = Math.floor(255 * (i / (circleCount - 1)));
            color = (brightness << visualiserOptions.circle.colorShift);
        }

        if (visualiserOptions.circle.colorShift === true) {
            const brightness = Math.floor(255 * (i / (circleCount - 1)));
            // Shift brightness for each channel based on _color (0: R, 8: G, 16: B)
            color = (brightness << _color) | (brightness << (_color + 8)) | (brightness << (_color + 16));
        } 

        const material = visualiserOptions.circle.showLinesOnly ? new THREE.LineBasicMaterial({ color }) : (visualiserOptions.circle.light3d ? new THREE.MeshLambertMaterial({ color }) : new THREE.MeshBasicMaterial({ color }));

        let circle;
        if (visualiserOptions.circle.showLinesOnly) {
            const edges = new THREE.EdgesGeometry(geometry); 
            circle = new THREE.LineSegments(edges, material); 
        } else {
            circle = new THREE.Mesh(geometry, material);
        }

        // Fix rotation for specific segment counts
        switch (segments) {
            case 2: // 3D Square (Box)
                circle.rotation.z = 0;
                break;
            case 4: // 2D Square (Plane)
                circle.rotation.z = 0;
                break;
            case 1: // Triangle
                circle.rotation.z = Math.PI / 6;
                break;
            case 16: // Sphere
                circle.rotation.z = 0;
                break;
            default: // Circle and others
                circle.rotation.z = 0;
        }

        scene.add(circle);
        circles.push(circle);
    }
    return circles;
}

export function rotateCircles(circles, isClockwise = true) {
    for (let i = 0; i < dataArray.length; i++) {
        const decayRate = visualiserOptions.circleMovement.expansionThreshold; // Adjust for faster/slower decay
        if (i !== -1) {
            dataArray[i] = (dataArray[i] / 255) * (255 - i*decayRate);
        }
    }
    for (let i = 0; i < circles.length; i++) {
        // Orbit around a point (e.g., origin)
        const orbitRadius = isClockwise
        ? // if
            ((dataArray[i] / 255) * visualiserOptions.circleMovement.space - visualiserOptions.circleMovement.centerOffset) 
        : // else
            ((dataArray[i] / 255) * visualiserOptions.circleMovement.space + visualiserOptions.circleMovement.centerOffset)         
        ; // end

        const angle = (i / circles.length / 0.2) * Math.PI * 2 + performance.now() * (visualiserOptions.circleMovement.rotationSpeed / 25) * 0.002 + (visualiserOptions.circleMovement.isVariatingSpeed ? (dataArray[1] / dataArray[0]) || 0 : 0);
        circles[i].position.x = (isClockwise ? 1 : -1) * Math.cos(angle) * orbitRadius;
        circles[i].position.y = Math.sin(angle) * orbitRadius;
        circles[i].position.z = (visualiserOptions.circleMovement.expansionDirection) * (visualiserOptions.circle.depthMirror ? (i%2 ? 1 : -1) : -1)  * (dataArray[i] / 255) * 5;

        circles[i].scale.x = Math.max((dataArray[i] / 255) * visualiserOptions.circleMovement.maxSize, visualiserOptions.circleMovement.minSize);
        circles[i].scale.y = Math.max((dataArray[i] / 255) * visualiserOptions.circleMovement.maxSize, visualiserOptions.circleMovement.minSize);
        circles[i].scale.z = Math.max((dataArray[i] / 255) * visualiserOptions.circleMovement.maxSize, visualiserOptions.circleMovement.minSize);

        if(visualiserOptions.circleMovement.isCirclesSpin) {
            circles[i].rotation.z += 0.1; 
            if (visualiserOptions.circle.segments === 16 || visualiserOptions.circle.segments === 2) {
                circles[i].rotation.x += 0.01; 
            }
        }
    }
}

export const shuffleCircles = (circles) => circles.slice().sort(() => Math.random() - 0.5);