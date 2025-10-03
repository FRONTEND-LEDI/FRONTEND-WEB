import { Flame, Trophy, Calendar } from "lucide-react";

type Props = {
  user: {
    name?: string;
    lastName?: string;
    userName?: string;
    birthDate?: string;
    email?: string;
    avatar?: string | null;
  } | null;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ProfileSidebar({ user, onEdit, onDelete }: Props) {
  const fullName =
    [user?.lastName, user?.name].filter(Boolean).join(", ") || "Usuario";

  // datos inventados por ahora para los niveles
  const currentLevel = 15;
  const levelProgress = 75; // porcentaje del siguiente nivel

  const joinDate = user?.birthDate
    ? new Date(user.birthDate).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const recentAchievements = [
    { icon: Flame, label: "7 días de racha", color: "text-orange-500" },
    { icon: Trophy, label: "logro de algo", color: "text-amber-500" },
    { icon: Trophy, label: "otro logro", color: "text-yellow-500" },
  ];

  return (
    <div className="space-y-4 mb-8">
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-orange-100">
        <div className="flex items-start gap-4">
          <img
            src={user?.avatar ?? "/hostImage/avatarLanding.png"}
            alt="Avatar"
            className="w-16 h-16 rounded-xl object-cover border-1 border-primary/50 cursor-pointer"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900">{fullName}</h2>
            <p className="text-sm text-gray-600">@{user?.userName ?? "-"}</p>
            {joinDate && (
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {joinDate}
              </p>
            )}
          </div>
        </div>
        {/* Botones de editar / elimiinar */}

        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            onClick={onEdit}
            className="w-full rounded-lg border bg-white hover:bg-amber-50 px-3 py-2 text-xs cursor-pointer"
          >
            Editar perfil
          </button>
          <button
            onClick={onDelete}
            className="w-full rounded-lg border bg-white hover:bg-rose-50 px-3 py-2 text-xs text-rose-700 border-rose-200 cursor-pointer"
          >
            Eliminar cuenta
          </button>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border border-orange-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700">Nivel Actual</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
            Avanzado
          </span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-md">
            {currentLevel}
          </div>
          <span className="text-lg font-semibold text-gray-900">
            Level {currentLevel}
          </span>
        </div>

        <div className="mt-3">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {levelProgress}% para el siguiente nivel
          </p>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border border-orange-100">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Logros recientes
        </h3>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {recentAchievements.map((achievement, idx) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-100 hover:shadow-md transition-shadow cursor-pointer"
              >
                <IconComponent
                  className={`w-8 h-8 mb-1 ${achievement.color}`}
                />
                <span className="text-[10px] text-center text-gray-600 leading-tight">
                  {achievement.label}
                </span>
              </div>
            );
          })}
        </div>

        <button className="w-full text-sm text-amber-600 hover:text-amber-700 font-medium cursor-pointer">
          Ver todos los logros
        </button>
      </div>
    </div>
  );
}
