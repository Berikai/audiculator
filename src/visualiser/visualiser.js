import { analyser, dataArray } from "../audio/context";
import { rotateCircles, shuffleCircles } from "./circles";
import { initializeDebugTrace, initializeVisualiser } from "./initialize";

// --- Visualiser Options ---
// This object acts as the global variable manager for the project, it's used to configure the visualiser's behavior and appearance.
// I prefer ideal functional programming approaches, but for this project, using a global options object is more practical and efficient.
// Although it seems to have flaws in terms of design purity, it works and it's good enough for such a project.
// 
// TODO: Relocate properties due to their parent *folders* in the gui/gui.js (lil-gui)
export const visualiserOptions = {
    render: {
        type: 0
    },
    scene: {
        alwaysLookCenter: true,
        cameraFov: 30,
        cameraDistance: 25,
        cameraVertical: 0,
        cameraHorizontal: 0,
        color: 0x000000,
        colorAlpha: 1
    },
    circle: {
        count: 27,
        size: 0.15,
        segments: 32,
        color: 0xffffff,
        colorShift: false,
        depthMirror: false,
        showLinesOnly: false,
        light3d: false,
    },
    circleMovement: {
        stop: false,
        space: 4,
        rotationSpeed: 25,
        expansionThreshold: 0.5,
        expansionDirection: 1,
        isVariatingSpeed: true,
        isCirclesSpin: false,
        maxSize: 2.5,
        minSize: 0.7,
        centerOffset: 0,
        symmetry: true
    },
    debugTrace: {
        count: 0,
        size: 0.3,
        random: true,
        changeRate: 60,
        minDelay: 30,
        squareColor: 0xff0000,
        lineColor: 0x00ff00
    },
    glow: {
        isActive: true,
        strength: 0.4,
        radius: 1,
        threshold: 0,
    }
}

initializeVisualiser();
initializeDebugTrace();

export function shuffleCirclesPair() {
    visualiserOptions.circle.shuffledCirclesPair[0] = shuffleCircles(visualiserOptions.circle.circlesPair[0]);
    visualiserOptions.circle.shuffledCirclesPair[1] = visualiserOptions.circleMovement.symmetry ? shuffleCircles(visualiserOptions.circle.circlesPair[1]) : shuffleCircles(visualiserOptions.circle.circlesPair[0]);
}

export function updateLines() {
    for (let i = 0; i < visualiserOptions.debugTrace.count; i++) {
        const line = visualiserOptions.debugTrace.lines[i];
        const circle1 = visualiserOptions.circle.shuffledCirclesPair[0][i];
        const circle2 = visualiserOptions.circle.shuffledCirclesPair[1][visualiserOptions.circle.shuffledCirclesPair[1].length - 1 - i];

        const updatedPoints = [circle1.position, circle2.position];
        line.geometry.setFromPoints(updatedPoints);
    }
}

export function updateSquares() {
    for (let i = 0; i < visualiserOptions.debugTrace.count; i++) {
        const square = visualiserOptions.debugTrace.squares[i];
        const square2 = visualiserOptions.debugTrace.squares[i+visualiserOptions.debugTrace.count];

        const circle1 = visualiserOptions.circle.shuffledCirclesPair[0][i];
        const circle2 = visualiserOptions.circle.shuffledCirclesPair[1][visualiserOptions.circle.shuffledCirclesPair[1].length - 1 - i];

        square.position.set(circle1.position.x, circle1.position.y, circle1.position.z);
        square2.position.set(circle2.position.x, circle2.position.y, circle2.position.z);

        square.scale.set(circle1.scale.x, circle1.scale.y, 1);
        square2.scale.set(circle2.scale.x, circle2.scale.y, 1);
    }
}

export function audioVisualiser() {
    if (analyser && !visualiserOptions.circleMovement.stop) {
        analyser.getByteFrequencyData(dataArray);
        rotateCircles(visualiserOptions.circle.circlesPair[0], true);
        if (visualiserOptions.circleMovement.symmetry) rotateCircles(visualiserOptions.circle.circlesPair[1], false);
        updateLines();
        updateSquares();
    }
    
}