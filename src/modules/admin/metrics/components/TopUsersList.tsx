import { useQuery } from "@tanstack/react-query";
import { Trophy } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { getTopUsers } from "../../../../db/services/metrics";
import type { TopUser } from "../../../../types/metrics";

const TopUsersList = () => {
  const { token } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["top-users"],
    queryFn: () => getTopUsers(token),
  });

  if (isLoading) return <div className="p-4">Cargando usuarios...</div>;
  if (isError) return <div className="p-4 text-red-500">Error al cargar</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
          <Trophy className="w-5 h-5 text-yellow-600" />
        </div>
        <h3 className="font-semibold text-gray-900">Usuarios Más Activos</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {data?.map((user: TopUser, idx: number) => (
          <div
            key={user.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                <div
                  className={`absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm z-20 ${
                    idx === 0
                      ? "bg-yellow-100 text-yellow-700"
                      : idx === 1
                      ? "bg-gray-100 text-gray-700"
                      : idx === 2
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {idx + 1}
                </div>

                {user.imgLevel && (
                  <img
                    src={user.imgLevel}
                    alt="Marco de nivel"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                  />
                )}

                <img
                  src={user.avatar || "/profile.png"}
                  alt={user.userName}
                  className="w-8 h-8 rounded-full object-cover"
                />

                <div className="absolute -bottom-1 -right-1 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm z-20">
                  Lv.{user.level?.level || 1}
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-900">
                  {user.name} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">@{user.userName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{user.point}</p>
              <p className="text-xs text-gray-500">puntos</p>
            </div>
          </div>
        ))}
        {(!data || data.length === 0) && (
          <div className="p-8 text-center text-gray-500">
            No hay usuarios registrados aún.
          </div>
        )}
      </div>
    </div>
  );
};

export default TopUsersList;
