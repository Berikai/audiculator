import * as THREE from 'three';
import { scene } from "../../three/context";

// Using Line2, just in case we want to be able to use linewidth property
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

export function createSquares(lineCount, {
    size = 0.3, 
    linewidth = 1,
    color = 0xff0000
}) {
    let squares = [];
    for (let i = 0; i < lineCount * 2; i++) {
        const points = [
            new THREE.Vector3(-size, -size, 0),
            new THREE.Vector3(size, -size, 0),
            new THREE.Vector3(size, size, 0),
            new THREE.Vector3(-size, size, 0),
            new THREE.Vector3(-size, -size, 0) // back to start
        ];
        const geometry = new LineGeometry().setFromPoints(points);
        const material = new LineMaterial({ color, linewidth });
        const squareLine = new Line2(geometry, material);
        scene.add(squareLine);
        squares.push(squareLine);
    }
    return squares;
}