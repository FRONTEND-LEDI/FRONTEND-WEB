import { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
  const listenersSetupRef = useRef(false);

  const [comentarios, setComentarios] = useState<Comment[]>([]);
  const [foros, setForos] = useState<ForoExtendido[]>([]);
  const [foroSeleccionado, setForoSeleccionado] =
    useState<ForoExtendido | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  /* ========================= SETUP COMPLETO DE SOCKET Y LISTENERS ========================= */
  useEffect(() => {
    if (!token) {
      console.log("Sin token, no inicializando socket");
      return;
    }

    let isComponentMounted = true;

    const setupAndConnect = () => {
      if (!isComponentMounted) return;

      console.log("Configurando todos los listeners");

      const initializedSocket = initSocket(token);

      /* -------- CONEXIÓN -------- */
      const handleConnect = () => {
        console.log("Socket conectado:", initializedSocket.id);
        if (isComponentMounted) setSocketConnected(true);
      };

      const handleDisconnect = () => {
        console.log(" Socket desconectado");
        if (isComponentMounted) setSocketConnected(false);
      };

      const handleConnectError = (error: any) => {
        console.error("Error de conexión:", error);
        if (isComponentMounted) setSocketConnected(false);
      };

      /* -------- COMENTARIOS GLOBALES -------- */
      const handleComents = (data: Comment[]) => {
        if (!isComponentMounted) return;
        console.log("Recibidos comentarios:", data.length);

        const normalized = data.map((c) => {
          const foroId =
            typeof c.idForo === "object" && c.idForo
              ? (c.idForo as any)?._id
              : c.idForo;
          return {
            ...c,
            idForo: foroId as string,
          };
        });

        setComentarios((prev) => {
          const newCommentMap = new Map(normalized.map((c) => [c._id, c]));
          const actualizados = prev.map((c) => {
            return newCommentMap.has(c._id) ? newCommentMap.get(c._id)! : c;
          });

          normalized.forEach((nc) => {
            if (!prev.some((c) => c._id === nc._id)) {
              actualizados.push(nc);
            }
          });

          return actualizados.length > 0 ? actualizados : normalized;
        });
      };

      /* -------- FOROS -------- */
      const handleAllForos = (data: Foro[]) => {
        if (!isComponentMounted) return;
        console.log("📥 Recibidos foros:", data.length);

        if (!Array.isArray(data)) {
          console.warn("⚠️ Foros data no es un array");
          return;
        }

        // Obtener comentarios actuales del estado
        setComentarios((currentComentarios) => {
          const extendidos = data.map((f) => {
            const relacionados = currentComentarios.filter(
              (c) => c.idForo === f._id
            );
            return {
              ...f,
              posts: relacionados,
              comentarios: relacionados,
            };
          });

          console.log("Foros asociados:", extendidos.length);
          setForos(extendidos);
          return currentComentarios;
        });
      };

      /* -------- COMENTARIOS ESPECÍFICOS DEL FORO -------- */
      const handleComentsForo = (data: Comment[]) => {
        if (!isComponentMounted) return;
        console.log("Recibidos comentarios del foro:", data.length);

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

        setForos((prev) =>
          prev.map((f) => {
            const foroId =
              normalizados.length > 0 ? normalizados[0].idForo : null;
            if (f._id === foroId) {
              return {
                ...f,
                posts: normalizados,
                comentarios: normalizados,
              };
            }
            return f;
          })
        );

        if (isComponentMounted) setLoading(false);
      };

      /* -------- ACTUALIZACIÓN DE COMENTARIOS -------- */
      const handleUpdateComents = (data: Comment[]) => {
        if (!isComponentMounted) return;
        console.log("Comentarios actualizados:", data.length);

        const normalized = data.map((c) => {
          const foroId =
            typeof c.idForo === "object" && c.idForo
              ? (c.idForo as any)?._id
              : c.idForo;
          return {
            ...c,
            idForo: foroId as string,
          };
        });

        setComentarios(normalized);
        setForos((prev) =>
          prev.map((f) => {
            const nuevosComentarios = normalized.filter(
              (c) => c.idForo === f._id
            );
            return {
              ...f,
              posts: nuevosComentarios,
              comentarios: nuevosComentarios,
            };
          })
        );
      };

      /* -------- ELIMINACIÓN DE COMENTARIOS -------- */
      const handleDeleteComents = (data: Comment[]) => {
        if (!isComponentMounted) return;
        console.log("Comentarios después de eliminación:", data.length);

        const normalized = data.map((c) => {
          const foroId =
            typeof c.idForo === "object" && c.idForo
              ? (c.idForo as any)?._id
              : c.idForo;
          return {
            ...c,
            idForo: foroId as string,
          };
        });

        setComentarios(normalized);
        setForos((prev) =>
          prev.map((f) => {
            const comentariosRestantes = normalized.filter(
              (c) => c.idForo === f._id
            );
            return {
              ...f,
              posts: comentariosRestantes,
              comentarios: comentariosRestantes,
            };
          })
        );
      };

      /* -------- REGISTRAR TODOS LOS LISTENERS -------- */
      initializedSocket.on("connect", handleConnect);
      initializedSocket.on("disconnect", handleDisconnect);
      initializedSocket.on("connect_error", handleConnectError);
      initializedSocket.on("coments", handleComents);
      initializedSocket.on("all-foros", handleAllForos);
      initializedSocket.on("coments-in-the-foro", handleComentsForo);
      initializedSocket.on("update", handleUpdateComents);
      initializedSocket.on("Delete", handleDeleteComents);

      if (initializedSocket.connected) handleConnect();

      /* -------- CLEANUP -------- */
      return () => {
        console.log("🧹 Limpiando listeners");
        initializedSocket.off("connect", handleConnect);
        initializedSocket.off("disconnect", handleDisconnect);
        initializedSocket.off("connect_error", handleConnectError);
        initializedSocket.off("coments", handleComents);
        initializedSocket.off("all-foros", handleAllForos);
        initializedSocket.off("coments-in-the-foro", handleComentsForo);
        initializedSocket.off("update", handleUpdateComents);
        initializedSocket.off("Delete", handleDeleteComents);
      };
    };

    const cleanup = setupAndConnect();

    return () => {
      isComponentMounted = false;
      cleanup?.();
    };
  }, [token]);

  /* -------- SOLICITAR FOROS UNA VEZ CARGADOS LOS COMENTARIOS -------- */
  useEffect(() => {
    if (comentarios.length === 0) {
      console.log("Esperando comentarios...");
      return;
    }

    const socket = getSocket();
    if (!socket || !socket.connected) {
      console.warn("Socket no disponible o desconectado");
      return;
    }

    console.log(`Emitiendo get-all-foros (comentarios: ${comentarios.length})`);
    socket.emit("get-all-foros");
  }, [comentarios.length]);

  /* ------------------------ CARGAR POSTS DEL FORO SELECCIONADO ------------------------ */
  useEffect(() => {
    if (!foroSeleccionado?._id) {
      setLoading(false);
      return;
    }

    const socket = getSocket();
    if (!socket?.connected) {
      console.warn(
        "Socket no conectado para cargar foro:",
        foroSeleccionado?._id
      );
      setLoading(false);
      return;
    }

    console.log("Emitiendo all-public-foro para:", foroSeleccionado._id);
    setLoading(true);

    socket.emit("all-public-foro", foroSeleccionado._id);

    const timeout = setTimeout(() => {
      console.warn("⏱Timeout cargando posts del foro");
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [foroSeleccionado?._id]);

  /* ------------------------ AGREGAR RESPUESTA A COMENTARIO ------------------------ */
  const agregarComentario = useCallback(
    (postId: string, contenido: string) => {
      if (!foroSeleccionado || !user) {
        console.warn("Foro o usuario no disponibles para responder");
        return;
      }

      const socket = getSocket();
      if (!socket?.connected) {
        console.warn("Socket no conectado para responder");
        return;
      }

      console.log("Emitiendo respuesta al post:", {
        postId,
        foroId: foroSeleccionado._id,
      });

      socket.emit("create-answer", postId, {
        content: contenido,
        idForo: foroSeleccionado._id,
        idUser: user.id,
        idComent: postId,
      });
    },
    [foroSeleccionado, user]
  );

  /* ------------------------ EDITAR COMENTARIO/POST ------------------------ */
  const editarPost = useCallback(
    (postId: string, contenido: string) => {
      if (!user || !foroSeleccionado) {
        console.warn("Usuario o foro no disponible para editar post");
        return;
      }

      const socket = getSocket();
      if (!socket?.connected) {
        console.warn("Socket no conectado para editar post");
        return;
      }

      console.log("Emitiendo edición de post:", postId);

      // Actualizar estado local inmediatamente
      setForos((prev) =>
        prev.map((f) => {
          if (f._id === foroSeleccionado._id) {
            return {
              ...f,
              posts: f.posts.map((p) =>
                p._id === postId ? { ...p, content: contenido } : p
              ),
              comentarios: f.comentarios.map((c) =>
                c._id === postId ? { ...c, content: contenido } : c
              ),
            };
          }
          return f;
        })
      );

      // Actualizar comentarios globales
      setComentarios((prev) =>
        prev.map((c) => (c._id === postId ? { ...c, content: contenido } : c))
      );

      socket.emit("update-coment", postId, {
        content: contenido,
      });
    },
    [user, foroSeleccionado]
  );

  /* ------------------------ ELIMINAR COMENTARIO/POST ------------------------ */
  const eliminarPost = useCallback(
    (postId: string) => {
      if (!user || !foroSeleccionado) {
        console.warn("Usuario o foro no disponible para eliminar post");
        return;
      }

      const socket = getSocket();
      if (!socket?.connected) {
        console.warn("Socket no conectado para eliminar post");
        return;
      }

      console.log("Emitiendo eliminación de post:", postId);

      // Actualizar estado local inmediatamente (optimistic update)
      setForos((prev) =>
        prev.map((f) => {
          if (f._id === foroSeleccionado._id) {
            return {
              ...f,
              posts: f.posts.filter((p) => p._id !== postId),
              comentarios: f.comentarios.filter((c) => c._id !== postId),
            };
          }
          return f;
        })
      );

      // Actualizar comentarios globales
      setComentarios((prev) => prev.filter((c) => c._id !== postId));

      socket.emit("delete-coment", postId);
    },
    [user, foroSeleccionado]
  );
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

      // Crear post local inmediatamente
      const nuevoPost: Comment = {
        _id: `temp-${Date.now()}`,
        content: contenido,
        idForo: foroSeleccionado._id,
        idUser: user as any,
        createdAt: new Date().toISOString(),
      };

      // Actualizar estado local inmediatamente
      setForos((prev) =>
        prev.map((f) =>
          f._id === foroSeleccionado._id
            ? {
                ...f,
                posts: [...f.posts, nuevoPost],
                comentarios: [...f.comentarios, nuevoPost],
              }
            : f
        )
      );

      // Emitir al servidor
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
              <Popular
                posts={postsFiltrados}
                agregarComentario={agregarComentario}
                editarPost={editarPost}
                eliminarPost={eliminarPost}
                usuarioActual={user}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
