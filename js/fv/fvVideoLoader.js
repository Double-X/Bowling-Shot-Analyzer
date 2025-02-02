const FVVideoLoader = {
    p: () => {
        const p = document.createElement("p");
        p.appendChild(FVVideoLoader._textLabel());
        p.appendChild(FVVideoLoader._text());
        p.appendChild(FVVideoLoader._fileLabel());
        p.appendChild(FVVideoLoader._file());
        p.appendChild(FVVideoLoader._currentFrameLabel());
        p.appendChild(FVVideoLoader._currentFrame());
        return p;
    },
    _textLabel: () => {
        const label = document.createElement("label");
        label.innerHTML = "Frame Rate: ";
        return label;
    },
    _text: () => {
        const input = document.createElement("input");
        input.id = "frameRate", input.value = FMCP.FrameRate;
        input.style.width = "3ch";
        input.type = "text", input.onchange = FCUI.setFrameRate;
        return input;
    },
    _fileLabel: () => {
        const label = document.createElement("label");
        label.innerHTML = "Load Video: ";
        return label;
    },
    _file: () => {
        const input = document.createElement("input");
        input.type = "file", input.onchange = FCUI.loadVideo;
        input.accept = "video/*";
        return input;
    },
    _currentFrameLabel: () => {
        const label = document.createElement("label");
        label.innerHTML = "Current Frame: ";
        return label;
    },
    _currentFrame: () => {
        const input = document.createElement("input");
        input.id = "currentFrame", input.value = 0;
        input.style.width = "3ch";
        input.type = "text", input.onchange = FCUI.setCurrentFrame;
        return input;
    }
};