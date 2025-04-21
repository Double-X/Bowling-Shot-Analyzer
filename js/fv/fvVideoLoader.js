const FVVideoLoader = {
    p: () => {
        const p = document.createElement("p");
        p.appendChild(FVDOM.label("Frame Rate:"));
        p.appendChild(FVDOM.input(FMCP.FrameRate, "3ch", FCUI.setFrameRate, "frameRate"));
        p.appendChild(FVDOM.label("Load Video:"));
        p.appendChild(FVDOM.file(FCUI.loadVideo, "video/*"));
        p.appendChild(FVDOM.label("Current Frame:"));
        p.appendChild(FVDOM.input(0, "3ch", FCUI.setCurrentFrame, "currentFrame"));
        return p;
    },
    updateCurrentFrame: (currentTime) => {
        const timeOffset = currentTime - Math.floor(currentTime);
        const frameRate = document.getElementById("frameRate").value;
        const currentFrame = Math.floor(timeOffset * frameRate);
        document.getElementById("currentFrame").value = currentFrame;
    }
};