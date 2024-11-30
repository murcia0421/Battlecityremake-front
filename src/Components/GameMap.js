import React, { useState, useEffect } from "react";
import { connectToRoom, isConnected } from "../services/WebSocketService";
import Tank from "./Tank";
import usePlayerController from "../Controllers/PlayerController"; // Usar el hook correctamente
import mapData from "../Maps/mapData";
import "../Styles/GameMap.css";

import baseImg from "../Assets/base.png";
import treesImg from "../Assets/trees.png";
import wallBrickImg from "../Assets/wall_brick.png";
import wallSteelImg from "../Assets/wall_steel.png";

// Imágenes de celdas
const cellImages = {
    0: null,
    1: wallBrickImg,
    2: wallSteelImg,
    3: treesImg,
    4: baseImg,
};

const GameMap = ({ roomName, onGameFinish }) => {
    const [tankPosition, setTankPosition] = useState({ row: 1, col: 1 });
    const [timeLeft, setTimeLeft] = useState(10); // 3 minutos en segundos
    const [gameOver, setGameOver] = useState(false);

    // Hook para controlar el tanque
    usePlayerController({
        roomName,
        tankPosition,
        setTankPosition,
        mapData, // Se pasa para verificar colisiones
    });

    // Efecto para manejar la conexión y cronómetro
    useEffect(() => {
        if (!isConnected()) {
            connectToRoom(roomName, (message) => {
                console.log("Mensaje recibido:", message);
            });
        }

        // Lógica del cronómetro
        if (timeLeft <= 0) {
            setGameOver(true);
            onGameFinish(); // Marca que el juego terminó
        } else {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer); // Limpiar el intervalo cuando el componente se desmonte
        }
    }, [timeLeft, roomName, onGameFinish]);

    return (
        <div className="game-map">
            <div className="game-info">
                <p className="time-left">
                    Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}{timeLeft % 60}
                </p>
                {gameOver && <p className="game-over">Game Over!</p>}
            </div>

            {/* Mapa del juego */}
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

            {/* Componente Tank */}
            <Tank position={tankPosition} />
        </div>
    );
};

export default GameMap;
