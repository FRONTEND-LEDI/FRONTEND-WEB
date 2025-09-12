"use client";

import { useState, useEffect } from "react";
import FilterForum from '../../common/components/forumComponents/filter';
import Popular from '../../common/components/forumComponents/mostPopular';
import SearchingBar from '../../common/components/forumComponents/searchBar';
import AddPost from '../../common/components/forumComponents/addPost';
import Navbar from '../../common/components/navbar';

type Foro = {
  id: string;
  nombre: string;
  posts: string[];
}

const forosIniciales: Foro[] = [
  { id: "2022", nombre: "Antologías 2022", posts: ["Publicación A del 2022", "Publicación B del 2022"] },
  { id: "2023", nombre: "Antologías 2023", posts: ["Publicación A del 2023", "Publicación B del 2023"] },
  { id: "2024", nombre: "Antologías 2024", posts: ["Publicación A del 2024", "Publicación B del 2024"] },
];


// Skeleton 1: search bar + botón
function SkeletonTop() {
  return (
    <div className="space-y-2 mb-4">
      <div className="h-10  rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
      <div className="h-10 w-1/4 rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
    </div>
  );
}

// Skeleton 2: publicaciones
function SkeletonPosts() {
  return (
    <div className="space-y-4">
      <div className="h-screen w-full rounded-xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
    </div>
  );
}

export default function ForumPage() {
  const [foros, setForos] = useState<Foro[]>(forosIniciales);
  const [foroSeleccionado, setForoSeleccionado] = useState<Foro | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const agregarPost = (post: string) => {
    if (!foroSeleccionado) return;
    const nuevosForos = foros.map(foro =>
      foro.id === foroSeleccionado.id
        ? { ...foro, posts: [post, ...foro.posts] }
        : foro
    );
    setForos(nuevosForos);
    setForoSeleccionado({ ...foroSeleccionado, posts: [post, ...foroSeleccionado.posts] });
  };

  const postsFiltrados = foroSeleccionado
    ? foroSeleccionado.posts.filter(post =>
        post.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : foros.flatMap(f => f.posts);

  // Activamos skeleton cada vez que cambia de foro
  useEffect(() => {
    if (!foroSeleccionado) return;
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timeout);
  }, [foroSeleccionado]);

  return (
    <div className="mt-20 flex h-screen">
      <Navbar/>,
      
      {/* Panel izquierdo */}
      <div className="w-3xs flex flex-col  h-full p-4">
        <FilterForum setForoSeleccionado={setForoSeleccionado} foros={foros} />
      </div>

      <div className="divider divider-horizontal"></div>

      {/* Panel derecho */}
     <div className="flex-1 relative overflow-hidden  space-y-6">
<div className="flex-1 relative overflow-hidden space-y-6">
  <div className="flex-1 relative overflow-hidden p-8 space-y-6">
  {loading ? (
    <>
      <SkeletonTop />
      <SkeletonPosts />
    </>
  ) : (
    <>
      {/* Banner solo cuando no hay foro seleccionado */}
      {!foroSeleccionado && (
        <div style={{ backgroundImage: `url('bibliotecabg.png')` }}
         className="w-full rounded-xl  p-10 text-center shadow-lg ">
          <h2 className="text-2xl font-bold text-white">¡Bienvenido al Club de Lectura!</h2>
          <p className="text-white mt-2">Selecciona un foro a la izquierda para explorar más publicaciones.</p>
        </div>
      )}

      {/* Barra de búsqueda y agregar post solo si hay foro seleccionado */}
      {foroSeleccionado && (
        <>
          <SearchingBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} foroSeleccionado={foroSeleccionado} />
          <AddPost foroSeleccionado={foroSeleccionado} agregarPost={agregarPost} />
        </>
      )}

      {/* Posts recientes siempre */}
      <Popular posts={postsFiltrados} />
    </>
  )}
</div>

</div>



</div>


      {/* Animación shimmer */}
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
