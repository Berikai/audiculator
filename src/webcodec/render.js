import { renderer } from "../three/context";
import {
	Output,
	BufferTarget,
	Mp4OutputFormat,
	CanvasSource,
    QUALITY_VERY_HIGH,
    VideoSampleSource,
    VideoSample,
    MediaStreamAudioTrackSource
} from 'mediabunny';
import { visualiserOptions } from "../visualiser/visualiser";
import { micStream } from "../audio/context";

// --- mediabunny setup ---
let output;
let videoSource;
let audioSource;

let frame = 0;
const fps = 60;
//const totalFrames = 300; // (5s at 60fps) // TODO: To be used with frame-based rendering once it's implemented

// Realtime rendering timing variables
let startTime = 0
let lastTimestamp = null;

// State of rendering for animate() loop
let isRendering = false;

export const getRendering = () => isRendering;

export async function startRender() {
    output = new Output({
        format: new Mp4OutputFormat(),
        target: new BufferTarget(),
    });

    if (visualiserOptions.render.type === 0/* 0 === realtime, 1 === frame*/) {
        videoSource = new CanvasSource(renderer.domElement, {
            codec: "avc",
            bitrate: QUALITY_VERY_HIGH,
            sizeChangeBehavior: 'contain'
        });

        audioSource = new MediaStreamAudioTrackSource(micStream.getAudioTracks()[0], {
            codec: 'opus',
            bitrate: QUALITY_VERY_HIGH,
        })

        audioSource.errorPromise.catch(err => {
            console.error("Audio source error:", err);
        });

        output.addAudioTrack(audioSource);

        // Initialize timing variables
        startTime = performance.now();
        lastTimestamp = null;

    } else {
        videoSource = new VideoSampleSource({
            codec: 'avc',
            bitrate: QUALITY_VERY_HIGH,
            sizeChangeBehavior: 'contain'
        });

        // TODO: Implement frame-based rendering, useful for non-live rendering
    }

    output.addVideoTrack(videoSource);

    await output.start();

    isRendering = true;
}

export async function stopRender() {
    frame = 0;    
    isRendering = false;
    await output.finalize();

    downloadVideo();
    return;
}

export async function renderNextFrame() {
    if (!isRendering) return;

    // TODO: Implement predefined render length after non-live audio support
    /*if (frame >= totalFrames) {
        await stopRender();
        return;
    }*/

    if (visualiserOptions.render.type === 0/* 0 === realtime, 1 === frame*/) {
        const now = (performance.now() - startTime) / 1000;
        let duration = 0.0167; // default ~60fps

        if (lastTimestamp !== null) {
            duration = now - lastTimestamp;
        }

        await videoSource.add(now, duration); 

        //await videoSource.add(frame / fps, 1 / fps); // * Code for fixed 60 fps, as a reference, in case it's needed

        lastTimestamp = now;
    } else {
        const videoFrame = new VideoFrame(renderer.domElement, {
            timestamp: frame / fps
        })

        await videoSource.add(new VideoSample(videoFrame, { timestamp: frame / fps })); 

        videoFrame.close();
    }

    frame++;
}



export function downloadVideo() {
    const buffer = output.target.buffer; // ArrayBuffer containing the final MP4 file

    // Collect the chunk data into an array
    const blob = new Blob([buffer], {type: 'video/mp4'});

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "audiculator-export.mp4";
    a.click();
}