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

  const getInitials = (user: any): string => {
    if (!user) return "??";
    if (user.userName)
      return user.userName
        .split(" ")
        .map((w: string) => w[0].toUpperCase())
        .join("")
        .slice(0, 2);
    return "??";
  };

  const getUserName = (user: any): string =>
    user?.userName ?? "Usuario desconocido";

  const handleChange = (postId: string, value: string) =>
    setComentarios((prev) => ({ ...prev, [postId]: value }));

  const handleSubmit = (postId: string) => {
    const contenido = comentarios[postId];
    if (contenido?.trim()) {
      agregarComentario(postId, contenido);
      setComentarios((prev) => ({ ...prev, [postId]: "" }));
      setOpenInput((prev) => ({ ...prev, [postId]: false }));
    }
  };

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 py-6">
          No hay publicaciones aún
        </p>
      ) : (
        posts.map((post) => {
          const initials = getInitials(post.idUser);
          const userName = getUserName(post.idUser);

          return (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {initials}
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <p className="font-bold">{userName}</p>

                    <p className="text-xs text-gray-500">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleString("es-ES")
                        : "Sin fecha"}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-3 whitespace-pre-wrap">
                {post.content}
              </p>

              <div className="flex items-center gap-2">
                <MessageCircle
                  onClick={() =>
                    setOpenInput((prev) => ({
                      ...prev,
                      [post._id]: !prev[post._id],
                    }))
                  }
                  className="cursor-pointer text-primary"
                />
                12 Respuestas
              </div>

              {openInput[post._id] && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    className="flex-1 p-2 rounded-md border focus:ring-primary"
                    placeholder="Escribe un comentario..."
                    value={comentarios[post._id] ?? ""}
                    onChange={(e) => handleChange(post._id, e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSubmit(post._id)
                    }
                  />

                  <button
                    onClick={() => handleSubmit(post._id)}
                    className="bg-primary text-white px-3 py-1 rounded-md"
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
