import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3402";

let socket: Socket | null = null;

export const initSocket = (token: string): Socket => {
  if (socket) socket.disconnect();
  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => console.log("✅ Socket conectado:", socket?.id));
  socket.on("disconnect", (reason) => console.log("⚠️ Socket desconectado:", reason));
  socket.on("connect_error", (err) => console.error("❌ Error de conexión:", err.message));

return socket;
};

// Para acceder al socket desde otros módulos
export const getSocket = (): Socket | null => socket;
