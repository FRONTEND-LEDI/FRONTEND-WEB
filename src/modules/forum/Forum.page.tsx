"use client";
import { useState, useEffect } from "react";
import FilterForum from '../../common/components/forumComponents/filter';
import Popular from '../../common/components/forumComponents/mostPopular';
import SearchingBar from '../../common/components/forumComponents/searchBar';
import AddPost from '../../common/components/forumComponents/addPost';
import Navbar from '../../common/components/navbar';
import { TypeAnimation } from 'react-type-animation';
import { socket } from "./../../db/services/socket";
import type { Coment, Foro } from "../../types/forum";
import { useAuth } from "../../context/AuthContext";
export default function ForumPage() {
  const {user} = useAuth()
  const [foros, setForos] = useState<Foro[]>([]);
  const [foroSeleccionado, setForoSeleccionado] = useState<Foro | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {;
    socket.emit("get-all-foros");

    const handleAllForos = (data: any[]) => {
      console.log(" Foros recibidos:", data);
      setForos(data as Foro[]);
    };

    const handleError = (err: any) => {
      console.error(" Error:", err);
    };

    socket.on("all-foros", handleAllForos);
    socket.on("error", handleError);

    return () => {
      socket.off("all-foros", handleAllForos);
      socket.off("error", handleError);
    };
  }, []);

 
  useEffect(() => {
    const handleComentCreated = (nuevo: any) => {
      console.log("Nuevo comentario:", nuevo);
      if (foroSeleccionado && nuevo.idForo === foroSeleccionado._id) {
        setForoSeleccionado(prev => {
          if (!prev) return prev;
          const posts = prev.posts || [];
          return {
            ...prev,
            posts: [nuevo as Coment, ...posts],
          };
        });
      }
    };

    socket.on("coment-created", handleComentCreated);

    return () => {
      socket.off("coment-created", handleComentCreated);
    };
  }, [foroSeleccionado?._id]);

 
  useEffect(() => {
    if (!foroSeleccionado) return;

    console.log(" Cargando foro:", foroSeleccionado._id);
    setLoading(true);
    socket.emit("get-foro-id", foroSeleccionado._id);

    const handleForoData = (foro: any) => {
      console.log(" Datos del foro recibidos:", foro);
  
      const foroConPosts = {
        ...foro,
        posts: Array.isArray(foro.posts) ? foro.posts : []
      };
      setForoSeleccionado(foroConPosts as Foro);
      setLoading(false);
    };

    const handleForoNotFound = () => {
      console.log(" Foro no encontrado");
      setLoading(false);
      alert("Foro no encontrado");
      setForoSeleccionado(null);
    };

    socket.on("foro-data", handleForoData);
    socket.on("foro-not-found", handleForoNotFound);

    return () => {
      socket.off("foro-data", handleForoData);
      socket.off("foro-not-found", handleForoNotFound);
    };
  }, [foroSeleccionado?._id]);

const agregarPost = (contenido: string) => {
  if (!foroSeleccionado || !user) return; // ✅ Verifica que user exista

  const nuevoPost = {
    content: contenido,
    idForo: foroSeleccionado._id,
    idUser: user.id, // ✅ Usa el ID real del usuario autenticado
  };

  console.log("Enviando nuevo post:", nuevoPost);
  socket.emit("new-public", nuevoPost);
};

  const postsFiltrados = foroSeleccionado && foroSeleccionado.posts
    ? foroSeleccionado.posts.filter(post =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

 

  return (
    <div className="mt-20 flex h-screen bg-fund">
      <Navbar/>

      <div className="w-2xs flex flex-col items-center h-full p-4">
        <FilterForum setForoSeleccionado={setForoSeleccionado} foros={foros} />
      </div>
      <div className="divider divider-horizontal"></div>

      {/* Panel derecho */}
      <div className="flex-1 w-5xl justify-center items-center relative overflow-hidden">
        <div className="flex-1 relative overflow-hidden p-8 space-y-6">
          {loading ? (
            <>
              <div className="h-10 rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
              <div className="h-screen w-full rounded-xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
            </>
          ) : (
            <>
              {!foroSeleccionado ? (
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
                    cursor={true}
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
                    Selecciona un foro a la izquierda para explorar más publicaciones.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setForoSeleccionado(null)}
                      className="px-4 py-2 rounded-lg hover:bg-secondary cursor-pointer transition"
                    >
                      ← Volver
                    </button>
                    <h2 className="text-xl text-primary font-bold text-center flex-1">
                      {foroSeleccionado.title}
                    </h2>
                    <div className="w-[80px]" />
                  </div>

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
                  <Popular posts={postsFiltrados} />
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Shimmer animation */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .animate-shimmer {
            background-size: 200% 100%;
            animation: shimmer 1.2s linear infinite;
          }
        `}
      </style>
    </div>
  );
}