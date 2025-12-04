import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllNews, adminDeleteNews } from "../../../db/services/adminNews";
import { useAuth } from "../../../context/AuthContext";
import type { News } from "../../../types/news";
import { getNewsImageUrl } from "../../../types/news";
import { Link } from "wouter";
import toast from "react-hot-toast";
import LoadingGate from "../../../common/components/LoadingGate";
import { Edit, Trash2, Plus, Search, Newspaper } from "lucide-react";
import ConfirmDialog from "../../../common/components/alert/AlertCorfirm";
import { formatDateAvoidTimezone } from "../../../common/utils/date";

export default function AdminNewsList() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    console.log("AdminNewsList mounted, token:", !!token);
    setDebugInfo(`Token: ${token ? "✓" : "✗"}`);
  }, [token]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-news"],
    queryFn: () => {
      console.log("Fetching news with token:", token);
      return getAllNews(token);
    },
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  const news = (data ?? []) as News[];

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return news;
    return news.filter((n) => {
      const title = n.title?.toLowerCase() ?? "";
      const description = n.description?.toLowerCase() ?? "";
      return title.includes(term) || description.includes(term);
    });
  }, [news, q]);

  const delMutation = useMutation({
    mutationFn: (id: string) => adminDeleteNews(id, token),
    onSuccess: () => {
      toast.success("Noticia eliminada");
      qc.invalidateQueries({ queryKey: ["admin-news"] });
    },
    onError: (e: any) => {
      toast.error(e?.message ?? "Error al eliminar");
    },
  });

  if (isLoading) return <LoadingGate message="Cargando noticias…" />;
  if (isError) {
    const errorMsg = (error as any)?.message || "Error desconocido";
    console.error("Error loading news:", error);
    return (
      <div className="text-red-600 p-4 bg-red-50 rounded-lg">
        <p className="font-semibold">Error al cargar noticias:</p>
        <p className="text-sm">{errorMsg}</p>
        <p className="text-xs mt-2">{debugInfo}</p>
      </div>
    );
  }

  if (!token) {
    return <div className="text-red-600 p-4">No hay token disponible</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Gestión de Noticias
              </h2>
              <p className="text-gray-600">
                Administrá las noticias del portal
              </p>
            </div>
          </div>
          <Link
            href="/admin/news/new"
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Nueva Noticia
          </Link>
        </div>
      </div>

      {/* Buscador */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Buscar noticias por título o descripción…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <button
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
            onClick={() => setQ("")}
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Lista de Noticias */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-gray-500 font-medium text-lg">
                No se encontraron noticias
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Intentá con otros términos de búsqueda
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((n) => {
            const imageUrl = getNewsImageUrl(n.img);
            const formattedDate = formatDateAvoidTimezone(n.date, "es-AR");

            return (
              <div
                key={n._id}
                className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Imagen */}
                  <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={n.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-white shadow-sm">
                        <Newspaper className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-2">
                            {n.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {n.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <Link
                        href={`/admin/news/${n._id}/edit`}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="text-sm font-medium">Editar</span>
                      </Link>
                      <ConfirmDialog
                        trigger={
                          <button
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        }
                        title="¿Eliminar noticia?"
                        description={`¿Estás seguro de que deseas eliminar la noticia "${n.title}"? Esta acción no se puede deshacer.`}
                        confirmText="Eliminar"
                        cancelText="Cancelar"
                        variant="destructive"
                        onConfirm={() => delMutation.mutate(n._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
