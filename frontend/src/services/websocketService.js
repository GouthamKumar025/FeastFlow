// src/services/websocketService.js
import { io } from "socket.io-client";

const socket = io("http://localhost:8081");

export const connect = (onMessageReceived) => {
  socket.on("rsvpUpdates", (message) => {
    onMessageReceived(message);
  });
};

export const disconnect = () => {
  socket.disconnect();
};

export const sendRsvpUpdate = (guestUpdate) => {
  socket.emit("updateRsvp", guestUpdate);
};
