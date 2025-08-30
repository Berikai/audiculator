export function websocketStream(address) {
    const ws = new WebSocket(address);
    ws.binaryType = 'arraybuffer';

    const canvas = document.createElement('canvas');
    document.querySelector('.app').appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.id = 'canvas';

    ws.onmessage = event => {
        const blob = new Blob([event.data], { type: 'image/jpeg' });
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width / window.devicePixelRatio;
            canvas.height = img.height / window.devicePixelRatio;

            // Set canvas CSS size exactly to match the image
            canvas.style.width = canvas.width + 'px';
            canvas.style.height = canvas.height + 'px';

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            const pixel = ctx.getImageData(0, 0, 1, 1).data;
            
            document.body.style.backgroundColor = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

            URL.revokeObjectURL(img.src); // free memory
        };
        img.src = URL.createObjectURL(blob);
    };
}