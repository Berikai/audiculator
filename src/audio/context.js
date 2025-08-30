// Audio setup
export let context = new (window.AudioContext || window.webkitAudioContext)();
export let analyser, dataArray, micStream;

export async function getCurrentMicDevice() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const [track] = stream.getAudioTracks();

  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.find(d => d.label === track.label && d.kind === "audioinput");
}

export async function getDevicesList() {
    const devices = await navigator.mediaDevices.enumerateDevices();

    const mics = devices.filter(d => d.kind === "audioinput");
    const micDeviceMap = {};
    mics.forEach(device => {
        micDeviceMap[device.label] = device.deviceId;
    });

    return micDeviceMap;
}

// Ask for microphone
export async function initMic(deviceId) {
    if(!navigator.mediaDevices) {
        alert("Couldn't access microphone, try to turn on your microphone permissions.");
        return;
    }

    if (context.state === "suspended") {
        await context.resume();
    }

    // In case screen sharing is needed
    /*micStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true 
    });*/

    micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
            deviceId: deviceId ? { exact: deviceId } : undefined,
            sampleRate: 48000,
            channelCount: 2,   // Stereo
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false
        }
    });
    
    let src = context.createMediaStreamSource(micStream);
    analyser = context.createAnalyser();
    analyser.fftSize = 64;
    src.connect(analyser);

    dataArray = new Uint8Array(analyser.frequencyBinCount);
}
export async function stopMic() {
    micStream.getTracks().forEach(track => track.stop());
}

export async function initAudio(url) {
    let audio = new Audio("music.mp3");
    audio.crossOrigin = "anonymous";
    audio.loop = true;
    let context = new (window.AudioContext || window.webkitAudioContext)();
    let src = context.createMediaElementSource(audio);
    analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 64;

    dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    audio.play();
}