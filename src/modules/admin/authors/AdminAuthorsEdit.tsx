import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useAuth } from "../../../context/AuthContext";
import {
  adminUpdateAuthor,
  getAuthorById,
} from "../../../db/services/adminAuthors";
import { getAuthorAvatarUrl } from "../../../types/author";
import toast from "react-hot-toast";

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

  if (loading) return <div>Cargando…</div>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Editar autor</h2>
      <form
        onSubmit={onSubmit}
        className="space-y-4 bg-white border rounded-lg p-4"
      >
        <label className="form-control">
          <span className="label-text">Nombre</span>
          <input
            className="input input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="form-control">
          <span className="label-text">Biografía</span>
          <textarea
            className="textarea textarea-bordered min-h-32"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <label className="form-control">
            <span className="label-text">Avatar</span>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered"
              onChange={onFile}
            />
          </label>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex gap-2">
          <button
            className={`btn btn-primary ${saving ? "btn-disabled" : ""}`}
            type="submit"
          >
            {saving ? "Guardando…" : "Guardar"}
          </button>
          <button className="btn" type="button" onClick={() => history.back()}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
