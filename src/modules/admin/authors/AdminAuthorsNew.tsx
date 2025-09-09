import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { adminCreateAuthor } from "../../../db/services/adminAuthors";
import { useLocation } from "wouter";
import toast from "react-hot-toast";

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
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Crear autor</h2>
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
