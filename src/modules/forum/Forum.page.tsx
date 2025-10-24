"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import FilterForum from '../../common/components/forumComponents/filter';
import Popular from '../../common/components/forumComponents/mostPopular';
import SearchingBar from '../../common/components/forumComponents/searchBar';
import AddPost from '../../common/components/forumComponents/addPost';
import Navbar from '../../common/components/navbar';
import { TypeAnimation } from 'react-type-animation';
import { socket } from "./../../db/services/socket";
import type { Coment, Foro } from "../../types/forum";
import { useAuth } from "../../context/AuthContext";
import ForumOverview from "../../common/components/forumComponents/recentPost";

export default function ForumPage() {
  const { user } = useAuth();
  const [comentarios, setComentarios] = useState<Coment[]>([]);
  const [foros, setForos] = useState<Foro[]>([]);
  const [foroSeleccionado, setForoSeleccionado] = useState<Foro | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
   
  // 🔍 Debugging de eventos del socket
  useEffect(() => {
    const handleAnyEvent = (eventName: string, ...args: any[]) => {
      console.log(`📨 [SOCKET EVENT] "${eventName}":`, args);
    };
    socket.onAny(handleAnyEvent);
    return () => socket.offAny(handleAnyEvent);
  }, []);

  // 🔌 Conexión del socket
  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket ID:", socket.id);
      setSocketConnected(true);
      socket.emit("get-all-foros");
    };
    const handleDisconnect = (reason: string) => setSocketConnected(false);
    const handleConnectError = (error: Error) => {
      console.error("Error de conexión:", error.message);
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
  }, []);

  // 📚 Obtener todos los foros
  useEffect(() => {
    const handleAllForos = (data: any) => {
      if (Array.isArray(data)) setForos(data as Foro[]);
      else console.error("[FOROS] Los datos recibidos no son un array:", data);
    };
    socket.on("all-foros", handleAllForos);
    socket.on("error", console.error);
    return () => {
      socket.off("all-foros", handleAllForos);
      socket.off("error", console.error);
    };
  }, []);

  // 📝 Escuchar comentarios de un foro
  useEffect(() => {
    const handleComentsInForo = (data: Coment[]) => {
      const safeData = Array.isArray(data) ? data : [];
      setForoSeleccionado(prev => {
        if (!prev) return prev;
        return { ...prev, posts: [...safeData].reverse() };
      });

      // Actualizar comentarios globales
      setComentarios(prev => {
        const nuevos = safeData.filter(c => !prev.find(p => p._id === c._id));
        return [...prev, ...nuevos];
      });

      setLoading(false);
    };

    socket.on("coments-in-the-foro", handleComentsInForo);
    return () => socket.off("coments-in-the-foro", handleComentsInForo);
  }, []);

  // ✨ Escuchar comentarios nuevos en tiempo real
  useEffect(() => {
    const handleComentCreated = (newComment: Coment) => {
      // Solo agregar al foro seleccionado si corresponde
      if (foroSeleccionado && newComment.idForo === foroSeleccionado._id) {
        setForoSeleccionado(prev => {
          if (!prev) return prev;
          const exists = prev.posts?.find(p => p._id === newComment._id);
          if (exists) return prev;
          return { ...prev, posts: [newComment, ...(prev.posts || [])] };
        });
      }
      // Actualizar comentarios globales
      setComentarios(prev => {
        if (!prev.find(c => c._id === newComment._id)) return [...prev, newComment];
        return prev;
      });
    };

    socket.on("coment-created", handleComentCreated);
    return () => socket.off("coment-created", handleComentCreated);
  }, [foroSeleccionado?._id]);

  // 🔍 Cargar datos del foro seleccionado
  useEffect(() => {
    if (!foroSeleccionado?._id) return;
    setLoading(true);
    socket.emit("all-public-foro", foroSeleccionado._id);

    const timeout = setTimeout(() => {
      console.log("No se recibieron comentarios en 5 segundos");
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [foroSeleccionado?._id]);

  // 📤 Agregar post
  const agregarPost = useCallback(
    (contenido: string) => {
      if (!foroSeleccionado || !user) return console.error("Falta foro o usuario");
      if (!socket.connected) return socket.connect();

      socket.emit("new-public", {
        content: contenido,
        idForo: foroSeleccionado._id,
        idUser: user.id,
      });
    },
    [foroSeleccionado, user]
  );

  // 🔍 Filtrar posts por búsqueda
  const postsFiltrados = useMemo(() => {
    if (!foroSeleccionado?.posts) return [];
    return foroSeleccionado.posts.filter(post =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [foroSeleccionado?.posts, searchTerm]);

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
                  'Bienvenido al Club de Lectura!',
                  2000,
                  '',
                  1000,
                  'Comparte tus ideas y únete a discusiones!',
                  3000,
                  '',
                  500,
                ]}
                wrapper="span"
                speed={{ type: 'keyStrokeDelayInMs', value: 80 }}
                cursor
                style={{
                  fontSize: '2em',
                  display: 'inline-block',
                  textShadow: '4px 4px 8px black',
                  fontWeight: 'bold',
                  color: 'white',
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

            <SearchingBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              foroSeleccionado={foroSeleccionado}
            />

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
