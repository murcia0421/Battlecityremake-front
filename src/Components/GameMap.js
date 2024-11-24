import React, { useState } from "react";
import mapData from "../Maps/mapData";
import "../Styles/GameMap.css";

import baseImg from "../Assets/base.png";
import tankImg from "../Assets/tank.png";
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

  return (
    <div className="game-map">
      {mapData.map((row, rowIndex) => (
        <div key={rowIndex} className="map-row">
          {row.map((cell, cellIndex) => {
            const isTank = tankPosition.row === rowIndex && tankPosition.col === cellIndex;
            return (
              <div key={cellIndex} className="map-cell">
                {/* Renderiza la imagen del tanque si coincide con su posición */}
                {isTank ? (
                  <img
                    src={tankImg}
                    alt="tank"
                    className="map-cell-image"
                  />
                ) : (
                  cellImages[cell] && (
                    <img
                      src={cellImages[cell]}
                      alt={`cell-${cell}`}
                      className="map-cell-image"
                    />
                  )
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GameMap;
