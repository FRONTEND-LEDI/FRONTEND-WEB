import type { Foro, Coment } from "../../../types/forum";
import { UsersRound } from "lucide-react";

type FilterProps = {
  setForoSeleccionado: (foro: Foro | null) => void;
  foros: Foro[];
  comentarios: Coment[]; 
};

// Función recursiva para contar respuestas
const contarRecursivo = (posts: Coment[]): number => {
  let count = posts.length;
  posts.forEach(p => {
    if (p.answers) count += contarRecursivo(p.answers);
  });
  return count;
};

// Contar comentarios de un foro
const contarComentariosPorForo = (foroId: string, comentarios: Coment[]): number => {
  const postsForo = comentarios.filter(c =>
    typeof c.idForo === "object" ? c.idForo._id === foroId : c.idForo === foroId
  );
  return contarRecursivo(postsForo);
};

// Obtener última actividad de un foro
const ultimaActividadPorForo = (foroId: string, comentarios: Coment[]): string => {
  const postsForo = comentarios.filter(c =>
    typeof c.idForo === "object" ? c.idForo._id === foroId : c.idForo === foroId
  );

  if (postsForo.length === 0) return "Sin actividad";

  const ultimo = postsForo.reduce((latest, post) =>
    new Date(post.createdAt) > new Date(latest.createdAt) ? post : latest
  );

  return new Date(ultimo.createdAt).toLocaleString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function FilterForum({ setForoSeleccionado, foros, comentarios }: FilterProps) {
  return (
    <div className="flex flex-col mt-12 gap-8 w-full">
      <div className="w-full">
        <h1 className="text-2xl text-gray-800">Antologías disponibles</h1>
        <h2 className="text-lg text-gray-500">
          Elige una antología para empezar a participar
        </h2>
      </div>

      <section className="flex flex-wrap justify-center gap-6">
        {foros.length > 0 ? (
          foros.map(foro => (
            <div
              onClick={() => setForoSeleccionado(foro)}
              key={foro._id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer w-full "
            >
              <div className="card-body w-full">
                <h2 className="card-title text-primary">{foro.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{foro.description}</p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <UsersRound className="w-4 h-4 text-primary" />
                    <span>
                      {contarComentariosPorForo(foro._id, comentarios)}{" "}
                      {contarComentariosPorForo(foro._id, comentarios) === 1
                        ? "Comentario"
                        : "Comentarios"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Última actividad:</span>{" "}
                    <strong>{ultimaActividadPorForo(foro._id, comentarios)}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No hay antologías disponibles por el momento.
          </p>
        )}
      </section>
    </div>
  );
}
