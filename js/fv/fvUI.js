const FVUI = {
    load: () => {
        const cp = document.getElementById("cp");
        cp.append(FVGraphLoader.p());
        cp.append(FVVideoLoader.p());
        cp.append(FVStartEnd.p("Start"));
        cp.append(FVStartEnd.p("End"));
        cp.append(FVRGB.p());
        cp.append(FVLaneCorners.p());
        const video = document.getElementById("video");
        video.appendChild(FVVideoPlayer.video());
        video.appendChild(FVVideoPlayer.canvas());
        const graph = document.getElementById("graph");
        graph.appendChild(FVGraph.img());
        graph.appendChild(FVGraph.canvas());
    }
};