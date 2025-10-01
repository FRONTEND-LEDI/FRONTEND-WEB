import { useState } from "react";
import type { Foro } from "./types";

type AddPostProps = {
  foroSeleccionado: Foro | null;
  agregarPost: (contenido: string) => void;
};

export default function AddPost({ foroSeleccionado, agregarPost }: AddPostProps) {
  const [nuevoPost, setNuevoPost] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoPost.trim()) return;
    agregarPost(nuevoPost);
    setNuevoPost("");

    const modal = document.getElementById("post_modal") as HTMLDialogElement | null;
    if (modal) modal.close();
  };

  if (!foroSeleccionado) return null;

  const openModal = () => {
    const modal = document.getElementById("post_modal") as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  return (
    <>
      <button className="btn" style={{ borderRadius: "18px", cursor: "pointer" }} onClick={openModal}>
        Crear Post
      </button>

      <dialog id="post_modal" className="modal modal-bottom sm:modal-middle">
        <form onSubmit={handleSubmit} className="modal-box flex flex-col gap-4">
          <h3 className="font-bold text-lg">Nuevo post en {foroSeleccionado.title}</h3>
          
          <textarea
            className="textarea w-full"
            placeholder="Escribe tu post..."
            value={nuevoPost}
            onChange={(e) => setNuevoPost(e.target.value)}
            required
          />

          <div className="modal-action flex gap-2">
            <button type="submit" className="btn btn-primary">
              Crear
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                const modal = document.getElementById("post_modal") as HTMLDialogElement | null;
                if (modal) modal.close();
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}