"use client";

import type React from "react";

import { Link } from "wouter";
import { useAuth } from "../../context/AuthContext";
import {
  BookOpen,
  Users,
  BarChart3,
  Plus,
  Home,
  LogOut,
  Settings,
  Library,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-50 to-amber-50">
      <aside className="w-72 bg-white border-r border-orange-200 shadow-lg hidden md:block">
        <div className="p-6 border-b border-orange-100 bg-gradient-to-r from-orange-500 to-amber-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Administración</h2>
              <p className="text-orange-100 text-sm">Panel de control</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 transition-colors group"
            >
              <BarChart3 className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
              <span className="font-medium text-gray-700 group-hover:text-gray-900">
                Dashboard
              </span>
            </Link>

            <div className="pt-4">
              <div className="flex items-center gap-2 px-4 py-2 mb-2">
                <BookOpen className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Libros
                </span>
              </div>
              <div className="space-y-1 ml-2">
                <Link
                  href="/admin/books"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors group"
                >
                  <Library className="w-4 h-4 text-orange-500 group-hover:text-orange-600" />
                  <span className="text-gray-700 group-hover:text-gray-900">
                    Listado
                  </span>
                </Link>
                <Link
                  href="/admin/books/new"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors group"
                >
                  <Plus className="w-4 h-4 text-orange-500 group-hover:text-orange-600" />
                  <span className="text-gray-700 group-hover:text-gray-900">
                    Crear libro
                  </span>
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 px-4 py-2 mb-2">
                <Users className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Autores
                </span>
              </div>
              <div className="space-y-1 ml-2">
                <Link
                  href="/admin/authors"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors group"
                >
                  <Users className="w-4 h-4 text-orange-500 group-hover:text-orange-600" />
                  <span className="text-gray-700 group-hover:text-gray-900">
                    Listado
                  </span>
                </Link>
                <Link
                  href="/admin/authors/new"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors group"
                >
                  <Plus className="w-4 h-4 text-orange-500 group-hover:text-orange-600" />
                  <span className="text-gray-700 group-hover:text-gray-900">
                    Crear autor
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-orange-100 bg-white">
          <div className="space-y-2">
            <Link
              href="/home"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors group w-full"
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

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
