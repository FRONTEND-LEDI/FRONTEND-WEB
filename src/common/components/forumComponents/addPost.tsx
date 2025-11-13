import { useState } from "react";
import type { Foro } from "../../../types/forum";

type AddPostProps = {
  foroSeleccionado: Foro | null;
  agregarPost: (contenido: string) => void;
};

export default function AddPost({ foroSeleccionado, agregarPost }: AddPostProps) {
  const [nuevoPost, setNuevoPost] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      if (modal) {
        setTimeout(() => {
          modal.close();
          setIsSubmitting(false);
        }, 500);
      }
    } catch (error) {
      console.error("Error al crear post:", error);
      alert("Error al crear el post. Por favor intenta de nuevo.");
      setIsSubmitting(false);
    }
  };

  if (!foroSeleccionado) return null;

  const openModal = () => {
    const modal = document.getElementById("post_modal") as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("post_modal") as HTMLDialogElement | null;
    if (modal) modal.close();
    setNuevoPost("");
  };

  return (
    <>
      <button 
        className="btn" 
        style={{ borderRadius: "18px", cursor: "pointer" }} 
        onClick={openModal}
      >
        Crear Post
      </button>

      <dialog id="post_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col gap-4">
          <h3 className="font-bold text-lg">Nuevo post en {foroSeleccionado.title}</h3>
          
          <textarea
            className="textarea textarea-bordered w-full min-h-[120px]"
            placeholder="Escribe tu post..."
            value={nuevoPost}
            onChange={(e) => setNuevoPost(e.target.value)}
            disabled={isSubmitting}
          />

          <div className="modal-action flex gap-2">
            <button 
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
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
        </div>
      </dialog>
    </>
  );
}