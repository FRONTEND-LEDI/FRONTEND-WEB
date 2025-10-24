import { io } from "socket.io-client";

// Asegúrate de que la URL sea correcta
const SOCKET_URL = "http://localhost:3402"; // O tu URL del backend

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  transports: ['websocket', 'polling'], // Importante: incluir ambos
});

// Debug: Ver todos los eventos
socket.onAny((eventName, ...args) => {
  console.log(`📨 [Socket Event] ${eventName}:`, args);
});

socket.on("connect", () => {
  console.log("✅ Socket conectado con ID:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Socket desconectado. Razón:", reason);
});

socket.on("connect_error", (error) => {
  console.error("🔥 Error de conexión:", error.message);
});