import React from "react";
import "../Styles/tank.css";

const Tank = ({ position, direction, color }) => {
    const tankStyle = {
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${direction}deg)`,
        backgroundColor: color,
    };

    return <div className="tank" style={tankStyle}></div>;
};

export default Tank;