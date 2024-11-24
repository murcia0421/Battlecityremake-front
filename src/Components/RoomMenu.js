import React, { useState, useEffect } from "react";
import { connectToRoom, leaveRoom } from "../services/WebSocketService";

const RoomMenu = ({ roomName, onStartGame }) => {
    const [players, setPlayers] = useState(0);

    useEffect(() => {
        // Conectar al WebSocket y escuchar actualizaciones
        connectToRoom(roomName, (message) => {
            if (message.roomName === roomName) {
                setPlayers(message.players); // Actualiza el número de jugadores si el mensaje es de la sala actual
            }
        });

        // Al desmontar, salir de la sala
        return () => {
            leaveRoom(roomName);
        };
    }, [roomName]);

    return (
        <div>
            <h2>Room: {roomName}</h2>
            <p>Players Connected: {players}</p>
            <div>
                <button disabled>Choose Map (Coming Soon)</button>
                <button disabled>Choose Mode (Coming Soon)</button>
            </div>
            <button onClick={onStartGame} disabled={players < 2}>
                Start Game
            </button>
        </div>
    );
};

export default RoomMenu;
