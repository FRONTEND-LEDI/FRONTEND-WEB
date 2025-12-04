import { Clock } from "lucide-react";
import type { ForoExtendido, Comment } from "../../../types/forum";
import { formatearTiempoRelativo } from "../../utils/date";

type ForumOverviewProps = {
  foros: ForoExtendido[];
  isLoading?: boolean;
};

export default function ForumOverview({
  foros,
  isLoading = false,
}: ForumOverviewProps) {
  // 🔹 Convertir todos los posts de todos los foros en una sola lista
  const todosLosPosts: (Comment & { foroTitle: string })[] = foros.flatMap(
    (foro) => {
      console.log(`📊 Foro "${foro.title}":`, foro.posts?.length || 0, "posts");
      return (foro.posts ?? []).map((post) => ({
        ...post,
        foroTitle: foro.title,
      }));
    }
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
            {recientes.slice(0, 5).map((post) => {
              // Obtener iniciales del usuario
              const getInitials = (user: any): string => {
                if (!user) return "??";
                return user.userName
                  ?.split(" ")
                  .map((w: string) => w[0].toUpperCase())
                  .join("")
                  .slice(0, 2);
              };

              const initials = getInitials(post.idUser);

              return (
                <div
                  key={post._id}
                  className="p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white"
                >
                  {/* HEADER CON AVATAR */}
                  <div className="flex items-center gap-3 mb-3">
                    {/* AVATAR + MARCO */}
                    <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
                      {/* Marco por nivel */}
                      {(post.idUser as any)?.imgLevel && (
                        <img
                          src={(post.idUser as any).imgLevel}
                          alt="Marco"
                          className="absolute w-12 h-12 object-contain pointer-events-none"
                        />
                      )}

                      {/* Avatar o iniciales */}
                      {(post.idUser as any)?.avatar ? (
                        <img
                          src={(post.idUser as any).avatar}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                          {initials}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="font-bold text-sm">
                        {(post.idUser as any)?.userName ?? "Usuario"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatearTiempoRelativo(post.createdAt ?? "")}
                      </p>
                    </div>

                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-semibold">
                      {post.foroTitle}
                    </span>
                  </div>

                  {/* CONTENIDO */}
                  <p className="text-gray-700 text-sm hover:text-primary transition-colors ml-13">
                    {post.content.slice(0, 100)}
                    {post.content.length > 100 ? "..." : ""}
                  </p>
                </div>
              );
            })}
          </div>
        ) : isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow-400 border-t-transparent"></div>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No hay actividad reciente todavía</p>
          </div>
        )}
      </section>
    </div>
  );
}
