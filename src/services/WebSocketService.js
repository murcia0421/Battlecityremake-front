import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SOCKET_URL = "http://localhost:8080/ws";

let stompClient = null;

/**
 * Conectar al WebSocket y unirse a una sala.
 * @param {string} roomName - Nombre de la sala a unirse.
 * @param {function} onMessageReceived - Callback para manejar mensajes recibidos.
 */
export const connectToRoom = (roomName, onMessageReceived) => {
    const socket = new SockJS(SOCKET_URL);
    stompClient = Stomp.over(socket);

    stompClient.connect(
        {},
        () => {
            console.log("Connected to WebSocket");

            // Suscribirse al tema de la sala
            stompClient.subscribe("/topic/room-status", (message) => {
                if (message.body) {
                    onMessageReceived(JSON.parse(message.body));
                }
            });

            // Enviar solicitud para unirse a la sala
            stompClient.send("/app/join", {}, roomName);
        },
        (error) => {
            console.error("WebSocket connection error:", error);
        }
    );
};

/**
 * Salir de una sala y desconectar el WebSocket.
 * @param {string} roomName - Nombre de la sala a abandonar.
 */
export const leaveRoom = (roomName) => {
    if (stompClient && stompClient.connected) {
        try {
            stompClient.send("/app/leave", {}, roomName);
            console.log(`Left room: ${roomName}`);
        } catch (error) {
            console.error("Error while leaving room:", error);
        } finally {
            stompClient.disconnect(() => {
                console.log("Disconnected from WebSocket");
            });
        }
    } else {
        console.warn("Cannot leave room: WebSocket client is not connected!");
    }
};

/**
 * Verificar si el WebSocket está conectado.
 * @returns {boolean} - `true` si el cliente está conectado, de lo contrario, `false`.
 */
export const isConnected = () => {
    return stompClient && stompClient.connected;
};
