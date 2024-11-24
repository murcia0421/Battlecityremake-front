import React from "react";
import "../Styles/Bullet.js";


const Bullet = ({ position }) => {
    const bulletStyle = {
        left: `${position.x}px`,
        top: `${position.y}px`,
    };

    return <div className="bullet" style={bulletStyle}></div>;
};

export default Bullet;
