const FVLaneCorners = {
    p: () => {
        const p = document.createElement("p");
        ["Left", "Right"].forEach(horizontal => {
            ["Foul", "Pin"].forEach(vertical => {
                p.appendChild(FVLaneCorners._button(horizontal, vertical));
                p.appendChild(FVLaneCorners._text(horizontal, vertical));
            });
        });
        return p;
    },
    _button: (horizontal, vertical) => {
        const button = document.createElement("button");
        button.onclick = FCUI.tryGetLaneCornerXY.bind(null, horizontal, vertical);
        button.innerHTML = `Lane ${horizontal} ${vertical} Corner xy:`;
        return button;
    },
    _text: (horizontal, vertical) => {
        const text = document.createElement("text");
        text.id = `corner${horizontal}${vertical}`;
        text.innerHTML = "x0y0";
        return text;
    }
};