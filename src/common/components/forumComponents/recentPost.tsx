import { Clock} from "lucide-react";
import type { ForoExtendido, Comment } from "../../../types/forum";

type ForumOverviewProps = {
  foros: ForoExtendido[];
};

export default function ForumOverview({ foros }: ForumOverviewProps) {
  // 🔹 Convertir todos los posts de todos los foros en una sola lista
  const todosLosPosts: (Comment & { foroTitle: string })[] = foros.flatMap(
    (foro) =>
      (foro.posts ?? []).map((post) => ({
        ...post,
        foroTitle: foro.title,
      }))
  );

  // 🔹 Ordenar por fecha (más recientes primero)
  const recientes = [...todosLosPosts].sort(
    (a, b) =>
      new Date(b.createdAt ?? "").getTime() -
      new Date(a.createdAt ?? "").getTime()
  );

 
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

                  {/* 👇 CORRECCIÓN: mostrar NOMBRE del usuario */}
                  <span>Por {post.idUser?.userName ?? "Usuario"}</span>

                  <span>{formatearTiempo(post.createdAt ?? "")}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          

      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow-400 border-t-transparent"></div>
      </div>




        )}
      </section>


    </div>
  );
}

function formatearTiempo(fechaISO: string): string {
  if (!fechaISO) return "Fecha desconocida";

  const fecha = new Date(fechaISO);
  const diferencia = (Date.now() - fecha.getTime()) / 1000;

  if (diferencia < 60) return "Hace unos segundos";
  if (diferencia < 3600) return `Hace ${Math.floor(diferencia / 60)} min`;
  if (diferencia < 86400) return `Hace ${Math.floor(diferencia / 3600)} horas`;
  if (diferencia < 172800) return "Hace 1 día";
  return `Hace ${Math.floor(diferencia / 86400)} días`;
}

