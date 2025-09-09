// modules/admin/books/AdminBooksNew.tsx
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { adminCreateBook } from "../../../db/services/adminBooks";
import type { AdminCreateBookInput } from "../../../types/books";
import { useLocation } from "wouter";
import toast from "react-hot-toast";

const INITIAL = {
  title: "",
  author: [], // ids (por ahora vacío; luego podés integrar /author)
  summary: "",
  subgenre: [],
  language: "es",
  available: true,
  yearBook: "",
  synopsis: "",
  theme: [],
  genre: "",
  level: "",
  format: "ebook",
  totalPages: undefined as number | undefined,
  duration: undefined as number | undefined,
  fileExtension: "pdf",
};

export default function AdminBooksNew() {
  const { token } = useAuth();
  const [, navigate] = useLocation();
  const [form, setForm] = useState(INITIAL);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof INITIAL, v: any) =>
    setForm((s) => ({ ...s, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!imgFile || !bookFile) {
        toast.error("Falta seleccionar imagen y archivo del libro.");
        return;
      }
      setLoading(true);

      const payload: AdminCreateBookInput = {
        ...form,
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
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold mb-4">Crear libro</h2>

      <form
        onSubmit={onSubmit}
        className="space-y-4 bg-white border rounded-lg p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="form-control">
            <span className="label-text">Título</span>
            <input
              className="input input-bordered"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </label>

          <label className="form-control">
            <span className="label-text">Género</span>
            <input
              className="input input-bordered"
              value={form.genre}
              onChange={(e) => set("genre", e.target.value)}
            />
          </label>

          <label className="form-control">
            <span className="label-text">Idioma</span>
            <input
              className="input input-bordered"
              value={form.language}
              onChange={(e) => set("language", e.target.value)}
            />
          </label>

          <label className="form-control">
            <span className="label-text">Año</span>
            <input
              className="input input-bordered"
              value={form.yearBook}
              onChange={(e) => set("yearBook", e.target.value)}
            />
          </label>

          <label className="form-control">
            <span className="label-text">Nivel</span>
            <input
              className="input input-bordered"
              value={form.level}
              onChange={(e) => set("level", e.target.value)}
            />
          </label>

          <label className="form-control">
            <span className="label-text">Formato</span>
            <select
              className="select select-bordered"
              value={form.format}
              onChange={(e) => {
                const f = e.target.value;
                set("format", f);
                // limpiar los campos alternativos
                if (f === "ebook") set("duration", undefined);
                else set("totalPages", undefined);
              }}
            >
              <option value="ebook">ebook</option>
              <option value="audiobook">audiobook</option>
              <option value="videobook">videobook</option>
            </select>
          </label>

          <label className="form-control">
            <span className="label-text">Disponible</span>
            <select
              className="select select-bordered"
              value={String(form.available)}
              onChange={(e) => set("available", e.target.value === "true")}
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </label>

          <label className="form-control">
            <span className="label-text">Extensión de archivo</span>
            <input
              className="input input-bordered"
              value={form.fileExtension}
              onChange={(e) => set("fileExtension", e.target.value)}
            />
          </label>
        </div>

        <label className="form-control">
          <span className="label-text">Resumen</span>
          <textarea
            className="textarea textarea-bordered"
            value={form.summary}
            onChange={(e) => set("summary", e.target.value)}
          />
        </label>

        <label className="form-control">
          <span className="label-text">Sinopsis</span>
          <textarea
            className="textarea textarea-bordered"
            value={form.synopsis}
            onChange={(e) => set("synopsis", e.target.value)}
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="form-control">
            <span className="label-text">Subgéneros (coma)</span>
            <input
              className="input input-bordered"
              onChange={(e) =>
                set(
                  "subgenre",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
            />
          </label>

          <label className="form-control">
            <span className="label-text">Temas (coma)</span>
            <input
              className="input input-bordered"
              onChange={(e) =>
                set(
                  "theme",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
            />
          </label>

          <label className="form-control">
            <span className="label-text">Autores (IDs separados por coma)</span>
            <input
              className="input input-bordered"
              onChange={(e) =>
                set(
                  "author",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
            />
          </label>
        </div>

        {form.format === "ebook" ? (
          <label className="form-control">
            <span className="label-text">Total de páginas</span>
            <input
              type="number"
              className="input input-bordered"
              value={form.totalPages ?? ""}
              onChange={(e) =>
                set(
                  "totalPages",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </label>
        ) : (
          <label className="form-control">
            <span className="label-text">Duración (segundos)</span>
            <input
              type="number"
              className="input input-bordered"
              value={form.duration ?? ""}
              onChange={(e) =>
                set(
                  "duration",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </label>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="form-control">
            <span className="label-text">Portada (img)</span>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered"
              onChange={(e) => setImgFile(e.target.files?.[0] ?? null)}
            />
          </label>

          <label className="form-control">
            <span className="label-text">Archivo del libro</span>
            <input
              type="file"
              className="file-input file-input-bordered"
              onChange={(e) => setBookFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <div className="flex gap-2">
          <button
            className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}
            type="submit"
          >
            {loading ? "Creando…" : "Crear"}
          </button>
          <button className="btn" type="button" onClick={() => history.back()}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
