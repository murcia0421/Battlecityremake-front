import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";


const SOCKET_URL = "http://localhost:8080/ws";
export let stompClient = null; // Declarar y exportar

let currentSubscriptions = new Map();

export const connectToRoom = (roomName, onMessageReceived) => {
    // Solo conectarse si no hay cliente conectado
    if (stompClient && stompClient.connected) {
        subscribeToRoom(roomName, onMessageReceived); // Reutiliza la conexión existente
        return;
    }

    const socket = new SockJS(SOCKET_URL);
    stompClient = Stomp.over(socket);

    stompClient.debug = () => {}; // Deshabilitar logs de STOMP

    stompClient.connect(
        {},
        () => {
            console.log("Connected to WebSocket");
            subscribeToRoom(roomName, onMessageReceived); // Solo se suscribe una vez
        },
        (error) => {
            console.error("WebSocket connection error:", error);
            setTimeout(() => {
                if (!stompClient?.connected) {
                    connectToRoom(roomName, onMessageReceived); // Reconectar si no está conectado
                }
            }, 5000);
        }
    );
};

const subscribeToRoom = (roomName, onMessageReceived) => {
    if (!currentSubscriptions.has(roomName)) {
        const subscription = stompClient.subscribe("/topic/room-status", (message) => {
            if (message.body) {
                const parsedMessage = JSON.parse(message.body);
                console.log("WebSocket received message:", parsedMessage);
                onMessageReceived(parsedMessage);
            }
        });

        currentSubscriptions.set(roomName, subscription);

        stompClient.send("/app/join", {}, roomName); // Solo envía el mensaje de unirse si no se ha enviado ya
    }
};

export const leaveRoom = (roomName) => {
    if (stompClient?.connected) {
        try {
            stompClient.send("/app/leave", {}, roomName);
            console.log(`Left room: ${roomName}`);

            const subscription = currentSubscriptions.get(roomName);
            if (subscription) {
                subscription.unsubscribe();
                currentSubscriptions.delete(roomName);
            }

            if (currentSubscriptions.size === 0) {
                stompClient.disconnect(() => {
                    console.log("Disconnected from WebSocket");
                    stompClient = null;
                });
            }
        } catch (error) {
            console.error("Error while leaving room:", error);
        }
    }
};

export const isConnected = () => {
    return stompClient && stompClient.connected;
};