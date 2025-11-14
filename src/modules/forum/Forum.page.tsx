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
import Skeleton from '@mui/material/Skeleton';
 import Box from '@mui/material/Box';
export default function ForumPage() {
  const { user, token } = useAuth();

  const [comentarios, setComentarios] = useState<Comment[]>([]);
  const [foros, setForos] = useState<ForoExtendido[]>([]);
  const [foroSeleccionado, setForoSeleccionado] = useState<ForoExtendido | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  /* ----------------------- SOCKET INIT ----------------------- */
  useEffect(() => {
    if (!token) return;

    const socket = initSocket(token);
    setSocketConnected(socket.connected);

    const handleConnect = () => {
      setSocketConnected(true);

      setTimeout(() => {
        socket.emit("get-all-foros");
      }, 100);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", () => setSocketConnected(false));
    socket.on("connect_error", () => setSocketConnected(false));

    if (socket.connected) handleConnect();

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [token]);

  /* -------------- RECIBIR LISTA DE FOROS ---------------- */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleAllForos = (data: Foro[]) => {
      if (!Array.isArray(data)) return;

      // EXTENDER FOROS → agregar posts + comentarios
      const extendidos = data.map((f) => {
        const relacionados = comentarios.filter((c) => c.idForo === f._id);

        return {
          ...f,
          posts: relacionados,
          comentarios: relacionados,
        };
      });

      setForos(extendidos);
    };

    socket.on("all-foros", handleAllForos);

    return () => {
      socket.off("all-foros", handleAllForos);
    };
  }, [comentarios]);

  /* --------------------- RECIBIR COMENTARIOS GLOBALES --------------------- */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleComents = (data: Comment[]) => {
      const normalized = data.map((c) => ({
        ...c,
        idForo: typeof c.idForo === "object" ? c.idForo?._id : c.idForo,
      }));

      setComentarios(normalized);
    };

    socket.on("coments", handleComents);

    return () => {
      socket.off("coments", handleComents);
    };
  }, []);

  /* ------------ COMENTARIOS ESPECÍFICOS DE UN FORO ---------------- */
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleComentsForo = (data: Comment[]) => {
      if (!foroSeleccionado?._id) return;

      const normalizados = data.map((c) => ({
        ...c,
        idForo: typeof c.idForo === "object" ? c.idForo._id : c.idForo,
      }));

      setForos((prev) =>
        prev.map((f) =>
          f._id === foroSeleccionado._id
            ? {
                ...f,
                posts: normalizados,
                comentarios: normalizados,
              }
            : f
        )
      );
    };

    socket.on("coments-in-the-foro", handleComentsForo);

    return () => socket.off("coments-in-the-foro", handleComentsForo);
  }, [foroSeleccionado]);

  /* ------------------------ CARGAR POSTS DEL FORO SELECCIONADO ------------------------ */
  useEffect(() => {
    if (!foroSeleccionado?._id) return;

    const socket = getSocket();
    if (!socket?.connected) return;

    setLoading(true);

    socket.emit("all-public-foro", foroSeleccionado._id);

    const timeout = setTimeout(() => setLoading(false), 10000);

    return () => clearTimeout(timeout);
  }, [foroSeleccionado?._id]);

  /* ------------------------ AGREGAR POST ------------------------ */
  const agregarPost = useCallback(
    (contenido: string) => {
      if (!foroSeleccionado || !user) return;

      const socket = getSocket();
      if (!socket?.connected) return;

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
              <p className="text-white mt-3 sm:mt-4 font-semibold text-sm sm:text-base md:text-lg 
                text-shadow-2xl shadow-black max-w-3xl mx-auto px-4">
                Selecciona una antología para unirte a las discusiones y
                compartir tus reflexiones literarias
              </p>
            </div>


            {foros.length > 0 && (
              <FilterForum
                setForoSeleccionado={setForoSeleccionado}
                foros={foros}
                comentarios={comentarios}
              />
            )}

            <ForumOverview foros={foros} />
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

            <AddPost foroSeleccionado={foroSeleccionado} agregarPost={agregarPost} />

            <div className="divider">Recientes</div>

            {loading ? (
             
             



   <Box sx={{ width: 1200, height: 1500, display: "flex",
  flexDirection: "column",
  gap: 2 }}>
      <Skeleton variant="rectangular"  width="100%" height="150px"  />
      <Skeleton variant="rectangular" animation="wave" width="100%" height="150px" />
      <Skeleton variant="rectangular" animation={false} width="100%" height="150px" />
    </Box>


            ) : postsFiltrados.length === 0 ? (
              <p className="text-center text-gray-500">No hay posts aún</p>
            ) : (
              <Popular
                posts={postsFiltrados}
                agregarComentario={() => {}} 
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
