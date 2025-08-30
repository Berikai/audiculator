import GUI from 'lil-gui'; 
import { stats } from "./stats"

import { getCurrentMicDevice, getDevicesList, initMic, stopMic } from '../audio/context';

import { renderer, camera } from '../three/context';
import { visualiserOptions } from '../visualiser/visualiser';
import { initializeDebugTrace, initializeVisualiser } from '../visualiser/initialize';
import { initializeComposer } from '../three/composer';
import { initializeWebsocket, closeWebsocket, setQuality, setFPS } from '../websocket/websocket';
import { startRender, stopRender } from '../webcodec/render';

// ---*--- GUI - 1 ---*---
const gui = new GUI({ title: 'Audiculator'})
.onFinishChange(() => {
	localStorage.setItem('preset', JSON.stringify(gui.save()));
})
.onChange((event) => {
	// TODO: Keyframe Automation
	// The below code can be used to add a feature that spots the last touched value and opens a dialog to animate it.
	/*
	const controller = event.controller;
	const value = event.value;

	controller.setValue(value);
	*/
});

const guiOptions = {
	resetPreset: function() {
		gui.reset();
	},
	savePreset: function() {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({version: '0.1.0', ...gui.save()}));
		const downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute("href", dataStr);
		downloadAnchorNode.setAttribute("download", "preset.json");
		document.body.appendChild(downloadAnchorNode);
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	},
	loadPreset: function() {
		const presetInput = document.createElement('input');
		presetInput.type = 'file';
		presetInput.accept = '.json,application/json';
		presetInput.onchange = (e) => {
			const file = e.target.files[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const preset = JSON.parse(event.target.result);
					gui.load(preset);
				} catch (err) {
					alert('Invalid preset file.');
				}
			};
			reader.readAsText(file);
		};
		presetInput.click();
		presetInput.remove();
	},
	showStats: false,
	audioInputDevice: null,
	restartMicrophone: async function() {
		// Restart microphone
        await initMic(this.audioInputDevice);
	},
	stopMicrophone: async function() { 
        // Stop microphone
        await stopMic();
    },
	// Websocket Display Relay Options
	relay: {
		ip: "ws://localhost:8080",
		quality: 0.7,
		fps: 15,
		run: function() {
			// Close if there any...
			closeWebsocket();

			// Initialize WebSocket
			// Note: doesn't work before initMic(), don't know why...
			initializeWebsocket(this.ip);

			runRelay.disable();
			stopRelay.enable();
		},
		stop: function() {
			closeWebsocket();

			runRelay.enable();
			stopRelay.disable();
		},
	},
	render: {
		startRender: async function() {
			await startRender();
		},
		stopRender: async function(){
			await stopRender();
		}	
	}
};

// Wrapped around a try to check microphone access to prevent future application collapse
try {
	guiOptions.audioInputDevice = (await getCurrentMicDevice()).deviceId;
} catch (e) {
	alert('Please allow microphone access.');
	window.location.reload();
}



// --- PRESETS ---
gui.add(guiOptions, 'savePreset');
gui.add(guiOptions, 'loadPreset');
gui.add(guiOptions, 'resetPreset');




// --- MICROPHONE (AUDIO INPUT) ---
const microphoneFolder = gui.addFolder('audioInput');

microphoneFolder.add(guiOptions, 'audioInputDevice', {none: null, ...await getDevicesList()})
.name('inputSource')
.onChange((value) => {
	stopMic();
	guiOptions.audioInputDevice = value;

	if(value) {
		initMic(value);
	}
});

microphoneFolder.add(guiOptions, 'restartMicrophone')
.name('start');

microphoneFolder.add(guiOptions, 'stopMicrophone')
.name('stop');




// --- RENDER ---
const renderFolder = gui.addFolder('render')
.close();

const selectRenderType = renderFolder.add(visualiserOptions.render, 'type', {realtime: 0, /*frame_based: 1*/})

const startRenderButton = renderFolder.add(guiOptions.render, 'startRender')
.onChange(() => {
	startRenderButton.disable();
	stopRenderButton.enable();
	selectRenderType.disable();
})

const stopRenderButton = renderFolder.add(guiOptions.render, 'stopRender')
.disable()
.onChange(() => {
	stopRenderButton.disable();
	startRenderButton.enable();
	selectRenderType.enable();
})



