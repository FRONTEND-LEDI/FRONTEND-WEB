import type React from "react";
import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useAuth } from "../../../context/AuthContext";
import {
  adminUpdateAuthor,
  getAuthorById,
} from "../../../db/services/adminAuthors";
import { LITERARY_GENRES } from "../../../common/data/genres";
import { getAuthorAvatarUrl } from "../../../types/author";
import toast from "react-hot-toast";
import { User, Upload, Save, X } from "lucide-react";

export default function AdminAuthorsEdit() {
  const [, params] = useRoute("/admin/authors/:id/edit");
  const id = params?.id as string;
  const [, navigate] = useLocation();
  const { token } = useAuth();

  const [fullName, setFullName] = useState("");
  const [biography, setBiography] = useState("");
  const [profession, setProfession] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [nationality, setNationality] = useState("");
  const [writingGenre, setWritingGenre] = useState<string[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [itActivo, setItActivo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const a = await getAuthorById(id, token);
        if (!mounted) return;
        setFullName(a.fullName ?? "");
        setBiography(a.biography ?? "");
        setProfession(a.profession ?? "");
        setBirthplace(a.birthplace ?? "");
        setNationality(a.nationality ?? "");
        setItActivo(typeof a.itActivo === "boolean" ? a.itActivo : true);

        // Formatear fecha para input type="date"
        if (a.birthdate) {
          const date = new Date(a.birthdate);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          setBirthdate(`${year}-${month}-${day}`);
        }

        setWritingGenre(Array.isArray(a.writingGenre) ? a.writingGenre : []);
        setPreview(getAuthorAvatarUrl(a.avatar) ?? null);
      } catch (e: any) {
        if (!mounted) return;
        toast.error(e?.message ?? "No se pudo cargar el autor");
        navigate("/admin/authors");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id, token, navigate]);

  const toggleGenre = (genre: string) => {
    setWritingGenre((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setAvatarFile(f);
    setPreview(f ? URL.createObjectURL(f) : preview);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!fullName.trim()) return toast.error("Falta el nombre completo");
      if (!profession.trim()) return toast.error("Falta la profesión");
      if (!birthplace.trim())
        return toast.error("Falta el lugar de nacimiento");
      if (!birthdate) return toast.error("Falta la fecha de nacimiento");
      if (!nationality.trim()) return toast.error("Falta la nacionalidad");
      if (writingGenre.length === 0)
        return toast.error("Selecciona al menos un género literario");
      if (!biography.trim()) return toast.error("Falta la biografía");

      setSaving(true);
      await adminUpdateAuthor(
        id,
        {
          fullName: fullName.trim(),
          biography: biography.trim(),
          profession: profession.trim(),
          birthplace: birthplace.trim(),
          birthdate,
          nationality: nationality.trim(),
          writingGenre,
          avatarFile: avatarFile || undefined,
          itActivo,
        },
        token
      );
      toast.success("Autor actualizado con éxito");
      navigate("/admin/authors");
    } catch (err: any) {
      toast.error(err?.message ?? "Error al actualizar autor");
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
            {/* Datos personales y literarios */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Nombre completo *
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej: Marcela Cuevas"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Profesión *
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="Ej: Empleada pública administrativa"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Lugar de nacimiento *
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={birthplace}
                    onChange={(e) => setBirthplace(e.target.value)}
                    placeholder="Ej: Formosa Capital"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Nacionalidad *
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder="Ej: Argentina"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Fecha de nacimiento *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </div>
              </div>

              {/* Géneros literarios */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Géneros literarios *
                </label>
                <div className="flex flex-wrap gap-2">
                  {LITERARY_GENRES.map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                        writingGenre.includes(genre)
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
                {writingGenre.length === 0 && (
                  <p className="text-xs text-red-600 mt-1">
                    Selecciona al menos un género
                  </p>
                )}
              </div>

              {/* Biografía */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Biografía *
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={5}
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  placeholder="Escribe una biografía del autor..."
                />
              </div>

              {/* Activo */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Estado
                </label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={itActivo}
                      onChange={(e) => setItActivo(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-orange-500"
                    />
                    <span className="text-sm text-gray-700">Activo</span>
                  </label>
                </div>
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
                    src={preview}
                    alt="Vista previa"
                    className="w-32 h-32 rounded-full object-cover border-4 border-orange-100 shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
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
