import * as THREE from 'three';
import { scene } from "../../three/context";

export function createLines(lineCount, {
    color = 0x00ff00
}) {
    let lines = []; 
    for (let i = 0; i < lineCount; i++) {
        const material = new THREE.LineBasicMaterial({ color });
        const points = [];
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(0, 0, 0));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        lines.push(line);
    }
    return lines;
}