import React, { useState } from "react";
import RoomSelector from "./Components/RoomSelector";
import RoomMenu from "./Components/RoomMenu";
import Map from "./Components/Map"; // Componente del mapa
import { useMsal } from "@azure/msal-react";

const App = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [players, setPlayers] = useState(0); // Número de jugadores conectados
    const [gameStarted, setGameStarted] = useState(false);
    const { instance, accounts } = useMsal();


    const login = () => {
        instance.loginPopup({
          scopes: ["user.read"],
        }).catch((error) => console.error(error));
      };
    
    const logout = () => {
        instance.logoutPopup();
    };

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
            <h1>Battle City Remake</h1>
            {accounts.length > 0 ? (
                <div>
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
                ) : (
                    <button onClick={login}>Login</button>
            )}
        </div>
    );
};

export default App;
