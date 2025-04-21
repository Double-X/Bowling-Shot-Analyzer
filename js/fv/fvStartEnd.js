const FVStartEnd = {
    p: startEnd => {
        const p = document.createElement("p");
        p.appendChild(FVDOM.text(`${startEnd} Time:`));
        ["Minute", "Second", "Frame"].forEach(unit => {
            p.appendChild(FVDOM.label(unit));
            const onchange = FCUI.setStartEndTime.bind(null, startEnd, unit);
            p.appendChild(FVDOM.input(FMCP[startEnd][unit], "3ch", onchange));
        });
        return p;
    }
};