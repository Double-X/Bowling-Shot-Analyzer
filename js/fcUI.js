const FCUI = {
    setFrameRate: ({ target }) => FMCP.FrameRate = target.value,
    loadGraph: async fileInput => {
        const onFail = FCUI._showMessage, files_ = fileInput.srcElement.files;
        if (!files_) return onFail("No graph to be loaded");
        const dataURL = await FMFile.dataURL(files_[0]).catch(onFail);
        FVGraph.load(dataURL);
        FMCP.IsLoaded.Graph = true;
    },
    loadVideo: async fileInput => {
        const onFail = FCUI._showMessage, files_ = fileInput.srcElement.files;
        if (!files_) return onFail("No video to be loaded");
        const arrayBuffer = await FMFile.arrayBuffer(files_[0]).catch(onFail);
        FVVideoPlayer.load(arrayBuffer);
    },
    didResizeVideo: () => {
        FVGraph.resize();
        if (FMCP.IsLoaded.Video) return;
        FMCP.IsLoaded.Video = true;
        setInterval(FCUI.updateAnalysis, 10);
    },
    setCurrentFrame: ({ target }) => {
        const frameRate = document.getElementById("frameRate").value;
        FVVideoPlayer.setCurrentFrame(frameRate, target.value);
    },
    updateCurrentFrame: ({ target }) => {
        FVVideoLoader.updateCurrentFrame(target.currentTime);
    },
    updateAnalysis: () => {
        if (!FVVideoPlayer.isPlaying()) return;
        const { currentTime } = document.getElementById("videoPlayer");
        FVVideoLoader.updateCurrentFrame(currentTime);
        const end_ = FMCP.AnalyzedInterval.End;
        if (!end_ || currentTime > end_) return;
        const { x, y, w, h } = FMCP.laneXYWH();
        const imageData = FVVideoPlayer.imageData(x, y, w, h);
        FMGraph.analyze(currentTime, x, y, w, imageData);
    },
    setStartEndTime: (startEnd, unit, { target }) => {
        FMCP[startEnd][unit] = +(target.value);
    },
    tryGetLaneCornerXY: (horizontal, vertical) => {
        if (!FMCP.IsLoaded.Video) {
            return FCUI._showMessage("The video isn't loaded!");
        }
        FMCP.clearLaneCornerFlags();
        FMCP.IsGetLaneCorner[horizontal][vertical] = true;
        FVVideoPlayer.showAnalyzer();
    },
    clickVideoAnalyzer: ({ pageX, pageY }) => {
        if (FMCP.isDrawPath) {
            const [px, py] = FVVideoPlayer.laneXY(pageX, pageY);
            const { x, y } = FMPath.ballXYRatio(px, py);
            console.log("FCUI.clickVideoAnalyzer", "px", px, "py", py, "x", x, "y", y)
            return FVGraph.drawPath(x, y);
        }
        const [horizontal_, vertical_] = FMCP.laneCornerHorizontalVertical_();
        if (!horizontal_ || !vertical_) return;
        FCUI._getLaneCornerXY(pageX, pageY, horizontal_, vertical_);
    },
    analyze: () => {
        if (!FMCP.IsLoaded.Graph) {
            return FCUI._showMessage("The graph isn't loaded!");
        } else if (!FMCP.IsLoaded.Video) {
            return FCUI._showMessage("The video isn't loaded!");
        }
        FMCP.setStartEnd(document.getElementById("frameRate").value);
        FVVideoPlayer.play(FMCP.AnalyzedInterval.Start);
    },
    analyzeFrame: () => { // This is for debug use only
        const { currentTime } = document.getElementById("videoPlayer");
        const end_ = FMCP.AnalyzedInterval.End;
        if (!end_ || currentTime > end_) return;
        const { x, y, w, h } = FMCP.laneXYWH();
        const imageData = FVVideoPlayer.imageData(x, y, w, h);
        FMGraph.analyzeFrame(currentTime, x, y, w, imageData);
    },
    clearCanvas: () => FVVideoPlayer.clearCanvas(), // This is for debug use only
    drawPath: () => { // This is for debug use only
        FMCP.isDrawPath = true;
        FVVideoPlayer.showAnalyzer();
    },
    _showMessage: message => {
        alert(message);
        console.error(message);
    },
    _getLaneCornerXY: (pageX, pageY, horizontal, vertical) => {
        const [px, py] = FVVideoPlayer.laneXY(pageX, pageY);
        FMCP.updateLaneCornerXY(horizontal, vertical, px, py);
        FVLaneCorners.update(horizontal, vertical, px, py);
        FVVideoPlayer.hideAnalyzer();
        if (!FMCP.hasAllLaneCorners()) return;
        const { x, y, w, h } = FMCP.laneXYWH();
        FMCP.setImageData(FVVideoPlayer.imageData(x, y, w, h), w, h);
        FMCP.setLaneBounds();
    }
};