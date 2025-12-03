import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllBooks } from "../../../db/services/books";
import { adminDeleteBook } from "../../../db/services/adminBooks";
import { useAuth } from "../../../context/AuthContext";
import type { Book } from "../../../types/books";
import { Link } from "wouter";
import toast from "react-hot-toast";
import LoadingGate from "../../../common/components/LoadingGate";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import { GiBookshelf } from "react-icons/gi";

export default function AdminBooksList() {
  const { token, user } = useAuth();
  const qc = useQueryClient();
  const [q, setQ] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-books"],
    queryFn: () => getAllBooks(token),
    staleTime: 60_000,
  });

  const books = (data ?? []) as Book[];

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return books;
    return books.filter((b) => {
      const title = b.title?.toLowerCase() ?? "";
      const format = b.format?.toLowerCase() ?? "";
      const year = String(b.yearBook ?? "").toLowerCase();
      return (
        title.includes(term) || format.includes(term) || year.includes(term)
      );
    });
  }, [books, q]);

  const delMutation = useMutation({
    mutationFn: (id: string) => adminDeleteBook(id, token),
    onSuccess: () => {
      toast.success("Obra eliminada");
      qc.invalidateQueries({ queryKey: ["admin-books"] });
    },
    onError: (e: any) => {
      toast.error(e?.message ?? "Error al eliminar");
    },
  });

  if (isLoading) return <LoadingGate message="Cargando obras…" />;
  if (isError)
    return <div className="text-red-600">Error: {(error as any)?.message}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <GiBookshelf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Gestión de Obras
              </h2>
              <p className="text-gray-600">
                Administrá el catálogo de Tintas Formoseñas.
              </p>
            </div>
          </div>
          <Link
            href="/admin/books/new"
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Nueva Obra
          </Link>
        </div>
      </div>

      {/* Buscador */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Buscar por título, formato o año…"
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
                  Título
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Formato
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Año
                </th>
                {/* <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Estado
                </th> */}
                <th className="text-right py-4 px-6 font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((b) => (
                <tr
                  key={b._id}
                  className="hover:bg-orange-25 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{b.title}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {b.format}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{b.yearBook}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/books/${b._id}/edit`}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                        Editar
                      </Link>
                      {user?.rol === "Admin" && (
                        <button
                          className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={() => {
                            if (
                              !confirm(
                                "¿Eliminar esta obra? Esta acción no se puede deshacer."
                              )
                            )
                              return;
                            delMutation.mutate(b._id);
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                          Eliminar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">
                          No se encontraron obras que coincidan con la búsqueda.
                        </p>
                        <p className="text-gray-400 text-sm">
                          Intentá con otros términos de búsqueda
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
    </div>
  );
}
