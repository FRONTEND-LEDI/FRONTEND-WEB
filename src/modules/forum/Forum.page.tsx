"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import FilterForum from "../../common/components/forumComponents/filter";
import Popular from "../../common/components/forumComponents/mostPopular";
import SearchingBar from "../../common/components/forumComponents/searchBar";
import AddPost from "../../common/components/forumComponents/addPost";
import Navbar from "../../common/components/navbar";
import { TypeAnimation } from "react-type-animation";
import { initSocket, getSocket } from "./../../db/services/socket"; // ✅ getSocket agregado
import type { Coment, Foro } from "../../types/forum";
import { useAuth } from "../../context/AuthContext";
import ForumOverview from "../../common/components/forumComponents/recentPost";

export default function ForumPage() {
  const { user, token } = useAuth();
  const [comentarios, setComentarios] = useState<Coment[]>([]);
  const [foros, setForos] = useState<Foro[]>([]);
  const [foroSeleccionado, setForoSeleccionado] = useState<Foro | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  // 🔌 Inicializar socket cuando hay token
  useEffect(() => {
    if (token) {
      const s = initSocket(token);
      setSocketConnected(s.connected);

      // Limpieza
      return () => {
        s.disconnect();
      };
    }
  }, [token]);

  // Obtenemos la instancia activa del socket
  const socket = getSocket();

  // 🔍 Debug de eventos del socket
  useEffect(() => {
    if (!socket) return;
    const handleAnyEvent = (eventName: string, ...args: any[]) => {
      console.log(` [SOCKET EVENT] "${eventName}":`, args);
    };
    socket.onAny(handleAnyEvent);
    return () => socket.offAny(handleAnyEvent);
  }, [socket]);

  // 🔌 Conexión
  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log("✅ Socket ID:", socket.id);
      setSocketConnected(true);
      socket.emit("get-all-foros");
    };
    const handleDisconnect = (reason: string) => setSocketConnected(false);
    const handleConnectError = (error: Error) => {
      console.error("❌ Error de conexión:", error.message);
      setSocketConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    if (!socket.connected) socket.connect();
    else socket.emit("get-all-foros");

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
    };
  }, [socket]);

  // 📚 Obtener todos los foros
  useEffect(() => {
    if (!socket) return;

    const handleAllForos = (data: any) => {
      if (Array.isArray(data)) setForos(data as Foro[]);
      else console.error("[FOROS] Datos no válidos:", data);
    };
    socket.on("all-foros", handleAllForos);
    socket.on("error", console.error);
    return () => {
      socket.off("all-foros", handleAllForos);
      socket.off("error", console.error);
    };
  }, [socket]);

  // 📝 Escuchar comentarios de un foro
  useEffect(() => {
    if (!socket) return;

    const handleComentsInForo = (data: Coment[]) => {
      const safeData = Array.isArray(data) ? data : [];
      setForoSeleccionado((prev) =>
        prev ? { ...prev, posts: [...safeData].reverse() } : prev
      );

      setComentarios((prev) => {
        const nuevos = safeData.filter((c) => !prev.find((p) => p._id === c._id));
        return [...prev, ...nuevos];
      });

      setLoading(false);
    };

    socket.on("coments-in-the-foro", handleComentsInForo);
    return () => socket.off("coments-in-the-foro", handleComentsInForo);
  }, [socket]);

  // ✨ Escuchar comentarios nuevos en tiempo real
  useEffect(() => {
    if (!socket) return;

    const handleComentCreated = (newComment: Coment) => {
      if (foroSeleccionado && newComment.idForo === foroSeleccionado._id) {
        setForoSeleccionado((prev) => {
          if (!prev) return prev;
          const exists = prev.posts?.find((p) => p._id === newComment._id);
          if (exists) return prev;
          return { ...prev, posts: [newComment, ...(prev.posts || [])] };
        });
      }
      setComentarios((prev) =>
        prev.find((c) => c._id === newComment._id) ? prev : [...prev, newComment]
      );
    };

    socket.on("coment-created", handleComentCreated);
    return () => socket.off("coment-created", handleComentCreated);
  }, [foroSeleccionado?._id, socket]);

  // 🔍 Cargar comentarios del foro seleccionado
  useEffect(() => {
    if (!socket || !foroSeleccionado?._id) return;
    setLoading(true);
    socket.emit("all-public-foro", foroSeleccionado._id);

    const timeout = setTimeout(() => {
      console.log("No se recibieron comentarios en 5 segundos");
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [foroSeleccionado?._id, socket]);

  // 📤 Agregar post
  const agregarPost = useCallback(
    (contenido: string) => {
      if (!foroSeleccionado || !user) return console.error("Falta foro o usuario");
      const s = getSocket();
      if (!s?.connected) return s?.connect();
      s.emit("new-public", {
        content: contenido,
        idForo: foroSeleccionado._id,
        idUser: user.id,
      });
    },
    [foroSeleccionado, user]
  );

  // 🔍 Filtrar posts
  const postsFiltrados = useMemo(() => {
    if (!foroSeleccionado?.posts) return [];
    return foroSeleccionado.posts.filter((post) =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [foroSeleccionado?.posts, searchTerm]);

  // 💬 Render
  return (
    <div className="flex items-center justify-center bg-fund">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto p-4 pt-30 mb-10">
        {!foroSeleccionado ? (
          <>
            <div
              style={{ backgroundImage: `url('/landingImages/bibliotecabg.png')` }}
              className="w-full rounded-xl p-10 text-center shadow-lg bg-cover bg-center"
            >
              <TypeAnimation
                sequence={[
                  "Bienvenido al Club de Lectura!",
                  2000,
                  "",
                  1000,
                  "Comparte tus ideas y únete a discusiones!",
                  3000,
                  "",
                  500,
                ]}
                wrapper="span"
                speed={{ type: "keyStrokeDelayInMs", value: 80 }}
                cursor
                style={{
                  fontSize: "2em",
                  display: "inline-block",
                  textShadow: "4px 4px 8px black",
                  fontWeight: "bold",
                  color: "white",
                }}
                repeat={Infinity}
              />
              <p className="text-white mt-2 font-semibold text-shadow-2xl shadow-black">
                Selecciona una antología para unirte a las discusiones y compartir tus reflexiones literarias
              </p>
            </div>

            <section>
              <FilterForum setForoSeleccionado={setForoSeleccionado} foros={foros} comentarios={comentarios} />
            </section>

            <section>
              <ForumOverview foros={foros} />
            </section>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setForoSeleccionado(null)}
                className="px-4 py-2 rounded-lg text-gray-500 hover:bg-secondary w-25 justify-baseline cursor-pointer transition"
              >
                ← Volver
              </button>
              <h2 className="text-xl text-primary font-semibold flex-1">{foroSeleccionado.title}</h2>
              <p className="text-gray-600 text-md">Discusiones sobre la colección literaria</p>
            </div>

            <SearchingBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} foroSeleccionado={foroSeleccionado} />
            <AddPost foroSeleccionado={foroSeleccionado} agregarPost={agregarPost} />

            <div className="divider">Recientes</div>

            {loading ? (
              <div className="text-center text-gray-500">
                <div className="loading loading-spinner loading-lg"></div>
                <p className="mt-2">Cargando posts...</p>
              </div>
            ) : (
              <Popular posts={postsFiltrados} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
