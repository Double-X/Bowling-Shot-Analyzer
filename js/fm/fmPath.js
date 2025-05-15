const FMPath = {
    _BALL_XY_RATIO: new Map(),
    ballXYRatio: (cx, cy) => {
        console.log("FMPath.ballXYRatio", "cx", cx, "cy", cy)
        const { Left, Right } = FMCP.LaneCornerXY;
        const lf = Left.Foul, rf = Right.Foul, lp = Left.Pin, rp = Right.Pin;
        const leftX = lp.x - lf.x, leftY = lp.y - lf.y;
        const leftL = Math.sqrt(Math.pow(leftX, 2) + Math.pow(leftY, 2));
        const pinX = rp.x - lp.x, pinY = rp.y - lp.y;
        const pinL = Math.sqrt(Math.pow(pinX, 2) + Math.pow(pinY, 2));
        const rightX = rp.x - rf.x, rightY = rp.y - rf.y;
        const rightL = Math.sqrt(Math.pow(rightX, 2) + Math.pow(rightY, 2));
        const foulX = rf.x - lf.x, foulY = rf.y - lf.y;
        const foulL = Math.sqrt(Math.pow(foulX, 2) + Math.pow(foulY, 2));
        const lxc = lp.x * lf.y - lp.y * lf.x;
        const lxd = Math.abs(leftY * cx - leftX * cy + lxc) / leftL;
        const pyc = rp.x * lp.y - rp.y * lp.x;
        const pyd = Math.abs(pinY * cx - pinX * cy + pyc) / pinL;
        const rxc = rp.x * rf.y - rp.y * rf.x;
        const rxd = Math.abs(rightY * cx - rightX * cy + rxc) / rightL;
        const fyc = rf.x * lf.y - rf.y * lf.x;
        const fyd = Math.abs(foulY * cx - foulX * cy + fyc) / foulL;
        console.log("lxd", lxd, "rxd", rxd, "pyd", pyd, "fyd", fyd)
        return { x: lxd / (lxd + rxd), y: pyd / (pyd + fyd) };
    },
    set: (currentTime, { x, y }) => {
        FMPath._BALL_XY_RATIO.set(currentTime, { x, y });
    }
};