const FCUI = {
    setFrameRate: ({ target }) => FMCP.FrameRate = target.value,
    loadGraph: async fileInput => {
        const onFail = FCUI._onLoadFail, files_ = fileInput.srcElement.files;
        if (!files_) return onFail("No graph to be loaded");
        const dataURL = await FMGraphVideo.dataURL(files_[0]).catch(onFail);
        FVGraph.load(dataURL);
    },
    loadVideo: async fileInput => {
        const onFail = FCUI._onLoadFail, files_ = fileInput.srcElement.files;
        if (!files_) return onFail("No video to be loaded");
        const file = files_[0];
        const arrayBuffer = await FMGraphVideo.arrayBuffer(file).catch(onFail);
        FVVideoPlayer.load(arrayBuffer);
    },
    _onLoadFail: message => {
        alert(message);
        console.error(message);
    },
    setCurrentFrame: ({ target }) => {
        const frameRate = document.getElementById("frameRate").value;
        FVVideoPlayer.setCurrentFrame(frameRate, target.value);
    },
    updateCurrentFrame: ({ target }) => {
        const { currentTime } = target;
        const timeOffset = currentTime - Math.floor(currentTime);
        const frameRate = document.getElementById("frameRate").value;
        const currentFrame = Math.floor(timeOffset * frameRate);
        document.getElementById("currentFrame").value = currentFrame;
    },
    setStartEndTime: (startEnd, unit, { target }) => {
        FMCP[startEnd][unit] = target.value;
    },
    tryGetRGB: type => {
        FMCP.clearRGBFlags();
        FMCP.IsGetRGB[type] = true;
        FVVideoPlayer.showAnalyzer();
    },
    tryGetLaneCornerXY: (horizontal, vertical) => {
        FMCP.clearLaneCornerFlags();
        FMCP.IsGetLaneCorner[horizontal][vertical] = true;
        FVVideoPlayer.showAnalyzer();
    },
    clickVideoAnalyzer: ({ pageX, pageY }) => {
        const type_ = FMCP.rgbType_();
        if (type_) return FCUI._getRGB(pageX, pageY, type_);
        const [horizontal_, vertical_] = FMCP.laneCornerXY_();
        if (!horizontal_ || !vertical_) return;
        FCUI._getLaneCornerXY(pageX, pageY, horizontal_, vertical_);
    },
    _getRGB: (pageX, pageY, type) => {
        const rgb = FVVideoPlayer.rgb(pageX, pageY);
        const input = document.getElementById(`rgb${type}Input`);
        input.value = FMCP.RGB[type] = rgb;
        input.style.color = `#${input.value}`;
        FMCP.clearRGBFlags();
        FVVideoPlayer.hideAnalyzer();
    },
    _getLaneCornerXY: (pageX, pageY, horizontal, vertical) => {
        const xy = FMCP.LaneCornerXY[horizontal][vertical];
        [xy.x, xy.y] = FVVideoPlayer.laneCornerXY(pageX, pageY);
        const text = document.getElementById(`corner${horizontal}${vertical}`);
        text.innerHTML = `x${xy.x}y${xy.y}`;
        FMCP.clearLaneCornerFlags();
        FVVideoPlayer.hideAnalyzer();
    }
};