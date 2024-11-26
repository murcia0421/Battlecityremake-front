import React, { useState } from "react";
import Tank from "./Tank"; // Componente para renderizar el tanque
import PlayerController from "../Controllers/PlayerController"; // Hook para manejar controles
import mapData from "../Maps/mapData";
import "../Styles/GameMap.css";

import baseImg from "../Assets/base.png";
import treesImg from "../Assets/trees.png";
import wallBrickImg from "../Assets/wall_brick.png";
import wallSteelImg from "../Assets/wall_steel.png";

const cellImages = {
    0: null,
    1: wallBrickImg,
    2: wallSteelImg,
    3: treesImg,
    4: baseImg,
};

const GameMap = () => {
    const [tankPosition, setTankPosition] = useState({ row: 1, col: 1 });

    // Usamos PlayerController para manejar la entrada del usuario
    PlayerController({
        tankPosition,
        setTankPosition,
        mapData, // Se pasa para verificar colisiones
    });

    return (
        <div className="game-map">
            {/* Renderiza el mapa */}
            {mapData.map((row, rowIndex) => (
                <div key={rowIndex} className="map-row">
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className="map-cell">
                            {cellImages[cell] && (
                                <img
                                    src={cellImages[cell]}
                                    alt={`cell-${cell}`}
                                    className="map-cell-image"
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}

            {/* Renderiza el tanque */}
            <Tank position={tankPosition} />
        </div>
    );
};

export default GameMap;
