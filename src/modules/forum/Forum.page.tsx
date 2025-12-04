"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import FilterForum from "../../common/components/forumComponents/filter";
import Popular from "../../common/components/forumComponents/mostPopular";
import SearchingBar from "../../common/components/forumComponents/searchBar";
import AddPost from "../../common/components/forumComponents/addPost";
import Navbar from "../../common/components/navbar";
import { TypeAnimation } from "react-type-animation";
import { initSocket, getSocket } from "./../../db/services/socket";
import type { Comment, Foro, ForoExtendido } from "../../types/forum";
import { useAuth } from "../../context/AuthContext";
import ForumOverview from "../../common/components/forumComponents/recentPost";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import AsideNotificaciones from "../../common/components/forumComponents/noticias";
export default function ForumPage() {
  const { user, token } = useAuth();

  const [comentarios, setComentarios] = useState<Comment[]>([]);
  const [foros, setForos] = useState<ForoExtendido[]>([]);
  const [foroSeleccionado, setForoSeleccionado] =
    useState<ForoExtendido | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  /* ----------------------- SOCKET INIT ----------------------- */
  useEffect(() => {
    if (!token) return;

    const socket = initSocket(token);
    setSocketConnected(socket.connected);

    const handleConnect = () => {
      console.log("Socket conectado, NO emitiendo get-all-foros aún");
      setSocketConnected(true);
      // NO emitir aquí - esperar a que se carguen los comentarios primero
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", () => {
      console.log("Socket desconectado");
      setSocketConnected(false);
    });
    socket.on("connect_error", (error) => {
      console.error("Error de conexión:", error);
      setSocketConnected(false);
    });

    if (socket.connected) handleConnect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, [token]);

  /* ----------------------- SOLICITAR FOROS UNA VEZ CARGADOS LOS COMENTARIOS ----------------------- */
  useEffect(() => {
    if (comentarios.length === 0) {
      console.log("Esperando comentarios antes de pedir foros...");
      return;
    }

    const socket = getSocket();
    if (!socket) {
      console.warn("Socket no disponible");
      return;
    }

    console.log(
      `Comentarios cargados (${comentarios.length}), ahora emitiendo get-all-foros`
    );
    socket.emit("get-all-foros");
  }, [comentarios.length]);

  /* -------------- RECIBIR COMENTARIOS GLOBALES Y NORMALIZAR ---------------- */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      console.warn("Socket no disponible");
      return;
    }

    console.log("Registrando listener coments");

    const handleComents = (data: Comment[]) => {
      console.log("Recibidos comentarios RAW:", data);
      const normalized = data.map((c) => {
        const foroId =
          typeof c.idForo === "object" && c.idForo
            ? (c.idForo as any)?._id
            : c.idForo;
        console.log(
          `Comentario ${c._id}: idForo type=${typeof c.idForo}, value=`,
          c.idForo,
          "→ normalized=",
          foroId
        );
        return {
          ...c,
          idForo: foroId as string,
        };
      });

      console.log("Comentarios normalizados:", normalized);
      setComentarios(normalized);
    };

    socket.on("coments", handleComents);

    return () => {
      console.log("Limpiando listener coments");
      socket.off("coments", handleComents);
    };
  }, []);

  /* -------------- ASOCIAR COMENTARIOS A FOROS CUANDO AMBOS ESTÉN LISTOS ---------------- */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      console.warn("Socket no disponible");
      return;
    }

    console.log("Registrando listeners para all-foros");

    const handleAllForos = (data: Foro[]) => {
      console.log("Recibidos foros RAW:", data);
      if (!Array.isArray(data)) {
        console.warn(" all-foros data no es un array:", data);
        return;
      }

      console.log(
        `Intentando asociar ${comentarios.length} comentarios a ${data.length} foros`
      );

      // EXTENDER FOROS → agregar posts + comentarios basado en comentarios ACTUALIZADOS
      const extendidos = data.map((f) => {
        const relacionados = comentarios.filter((c) => {
          const cForoId = c.idForo; // Ya está normalizado
          const match = cForoId === f._id;
          if (match) {
            console.log(`Comentario ${c._id} pertenece a foro ${f._id}`);
          }
          return match;
        });

        console.log(
          `Foro "${f.title}" (${f._id}): ${relacionados.length} comentarios`
        );
        return {
          ...f,
          posts: relacionados,
          comentarios: relacionados,
        };
      });

      console.log("Foros extendidos finales:", extendidos);
      setForos(extendidos);
    };

    socket.on("all-foros", handleAllForos);

    return () => {
      console.log("Limpiando listener all-foros");
      socket.off("all-foros", handleAllForos);
    };
  }, [comentarios]);

  /* ------------ COMENTARIOS ESPECÍFICOS DE UN FORO ---------------- */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    console.log("Registrando listener coments-in-the-foro");

    const handleComentsForo = (data: Comment[]) => {
      console.log("Recibidos comentarios del foro:", data);
      const normalizados = data.map((c) => {
        const foroId =
          typeof c.idForo === "object" && c.idForo
            ? (c.idForo as any)?._id
            : c.idForo;
        return {
          ...c,
          idForo: foroId as string,
        };
      });

      console.log("Comentarios normalizados del foro:", normalizados);

      setForos((prev) =>
        prev.map((f) => {
          // Usar el ID del primer comentario como referencia del foro
          const foroId =
            normalizados.length > 0 ? normalizados[0].idForo : null;

          if (f._id === foroId) {
            console.log("Actualizando posts del foro:", f._id);
            return {
              ...f,
              posts: normalizados,
              comentarios: normalizados,
            };
          }
          return f;
        })
      );
      setLoading(false);
    };

    socket.on("coments-in-the-foro", handleComentsForo);

    return () => {
      console.log("Limpiando listener coments-in-the-foro");
      socket.off("coments-in-the-foro", handleComentsForo);
    };
  }, []);

  /* ------------------------ CARGAR POSTS DEL FORO SELECCIONADO ------------------------ */
  useEffect(() => {
    if (!foroSeleccionado?._id) return;

    const socket = getSocket();
    if (!socket?.connected) {
      console.warn(
        "Socket no conectado para cargar foro:",
        foroSeleccionado?._id
      );
      return;
    }

    console.log("Emitiendo all-public-foro para:", foroSeleccionado._id);
    setLoading(true);

    socket.emit("all-public-foro", foroSeleccionado._id);

    const timeout = setTimeout(() => {
      console.warn("⏱Timeout cargando posts del foro");
      setLoading(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [foroSeleccionado?._id]);

  /* ------------------------ AGREGAR POST ------------------------ */
  const agregarPost = useCallback(
    (contenido: string) => {
      if (!foroSeleccionado || !user) {
        console.warn("Foro o usuario no disponibles para agregar post");
        return;
      }

      const socket = getSocket();
      if (!socket?.connected) {
        console.warn("Socket no conectado para agregar post");
        return;
      }

      console.log("Emitiendo nuevo post:", {
        foroId: foroSeleccionado._id,
        userId: user.id,
      });

      socket.emit("new-public", {
        content: contenido,
        idForo: foroSeleccionado._id,
        idUser: user.id,
      });
    },
    [foroSeleccionado, user]
  );

  /* ------------------------ POSTS FILTRADOS ------------------------ */
  const postsFiltrados = useMemo(() => {
    if (!foroSeleccionado?.posts) return [];
    return foroSeleccionado.posts.filter((p) =>
      p.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [foroSeleccionado?.posts, searchTerm]);

  /* ----------------------------- RENDER ----------------------------- */
  return (
    <div className="min-h-screen flex flex-col bg-fund">
      <Navbar />
      <main className="flex-1 w-full mt-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
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
              <p
                className="text-white mt-3 sm:mt-4 font-semibold text-sm sm:text-base md:text-lg 
                text-shadow-2xl shadow-black max-w-3xl mx-auto px-4"
              >
                Selecciona una antología para unirte a las discusiones y
                compartir tus reflexiones literarias
              </p>
            </div>

            <div className="flex gap-6 w-full md:flex-col sm:flex-col lg:flex-row">
              {/* COLUMNA IZQUIERDA: FOROS */}
              <div className="flex-1">
                {foros.length > 0 && (
                  <FilterForum
                    setForoSeleccionado={setForoSeleccionado}
                    foros={foros}
                    comentarios={comentarios}
                  />
                )}
                <ForumOverview foros={foros} />
              </div>

              {/* COLUMNA DERECHA: NOTICIAS */}
              <aside className=" h-fit">
                <AsideNotificaciones />
              </aside>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setForoSeleccionado(null)}
              className="px-4 py-2 rounded-lg text-gray-500 hover:bg-secondary w-fit"
            >
              ← Volver
            </button>

            <h2 className="text-3xl font-semibold text-primary">
              {foroSeleccionado.title}
            </h2>

            <SearchingBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              foroSeleccionado={foroSeleccionado}
            />

            <AddPost
              foroSeleccionado={foroSeleccionado}
              agregarPost={agregarPost}
            />

            <div className="divider">Recientes</div>

            {loading ? (
              <Box
                sx={{
                  width: 1200,
                  height: 1500,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Skeleton variant="rectangular" width="100%" height="150px" />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height="150px"
                />
                <Skeleton
                  variant="rectangular"
                  animation={false}
                  width="100%"
                  height="150px"
                />
              </Box>
            ) : postsFiltrados.length === 0 ? (
              <p className="text-center text-gray-500">No hay posts aún</p>
            ) : (
              <Popular posts={postsFiltrados} agregarComentario={() => {}} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
