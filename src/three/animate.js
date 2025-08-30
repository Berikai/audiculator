import "../gui/gui"
import { stats } from "../gui/stats"

import { audioVisualiser, shuffleCirclesPair, visualiserOptions } from "../visualiser/visualiser";
import { scene, camera, renderer } from "./context";
import { composer } from "./composer";
import { getRendering, renderNextFrame } from "../webcodec/render";

export async function animate() {
    // Start performance measure
    stats.begin();

    // Get frame count to shuffle
    const frame = requestAnimationFrame(animate);

    // Shuffle cards every so often to create a debugTrace focus change effect.
    if (frame % ((visualiserOptions.debugTrace.random ? (Math.floor(Math.random() * visualiserOptions.debugTrace.changeRate)) : visualiserOptions.debugTrace.changeRate) + visualiserOptions.debugTrace.minDelay) === 0) {
        shuffleCirclesPair();
    }

    // Visualize!!!
    // Note: I prefer UK version of the word (visualise with an s) in the code.
    // It just seemed easier on the eye for me. I think I deserve to put whatever the hell I want in my own code, since the word is almost everywhere in the code, lmao.
    // I'll name the project "visualizer", anyways, though.
    audioVisualiser();

    // Update camera pos
    camera.position.x = visualiserOptions.scene.cameraHorizontal;
    camera.position.y = visualiserOptions.scene.cameraVertical;
    camera.position.z = visualiserOptions.scene.cameraDistance;

    // Look at the center of the scene
    if(visualiserOptions.scene.alwaysLookCenter) {
        camera.lookAt(scene.position);
    } else {
        camera.lookAt(
          visualiserOptions.scene.cameraHorizontal, 
          visualiserOptions.scene.cameraVertical,
          visualiserOptions.scene.cameraDistance
        );
    }

    // Update square rotations to match camera
    visualiserOptions.debugTrace.squares.forEach(square => {
        square.rotation.copy(camera.rotation);
    });

    // Enable/disable GLOW
    if (!visualiserOptions.glow.isActive) {
        renderer.render(scene, camera);
    } else {
        composer.render(scene, camera);
    }

    // If rendering, capture the frames
    if (getRendering()) {
        await renderNextFrame();
    }

    // End performance measure
    stats.end();
}