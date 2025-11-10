import type React from "react";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { adminCreateBook } from "../../../db/services/adminBooks";
import type { AdminCreateBookInput } from "../../../types/books";
import { useLocation } from "wouter";
import toast from "react-hot-toast";
import { BookOpen, Upload, Save, X, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchAuthors } from "../../../db/services/adminAuthors";
import type { Author } from "../../../types/author";
import { getAuthorAvatarUrl } from "../../../types/author";
import { LITERARY_GENRES } from "../../../common/data/genres";

const INITIAL = {
  title: "",
  author: [] as string[],
  summary: "",
  subgenre: [] as string[],
  language: "es",
  available: true,
  yearBook: "",
  synopsis: "",
  theme: [] as string[],
  genre: "",
  level: "",
  format: "ebook",
  totalPages: undefined as number | undefined,
  duration: undefined as number | undefined,
  fileExtension: "PDF",
};

const LEVEL_OPTIONS = [
  { value: "Adulto Mayor", label: "Adulto Mayor" },
  { value: "Joven Adulto", label: "Joven Adulto" },
  { value: "Secundario", label: "Secundario" },
  { value: "Inicial", label: "Inicial" },
];

const LANGUAGE_OPTIONS = [
  { value: "es", label: "Español" },
  { value: "en", label: "Inglés" },
];

const FORMAT_OPTIONS = [
  { value: "ebook", label: "E-book" },
  { value: "audiobook", label: "Audiolibro" },
  { value: "videobook", label: "Videolibro" },
];

