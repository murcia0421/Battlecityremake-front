import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SOCKET_URL = "http://localhost:8080/ws";

let stompClient = null;

export const connectToRoom = (roomName, onMessageReceived) => {
    // Desconectar si ya hay una conexión activa
    if (stompClient && stompClient.connected) {
        stompClient.disconnect();
    }

    const socket = new SockJS(SOCKET_URL);
    stompClient = Stomp.over(socket);
    
    // Deshabilitar logs de STOMP
    stompClient.debug = () => {};

    stompClient.connect(
        {},
        () => {
            console.log("Connected to WebSocket");

            // Suscribirse al tema de la sala
            stompClient.subscribe("/topic/room-status", (message) => {
                if (message.body) {
                    const parsedMessage = JSON.parse(message.body);
                    console.log("WebSocket received message:", parsedMessage);
                    onMessageReceived(parsedMessage);
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

export const leaveRoom = (roomName) => {
    if (stompClient && stompClient.connected) {
        try {
            stompClient.send("/app/leave", {}, roomName);
            console.log(`Left room: ${roomName}`);
            
            stompClient.disconnect(() => {
                console.log("Disconnected from WebSocket");
                stompClient = null;
            });
        } catch (error) {
            console.error("Error while leaving room:", error);
        }
    }
};

export const isConnected = () => {
    return stompClient && stompClient.connected;
};