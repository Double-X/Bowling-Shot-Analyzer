const FVRGB = {
    p: () => {
        const p = document.createElement("p");
        ["Ball", "Core Dot"].forEach(type => {
            p.appendChild(FVRGB._button(type));
            p.appendChild(FVRGB._input(type));
        });
        return p;
    },
    _button: type => {
          const button = document.createElement("button");
          button.innerHTML = `${type} RGB:`;
          button.onclick = FCUI.tryGetRGB.bind(null, type.replace(/ +/, ""));
          return button;
    },
    _input: type => {
        const input = document.createElement("input");
        const id = type.replace(/ +/, "");
        input.id = `rgb${type.replace(/ +/, "")}Input`;
        input.type = "text", input.value = FMCP.RGB[id];
        input.style.width = "6ch";
        input.onchange = () => input.style.color = `#${input.value}`;
        return input;
    }
};