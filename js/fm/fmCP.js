const FMCP = {
    FrameRate: 120,
    IsDrawPath: false,
    IsLoaded: { Graph: false, Video: false },
    Start: { Minute: 0, Second: 0, Frame: 0 },
    End: { Minute: 0, Second: 0, Frame: 0 },
    IsGetLaneCorner: {
        Left: { Foul: false, Pin: false },
        Right: { Foul: false, Pin: false }
    },
    LaneCornerXY: {
        Left: { Foul: { x: 0, y: 0 }, Pin: { x: 0, y: 0 } },
        Right: { Foul: { x: 0, y: 0 }, Pin: { x: 0, y: 0 } }
    },
    LaneBounds: { Left_: null, Right_: null, Foul_: null, Pin_: null },
    LaneImageData_: null,
    AnalyzedInterval: { Start: 0, End: 0 },
    updateLaneCornerXY: (horizontal, vertical, x, y) => {
        const xy = FMCP.LaneCornerXY[horizontal][vertical];
        [xy.x, xy.y] = [x, y];
        FMCP.clearLaneCornerFlags();
    },
    clearLaneCornerFlags: () => {
        const { IsGetLaneCorner } = FMCP;
        Object.keys(IsGetLaneCorner).forEach(horizontal => {
            const verticals = IsGetLaneCorner[horizontal];
            Object.keys(verticals).forEach(vertical => {
                verticals[vertical] = false;
            });
        });
    },
    laneCornerHorizontalVertical_: () => {
        const { IsGetLaneCorner } = FMCP;
        const horizontal_ = Object.keys(IsGetLaneCorner).find(horizontal => {
            const verticals = IsGetLaneCorner[horizontal];
            return Object.values(verticals).some(flag => flag);
        });
        if (!horizontal_) return [];
        const verticals = IsGetLaneCorner[horizontal_];
        return [horizontal_, Object.keys(verticals).find(vertical => {
            return verticals[vertical];
        })];
    },
    laneXYWH: () => {
        const { LaneCornerXY } = FMCP, Xs = [], Ys = [];
        Object.values(LaneCornerXY).forEach(xys => {
            Object.values(xys).forEach(({ x, y }) => {
                Xs.push(x);
                Ys.push(y);
            });
        });
        [Xs, Ys].forEach(xys => xys.sort((a, b) => a-b));
        return { x: Xs[0], y: Ys[0], w: Xs[3] - Xs[0], h: Ys[3] - Ys[0] };
    },
    setStartEnd: fr => ["Start", "End"].forEach(se => {
        const { Minute, Second, Frame } = FMCP[se];
        FMCP.AnalyzedInterval[se] = Minute * 60 + Second + Frame * 1.0 / fr;
    }),
    hasAllLaneCorners: () => Object.values(FMCP.LaneCornerXY).every(xys => {
        return Object.values(xys).every(({ x, y }) => x && y);
    }),
    setImageData: (imageData, w, h) => {
        // It's to avoid unintended image data mutation after being stored
        FMCP.LaneImageData_ = new ImageData(imageData, w + 1, h + 1);
        //
    },
    setLaneBounds: () => {
        const { LaneBounds, LaneCornerXY } = FMCP;
        const { Left, Right } = LaneCornerXY;
        LaneBounds.Left_ = FMCP._laneBound("Left", Left.Foul, Left.Pin);
        LaneBounds.Right_ = FMCP._laneBound("Right", Right.Foul, Right.Pin);
        LaneBounds.Foul_ = FMCP._laneBound("Foul", Left.Foul, Right.Foul);
        LaneBounds.Pin_ = FMCP._laneBound("Pin", Left.Pin, Right.Pin);
    },
    _laneBound: (type, { x: x1, y: y1 }, { x: x2, y: y2 }) => {
        const slopeY = y2 - y1, slopeX = x2 - x1;
        const [left, right] = slopeX > 0 ? [x1, x2] : [x2, x1];
        const range = `x < ${left} || x > ${right}`;
        if (slopeX === 0) {
            const sign = (type === "Left_" || type === "Foul_" ? ">=" : "<=");
            return new Function("x", `return x ${sign} ${x1};`);
        } else if (slopeY / slopeX < 0) {
            const sign = (type === "Right_" || type === "Pin_" ? "<=" : ">=");
            return new Function("x", "y", `
                if (${range}) return true;
                return y ${sign} (x - ${x1}) * ${slopeY} / ${slopeX} + ${y1};
            `);
        } else {
            const sign = (type === "Left_" || type === "Pin_" ? "<=" : ">=");
            return new Function("x", "y", `
                if (${range}) return true;
                return y ${sign} (x - ${x1}) * ${slopeY} / ${slopeX} + ${y1};
            `);
        }
    }
};