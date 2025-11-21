import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import {
  getAvatars,
  adminDeleteAvatar,
} from "../../../db/services/adminAvatars";
import type { Avatar } from "../../../types/avatars";
import { getAvatarUrl } from "../../../types/avatars";
import { Link } from "wouter";
import toast from "react-hot-toast";
import LoadingGate from "../../../common/components/LoadingGate";
import { User, Plus, Edit, Trash2, Search } from "lucide-react";
import ConfirmDialog from "../../../common/components/alert/AlertCorfirm";

export default function AdminAvatarsList() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const [q, setQ] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-avatars"],
    queryFn: () => getAvatars(token),
    refetchOnWindowFocus: false,
  });

  const delMutation = useMutation({
    mutationFn: (id: string) => adminDeleteAvatar(id, token),
    onSuccess: () => {
      toast.success("Avatar eliminado");
      qc.invalidateQueries({ queryKey: ["admin-avatars"] });
    },
    onError: (e: any) => {
      toast.error(e?.message ?? "Error al eliminar avatar");
    },
  });

  const avatars = (data ?? []) as Avatar[];
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return avatars;
    return avatars.filter((a) => a.gender.toLowerCase().includes(term));
  }, [avatars, q]);

  if (isLoading) return <LoadingGate message="Cargando avatares…" />;
  if (isError)
    return <div className="text-red-600">Error: {(error as any)?.message}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Gestión de Avatares
              </h2>
              <p className="text-gray-600">
                Administra los avatares disponibles para perfiles
              </p>
            </div>
          </div>
          <Link
            href="/admin/avatars/new"
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Nuevo Avatar
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
              placeholder="Buscar por género (masculino, femenino, otro)…"
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

      {/* Grid de Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-gray-500 font-medium text-lg">
                No se encontraron avatares
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Intenta con otros términos de búsqueda
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((a) => {
            const url = getAvatarUrl(a.avatars);
            return (
              <div
                key={a._id}
                className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-md transition-all group"
              >
                {/* Imagen del Avatar */}
                <div className="aspect-square bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-8">
                  {url ? (
                    <img
                      src={url}
                      alt={a.gender}
                      className="w-full h-full object-contain rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Información */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Género
                      </p>
                      <h3 className="font-semibold text-gray-900 text-lg capitalize">
                        {a.gender}
                      </h3>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <Link
                      href={`/admin/avatars/${a._id}/edit`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
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
                      title="¿Eliminar avatar?"
                      description={`¿Estás seguro de que deseas eliminar el avatar "${a.gender}"? Esta acción no se puede deshacer.`}
                      confirmText="Eliminar"
                      cancelText="Cancelar"
                      variant="destructive"
                      onConfirm={() => delMutation.mutate(a._id)}
                    />
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
