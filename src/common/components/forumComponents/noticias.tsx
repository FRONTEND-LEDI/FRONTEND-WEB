import { Bell, Newspaper, Loader2, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "../../../db/services/adminNews";
import { useAuth } from "../../../context/AuthContext";
import type { News } from "../../../types/news";
import { getNewsImageUrl } from "../../../types/news";
import { formatDateAvoidTimezone } from "../../utils/date";
import { useState } from "react";

export default function AsideNotificaciones() {
  const { token } = useAuth();

  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  const { data: noticias, isLoading } = useQuery({
    queryKey: ["public-news"],
    queryFn: () => getAllNews(token),
    refetchOnWindowFocus: false,
    select: (data) => {
      return (data as News[])
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
    },
  });

  return (
    <>
      {/* ASIDE  */}
      <aside className="w-110 mt-35 bg-white shadow-xl border shadow-black/20 border-orange-200 rounded-xl p-4 max-h-full overflow-y-auto">
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
              console.log("Title:", n.title);
              console.log("img object:", n.img);
              console.log("img stringified:", JSON.stringify(n.img));
              const imageUrl = getNewsImageUrl(n.img);
              console.log("imageUrl resultante:", imageUrl)
              const formattedDate = formatDateAvoidTimezone(n.date, "es-AR");

              return (
                <div
                  key={n._id}
                  onClick={() => setSelectedNews(n)}
                  className="bg-orange-50 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
                >
                  {/* Imagen*/}
                  {imageUrl && (
                    <div className="w-full h-32 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={n.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error("Error cargando imagen:", imageUrl);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Contenido */}
                  <div className="p-4">
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

      {/* MODAL  */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl relative overflow-hidden">
            
            {/* Botón de cerrar */}
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute right-3 top-3 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Imagen */}
            {(() => {
              const modalImageUrl = getNewsImageUrl(selectedNews.img);
              return modalImageUrl ? (
                <img
                  src={modalImageUrl}
                  alt={selectedNews.title}
                  className="w-full h-60 object-cover"
                  onError={(e) => {
                    console.error("Error cargando imagen en modal:", modalImageUrl);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-60 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                  <Newspaper className="text-orange-300 w-16 h-16" />
                </div>
              );
            })()}

            {/* Contenido */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-primary">
                {selectedNews.title}
              </h2>

              <p className="text-orange-500 text-sm mt-1">
                {formatDateAvoidTimezone(selectedNews.date, "es-AR")}
              </p>

              <p className="text-gray-700 mt-4 whitespace-pre-line leading-relaxed">
                {selectedNews.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
