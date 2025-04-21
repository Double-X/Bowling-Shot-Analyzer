const FVLaneCorners = {
    p: () => {
        const p = document.createElement("p");
        ["Left", "Right"].forEach(h => {
            ["Foul", "Pin"].forEach(v => {
                const innerHTML = `Lane ${h} ${v} Corner xy:`;
                const onclick = FCUI.tryGetLaneCornerXY.bind(null, h, v);
                p.appendChild(FVDOM.button(innerHTML, onclick));
                p.appendChild(FVDOM.text("x0y0", `corner${h}${v}`));
            });
        });
        return p;
    },
    update: (horizontal, vertical, x, y) => {
        const text = document.getElementById(`corner${horizontal}${vertical}`);
        text.innerHTML = `x${x}y${y}`;
    }
};