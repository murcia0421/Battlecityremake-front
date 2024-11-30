import React, { useState } from "react";
import RoomSelector from "./Components/RoomSelector";
import RoomMenu from "./Components/RoomMenu";
import GameMap from "./Components/GameMap"; // Importa GameMap correctamente
import GameFinish from "./Components/GameFinish"; // Asegúrate de importar GameFinish
import { leaveRoom } from "./services/WebSocketService"; // Asegúrate de que la ruta sea correcta


const App = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [players, setPlayers] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameFinish, setGameFinish] = useState(false);

    const handleRoomJoin = (roomName) => {
        setSelectedRoom(roomName);
        setPlayers(1);  // Simula un jugador conectado
    };

    const handleStartGame = () => {
        setGameStarted(true);
    };

    const handleFinishGame = () => {
        setGameFinish(true);
    };

    const handleDisconnectRoom = () => {
        console.log("Desconectando de la sala:", selectedRoom);
        leaveRoom(selectedRoom); // Llama a leaveRoom para desconectar
        setSelectedRoom(null);   // Vuelve a la pantalla de selección de sala
    };

    return (
        <div className="App">
            {!selectedRoom ? (
                <RoomSelector onRoomJoin={handleRoomJoin} gameStarted={gameStarted} />
            ) : !gameStarted ? (
                <RoomMenu
                    roomName={selectedRoom}
                    players={players}
                    onStartGame={handleStartGame}
                    gameStarted={gameStarted}
                />
            ) : gameFinish ? (
                <GameFinish onBackToRoom={handleDisconnectRoom} /> // Pasa la función de desconexión
            ) : (
                <GameMap onGameFinish={handleFinishGame} />
            )}
        </div>
    );
};

export default App;
