import type React from "react";

import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useAuth } from "../../../context/AuthContext";
import {
  adminUpdateAuthor,
  getAuthorById,
} from "../../../db/services/adminAuthors";
import { getAuthorAvatarUrl } from "../../../types/author";
import toast from "react-hot-toast";
import { User, Upload, Save, X } from "lucide-react";

export default function AdminAuthorsEdit() {
  const [, params] = useRoute("/admin/authors/:id/edit");
  const id = params?.id as string;
  const [, navigate] = useLocation();
  const { token } = useAuth();

  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const a = await getAuthorById(id, token);
        setName(a.name ?? "");
        setBiography(a.biography ?? "");
        setPreview(getAuthorAvatarUrl(a.avatar) ?? null);
      } catch (e: any) {
        toast.error(e?.message ?? "No se pudo cargar el autor");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setAvatarFile(f);
    setPreview(f ? URL.createObjectURL(f) : preview);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!name.trim()) return toast.error("Falta nombre");
      if (!biography.trim()) return toast.error("Falta biografía");
      setSaving(true);
      await adminUpdateAuthor(
        id,
        {
          name: name.trim(),
          biography: biography.trim(),
          avatarFile: avatarFile || undefined,
        },
        token
      );
      toast.success("Autor actualizado");
      navigate("/admin/authors");
    } catch (err: any) {
      toast.error(err?.message ?? "Error al actualizar");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información del autor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Editar Autor</h2>
            <p className="text-gray-600">Modifica la información del autor</p>
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
                  Foto del autor
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
                      Cambiar imagen
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
              disabled={saving}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button
              type="button"
              onClick={() => history.back()}
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
