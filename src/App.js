import React, { useState } from "react";
import RoomSelector from "./Components/RoomSelector";
import RoomMenu from "./Components/RoomMenu";
import GameMap from "./Components/GameMap"; // Importa GameMap correctamente

const App = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [players, setPlayers] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    // Callback para manejar la selección de sala
    const handleRoomJoin = (roomName) => {
        setSelectedRoom(roomName);
        setPlayers(1); // Simula un jugador conectado (ajustable según tu lógica)
    };

    const handleStartGame = () => {
        setGameStarted(true);
    };

    return (
        <div className="App">
            {!selectedRoom ? (
                <RoomSelector onRoomJoin={handleRoomJoin} />
            ) : !gameStarted ? (
                <RoomMenu
                    roomName={selectedRoom}
                    players={players}
                    onStartGame={handleStartGame}
                />
            ) : (
                <GameMap /> // Renderiza GameMap cuando el juego comienza
            )}
        </div>
    );
};

export default App;
