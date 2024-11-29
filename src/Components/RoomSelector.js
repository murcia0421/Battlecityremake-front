import React, { useState, useEffect } from "react";
import { connectToRoom, leaveRoom } from "../services/WebSocketService";
import { getAllPlayers, createPlayer, updatePlayer, deletePlayer } from "../api";

const RoomSelector = ({ onRoomJoin }) => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [playerName, setPlayerName] = useState(""); // Nuevo estado para el nombre del jugador

    useEffect(() => {
        return () => {
            if (selectedRoom) {
                handleLeaveRoom();
            }
        };
    }, []);

    const handleJoinRoom = async (room) => {
        if (!playerName) {
            alert("Please enter your name before joining a room.");
            return;
        }
    
        setSelectedRoom(room);
        onRoomJoin(room);
        connectToRoom(room, (message) => {
            console.log("Received message:", message);
            setMessages((prev) => [...prev, message]);
        });
    
        // Crear el jugador en la base de datos
        try {
            const newPlayer = {
                id: playerName, // Usar el nombre como ID
                direction: "down", // Dirección inicial
            };
            await createPlayer(newPlayer);
            console.log("Player created:", newPlayer);
        } catch (error) {
            console.error("Error creating player:", error);
        }
    

    };
    

    const handleLeaveRoom = () => {
        if (selectedRoom) {
            leaveRoom(selectedRoom);
            setSelectedRoom(null);
            setMessages([]);
            onRoomJoin(null);
        }
    };

    return (
        <div>
            <h1>Room Selector</h1>

            <div>
                {/* Input para el nombre del jugador */}
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
            </div>

            <div>
                {["room1", "room2", "room3", "room4"].map((room) => (
                    <button
                        key={room}
                        onClick={() => handleJoinRoom(room)}
                        disabled={selectedRoom === room}
                    >
                        Join {room}
                    </button>
                ))}
            </div>
            
            {selectedRoom && (
                <button onClick={handleLeaveRoom}>
                    Leave {selectedRoom}
                </button>
            )}
            
            <div>
                <h2>Messages</h2>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <pre>
                                {JSON.stringify(msg, null, 2)}
                            </pre>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoomSelector;