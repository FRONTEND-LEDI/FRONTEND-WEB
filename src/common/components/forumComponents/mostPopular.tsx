import { useState } from "react";
import type { Comment } from "../../../types/forum";
import type { FullUser } from "../../../types/user";
import { MessageCircle, Trash2, Edit2, Check, X } from "lucide-react";

interface PopularProps {
  posts: Comment[];
  agregarComentario: (postId: string, contenido: string) => void;
  editarPost: (postId: string, contenido: string) => void;
  eliminarPost: (postId: string) => void;
  usuarioActual: FullUser | any;
}

export default function Popular({
  posts,
  agregarComentario,
  editarPost,
  eliminarPost,
  usuarioActual,
}: PopularProps) {
  const [comentarios, setComentarios] = useState<{ [key: string]: string }>({});
  const [openInput, setOpenInput] = useState<{ [key: string]: boolean }>({});
  const [editando, setEditando] = useState<{ [key: string]: string | null }>(
    {}
  );

  // Obtener iniciales sin avatar
  const getInitials = (user: any): string => {
    if (!user) return "??";

    return user.userName
      ?.split(" ")
      .map((w: string) => w[0].toUpperCase())
      .join("")
      .slice(0, 2);
  };

  // Verificar si el usuario actual es el dueño del post
  const esOwner = (post: Comment) => {
    const usuarioId = usuarioActual?._id || (usuarioActual as any)?.id;
    const postUserId = (post.idUser as any)?._id || (post.idUser as any)?.id;
    return usuarioId === postUserId;
  };

  // Ordenar por fecha: más nuevo primero
  const sortedPosts = [...posts].sort((a, b) => {
    return (
      new Date(b.createdAt || "").getTime() -
      new Date(a.createdAt || "").getTime()
    );
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

  const handleEditarClick = (postId: string, contenido: string) => {
    setEditando((prev) => ({ ...prev, [postId]: contenido }));
  };

  const handleGuardarEdicion = (postId: string) => {
    const textoEditado = editando[postId];
    if (textoEditado?.trim()) {
      editarPost(postId, textoEditado);
      setEditando((prev) => ({ ...prev, [postId]: null }));
    }
  };

  const handleCancelarEdicion = (postId: string) => {
    setEditando((prev) => ({ ...prev, [postId]: null }));
  };

  return (
    <div className="space-y-6">
      {principales.length === 0 ? (
        <p className="text-center text-gray-500 py-6">
          No hay publicaciones aún
        </p>
      ) : (
        principales.map((post) => {
          const initials = getInitials(post.idUser);
          const respuestas = getRespuestas(post._id);
          const isEditing = editando[post._id];
          const isOwner = esOwner(post);

          return (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md p-4 shadow-gray-300"
            >
              {/* HEADER */}
              <div className="flex items-center gap-3 mb-3">
                {/* AVATAR + MARCO */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  {/* Marco por nivel */}
                  {(post.idUser as any)?.imgLevel && (
                    <img
                      src={(post.idUser as any).imgLevel}
                      alt="Marco"
                      className="absolute w-14 h-14 object-contain pointer-events-none"
                    />
                  )}

                  {/* Avatar o iniciales */}
                  {(post.idUser as any)?.avatar ? (
                    <img
                      src={(post.idUser as any).avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {initials}
                    </div>
                  )}
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">
                      {(post.idUser as any)?.userName}
                    </p>

                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleString("es-ES")
                          : "Sin fecha"}
                      </p>

                      {/* BOTONES DE EDITAR/ELIMINAR */}
                      {isOwner && !isEditing && (
                        <div className="flex gap-1">
                          <button
                            onClick={() =>
                              handleEditarClick(post._id, post.content)
                            }
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Editar"
                          >
                            <Edit2 size={16} className="text-blue-500" />
                          </button>
                          <button
                            onClick={() => eliminarPost(post._id)}
                            className="p-1 hover:bg-gray-200 rounded"
                            title="Eliminar"
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTENIDO O EDICIÓN */}
              {isEditing ? (
                <div className="mb-3 space-y-2">
                  <textarea
                    value={editando[post._id] || ""}
                    onChange={(e) =>
                      setEditando((prev) => ({
                        ...prev,
                        [post._id]: e.target.value,
                      }))
                    }
                    className="w-full p-2 border-2 border-primary rounded-md"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleGuardarEdicion(post._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md flex items-center gap-1"
                    >
                      <Check size={16} /> Guardar
                    </button>
                    <button
                      onClick={() => handleCancelarEdicion(post._id)}
                      className="bg-gray-500 text-white px-3 py-1 rounded-md flex items-center gap-1"
                    >
                      <X size={16} /> Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 mb-3 whitespace-pre-wrap">
                  {post.content}
                </p>
              )}

              {/* BOTÓN DE RESPONDER */}
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
                <span>{respuestas.length} Respuestas</span>
              </div>

              {/* BLOQUE QUE SE DESPLIEGA */}
              {openInput[post._id] && (
                <div className="mt-2 ml-10 space-y-2">
                  {/* INPUT PARA NUEVA RESPUESTA */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 p-2 rounded-md border-2 border-primary hover:border-primary"
                      placeholder="Responder..."
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

                  {/* RESPUESTAS */}
                  {respuestas.length > 0 && (
                    <div className="mt-2 space-y-3 border-l border-primary pl-8">
                      {respuestas.map((resp) => {
                        const respIsOwner = esOwner(resp);
                        return (
                          <div
                            key={resp._id}
                            className="bg-gray-100 p-3 rounded-md relative"
                          >
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-bold text-sm">
                                {(resp.idUser as any)?.userName}
                              </p>
                              {respIsOwner && (
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => eliminarPost(resp._id)}
                                    className="p-1 hover:bg-gray-200 rounded"
                                    title="Eliminar"
                                  >
                                    <Trash2
                                      size={14}
                                      className="text-red-500"
                                    />
                                  </button>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-700 whitespace-pre-wrap text-sm">
                              {resp.content}
                            </p>
                          </div>
                        );
                      })}
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
