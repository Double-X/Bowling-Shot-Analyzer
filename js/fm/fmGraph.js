const FMGraph = {
    RGBS: new Map(),
    analyze: (currentTime, x, y, w, imageData) => {
        if (FMGraph.RGBS.get(currentTime)) return;
        const rgbs = [], ballLeftXY = {}, ballTopXY = {};
        const ballRightXY = {}, ballBottomXY = {};
        for (let i = 0, l = imageData.length; i < l; i += 4) {
            const xy = {
                x: x + (i / 4) % (w + 1),
                y: Math.floor(y + (i / 4) / (w + 1))
            }, r = imageData[i], g = imageData[i + 1], b = imageData[i + 2];
            if (!Object.values(FMCP.LaneBounds).every(isInLane => {
                return isInLane(xy.x, xy.y);
            }) || FMGraph._isLaneRGB(xy.x - x, xy.y - y, r, g, b)) continue;
            FMGraph._setBallLeftTop(ballLeftXY, xy, "x");
            FMGraph._setBallLeftTop(ballTopXY, xy, "y");
            FMGraph._setBallRightBottom(ballRightXY, xy, "x");
            FMGraph._setBallRightBottom(ballBottomXY, xy, "y");
            rgbs.push({ x: xy.x, y: xy.y, r, g, b });
        }
        const ballXYRatio = FMPath.ballXYRatio(ballBottomXY.x, ballBottomXY.y);
        FMPath.set(currentTime, ballXYRatio);
        FMGraph.RGBS.set(currentTime, rgbs.filter(({ x, y }) => {
            if (x < ballLeftXY.x || x > ballRightXY.x) return false;
            return y >= ballTopXY.y && y <= ballBottomXY.y;
        }));
        FVGraph.drawPath(ballXYRatio.x, ballXYRatio.y);
    },
    // This is for debug use only
    analyzeFrame: (currentTime, x, y, w, imageData) => {
        const rgbs = [], ballLeftXY = {}, ballTopXY = {};
        const ballRightXY = {}, ballBottomXY = {};
        for (let i = 0, l = imageData.length; i < l; i += 4) {
            const xy = {
                x: x + (i / 4) % (w + 1),
                y: Math.floor(y + (i / 4) / (w + 1))
            }, r = imageData[i], g = imageData[i + 1], b = imageData[i + 2];
            if (!Object.values(FMCP.LaneBounds).every(isInLane => {
                return isInLane(xy.x, xy.y);
            }) || FMGraph._isLaneRGB(xy.x - x, xy.y - y, r, g, b)) continue;
            FMGraph._setBallLeftTop(ballLeftXY, xy, "x");
            FMGraph._setBallLeftTop(ballTopXY, xy, "y");
            FMGraph._setBallRightBottom(ballRightXY, xy, "x");
            FMGraph._setBallRightBottom(ballBottomXY, xy, "y");
            rgbs.push({ x: xy.x, y: xy.y, r, g, b });
        }
        const filteredRGBS = rgbs.filter(({ x, y }) => {
            if (x < ballLeftXY.x || x > ballRightXY.x) return false;
            return y >= ballTopXY.y && y <= ballBottomXY.y;
        });
        if (!FMGraph.RGBS.get(currentTime)) {
            FMGraph.RGBS.set(currentTime, filteredRGBS);
        }
        console.log("currentTime", currentTime, "imageData.length", imageData.length, "FMGraph.RGBS.get(currentTime).length", FMGraph.RGBS.get(currentTime).length)
        console.log("ballLeftXY", ballLeftXY, "ballTopXY", ballTopXY, "ballRightXY", ballRightXY, "ballBottomXY", ballBottomXY)
        const videoPlayer = document.getElementById("videoPlayer");
        videoPlayer.hidden = true;
        const videoAnalyzer = document.getElementById("videoAnalyzer");
        videoAnalyzer.hidden = false;
        const context = videoAnalyzer.getContext("2d");
        context.clearRect(0, 0, videoAnalyzer.width, videoAnalyzer.height);
        const ballWidth = ballRightXY.x - ballLeftXY.x + 1;
        const ballHeight = ballBottomXY.y - ballTopXY.y + 1;
        console.log("ballWidth", ballWidth, "ballHeight", ballHeight)
        const filteredImageData = [];
        for (let by = ballTopXY.y; by <= ballBottomXY.y; by++) {
            const bys = filteredRGBS.filter(rgb => rgb.y === by);
            if (bys.length > 0) console.log("by", by, "bys.length", bys)
            for (let bx = ballLeftXY.x; bx <= ballRightXY.x; bx++) {
                const rgb_ = bys.find(rgb => rgb.x === bx);
                if (rgb_) console.log("bx", bx, "rgb_", rgb_)
                const br = rgb_ ? rgb_.r : 255;
                const bg = rgb_ ? rgb_.g : 255;
                const bb = rgb_ ? rgb_.b : 255;
                filteredImageData.push(br, bg, bb, 255);
            }
        }
        const fid = new Uint8ClampedArray(filteredImageData);
        console.log("filteredImageData.length", filteredImageData.length, "fid.length", fid.length)
        context.putImageData(new ImageData(fid, ballWidth, ballHeight), 0, 0);
    },
    //
    _isLaneRGB: (x, y, r, g, b) => {
        const { data, width } = FMCP.LaneImageData_;
        const i = (x + y * width) * 4;
        const [lr, lg, lb] = [data[i], data[i + 1], data[i + 2]];
        if (Math.abs(r - lr) <= 17) return true;
        return Math.abs(g - lg) <= 17 || Math.abs(b - lb) <= 17;
    },
    _setBallLeftTop: (ballXY, xy, direction) => {
        if (ballXY[direction] && ballXY[direction] <= xy[direction]) return;
        ballXY.x = xy.x, ballXY.y = xy.y;
    },
    _setBallRightBottom: (ballXY, xy, direction) => {
        if (ballXY[direction] && ballXY[direction] >= xy[direction]) return;
        ballXY.x = xy.x, ballXY.y = xy.y;
    }
};