const FVVideoPlayer = {
    video: () => {
        const video = document.createElement("video");
        video.id = "videoPlayer", video.controls = true;
        video.addEventListener("loadedmetadata", FVVideoPlayer._resize);
        video.addEventListener("timeupdate", FCUI.updateCurrentFrame);
        return video;
    },
    canvas : () => {
        const canvas = document.createElement("canvas");
        canvas.id = "videoAnalyzer", canvas.hidden = true;
        canvas.addEventListener("click", FCUI.clickVideoAnalyzer);
        canvas.getContext("2d").willReadFrequently = true;
        return canvas;
    },
    load: arrayBuffer => {
        const videoPlayer = document.getElementById("videoPlayer");
        videoPlayer.src = URL.createObjectURL(new Blob([arrayBuffer]));
    },
    setCurrentFrame: (frameRate, currentFrame) => {
        const videoPlayer = document.getElementById("videoPlayer");
        const { currentTime } = videoPlayer;
        const timeOffset = currentFrame * 1.0 / frameRate;
        videoPlayer.currentTime = Math.floor(currentTime) + timeOffset;
    },
    isPlaying: () => {
        const videoPlayer = document.getElementById("videoPlayer");
        if (videoPlayer.currentTime <= 0) return false;
        if (videoPlayer.paused || videoPlayer.ended) return false;
        return !videoPlayer.seeking && videoPlayer.readyState > 2;
    },
    showAnalyzer: () => {
        const videoPlayer = document.getElementById("videoPlayer");
        videoPlayer.hidden = true;
        const videoAnalyzer = document.getElementById("videoAnalyzer");
        videoAnalyzer.hidden = false;
        const { width, height } = videoPlayer;
        const context = videoAnalyzer.getContext("2d");
        context.drawImage(videoPlayer, 0, 0, width, height);
    },
    hideAnalyzer: () => {
        document.getElementById("videoPlayer").hidden = false;
        document.getElementById("videoAnalyzer").hidden = true;
    },
    rgb: (pageX, pageY) => {
        const videoAnalyzer = document.getElementById("videoAnalyzer");
        const { width, height } = videoAnalyzer;
        const context = videoAnalyzer.getContext("2d");
        const cp = document.getElementById("cp");
        const y = pageY - FVVideoPlayer._heightOffset(cp);
        const data = context.getImageData(pageX - cp.offsetLeft, y, 1, 1).data;
        const [r, g, b] = data;
        return [r, g, b].reduce((rgb, color) => {
            const hex = color.toString(16);
            return rgb + (hex.length <= 1 ? "0" + hex : hex);
        }, "");
    },
    laneXY: (pageX, pageY) => {
        const cp = document.getElementById("cp");
        return [pageX - cp.offsetLeft, pageY - FVVideoPlayer._heightOffset(cp)];
    },
    play: startTime => {
        const videoPlayer = document.getElementById("videoPlayer");
        videoPlayer.currentTime = startTime;
        videoPlayer.play();
    },
    imageData: (x, y, w, h) => {
        const videoPlayer = document.getElementById("videoPlayer");
        const videoAnalyzer = document.getElementById("videoAnalyzer");
        const context = videoAnalyzer.getContext("2d");
        context.clearRect(0, 0, videoAnalyzer.width, videoAnalyzer.height);
        const vx = x * videoPlayer.videoWidth * 1.0 / videoAnalyzer.width;
        const vy = y * videoPlayer.videoHeight * 1.0 / videoAnalyzer.height;
        const vw = w * videoPlayer.videoWidth * 1.0 / videoAnalyzer.width;
        const vh = h * videoPlayer.videoHeight * 1.0 / videoAnalyzer.height;
        context.drawImage(videoPlayer, vx, vy, vw, vh, 0, 0, w, h);
        return context.getImageData(0, 0, w + 1, h + 1).data;
    },
    clearCanvas: () => {
        const videoAnalyzer = document.getElementById("videoAnalyzer");
        const context = videoAnalyzer.getContext("2d");
        context.clearRect(0, 0, videoAnalyzer.width, videoAnalyzer.height);
        videoAnalyzer.hidden = true;
        document.getElementById("videoPlayer").hidden = false;
    },
    _resize: () => {
        const videoPlayer = document.getElementById("videoPlayer");
        const { videoWidth, videoHeight } = videoPlayer;
        const ratio = videoWidth * 1.0 / videoHeight;
        const { width, height } = window.screen;
        const cp = document.getElementById("cp");
        const maxHeight = height - FVVideoPlayer._heightOffset(cp);
        const tempWidth = Math.min(videoWidth, width);
        const newHeight = Math.floor(Math.min(tempWidth / ratio, maxHeight));
        const newWidth = Math.floor(newHeight * ratio);
        const videoAnalyzer = document.getElementById("videoAnalyzer");
        videoPlayer.width = videoAnalyzer.width = newWidth;
        videoPlayer.height = videoAnalyzer.height = newHeight;
        FCUI.didResizeVideo();
    },
    _heightOffset: cp => cp.offsetHeight + cp.offsetTop * 2
};