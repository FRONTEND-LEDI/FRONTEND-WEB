import { useState } from "react";
import type { Foro } from "../../../types/forum";

type AddPostProps = {
  foroSeleccionado: Foro | null;
  agregarPost: (contenido: string) => void;
};

export default function AddPost({ foroSeleccionado, agregarPost }: AddPostProps) {
  const [nuevoPost, setNuevoPost] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!foroSeleccionado) return null;

  const openModal = () => {
    const modal = document.getElementById("post_modal") as HTMLDialogElement | null;
    modal?.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("post_modal") as HTMLDialogElement | null;
    modal?.close();
    setNuevoPost("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nuevoPost.trim()) {
      alert("El contenido del post no puede estar vacío");
      return;
    }

    setIsSubmitting(true);

    try {
      agregarPost(nuevoPost);
      setNuevoPost("");

      const modal = document.getElementById("post_modal") as HTMLDialogElement | null;

      setTimeout(() => {
        modal?.close();
        setIsSubmitting(false);
      }, 400);

    } catch (err) {
      console.error("Error al crear post:", err);
      alert("Ocurrió un error. Intenta nuevamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button 
        className="btn shadow-2xl shadow-black/40" 
        style={{ borderRadius: "18px" }}
        onClick={openModal}
      >
        Crear Post
      </button>

      <dialog id="post_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col gap-4">

          <h3 className="font-bold text-lg">
            Nuevo post en {foroSeleccionado.title}
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <textarea
              className="textarea textarea-bordered w-full min-h-[120px]"
              placeholder="Escribe tu post..."
              value={nuevoPost}
              onChange={(e) => setNuevoPost(e.target.value)}
              disabled={isSubmitting}
            />

            <div className="flex justify-end gap-2">
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !nuevoPost.trim()}
              >
                {isSubmitting ? "Creando..." : "Crear"}
              </button>

              <button
                type="button"
                className="btn"
                onClick={closeModal}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
