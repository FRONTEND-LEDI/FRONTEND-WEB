import { io, Socket } from "socket.io-client";

const SOCKET_URL = "";

// Función para obtener el token desde localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

// Crear instancia del socket con autenticación
export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false, // No conectar automáticamente
  auth: (cb) => {
    const token = getAuthToken();
    console.log("🔑 Enviando token al servidor:", token ? "✓" : "✗");
    cb({ token });
  },
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Función para reconectar con nuevo token
export const reconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
  const token = getAuthToken();
  socket.auth = { token };
  socket.connect();
  console.log("🔄 Reconectando socket con token actualizado");
};

// Escuchar errores de autenticación
socket.on("connect_error", (error) => {
  console.error("❌ Error de conexión:", error.message);
  
  if (error.message.includes("authentication") || error.message.includes("token")) {
    console.log("🔄 Intentando reconectar con nuevo token...");
    setTimeout(reconnectSocket, 2000);
  }
});

socket.on("connect", () => {
  console.log("✅ Socket conectado con ID:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Socket desconectado:", reason);
});

export default socket;