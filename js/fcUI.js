const FCUI = {
    setFrameRate: ({ target }) => {
        FMFrameRateStartEndTime.FrameRate = target.value;
    },
    loadVideo: async fileInput => {
        const files_ = fileInput.srcElement.files;
        const onFail = FCUI._onLoadVideoFail;
        if (!files_) return FCUI._onLoadVideoFail("No video to be loaded");
        const arrayBuffer = await FMVideo.arrayBuffer(files_[0]).catch(onFail);
        const videoPlayer = document.getElementById("videoPlayer");
        videoPlayer.src = URL.createObjectURL(new Blob([arrayBuffer]));
    },
    _onLoadVideoFail: message => {
        alert(message);
        console.error(message);
    },
    resizeVideo: () => {
        const videoPlayer = document.getElementById("videoPlayer");
        const { videoWidth, videoHeight } = videoPlayer;
        const ratio = videoWidth * 1.0 / videoHeight;
        const { width, height } = window.screen;
        const cp = document.getElementById("cp");
        const maxHeight = height - cp.offsetHeight;
        const tempWidth = Math.min(videoWidth, width);
        const newHeight = Math.floor(Math.min(tempWidth / ratio, maxHeight));
        videoPlayer.height = newHeight;
        videoPlayer.width = Math.floor(newHeight * ratio);
    },
    setCurrentFrame: ({ target }) => {
        const videoPlayer = document.getElementById("videoPlayer");
        const frameRate = document.getElementById("frameRate").value;
        const { currentTime } = videoPlayer, currentFrame = target.value;
        const timeOffset = currentFrame * 1.0 / frameRate;
        videoPlayer.currentTime = Math.floor(currentTime) + timeOffset;
    },
    updateCurrentFrame: ({ target }) => {
        const { currentTime } = target;
        const timeOffset = currentTime - Math.floor(currentTime);
        const frameRate = document.getElementById("frameRate").value;
        const currentFrame = Math.floor(timeOffset * frameRate);
        document.getElementById("currentFrame").value = currentFrame;
    },
    setStartEndTime: (startEnd, unit, { target }) => {
        FMFrameRateStartEndTime[startEnd][unit] = target.value;
    }
};