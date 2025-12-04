import { Bell, Newspaper, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "../../../db/services/adminNews";
import { useAuth } from "../../../context/AuthContext";
import type { News } from "../../../types/news";
import { getNewsImageUrl } from "../../../types/news";
import { formatDateAvoidTimezone } from "../../utils/date";

export default function AsideNotificaciones() {
  const { token } = useAuth();

  const { data: noticias, isLoading } = useQuery({
    queryKey: ["public-news"],
    queryFn: () => getAllNews(token),
    refetchOnWindowFocus: false,
    select: (data) => {
      // Ordenar por fecha descendente y tomar solo las 3 más recientes
      return (data as News[])
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
    },
  });

  return (
    <aside className="w-110 mt-35 bg-white shadow-xl border shadow-black/20 border-orange-200 rounded-xl p-4 max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
          <Bell className="w-5 h-5 text-primary" /> Noticias
        </h2>
      </div>

      {/* Lista */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-orange-400 animate-spin" />
        </div>
      ) : noticias && noticias.length > 0 ? (
        <div className="space-y-4">
          {noticias.map((n) => {
            const imageUrl = getNewsImageUrl(n.img);
            const formattedDate = formatDateAvoidTimezone(n.date, "es-AR");

            return (
              <div
                key={n._id}
                className="bg-orange-50 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
              >
                {/* Imagen (solo si existe) */}
                {imageUrl && (
                  <div className="w-full h-32 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={n.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Contenido */}
                <div className="p-4">
                  {/* Ícono si no hay imagen */}
                  {!imageUrl && (
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-amber-400 rounded-lg flex items-center justify-center mb-3">
                      <Newspaper className="w-5 h-5 text-white" />
                    </div>
                  )}

                  <h3 className="font-semibold text-primary text-lg line-clamp-2">
                    {n.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {n.description}
                  </p>
                  <span className="text-xs text-orange-400 mt-2 block">
                    {formattedDate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Newspaper className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">No hay noticias disponibles</p>
        </div>
      )}
    </aside>
  );
}
