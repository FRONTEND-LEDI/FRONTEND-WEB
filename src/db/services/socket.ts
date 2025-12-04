import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3402";
let socket: Socket | null = null;

export const initSocket = (token: string): Socket => {
  // Solo crear un nuevo socket si no existe o está desconectado
  if (socket?.connected) {
    console.log("Socket ya conectado, limpiando listeners antiguos");
    // Limpiar listeners antiguos que pueden estar desconectados del estado nuevo
    socket.off("coments");
    socket.off("all-foros");
    socket.off("coments-in-the-foro");
    socket.off("update");
    socket.off("Delete");
    return socket;
  }

  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["polling", "websocket"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
    timeout: 10000,
    autoConnect: false,
  });

  socket.on("connect", () => {
    console.log("Socket conectado:", socket?.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket desconectado:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("Error de conexión:", err.message);
  });

  // Conectar manualmente después de configurar los listeners
  socket.connect();

  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
