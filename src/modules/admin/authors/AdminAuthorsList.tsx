import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import {
  adminDeleteAuthor,
  searchAuthors,
} from "../../../db/services/adminAuthors";
import type { Author } from "../../../types/author";
import { getAuthorAvatarUrl } from "../../../types/author";
import { Link } from "wouter";
import toast from "react-hot-toast";
import LoadingGate from "../../../common/components/LoadingGate";
import { formatDateAvoidTimezone } from "../../../common/utils/date";
import { User, Search, Edit, Trash2, Plus, Eye } from "lucide-react";
import { FaUserPen } from "react-icons/fa6";

export default function AdminAuthorsList() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-authors"],
    queryFn: () => searchAuthors(token),
    staleTime: 30_000,
  });

  const delMut = useMutation({
    mutationFn: (id: string) => adminDeleteAuthor(id, token),
    onSuccess: () => {
      toast.success("Autor eliminado");
      qc.invalidateQueries({ queryKey: ["admin-authors"] });
      if (selectedAuthor?._id) setSelectedAuthor(null);
    },
    onError: (e: any) => toast.error(e?.message ?? "Error al eliminar"),
  });

  if (isLoading) return <LoadingGate message="Cargando autores…" />;
  if (isError)
    return <div className="text-red-600">Error: {(error as any)?.message}</div>;

  const authorsAll = (data ?? []) as Author[];
  const authors = authorsAll.filter((a) =>
    q.trim() ? a.fullName.toLowerCase().includes(q.trim().toLowerCase()) : true
  );

  const closeModal = () => setSelectedAuthor(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <FaUserPen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Gestión de Autores
              </h2>
              <p className="text-gray-600">
                Administra los autores de Tintas Formoseñas
              </p>
            </div>
          </div>
          <Link
            href="/admin/authors/new"
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Nuevo Autor
          </Link>
        </div>
      </div>

      {/* Buscador */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Buscar por nombre del autor..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <button
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setQ("")}
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Avatar
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Nombre
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Ocupación
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Géneros
                </th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {authors.map((a) => {
                const url = getAuthorAvatarUrl(a.avatar);
                return (
                  <tr
                    key={a._id}
                    className="hover:bg-orange-25 transition-colors"
                  >
                    <td className="py-4 px-6">
                      {url ? (
                        <img
                          src={url}
                          alt={a.fullName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center border-2 border-orange-200">
                          <User className="w-6 h-6 text-orange-600" />
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        {a.fullName}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {a.profession || "—"}{" "}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {Array.isArray(a.writingGenre) &&
                        a.writingGenre.length > 0 ? (
                          a.writingGenre.map((g, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                            >
                              {g}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedAuthor(a)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/admin/authors/${a._id}/edit`}
                          className="p-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-full transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                          title="Eliminar"
                          onClick={() => {
                            if (
                              !confirm(
                                "¿Eliminar este autor? Esta acción no se puede deshacer."
                              )
                            )
                              return;
                            delMut.mutate(a._id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {authors.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">
                          No se encontraron autores
                        </p>
                        <p className="text-gray-400 text-sm">
                          Intenta con otros términos de búsqueda
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalles */}
      {selectedAuthor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Detalles del autor
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {selectedAuthor.avatar ? (
                    <img
                      src={
                        getAuthorAvatarUrl(selectedAuthor.avatar) ||
                        "/placeholder.svg"
                      }
                      alt={selectedAuthor.fullName}
                      className="w-24 h-24 rounded-full object-cover border-2 border-orange-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center border-2 border-orange-200">
                      <User className="w-8 h-8 text-orange-600" />
                    </div>
                  )}
                </div>

                {/* Datos */}
                <div className="flex-1 space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Nombre completo
                    </span>
                    <p className="text-gray-900">{selectedAuthor.fullName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Ocupación
                    </span>
                    <p className="text-gray-900">
                      {selectedAuthor.profession || "—"}{" "}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Lugar de nacimiento
                    </span>
                    <p className="text-gray-900">
                      {selectedAuthor.birthplace || "—"}{" "}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Nacionalidad
                    </span>
                    <p className="text-gray-900">
                      {selectedAuthor.nationality || "—"}{" "}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Fecha de nacimiento
                    </span>
                    <p className="text-gray-900">
                      {selectedAuthor.birthdate
                        ? formatDateAvoidTimezone(selectedAuthor.birthdate)
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Géneros literarios
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {Array.isArray(selectedAuthor.writingGenre) &&
                      selectedAuthor.writingGenre.length > 0 ? (
                        selectedAuthor.writingGenre.map((g, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                          >
                            {g}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Biografía
                    </span>
                    <p className="text-gray-900 mt-1 whitespace-pre-line">
                      {selectedAuthor.biography || "Sin biografía"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Estado laboral
                    </span>
                    <p className="text-gray-900">
                      {selectedAuthor.itActivo
                        ? "Empleado público activo"
                        : "Empleado público pasivo"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Icono de cerrar para el modal
function X({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
