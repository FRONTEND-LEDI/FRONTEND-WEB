import type React from "react";
import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "../../context/AuthContext";
import {
  BookOpen,
  Users,
  User,
  Home,
  LogOut,
  Settings,
  Menu,
  X,
  LayoutDashboard,
  ChartNoAxesCombined,
  Newspaper,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar fijo */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-72 h-screen bg-white border-r border-orange-200 shadow-lg",
          "transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0", // siempre visible en desktop
          "flex flex-col",
        ].join(" ")}
      >
        {/* Header del sidebar */}
        <div className="p-6 border-b border-orange-100 bg-gradient-to-r from-orange-500 to-amber-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Administración</h2>
                <p className="text-orange-100 text-sm">Panel de control</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white hover:bg-white/20 p-1 rounded cursor-pointer"
              aria-label="Cerrar menú"
              aria-expanded={sidebarOpen}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido scrolleable del sidebar (secciones) */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-2">
            {/* Dashboard */}
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 transition-colors group"
            >
              <LayoutDashboard className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
              <span className="font-medium text-gray-700 group-hover:text-gray-900">
                Dashboard
              </span>
            </Link>
            {/* Sección de Métricas */}
            <Link
              href="/admin/metrics"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 transition-colors group"
            >
              <ChartNoAxesCombined className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
              <span className="font-medium text-gray-700 group-hover:text-gray-900">
                Métricas
              </span>
            </Link>

            {/*/ Sección Libros */}
            <Link
              href="/admin/books"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 transition-colors group"
            >
              <BookOpen className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
              <span className="font-medium text-gray-700 group-hover:text-gray-900">
                Obras
              </span>
            </Link>
            {/* Sección Autores*/}
            <Link
              href="/admin/authors"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 transition-colors group"
            >
              <Users className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
              <span className="font-medium text-gray-700 group-hover:text-gray-900">
                Autores
              </span>
            </Link>
            {/*/ Sección Noticias*/}
            <Link
              href="/admin/news"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 transition-colors group"
            >
              <Newspaper className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
              <span className="font-medium text-gray-700 group-hover:text-gray-900">
                Noticias
              </span>
            </Link>

            {/*/ Sección Avatares*/}
            <Link
              href="/admin/avatars"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 transition-colors group"
            >
              <User className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
              <span className="font-medium text-gray-700 group-hover:text-gray-900">
                Avatares
              </span>
            </Link>
            {/* Futuras secciones entran acá */}
          </div>
        </nav>

        {/* Footer fijo del sidebar */}
        <div className="p-4 border-t border-orange-100 bg-white">
          <div className="space-y-2">
            <Link
              href="/home"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors group"
            >
              <Home className="w-4 h-4 text-orange-500 group-hover:text-orange-600" />
              <span className="text-gray-700 group-hover:text-gray-900">
                Volver al Sitio
              </span>
            </Link>
            <button
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors group w-full text-left"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-600" />
              <span className="text-gray-700 group-hover:text-red-700">
                Cerrar sesión
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main: corre a la derecha del sidebar en desktop */}
      <main className="md:ml-72 h-screen flex flex-col min-w-0">
        {/* Topbar mobile */}
        <header className="md:hidden bg-white border-b border-orange-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors"
              aria-label="Abrir menú"
              aria-expanded={sidebarOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Administración
            </h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Área scrolleable del contenido */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
