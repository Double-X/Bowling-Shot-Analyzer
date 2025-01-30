const FVUI = {
    load: () => {
        const cp = document.getElementById("cp");
        cp.append(FVUI._videoLoader.row());
        cp.append(FVUI._startEnd.row("Start"));
        cp.append(FVUI._startEnd.row("End"));
        FVUI._loadBallRGB(cp);
        FVUI._loadCoreDotRGB(cp);
        const ui = document.getElementById("ui");
        ui.appendChild(FVUI._videoPlayer());
        FVUI._loadNumbers(ui);
        FVUI._loadGraph(ui);
    },
    _videoLoader: {
        row: () => {
            const videoLoader = FVUI._videoLoader;
            const p = document.createElement("p");
            p.appendChild(videoLoader.textLabel());
            p.appendChild(videoLoader.text());
            p.appendChild(videoLoader.fileLabel());
            p.appendChild(videoLoader.file());
            p.appendChild(videoLoader.currentFrameLabel());
            p.appendChild(videoLoader.currentFrame());
            return p;
        },
        textLabel: () => {
            const label = document.createElement("label");
            label.innerHTML = "Frame Rate: ";
            return label;
        },
        text: () => {
            const text = document.createElement("input");
            text.id = "frameRate", text.value = "120";
            text.type = "text", text.onchange = FCUI.setFrameRate;
            return text;
        },
        fileLabel: () => {
            const label = document.createElement("label");
            label.innerHTML = "Load Video: ";
            return label;
        },
        file: () => {
            const file = document.createElement("input");
            file.type = "file", file.onchange = FCUI.loadVideo;
            file.accept = "video/mp4,video/x-m4v,video/*";
            return file;
        },
        currentFrameLabel: () => {
            const label = document.createElement("label");
            label.innerHTML = "Current Frame: ";
            return label;
        },
        currentFrame: () => {
            const text = document.createElement("input");
            text.id = "currentFrame";
            text.type = "text", text.onchange = FCUI.setCurrentFrame;
            return text;
        }
    },
    _startEnd: {
        row: startEnd => {
            const se = FVUI._startEnd, p = document.createElement("p");
            p.appendChild(se.text(startEnd));
            ["Minute", "Second", "Frame"].forEach(unit => {
                p.appendChild(se.label(unit));
                p.appendChild(se.input(startEnd, unit));
            });
            return p;
        },
        text: startEnd => {
            const text = document.createElement("text");
            text.innerHTML = `${startEnd} Time: `;
            return text;
        },
        label: unit => {
              const label = document.createElement("label");
              label.innerHTML = `${unit}`;
              return label;
        },
        input: (startEnd, unit) => {
            const input = document.createElement("input");
            input.type = "text", input.value = "0";
            input.onchange = FCUI.setStartEndTime.bind(null, startEnd, unit);
            return input;
        }
    },
    _loadBallRGB: cp => {},
    _loadCoreDotRGB: cp => {},
    _videoPlayer: () => {
        const video = document.createElement("video");
        video.id = "videoPlayer", video.controls = true;
        video.addEventListener("loadedmetadata", FCUI.resizeVideo);
        video.addEventListener("timeupdate", FCUI.updateCurrentFrame);
        return video;
    },
    _loadNumbers: ui => {},
    _loadGraph: ui => {}
};