import React, { useState, useEffect } from "react";
import { connectToRoom, leaveRoom } from "../services/WebSocketService";

const RoomSelector = ({ onRoomJoin, gameStarted }) => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Solo se desconecta si el jugador sale de la sala
        return () => {
            if (selectedRoom && !gameStarted) {
                handleLeaveRoom();
            }
        };
    }, [selectedRoom, gameStarted]);

    const handleJoinRoom = (room) => {
        setSelectedRoom(room);
        onRoomJoin(room);
        connectToRoom(room, (message) => {
            console.log("Received message:", message);
            setMessages((prev) => [...prev, message]);
        });
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
                {["room1", "room2", "room3", "room4"].map((room) => (
                    <button
                        key={room}
                        onClick={() => handleJoinRoom(room)}
                        disabled={selectedRoom === room || gameStarted} // Deshabilitar cuando el juego haya comenzado
                    >
                        Join {room}
                    </button>
                ))}
            </div>
            
            {selectedRoom && !gameStarted && (
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
