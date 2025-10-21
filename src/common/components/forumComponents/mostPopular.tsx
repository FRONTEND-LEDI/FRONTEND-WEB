"use client";
import type { Coment } from "../../../types/forum";
import CommentSection from "./commentSecction";

interface PopularProps {
  posts: Coment[];
}

export default function Popular({ posts }: PopularProps) {
  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No hay publicaciones aún
        </p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
            {/* Header del post */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                {post.idUser.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">{post.idUser}</p>
                <p className="text-xs text-gray-500">
                  {new Date(post.createAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* Contenido del post */}
            <p className="text-gray-700 mb-3 leading-relaxed">{post.content}</p>

            {/* Sección de comentarios - Solo muestra contador por ahora */}
            <CommentSection commentsCount={0} />
          </div>
        ))
      )}
    </div>
  );
}


