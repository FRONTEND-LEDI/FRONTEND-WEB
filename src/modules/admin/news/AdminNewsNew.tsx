import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { adminCreateNews } from "../../../db/services/adminNews";
import { useLocation } from "wouter";
import toast from "react-hot-toast";
import { Newspaper, Upload, Save, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import type { AdminCreateNewsInput } from "../../../types/news";

const INITIAL = {
  title: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
};

export default function AdminNewsNew() {
  const { token } = useAuth();
  const [, navigate] = useLocation();

  const [form, setForm] = useState(INITIAL);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const qc = useQueryClient();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImgFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!form.title.trim()) return toast.error("Completá el título");
      if (!form.description.trim())
        return toast.error("Completá la descripción");
      if (!form.date) return toast.error("Seleccioná una fecha");

      setLoading(true);

      const payload: AdminCreateNewsInput = {
        title: form.title,
        description: form.description,
        date: form.date,
        ...(imgFile && { imgFile }),
      };

      await adminCreateNews(payload, token);
      toast.success("Noticia creada correctamente");
      qc.invalidateQueries({ queryKey: ["admin-news"] });
      navigate("/admin/news");
    } catch (err: any) {
      toast.error(err?.message ?? "Error al crear noticia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Crear Nueva Noticia
            </h2>
            <p className="text-gray-600">Agregá una noticia al portal</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-8">
        <form onSubmit={onSubmit} className="max-w-3xl mx-auto space-y-8">
          {/* Información básica */}
          <div className="space-y-6">
            {/* Título */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Título *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ingresa el título de la noticia"
                value={form.title}
                onChange={(e) =>
                  setForm((s) => ({ ...s, title: e.target.value }))
                }
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Descripción *
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-32"
                placeholder="Escribe la descripción de la noticia"
                value={form.description}
                onChange={(e) =>
                  setForm((s) => ({ ...s, description: e.target.value }))
                }
              />
            </div>

            {/* Fecha */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Fecha *
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={form.date}
                onChange={(e) =>
                  setForm((s) => ({ ...s, date: e.target.value }))
                }
              />
            </div>

            {/* Imagen */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Imagen (opcional)
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-orange-300 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="news-img-upload"
                    onChange={onFileChange}
                  />
                  <label htmlFor="news-img-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-600 block">
                      {imgFile ? imgFile.name : "Seleccionar imagen"}
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
                    src={preview}
                    alt="Vista previa"
                    className="max-h-48 rounded-lg border-4 border-orange-100 shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? "Creando..." : "Crear Noticia"}
            </button>
            <button
              type="button"
              onClick={() => history.back()}
              className="flex items-center gap-2 px-8 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
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
