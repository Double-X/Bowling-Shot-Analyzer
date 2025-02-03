const FVStartEnd = {
    p: startEnd => {
        const p = document.createElement("p");
        p.appendChild(FVStartEnd._text(startEnd));
        ["Minute", "Second", "Frame"].forEach(unit => {
            p.appendChild(FVStartEnd._label(unit));
            p.appendChild(FVStartEnd._input(startEnd, unit));
        });
        return p;
    },
    _text: startEnd => {
        const text = document.createElement("text");
        text.innerHTML = `${startEnd} Time:`;
        return text;
    },
    _label: unit => {
        const label = document.createElement("label");
        label.innerHTML = unit;
        return label;
    },
    _input: (startEnd, unit) => {
        const input = document.createElement("input");
        input.type = "text", input.value = FMCP[startEnd][unit];
        input.style.width = "3ch";
        input.onchange = FCUI.setStartEndTime.bind(null, startEnd, unit);
        return input;
    }
};