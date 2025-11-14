"use client";

import { useState } from "react";
import type { Comment } from "../../../types/forum";
import { MessageCircle } from "lucide-react";

interface PopularProps {
  posts: Comment[];
  agregarComentario: (postId: string, contenido: string) => void;
}

export default function Popular({ posts, agregarComentario }: PopularProps) {
  const [comentarios, setComentarios] = useState<{ [key: string]: string }>({});
  const [openInput, setOpenInput] = useState<{ [key: string]: boolean }>({});

  // Obtener iniciales sin avatar
  const getInitials = (user: any): string => {
    if (!user) return "??";

    return user.userName
      ?.split(" ")
      .map((w: string) => w[0].toUpperCase())
      .join("")
      .slice(0, 2);
  };

  // Ordenar por fecha: más nuevo primero
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
  });

  // Filtrar solo comentarios sin idComent (comentarios principales)
  const principales = sortedPosts.filter((c) => !c.idComent);

  // Obtener respuestas para cada comentario
  const getRespuestas = (commentId: string) =>
    sortedPosts.filter((c) => c.idComent === commentId);

  const handleChange = (postId: string, value: string) =>
    setComentarios((prev) => ({ ...prev, [postId]: value }));

  const handleSubmit = (postId: string) => {
    const texto = comentarios[postId];

    if (texto?.trim()) {
      agregarComentario(postId, texto);
      setComentarios((prev) => ({ ...prev, [postId]: "" }));
      setOpenInput((prev) => ({ ...prev, [postId]: false }));
    }
  };

  return (
    <div className="space-y-6">
      {principales.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No hay publicaciones aún</p>
      ) : (
        principales.map((post) => {
          const initials = getInitials(post.idUser);
          const respuestas = getRespuestas(post._id);

          return (
            <div key={post._id} className="bg-white rounded-lg shadow-md p-4 shadow-gray-300">
              
              {/* HEADER */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {initials}
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <p className="font-bold">{post.idUser?.userName}</p>

                    <p className="text-xs text-gray-500">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleString("es-ES")
                        : "Sin fecha"}
                    </p>
                  </div>
                </div>
              </div>

            
              <p className="text-gray-700 mb-3 whitespace-pre-wrap">{post.content}</p>

            
              <div className="flex items-center gap-2">
  <MessageCircle
    onClick={() =>
      setOpenInput((prev) => ({ ...prev, [post._id]: !prev[post._id] }))
    }
    className="cursor-pointer text-primary"
  />
  <span>{respuestas.length} Respuestas</span>
</div>

{/* BLOQUE QUE SE DESPLIEGA */}
{openInput[post._id] && (
  <div className="mt-2 ml-10 space-y-2">
    {/* INPUT PARA NUEVA RESPUESTA */}
    <div className="flex gap-2">
      <input
        type="text"
        className="flex-1 p-2 rounded-md border-2 border-primary hover-border-primary"
        placeholder="Responder..."
        
        value={comentarios[post._id] ?? ""}
        onChange={(e) => handleChange(post._id, e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(post._id)}
      />
      <button
        onClick={() => handleSubmit(post._id)}
        className="bg-primary text-white px-3 py-1 rounded-md"
      >
        Enviar
      </button>
    </div>

    {/* RESPUESTAS */}
    {respuestas.length > 0 && (
      <div className="mt-2 space-y-3 border-l  border-primary pl-8">
        {respuestas.map((resp) => (
          <div key={resp._id} className="bg-gray-200 p-3 rounded-md">
            <p className="font-bold text-sm">{resp.idUser?.userName}</p>
            <p className="text-gray-700 whitespace-pre-wrap">{resp.content}</p>
          </div>
        ))}
      </div>
    )}
  </div>
)}


             
           
             
            
            </div>
          );
        })
      )}
    </div>
  );
}

