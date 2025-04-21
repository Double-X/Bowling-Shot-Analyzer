const FVDOM = {
    button: (innerHTML, onclick) => {
        const button = document.createElement("button");
        button.innerHTML = innerHTML, button.onclick = onclick;
        return button;
    },
    file: (onchange, accept) => {
        const input = document.createElement("input");
        input.type = "file", input.onchange = onchange, input.accept = accept;
        return input;
    },
    input: (value, width, onchange, id_) => {
        const input = document.createElement("input");
        if (id_) input.id = id_;
        input.type = "text", input.value = value;
        input.style.width = width, input.onchange = onchange;
        return input;
    },
    label: innerHTML => {
        const label = document.createElement("label");
        label.innerHTML = innerHTML;
        return label;
    },
    text: (innerHTML, id_) => {
        const text = document.createElement("text");
        if (id_) text.id = id_;
        text.innerHTML = innerHTML;
        return text;
    }
};