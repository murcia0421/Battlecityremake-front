import { useEffect } from "react";
import { connectToRoom, isConnected, stompClient } from "../services/WebSocketService";

const PlayerController = ({ roomName, tankPosition, setTankPosition, mapData }) => {
    useEffect(() => {
        // Conectar al WebSocket y suscribirse a la sala
        const handleServerMessage = (message) => {
            console.log("Mensaje recibido del servidor:", message);

            // Ejemplo: Actualizar posición o manejar acciones basadas en el mensaje del backend
            if (message.type === "UPDATE_POSITION") {
                setTankPosition({ row: message.row, col: message.col });
            } else if (message.type === "SHOT_FIRED") {
                console.log("Jugador disparó:", message.playerId);
            }
        };

        if (!isConnected()) {
            connectToRoom(roomName, handleServerMessage);
        }

        return () => {
            // Opcional: desconexión o limpieza, si es necesario
            // leaveRoom(roomName); // Si decides manejar la desconexión
        };
    }, [roomName, setTankPosition]);

    const handleKeyDown = (event) => {
        const { row, col } = tankPosition;

        let action = null;
        let newRow = row;
        let newCol = col;

        switch (event.key) {
            case "ArrowUp":
                newRow = row > 0 ? row - 1 : row;
                action = "MOVE_UP";
                break;
            case "ArrowDown":
                newRow = row < mapData.length - 1 ? row + 1 : row;
                action = "MOVE_DOWN";
                break;
            case "ArrowLeft":
                newCol = col > 0 ? col - 1 : col;
                action = "MOVE_LEFT";
                break;
            case "ArrowRight":
                newCol = col < mapData[0].length - 1 ? col + 1 : col;
                action = "MOVE_RIGHT";
                break;
            case " ":
                action = "SHOOT";
                break;
            default:
                return; // No hacer nada para otras teclas
        }

        // Validar colisión antes de actualizar localmente
        if (action !== "SHOOT" && mapData[newRow][newCol] !== 0) {
            console.log(`Blocked! Can't move to row: ${newRow}, col: ${newCol}`);
            return;
        }

        // Actualizar posición local solo si es un movimiento
        if (action !== "SHOOT") {
            setTankPosition({ row: newRow, col: newCol });
        }

        // Enviar acción al backend
        if (stompClient && stompClient.connected) {
            const payload = {
                room: roomName,
                moveUp: action === "MOVE_UP",
                moveDown: action === "MOVE_DOWN",
                moveLeft: action === "MOVE_LEFT",
                moveRight: action === "MOVE_RIGHT",
                shoot: action === "SHOOT",
            };

            stompClient.send("/app/player/action", {}, JSON.stringify(payload));
            console.log("Action sent to backend:", payload);
        } else {
            console.error("WebSocket not connected");
        }
    };

    // Agregar y eliminar el evento de teclado
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [tankPosition, mapData, roomName]);

    return null; // Este controlador no tiene elementos visuales
};

export default PlayerController;
