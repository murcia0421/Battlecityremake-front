import React, { useState } from "react";
import { connectToRoom, leaveRoom } from "../services/WebSocketService";

const RoomSelector = ({ onRoomJoin }) => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleJoinRoom = (room) => {
        setSelectedRoom(room);
        onRoomJoin(room); // Notificar a App sobre la sala seleccionada
        connectToRoom(room, (message) => {
            setMessages((prev) => [...prev, message]);
        });
    };

    const handleLeaveRoom = () => {
        if (selectedRoom) {
            leaveRoom(selectedRoom);
            setSelectedRoom(null);
        }
    };

    return (
        <div>
            <h1>Room Selector</h1>
            {["room1", "room2", "room3", "room4"].map((room) => (
                <button key={room} onClick={() => handleJoinRoom(room)}>
                    Join {room}
                </button>
            ))}
            {selectedRoom && (
                <button onClick={handleLeaveRoom}>Leave {selectedRoom}</button>
            )}
            <div>
                <h2>Messages</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RoomSelector;
