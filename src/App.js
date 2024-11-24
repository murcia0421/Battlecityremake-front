import React, { useState } from "react";
import RoomSelector from "./Components/RoomSelector";
import RoomMenu from "./Components/RoomMenu";
import Map from "./Components/Map"; // Componente del mapa

const App = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [players, setPlayers] = useState(0); // Número de jugadores conectados
    const [gameStarted, setGameStarted] = useState(false);

    const grid = Array.from({ length: 32 }, () =>
        Array.from({ length: 32 }, () => "empty")
    );

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
                <Map grid={grid} />
            )}
        </div>
    );
};

export default App;