// --- SCENE ---
const sceneFolder = gui.addFolder('scene')
.close();

sceneFolder.addColor(visualiserOptions.scene, 'color')
.name('backgroundColor')
.onChange(() => {
	renderer.setClearColor(visualiserOptions.scene.color, 1); 
});
renderer.setClearColor(visualiserOptions.scene.color, 1); 

sceneFolder.add(visualiserOptions.scene, 'colorAlpha', 0, 1)
.name('backgroundColorAlpha')
.onChange(() => {
	renderer.setClearColor(visualiserOptions.scene.color, visualiserOptions.scene.colorAlpha); 
});

sceneFolder.add(visualiserOptions.scene, 'alwaysLookCenter')
.onChange(() => {
	camera.updateProjectionMatrix();
});

sceneFolder.add(visualiserOptions.scene, 'cameraFov', 10, 150)
.onChange(() => {
	camera.fov = visualiserOptions.scene.cameraFov;
	camera.updateProjectionMatrix();
})
sceneFolder.add(visualiserOptions.scene, 'cameraDistance', 2, 50)
sceneFolder.add(visualiserOptions.scene, 'cameraVertical', -30, 30)
sceneFolder.add(visualiserOptions.scene, 'cameraHorizontal', -30, 30)




// --- CIRCLE ---
const circleFolder = gui.addFolder('circle')
.close();

circleFolder.add( visualiserOptions.circle, 'count', 1, 64)
.name('count')
.step(1)
.onChange(() => {
	if(visualiserOptions.debugTrace.count > visualiserOptions.circle.count) {
		visualiserOptions.debugTrace.count = visualiserOptions.circle.count;
		debugTraceCount.updateDisplay();
		initializeDebugTrace();
	}
	initializeVisualiser();
});

circleFolder.add(visualiserOptions.circle, 'size', 0.01, 1)
.name('size')
.step(0.01)
.onChange(() => {
	if(visualiserOptions.debugTrace.size < visualiserOptions.circle.size) {
		visualiserOptions.debugTrace.size = visualiserOptions.circle.size;
		debugTraceSize.updateDisplay();
		initializeDebugTrace();
	}
	initializeVisualiser();
});

circleFolder.add(visualiserOptions.circle, 'segments', { "sphere (3D)": 16, "square (3D)": 2, "circle": 32, "square": 4, "triangle": 1 })
.name('shape')
.step(1)
.onChange(() => {
	initializeVisualiser();
});

circleFolder.addColor(visualiserOptions.circle, 'color')
.onChange(() => {
	initializeVisualiser();
});

circleFolder.add(visualiserOptions.circle, 'colorShift', { false: false, red: 16, green: 8, blue: 32, manual: true})
.onChange(() => {
	initializeVisualiser();
});

circleFolder.add(visualiserOptions.circleMovement, 'isCirclesSpin')
.name('doCirclesSpin');

circleFolder.add(visualiserOptions.circle, 'showLinesOnly')
.onChange(() => {
	initializeVisualiser();
});

circleFolder.add(visualiserOptions.circle, 'light3d')
.onChange(() => {
	initializeVisualiser();
});




// --- CIRCLE MOVEMENT ---
const circleMovementFolder = gui.addFolder('circleMovement')
.close();

circleMovementFolder.add(visualiserOptions.circleMovement, 'stop');

circleMovementFolder.add(visualiserOptions.circleMovement, 'space', 1, 64)
.name('space')
.step(1)

circleMovementFolder.add( visualiserOptions.circleMovement, 'centerOffset', -1, 1)
.step(0.1);

circleMovementFolder.add( visualiserOptions.circleMovement, 'maxSize', 0, 10)
.step(0.1);

circleMovementFolder.add( visualiserOptions.circleMovement, 'minSize', 0, 10)
.step(0.1);

circleMovementFolder.add(visualiserOptions.circleMovement, 'expansionThreshold', 0, 6)
.step(0.1)

circleMovementFolder.add(visualiserOptions.circleMovement, 'expansionDirection', { inwards: 1, outwards: -1 });

circleMovementFolder.add(visualiserOptions.circleMovement, 'rotationSpeed', -100, 100)
.name('rotationSpeed')
.step(1)

