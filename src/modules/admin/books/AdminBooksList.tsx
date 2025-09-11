"use client";

// modules/admin/books/AdminBooksList.tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllBooks } from "../../../db/services/books";
import { adminDeleteBook } from "../../../db/services/adminBooks";
import { useAuth } from "../../../context/AuthContext";
import type { Book } from "../../../types/books";
import { Link } from "wouter";
import toast from "react-hot-toast";
import LoadingGate from "../../../common/components/LoadingGate";
import { Edit, Trash2, Plus, Search } from "lucide-react";

export default function AdminBooksList() {
  const { token, user } = useAuth();
  const qc = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-books"],
    queryFn: () => getAllBooks(token),
    staleTime: 60_000,
  });

  const delMutation = useMutation({
    mutationFn: (id: string) => adminDeleteBook(id, token),
    onSuccess: () => {
      toast.success("Libro eliminado");
      qc.invalidateQueries({ queryKey: ["admin-books"] });
    },
    onError: (e: any) => {
      toast.error(e?.message ?? "Error al eliminar");
    },
  });

  if (isLoading) return <LoadingGate message="Cargando libros…" />;
  if (isError)
    return <div className="text-red-600">Error: {(error as any)?.message}</div>;

  const books = (data ?? []) as Book[];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Gestión de Libros
            </h2>
            <p className="text-gray-600 mt-1">
              Administra el catálogo completo de libros
            </p>
          </div>
          <Link
            href="/admin/books/new"
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Nuevo Libro
          </Link>
        </div>
      </div>

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
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Estado
                </th>
                <th className="text-right py-4 px-6 font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {books.map((b) => (
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
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        b.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {b.available ? "Disponible" : "No disponible"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/books/${b._id}/edit`}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                        Editar
                      </Link>
                      {user?.rol === "admin" && (
                        <button
                          className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={() => {
                            if (
                              !confirm(
                                "¿Eliminar este libro? Sólo hazlo con libros creados por vos (riesgoso)."
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
              {books.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">
                          No hay libros registrados
                        </p>
                        <p className="text-gray-400 text-sm">
                          Comienza agregando tu primer libro
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
