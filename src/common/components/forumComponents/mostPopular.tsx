"use client";
import { useState } from "react";
import type { Coment } from "../../../types/forum";
import { MessageCircle } from "lucide-react";

interface PopularProps {
  posts: Coment[];
  agregarComentario: (postId: string, contenido: string) => void;
}

export default function Popular({ posts, agregarComentario }: PopularProps) {
  const [comentarios, setComentarios] = useState<{ [key: string]: string }>({});
  const [openInput, setOpenInput] = useState<{ [key: string]: boolean }>({});

  const getInitials = (user: any): string => {
    if (typeof user === "object" && user?.userName) {
      return user.userName
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase())
        .join("")
        .substring(0, 2);
    }
    if (typeof user === "string") return user.charAt(0).toUpperCase();
    return "??";
  };

  const getUserName = (user: any): string => {
    if (typeof user === "object" && user?.userName) return user.userName;
    if (typeof user === "object" && user?.email) return user.email.split("@")[0];
    if (typeof user === "string") return user;
    return "Usuario desconocido";
  };

  const getUserEmail = (user: any): string | null => {
    if (typeof user === "object" && user?.email) return user.email;
    return null;
  };

  const handleChange = (postId: string, value: string) => {
    setComentarios((prev) => ({ ...prev, [postId]: value }));
  };

  const handleSubmit = (postId: string) => {
    const contenido = comentarios[postId];
    if (contenido && contenido.trim() !== "") {
      agregarComentario(postId, contenido);
      setComentarios((prev) => ({ ...prev, [postId]: "" }));
      setOpenInput((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const toggleInput = (postId: string) => {
    setOpenInput((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No hay publicaciones aún
        </p>
      ) : (
        posts.map((post) => {
          const initials = getInitials(post.idUser);
          const userName = getUserName(post.idUser);
          const userEmail = getUserEmail(post.idUser);

          return (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              {/* Header del post */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {initials}
                </div>
                <div className="flex-1 flex-col">
                  <div className="flex flex-row justify-between">
                    <p className="font-bold text-gray-800">{userName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleString("es-ES", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {userEmail && (
                    <p className="text-xs text-gray-400">{userEmail}</p>
                  )}
                </div>
              </div>

              {/* Contenido del post */}
              <p className="text-gray-700 mb-3 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>

              {/* Botón de comentario */}
              <div className="flex items-center gap-2">
                <MessageCircle
                  className="cursor-pointer text-primary text-xs  hover:text-primary transition"
                  onClick={() => toggleInput(post._id)}
                />12 Respuestas
              </div>

              {/* Input minimalista para agregar comentario */}
              {openInput[post._id] && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    className="flex-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Escribe un comentario..."
                    value={comentarios[post._id] || ""}
                    onChange={(e) => handleChange(post._id, e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(post._id)}
                  />
                  <button
                    onClick={() => handleSubmit(post._id)}
                    className="bg-primary cursor-pointer text-white px-3 py-1 rounded-md hover:bg-primary-dark transition"
                  >
                    Enviar
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