export default function AdminBooksNew() {
  const { token } = useAuth();
  const [, navigate] = useLocation();
  const [form, setForm] = useState(INITIAL);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [subgenreText, setSubgenreText] = useState("");
  const [themeText, setThemeText] = useState("");

  const { data: authorsData } = useQuery({
    queryKey: ["admin-authors-for-books"],
    queryFn: () => searchAuthors(token),
    staleTime: 60_000,
  });

  const authors = (authorsData ?? []) as Author[];
  const set = (k: keyof typeof INITIAL, v: any) =>
    setForm((s) => ({ ...s, [k]: v }));

  // helper para parsear
  const parseList = (s: string) =>
    s
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!form.author?.length)
        return toast.error("Seleccioná al menos un autor");
      if (!form.genre.trim()) return toast.error("Completá el género");
      if (!form.level.trim()) return toast.error("Completá el nivel");
      if (!form.format.trim()) return toast.error("Completá el formato");
      if (!form.fileExtension.trim())
        return toast.error("Completá la extensión");

      if (!imgFile || !bookFile)
        return toast.error("Falta seleccionar imagen y archivo del libro.");

      setLoading(true);

      const payload: AdminCreateBookInput = {
        ...form,
        subgenre: parseList(subgenreText),
        theme: parseList(themeText),
        imgFile,
        bookFile,
      };

      await adminCreateBook(payload, token);
      toast.success("Libro creado correctamente");
      navigate("/admin/books");
    } catch (err: any) {
      toast.error(err?.message ?? "Error al crear libro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 md:p-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Crear Nuevo Libro
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Agrega un libro al catálogo de Tintas Formoseñas
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 md:p-8">
        <form onSubmit={onSubmit} className="space-y-6 md:space-y-8">
          {/* Información básica */}
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Información Básica
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Título *
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Ingresa el título del libro"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Género *
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white appearance-none"
                    value={form.genre}
                    onChange={(e) => set("genre", e.target.value)}
                  >
                    <option value="">Seleccionar género</option>
                    {LITERARY_GENRES.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Idioma
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white appearance-none"
                    value={form.language}
                    onChange={(e) => set("language", e.target.value)}
                  >
                    {LANGUAGE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Año de publicación
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="2024"
                  value={form.yearBook}
                  onChange={(e) => set("yearBook", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nivel
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white appearance-none"
                    value={form.level}
                    onChange={(e) => set("level", e.target.value)}
                  >
                    <option value="">Seleccionar nivel</option>
                    {LEVEL_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Autores */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Autor(es) *
                </label>

                {/* chips seleccionados */}
                {Array.isArray(form.author) && form.author.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.author.map((id) => {
                      const a = authors.find((x) => x._id === id);
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm"
                        >
                          {getAuthorAvatarUrl(a?.avatar) ? (
                            <img
                              src={getAuthorAvatarUrl(a?.avatar)}
                              alt=""
                              className="w-5 h-5 rounded-full object-cover"
                            />
                          ) : null}
                          {a?.fullName ?? id}
                          <button
                            type="button"
                            className="ml-1 text-orange-600 hover:text-orange-800"
                            onClick={() =>
                              set(
                                "author",
                                form.author.filter((x) => x !== id)
                              )
                            }
                            aria-label="Quitar autor"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 mb-1">
                    Seleccioná uno o más autores del listado.
                  </p>
                )}

                {/* buscador + lista */}
                <AuthorPicker
                  authors={authors}
                  selectedIds={form.author}
                  onToggle={(id) => {
                    const curr = new Set<string>(form.author as string[]);
                    if (curr.has(id)) curr.delete(id);
                    else curr.add(id);
                    set("author", Array.from(curr));
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Formato
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white appearance-none"
                    value={form.format}
                    onChange={(e) => {
                      const f = e.target.value;
                      set("format", f);
                      //
                      if (f === "ebook") set("duration", undefined);
                      else set("totalPages", undefined);
                    }}
                  >
                    {FORMAT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              {/* FORMAT: duration según format */}

              {form.format === "ebook" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Total de páginas
                  </label>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Número de páginas"
                    value={form.totalPages || ""}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value);
                      set("totalPages", value > 0 ? value : undefined);
                    }}
                  />
                </div>
              )}

              {(form.format === "audiobook" || form.format === "videobook") && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Duración (segundos)
                  </label>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Duración en segundos"
                    value={form.duration || ""}
                    onChange={(e) =>
                      set(
                        "duration",
                        e.target.value
                          ? Number.parseInt(e.target.value)
                          : undefined
                      )
                    }
                  />
                </div>
              )}
              {/* FORMAT: extension */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Extensión del archivo
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="pdf, epub, mp3, etc."
                  value={form.fileExtension}
                  onChange={(e) => set("fileExtension", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Categorización */}
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Categorización
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Subgéneros
                </label>
                {/* SUBGÉNEROS */}
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Ej: Thriller, Histórico (separados por comas)"
                  value={subgenreText}
                  onChange={(e) => setSubgenreText(e.target.value)}
                  onBlur={() => set("subgenre", parseList(subgenreText))}
                />
                <p className="text-xs text-gray-500">
                  Separa múltiples subgéneros con comas
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Temas
                </label>
                {/* TEMAS */}
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Ej: Amor, Aventura, Familia (separados por comas)"
                  value={themeText}
                  onChange={(e) => setThemeText(e.target.value)}
                  onBlur={() => set("theme", parseList(themeText))}
                />
                <p className="text-xs text-gray-500">
                  Separa múltiples temas con comas
                </p>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              Descripción
            </h3>
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Resumen
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  rows={3}
                  placeholder="Breve resumen del libro..."
                  value={form.summary}
                  onChange={(e) => set("summary", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Sinopsis
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  rows={4}
                  placeholder="Descripción detallada del contenido..."
                  value={form.synopsis}
                  onChange={(e) => set("synopsis", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Archivos */}
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Archivos
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Portada *
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="cover-upload"
                    onChange={(e) => setImgFile(e.target.files?.[0] ?? null)}
                  />
                  <label htmlFor="cover-upload" className="cursor-pointer">
                    <span className="text-sm text-gray-600">
                      {imgFile ? imgFile.name : "Seleccionar imagen"}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG hasta 5MB
                    </p>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Archivo del libro *
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    className="hidden"
                    id="book-upload"
                    onChange={(e) => setBookFile(e.target.files?.[0] ?? null)}
                  />
                  <label htmlFor="book-upload" className="cursor-pointer">
                    <span className="text-sm text-gray-600">
                      {bookFile ? bookFile.name : "Seleccionar archivo"}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF, EPUB, MP3, etc.
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {loading ? "Creando..." : "Crear Libro"}
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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

function AuthorPicker({
  authors,
  selectedIds,
  onToggle,
}: {
  authors: Author[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  const [q, setQ] = useState("");

  const filtered = authors.filter((a) =>
    q.trim() ? a.fullName.toLowerCase().includes(q.trim().toLowerCase()) : true
  );

  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-3">
        <input
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Buscar autor por nombre…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="max-h-56 overflow-auto divide-y divide-gray-100">
        {filtered.map((a) => {
          const checked = selectedIds.includes(a._id);
          const url = getAuthorAvatarUrl(a.avatar);
          return (
            <label
              key={a._id}
              className="flex items-center gap-3 py-2 px-1 cursor-pointer hover:bg-orange-50/50"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={checked}
                onChange={() => onToggle(a._id)}
              />
              {url ? (
                <img
                  src={url}
                  alt={a.fullName}
                  className="w-8 h-8 rounded-full object-cover border"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-100 border" />
              )}
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {a.fullName}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {a.biography}
                </div>
              </div>
            </label>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-6 text-center text-sm text-gray-500">
            Sin autores
          </div>
        )}
      </div>
    </div>
  );
}
