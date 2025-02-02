const FVGraphLoader = {
    p: () => {
        const p = document.createElement("p");
        p.appendChild(FVGraphLoader._label());
        p.appendChild(FVGraphLoader._file());
        return p;
    },
    _label: () => {
        const label = document.createElement("label");
        label.innerHTML = "Load Graph: ";
        return label;
    },
    _file: () => {
        const input = document.createElement("input");
        input.type = "file", input.onchange = FCUI.loadGraph;
        input.accept = "image/*";
        return input;
    }
};