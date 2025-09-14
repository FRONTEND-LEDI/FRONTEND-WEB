import type React from "react";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { adminCreateAuthor } from "../../../db/services/adminAuthors";
import { useLocation } from "wouter";
import toast from "react-hot-toast";
import { User, Upload, Save, X } from "lucide-react";

export default function AdminAuthorsNew() {
  const { token } = useAuth();
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setAvatarFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!name.trim()) return toast.error("Falta nombre");
      if (!biography.trim()) return toast.error("Falta biografía");
      if (!avatarFile) return toast.error("Falta avatar");
      setLoading(true);
      await adminCreateAuthor(
        { name: name.trim(), biography: biography.trim(), avatarFile },
        token
      );
      toast.success("Autor creado");
      navigate("/admin/authors");
    } catch (err: any) {
      toast.error(err?.message ?? "Error al crear autor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Crear Nuevo Autor
            </h2>
            <p className="text-gray-600">
              Registra un autor en Tintas Formoseñas
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-8">
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información del autor */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nombre completo *
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Ingresa el nombre del autor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Biografía *
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  rows={6}
                  placeholder="Escribe una biografía del autor..."
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                />
              </div>
            </div>

            {/* Avatar */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Foto del autor *
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="avatar-upload"
                    onChange={onFile}
                  />
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-600">
                      Seleccionar imagen
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG hasta 5MB
                    </p>
                  </label>
                </div>
              </div>

              {preview && (
                <div className="flex justify-center">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Vista previa"
                    className="w-32 h-32 rounded-full object-cover border-4 border-orange-100 shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {loading ? "Creando..." : "Crear Autor"}
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-8 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