circleMovementFolder.add(visualiserOptions.circleMovement, 'isVariatingSpeed')
.name('musicalSpeedVariation');

circleMovementFolder.add(visualiserOptions.circle, 'depthMirror')

circleMovementFolder.add(visualiserOptions.circleMovement, 'symmetry')
.onChange(() => {
	initializeVisualiser();
});




// --- DEBUG ---
const debugFolder = gui.addFolder('debugTrace')
.close();

const debugTraceCount = debugFolder.add(visualiserOptions.debugTrace, 'count', 0, 64)
.name('count')
.step(1)
.onChange(() => {
	if(visualiserOptions.debugTrace.count > visualiserOptions.circle.count) {
		visualiserOptions.debugTrace.count = visualiserOptions.circle.count;
		debugTraceCount.updateDisplay();
	}
	initializeDebugTrace();
});

const debugTraceSize = debugFolder.add(visualiserOptions.debugTrace, 'size', 0, 0.8)
.name('size')
.step(0.01)
.onChange(() => {
	if(visualiserOptions.debugTrace.size < visualiserOptions.circle.size) {
		visualiserOptions.debugTrace.size = visualiserOptions.circle.size;
		debugTraceSize.updateDisplay();
	}
	initializeDebugTrace();
});

debugFolder.add(visualiserOptions.debugTrace, 'random');

debugFolder.add(visualiserOptions.debugTrace, 'changeRate', 1, 240)
.step(1);

debugFolder.add(visualiserOptions.debugTrace, 'minDelay', 0, 240)
.step(1);

debugFolder.addColor(visualiserOptions.debugTrace, 'squareColor')
.onChange(() => {
	initializeDebugTrace();
});

debugFolder.addColor(visualiserOptions.debugTrace, 'lineColor')
.onChange(() => {
	initializeDebugTrace();
});




// --- GLOW ---
const glowFolder = gui.addFolder('glow')
.close();

glowFolder.add( visualiserOptions.glow, 'isActive');

glowFolder.add( visualiserOptions.glow, 'strength', 0, 15)
.onChange(() => {
	initializeComposer();
});

glowFolder.add( visualiserOptions.glow, 'radius', 0, 5)
.step(0.01)
.onChange(() => {
	initializeComposer();
});

glowFolder.add( visualiserOptions.glow, 'threshold', 0, 1)
.step(0.01)
.onChange( () => {
	initializeComposer();
});




// ---*--- GUI2 ---*---
const devGui = new GUI()
.close();

devGui.title('devTools')

// Position the second GUI panel
devGui.domElement.style.position = 'fixed';
devGui.domElement.style.top = `${25}px`;
devGui.domElement.style.zIndex = '1000';

devGui.add(guiOptions, 'showStats')
.name('stats')
.onChange(() => {
	stats.dom.style.display = guiOptions.showStats ? 'block' : 'none';
});

// --- RELAY DISPLAY BUFFER (WEBSOCKET) ---
const websocketFolder = devGui.addFolder('relayDisplayBuffer')

websocketFolder.add(guiOptions.relay, 'ip')
.name('websocketAddr');

websocketFolder.add(guiOptions.relay, 'quality', 0.01, 1)
.onChange((value) => {
	setQuality(value)
});

websocketFolder.add(guiOptions.relay, 'fps', 1, 60)
.onChange((value) => {
	setFPS(value)
});

const runRelay = websocketFolder.add(guiOptions.relay, 'run')
.name('stream');

const stopRelay = websocketFolder.add(guiOptions.relay, 'stop');
stopRelay.disable();




// Show/Hide GUI
gui.title('Audiculator - (Press H to hide)');
window.addEventListener('keypress', (event) => {
	if(event.key === 'h') {
		gui.domElement.style.display = gui.domElement.style.display === 'none' ? 'block' : 'none';
		devGui.domElement.style.display = devGui.domElement.style.display === 'none' ? 'block' : 'none';
		keyframeGui.domElement.style.display = keyframeGui.domElement.style.display === 'none' ? 'block' : 'none';
	}
});




// Load previous workspace as preset
if (localStorage.getItem('preset')) {
	try {
		const preset = JSON.parse(localStorage.getItem('preset'));
		gui.load(preset);
	} catch (e) {
		console.warn('Invalid preset in localStorage.');
	}
}