import type { Foro, Comment } from "../../../types/forum";
import { UsersRound } from "lucide-react";

type FilterProps = {
  setForoSeleccionado: (foro: Foro | null) => void;
  foros: Foro[];
  comentarios: Comment[];
};

// Recursivo si en el futuro agregas respuestas
const contarRecursivo = (posts: Comment[]): number => {
  let count = posts.length;
  posts.forEach((p) => {
    if ((p as any).answers) count += contarRecursivo((p as any).answers);
  });
  return count;
};

const contarComentariosPorForo = (foroId: string, comentarios: Comment[]) => {
  const posts = comentarios.filter(
    (c) => c.idForo === foroId || c.idForo?._id === foroId
  );
  return contarRecursivo(posts);
};

const ultimaActividadPorForo = (foroId: string, comentarios: Comment[]) => {
  const posts = comentarios.filter(
    (c) => c.idForo === foroId || c.idForo?._id === foroId
  );

  if (!posts.length) return "Sin actividad";

  const ultimo = posts.reduce((latest, post) => {
    if (!post.createdAt) return latest;
    return new Date(post.createdAt) > new Date(latest.createdAt ?? 0)
      ? post
      : latest;
  });

  return ultimo.createdAt
    ? new Date(ultimo.createdAt).toLocaleString("es-ES")
    : "Sin fecha";
};

export default function FilterForum({ setForoSeleccionado, foros, comentarios }: FilterProps) {
  return (
    <div className="flex flex-col mt-12 gap-8 w-full">
      <div>
        <h1 className="text-2xl text-gray-800">Antologías disponibles</h1>
        <h2 className="text-lg text-gray-500">
          Elige una antología para empezar a participar
        </h2>
      </div>

      <section className="flex flex-wrap justify-center gap-6">
        {foros.length ? (
          foros.map((foro) => (
            <div
              key={foro._id}
              onClick={() => setForoSeleccionado(foro)}
              className="card bg-base-100 w-full shadow-md hover:shadow-lg cursor-pointer"
            >
              <div className="card-body">
                <h2 className="card-title text-primary">{foro.title}</h2>
                <p className="text-sm text-gray-600">{foro.description}</p>

                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <UsersRound className="w-4 h-4 text-primary" />
                    {contarComentariosPorForo(foro._id, comentarios)} Comentarios
                  </div>

                  <div>
                    <strong>
                      {ultimaActividadPorForo(foro._id, comentarios)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">
            No hay antologías disponibles.
          </p>
        )}
      </section>
    </div>
  );
}
