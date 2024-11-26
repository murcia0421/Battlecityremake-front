import React from "react";
import tankImg from "../Assets/tank.png"; // Importa la imagen del tanque
import "../Styles/Tank.css";

const Tank = ({ position }) => {
    const tankStyle = {
        left: `${position.col * 50}px`, // Ajusta según el tamaño de tus celdas
        top: `${position.row * 50}px`,  // Ajusta según el tamaño de tus celdas
    };

    return (
        <div className="tank" style={tankStyle}>
            <img src={tankImg} alt="Tank" className="tank-image" />
        </div>
    );
};

export default Tank;