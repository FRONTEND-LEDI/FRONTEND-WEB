import { Clock, Flame } from "lucide-react";
import type { Foro, Coment } from "../../../types/forum";

type ForumOverviewProps = {
  foros: Foro[];
};

export default function ForumOverview({ foros }: ForumOverviewProps) {
  // 🔹 Convertir todos los posts de todos los foros en una sola lista
  const todosLosPosts: (Coment & { foroTitle: string })[] = foros.flatMap((foro) =>
    (foro.posts ?? []).map((post) => ({
      ...post,
      foroTitle: foro.title,
    }))
  );

  // 🔹 Ordenar por fecha (más recientes primero)
  const recientes = [...todosLosPosts].sort(
    (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );

  // 🔹 Agrupar por foro para los temas populares (más comentados)
  const populares = [...foros]
    .sort((a, b) => (b.posts?.length ?? 0) - (a.posts?.length ?? 0))
    .slice(0, 3); // mostrar los 3 con más comentarios

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full mt-10">
      {/* === ACTIVIDAD RECIENTE === */}
      <section className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-primary" />
          <h2 className="text-xl font-bold text-primary">Actividad reciente</h2>
        </div>

        {recientes.length > 0 ? (
          <div className="flex flex-col gap-4">
            {recientes.slice(0, 5).map((post) => (
              <div
                key={post._id}
                className="p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-base-100"
              >
                <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                  {post.content.slice(0, 80)}...
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                  <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                    {post.foroTitle}
                  </span>
                  <span>Por usuario {post.idUser}</span>
                  <span>{formatearTiempo(post.createAt)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Sin actividad reciente.</p>
        )}
      </section>

      {/* === TEMAS POPULARES === */}
      <aside className="md:w-80 flex-shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="text-primary" />
          <h2 className="text-xl font-bold text-primary">Temas populares</h2>
        </div>

        <div className="flex flex-col gap-3">
          {populares.map((foro) => (
            <div
              key={foro._id}
              className="p-3 border border-gray-200 rounded-xl shadow-sm hover:shadow-md bg-base-100 cursor-pointer transition-all"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-700 hover:text-primary transition-colors">
                  {foro.title}
                </h3>
                <span className="text-gray-400 text-sm">→</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {foro.posts?.length ?? 0}{" "}
                {(foro.posts?.length ?? 0) === 1 ? "comentario" : "comentarios"}
              </p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function formatearTiempo(fechaISO: string): string {
  const fecha = new Date(fechaISO);
  const diferencia = (Date.now() - fecha.getTime()) / 1000;

  if (diferencia < 60) return "Hace unos segundos";
  if (diferencia < 3600) return `Hace ${Math.floor(diferencia / 60)} min`;
  if (diferencia < 86400) return `Hace ${Math.floor(diferencia / 3600)} horas`;
  if (diferencia < 172800) return "Hace 1 día";
  return `Hace ${Math.floor(diferencia / 86400)} días`;
}