const FVGraph = {
    _PATH_COLOR: new ImageData(new Uint8ClampedArray([255, 0, 0, 255]), 1, 1),
    img: () => {
        const img = document.createElement("img");
        img.id = "img", img.hidden = true;
        return img;
    },
    canvas: () => {
        const canvas = document.createElement("canvas");
        canvas.id = "analyzedResult";
        canvas.getContext("2d").willReadFrequently = true;
        return canvas;
    },
    load: dataURL => {
        const img = document.getElementById("img");
        img.src = dataURL;
        FVGraph.resize();
    },
    resize: () => {
        const img = document.getElementById("img");
        const videoCP = document.getElementById("videoCP");
        const maxWidth = window.screen.width - videoCP.clientWidth;
        const ratio = img.width * 1.0 / img.height;
        img.height = window.screen.height, img.width = img.height * ratio;
        if (img.width > maxWidth) {
            img.width = maxWidth, img.height = maxWidth / ratio;
        }
        const canvas = document.getElementById("analyzedResult");
        canvas.width = img.width, canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
    },
    drawPath: (ballXRatio, ballYRatio) => {
        console.log("FVGraph.drawPath", "ballXRatio", ballXRatio, "ballYRatio", ballYRatio)
        const canvas = document.getElementById("analyzedResult");
        const x = canvas.width * ballXRatio, y = canvas.height * ballYRatio;
        canvas.getContext("2d").putImageData(FVGraph._PATH_COLOR, x, y);
    }
};