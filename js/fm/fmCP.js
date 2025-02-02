const FMCP = {
    FrameRate: 120,
    Start: { Minute: 0, Second: 0, Frame: 0 },
    End: { Minute: 0, Second: 0, Frame: 0 },
    RGB: { Ball: "000000", CoreDot: "000000" },
    IsGetRGB: { Ball: false, CoreDot: false },
    IsGetLaneCorner: {
        Left: { Foul: false, Pin: false },
        Right: { Foul: false, Pin: false }
    },
    LaneCornerPosition: {
        Left: { Foul: { x: 0, y: 0 }, Pin: { x: 0, y: 0 } },
        Right: { Foul: { x: 0, y: 0 }, Pin: { x: 0, y: 0 } }
    },
    clearRGBFlags : () => {
        const { IsGetRGB } = FMCP;
        IsGetRGB.Ball = IsGetRGBCoreDot = false;
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
    rgbType_: () => {
        const { IsGetRGB } = FMCP;
        return Object.keys(IsGetRGB).find(type => IsGetRGB[type]);
    },
    laneCornerPosition_: () => {
        const { IsGetLaneCorner, LaneCornerPosition } = FMCP;
        const horizontal_ = Object.keys(IsGetLaneCorner).find(horizontal => {
            const verticals = IsGetLaneCorner[horizontal];
            return Object.keys(verticals).some(vertical => verticals[vertical]);
        });
        if (!horizontal_) return [];
        const verticals = IsGetLaneCorner[horizontal_];
        return [horizontal_, Object.keys(verticals).find(vertical => {
            return verticals[vertical];
        })];
    }
};