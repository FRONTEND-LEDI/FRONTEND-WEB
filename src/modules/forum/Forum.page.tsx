"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import FilterForum from "../../common/components/forumComponents/filter";
import Popular from "../../common/components/forumComponents/mostPopular";
import SearchingBar from "../../common/components/forumComponents/searchBar";
import AddPost from "../../common/components/forumComponents/addPost";
import Navbar from "../../common/components/navbar";
import { TypeAnimation } from "react-type-animation";
import { initSocket, getSocket } from "./../../db/services/socket";
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
    if (!token) return;

    const s = initSocket(token);
    setSocketConnected(s.connected);

    // Listeners para cambios de estado
    const handleConnect = () => {
      console.log("✅ Socket conectado en ForumPage");
      setSocketConnected(true);
      s.emit("get-all-foros");
    };

    const handleDisconnect = (reason: string) => {
      console.log("⚠️ Socket desconectado:", reason);
      setSocketConnected(false);
    };

    const handleConnectError = (error: Error) => {
      console.error("❌ Error de conexión:", error.message);
      setSocketConnected(false);
    };

    s.on("connect", handleConnect);
    s.on("disconnect", handleDisconnect);
    s.on("connect_error", handleConnectError);

    // Si ya está conectado, solicitar foros inmediatamente
    if (s.connected) {
      s.emit("get-all-foros");
    }

    // Limpieza: solo remover listeners, no desconectar
    return () => {
      s.off("connect", handleConnect);
      s.off("disconnect", handleDisconnect);
      s.off("connect_error", handleConnectError);
    };
  }, [token]);

  // Obtener instancia del socket (memoizada)
  const socket = useMemo(() => getSocket(), []);

  // 📚 Obtener todos los foros - Escucha "all-foros"
  useEffect(() => {
    if (!socket) return;

    const handleAllForos = (data: any) => {
      console.log("📚 Foros recibidos:", data);
      if (Array.isArray(data)) {
        setForos(data as Foro[]);
      } else {
        console.error("[FOROS] Datos no válidos:", data);
      }
    };

    const handleError = (error: any) => {
      console.error("❌ Error del socket:", error);
    };

    socket.on("all-foros", handleAllForos);
    socket.on("error", handleError);

    return () => {
      socket.off("all-foros", handleAllForos);
      socket.off("error", handleError);
    };
  }, [socket]);

  // 📝 Escuchar comentarios de un foro - Escucha "coments-in-the-foro"
  useEffect(() => {
    if (!socket) return;

    const handleComentsInForo = (data: Coment[]) => {
      console.log("💬 Comentarios recibidos:", data);
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

  // ✨ Escuchar todos los comentarios - Escucha "coments" (cuando se crea nuevo)
  useEffect(() => {
    if (!socket) return;

    const handleComents = (allComents: Coment[]) => {
      console.log("✨ Comentarios actualizados:", allComents);
      
      if (!Array.isArray(allComents)) return;

      // Si hay un foro seleccionado, filtrar los comentarios de ese foro
      if (foroSeleccionado) {
        const comentsForo = allComents.filter(
          (c) => c.idForo === foroSeleccionado._id
        );
        
        setForoSeleccionado((prev) => {
          if (!prev) return prev;
          return { ...prev, posts: [...comentsForo].reverse() };
        });
      }

      setComentarios(allComents);
    };

    socket.on("coments", handleComents);
    return () => socket.off("coments", handleComents);
  }, [foroSeleccionado, socket]);

  // 🔍 Cargar comentarios del foro seleccionado
  useEffect(() => {
    if (!socket || !foroSeleccionado?._id) return;

    console.log("🔍 Cargando comentarios del foro:", foroSeleccionado._id);
    setLoading(true);
    socket.emit("all-public-foro", foroSeleccionado._id);

    // Timeout de seguridad
    const timeout = setTimeout(() => {
      console.log("⏱️ Timeout: No se recibieron comentarios en 5 segundos");
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [foroSeleccionado?._id, socket]);

  // 📤 Agregar post - Emite "new-public"
  const agregarPost = useCallback(
    (contenido: string) => {
      if (!foroSeleccionado || !user) {
        console.error("❌ Falta foro o usuario");
        return;
      }

      const s = getSocket();
      if (!s) {
        console.error("❌ Socket no disponible");
        return;
      }

      if (!s.connected) {
        console.log("🔄 Socket desconectado, reconectando...");
        s.connect();
        s.once("connect", () => {
          s.emit("new-public", {
            content: contenido,
            idForo: foroSeleccionado._id,
            idUser: user.id,
          });
        });
        return;
      }

      console.log("📤 Enviando nuevo post:", {
        content: contenido,
        idForo: foroSeleccionado._id,
        idUser: user.id,
      });

      // El backend espera data: ComentTypes
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
    <div className="min-h-screen flex flex-col bg-fund">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Indicador de conexión (solo en desarrollo) */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed top-4 right-4 z-50">
            <div
              className={`badge ${
                socketConnected ? "badge-success" : "badge-error"
              } text-xs sm:text-sm`}
            >
              {socketConnected ? "🟢 Conectado" : "🔴 Desconectado"}
            </div>
          </div>
        )}

        {!foroSeleccionado ? (
          <>
            {/* Hero Section */}
            <div
              style={{
                backgroundImage: `url('/landingImages/bibliotecabg.png')`,
              }}
              className="w-full rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 
                text-center shadow-lg bg-cover bg-center mb-6 sm:mb-8"
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
                  fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                  display: "inline-block",
                  textShadow: "4px 4px 8px black",
                  fontWeight: "bold",
                  color: "white",
                }}
                repeat={Infinity}
              />
              <p className="text-white mt-3 sm:mt-4 font-semibold text-sm sm:text-base md:text-lg 
                text-shadow-2xl shadow-black max-w-3xl mx-auto px-4">
                Selecciona una antología para unirte a las discusiones y
                compartir tus reflexiones literarias
              </p>
            </div>

            {/* Filtros de Foros */}
            <section className="mb-6 sm:mb-8">
              <FilterForum
                setForoSeleccionado={setForoSeleccionado}
                foros={foros}
                comentarios={comentarios}
              />
            </section>

            {/* Overview de Foros */}
            <section>
              <ForumOverview foros={foros} />
            </section>
          </>
        ) : (
          <>
            {/* Header del Foro */}
            <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
              <button
                onClick={() => setForoSeleccionado(null)}
                className="px-3 sm:px-4 py-2 rounded-lg text-gray-500 hover:bg-secondary 
                  w-fit text-sm sm:text-base cursor-pointer transition-all 
                  hover:text-gray-700 flex items-center gap-2"
              >
                ← Volver
              </button>
              
              <div className="space-y-1 sm:space-y-2">
                <h2 className="text-xl sm:text-2xl lg:text-3xl text-primary font-semibold">
                  {foroSeleccionado.title}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  Discusiones sobre la colección literaria
                </p>
              </div>
            </div>

            {/* Barra de búsqueda */}
            <div className="mb-4 sm:mb-6">
              <SearchingBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                foroSeleccionado={foroSeleccionado}
              />
            </div>

            {/* Agregar Post */}
            <div className="mb-6 sm:mb-8">
              <AddPost
                foroSeleccionado={foroSeleccionado}
                agregarPost={agregarPost}
              />
            </div>

            {/* Divider */}
            <div className="divider text-sm sm:text-base">Recientes</div>

            {/* Lista de Posts */}
            {loading ? (
              <div className="text-center text-gray-500 py-8 sm:py-12">
                <div className="loading loading-spinner loading-md sm:loading-lg"></div>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base">Cargando posts...</p>
              </div>
            ) : postsFiltrados.length === 0 ? (
              <div className="text-center text-gray-500 py-8 sm:py-12 px-4">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📚</div>
                <p className="text-base sm:text-lg md:text-xl font-medium mb-2">
                  {searchTerm
                    ? "No se encontraron posts con ese término"
                    : "No hay posts aún"}
                </p>
                {!searchTerm && (
                  <p className="text-sm sm:text-base text-gray-400">
                    ¡Sé el primero en comentar!
                  </p>
                )}
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