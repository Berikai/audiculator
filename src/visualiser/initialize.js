import { visualiserOptions } from "./visualiser";
import { createCircles, shuffleCircles } from "./circles";
import { createLines } from "./debugTrace/lines";
import { createSquares } from "./debugTrace/squares";
import { scene } from "../three/context";

export function initializeDebugTrace() {
    // Remove the scene elements and related arrays if exists
    {
        if (visualiserOptions.debugTrace.lines) {
            for (let line of visualiserOptions.debugTrace.lines) {
                scene.remove(line);
                line.geometry.dispose();
                line.material.dispose();
            }
            visualiserOptions.debugTrace.lines.splice(0, visualiserOptions.debugTrace.lines.length);
        }
        
        if (visualiserOptions.debugTrace.squares) {
            for (let square of visualiserOptions.debugTrace.squares) {
                scene.remove(square);
                square.geometry.dispose();
                square.material.dispose();
            }
            visualiserOptions.debugTrace.squares.splice(0, visualiserOptions.debugTrace.squares.length);
        }
    }

    // Create lines and squares
    visualiserOptions.debugTrace.lines = createLines(visualiserOptions.debugTrace.count, { color: visualiserOptions.debugTrace.lineColor});
    visualiserOptions.debugTrace.squares = createSquares(visualiserOptions.debugTrace.count, { size: visualiserOptions.debugTrace.size, color: visualiserOptions.debugTrace.squareColor });
}

export function initializeVisualiser() {
    // Remove the scene elements and related arrays if exists
    if (visualiserOptions.circle.circlesPair) {
        for (let circles of visualiserOptions.circle.circlesPair) {
            circles.forEach(element => {
                scene.remove(element);
            });
            circles.splice(0, circles.length);
        }
    }

    // Create a pair of 'circles' arrays
    visualiserOptions.circle.circlesPair = [
        createCircles(visualiserOptions.circle.count, { size: visualiserOptions.circle.size, segments: visualiserOptions.circle.segments, color: visualiserOptions.circle.color}),
        visualiserOptions.circleMovement.symmetry ? createCircles(visualiserOptions.circle.count, { size: visualiserOptions.circle.size, segments: visualiserOptions.circle.segments, color: visualiserOptions.circle.color}) : []
    ];

    // Create shuffled pair of 'circles' arrays
    visualiserOptions.circle.shuffledCirclesPair = [
        shuffleCircles(visualiserOptions.circle.circlesPair[0]),
        visualiserOptions.circleMovement.symmetry ? shuffleCircles(visualiserOptions.circle.circlesPair[1]) : shuffleCircles(visualiserOptions.circle.circlesPair[0])
    ];
}