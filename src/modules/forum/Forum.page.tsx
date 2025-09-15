"use client";
import { useState, useEffect } from "react";
import FilterForum from '../../common/components/forumComponents/filter';
import Popular from '../../common/components/forumComponents/mostPopular';
import SearchingBar from '../../common/components/forumComponents/searchBar';
import AddPost from '../../common/components/forumComponents/addPost';
import Navbar from '../../common/components/navbar';
import { TypeAnimation } from 'react-type-animation';
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
  useEffect(() => {
    if (!foroSeleccionado) return;
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timeout);
  }, [foroSeleccionado]);
  return (
    <div className="mt-20 flex h-screen  bg-fund">
      <Navbar/>
      {/* Panel izquierdo */}
      <div className="w-2xs flex flex-col justify-content items-center h-full p-4">
        <FilterForum setForoSeleccionado={setForoSeleccionado} foros={foros} />
      </div>
      <div className="divider divider-horizontal"></div>
      {/* Panel derecho */}
     <div className="flex-1  w-5xl justify-center items-center relative overflow-hidden  space-y-6">
<div className="flex-1 relative overflow-hidden space-y-6">
  <div className="flex-1 relative overflow-hidden p-8 space-y-6">
  {loading ? (
    <>
      <SkeletonTop />
      <SkeletonPosts />
    </>
  ) : (
    <>
      {!foroSeleccionado && (
        <div style={{ backgroundImage: `url('/landingImages/bibliotecabg.png')` }}
         className="w-full rounded-xl p-10 text-center shadow-lg bg-cover bg-center">
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
  speed={{type: 'keyStrokeDelayInMs', value: 80}}
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

<p className="text-white mt-2 semibold text-shadow-2xl shadow-black ">Selecciona un foro a la izquierda para explorar más publicaciones.</p>
        </div>
      )}
      {foroSeleccionado && (
        <>
            <div className="flex items-center justify-between">
            <button
              onClick={() => setForoSeleccionado(null)}
              className="px-4 py-2  rounded-lg hover:bg-secondary cursor-pointer transition"
            >
              ← Volver
            </button>
            <h2 className="text-xl text-primary font-bold text-center flex-1">
              {foroSeleccionado.nombre}
            </h2>
            <div className="w-[80px]" />
          </div>
          <SearchingBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} foroSeleccionado={foroSeleccionado} />
          <AddPost foroSeleccionado={foroSeleccionado} agregarPost={agregarPost} />
        </>
      )}
      
      <Popular posts={postsFiltrados} />
    </>
  )}
</div>
</div>
</div>
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
