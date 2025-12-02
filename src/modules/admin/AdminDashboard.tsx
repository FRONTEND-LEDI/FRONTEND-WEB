import { BarChart3 } from "lucide-react";
import { GiBookshelf } from "react-icons/gi";
import { FaUserPen } from "react-icons/fa6";
import { FaPeopleRoof } from "react-icons/fa6";
import { LuBookUp } from "react-icons/lu";
import { TbUserUp } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getAllBooks } from "../../db/services/books";
import { searchAuthors } from "../../db/services/adminAuthors";

export default function AdminDashboard() {
  const { token } = useAuth();

  // Cuenta de libros (usamos select para evitar guardar el array completo)
  const booksCountQ = useQuery({
    queryKey: ["admin-books-count"],
    queryFn: () => getAllBooks(token),
    select: (rows) => (rows ?? []).length,
    staleTime: 30_000,
  });

  // Cuenta de autores
  const authorsCountQ = useQuery({
    queryKey: ["admin-authors-count"],
    queryFn: () => searchAuthors(token),
    select: (rows) => (rows ?? []).length,
    staleTime: 30_000,
  });

  const fmt = (n: number | undefined) =>
    typeof n === "number" ? n.toLocaleString("es-AR") : "—";

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Panel de Administración
            </h1>
            <p className="text-gray-600">Gestiona tu biblioteca digital</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Libros */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Libros</p>
              <p className="text-2xl font-bold text-gray-900">
                {booksCountQ.isLoading ? "…" : fmt(booksCountQ.data)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <GiBookshelf className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          {booksCountQ.isError && (
            <p className="text-xs text-red-600 mt-2">
              No se pudo cargar la cantidad de libros.
            </p>
          )}
        </div>

        {/* Autores */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Autores registrados</p>
              <p className="text-2xl font-bold text-gray-900">
                {authorsCountQ.isLoading ? "…" : fmt(authorsCountQ.data)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaUserPen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          {authorsCountQ.isError && (
            <p className="text-xs text-red-600 mt-2">
              No se pudo cargar la cantidad de autores.
            </p>
          )}
        </div>

        {/* Clubes (placeholder) */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Clubes de lectura
              </p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <FaPeopleRoof className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/books/new"
            className="flex items-center gap-4 p-4 rounded-lg border border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200">
              <LuBookUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Agregar Libro</h3>
              <p className="text-sm text-gray-600">
                Crear un nuevo libro en el catálogo
              </p>
            </div>
          </a>

          <a
            href="/admin/authors/new"
            className="flex items-center gap-4 p-4 rounded-lg border border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200">
              <TbUserUp className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Agregar Autor</h3>
              <p className="text-sm text-gray-600">Registrar un nuevo autor</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
