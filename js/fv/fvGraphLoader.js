const FVGraphLoader = {
    p: () => {
        const p = document.createElement("p");
        p.appendChild(FVDOM.label("Load Graph:"));
        p.appendChild(FVDOM.file(FCUI.loadGraph, "image/*"));
        p.appendChild(FVDOM.button("Analyze", FCUI.analyze));
        // These are for debug use only
        p.appendChild(FVDOM.button("Analyze Frame(Debug Only)", FCUI.analyzeFrame));
        p.appendChild(FVDOM.button("Clear Canvas(Debug Only)", FCUI.clearCanvas));
        //
        return p;
    }
};