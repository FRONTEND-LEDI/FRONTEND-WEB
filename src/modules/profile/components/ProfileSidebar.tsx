import { Calendar, X, Award } from "lucide-react";
import { useState } from "react";
import { formatDateAvoidTimezone } from "../../../common/utils/date";

type Props = {
  user: {
    name?: string;
    lastName?: string;
    userName?: string;
    birthDate?: string;
    email?: string;
    level?: null | {
      level?: number;
      maxPoint?: number;
      level_string?: string;
      img?: {
        url_secura?: string;
      };
    };
    point?: number;
    avatar?: string | null;
  } | null;
  onEdit?: () => void;
  onDelete?: () => void;
};

const getLevelLabel = (level?: number): string => {
  const labels: Record<number, string> = {
    1: "Inicial",
    2: "Principiante",
    3: "Intermedio",
    4: "Avanzado",
    5: "Experto",
    6: "Maestro",
  };
  return level ? labels[level] || "Avanzado" : "Avanzado";
};

const getLevelFrameColor = (level?: number) => {
  const colors: Record<number, string> = {
    1: "from-gray-400 to-gray-600",
    2: "from-green-400 to-green-600",
    3: "from-blue-400 to-blue-600",
    4: "from-purple-400 to-purple-600",
    5: "from-yellow-400 to-yellow-600",
    6: "from-pink-400 via-red-500 to-yellow-500",
  };
  return colors[level || 1] || colors[1];
};

// Usar util común para formatear la fecha sin efectos de zona horaria

export default function ProfileSidebar({ user, onEdit, onDelete }: Props) {
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const fullName =
    [user?.lastName, user?.name].filter(Boolean).join(", ") || "Usuario";

  const currentLevel = user?.level?.level || 1;
  const cantPoints = user?.point || 0;
  const levelLabel = getLevelLabel(currentLevel);
  const frameColor = getLevelFrameColor(currentLevel);
  const frameUrl = user?.level?.img?.url_secura;
  const joinDate = formatDateAvoidTimezone(user?.birthDate);

  return (
    <>
      <div className="space-y-4 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
          <div className="flex items-start gap-4">
            {/* Avatar con marco de nivel */}
            <div
              className="relative cursor-pointer group"
              onClick={() => setShowAvatarModal(true)}
            >
              {/* Marco animado del nivel */}
              {frameUrl ? (
                <div className="w-20 h-20 relative">
                  <img
                    src={frameUrl}
                    alt="Marco de nivel"
                    className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
                  />
                  <img
                    src={user?.avatar ?? "/hostImage/avatarLanding.png"}
                    alt="Avatar"
                    className="w-16 h-16 rounded-full object-cover absolute top-2 left-2 group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${frameColor} rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity`}
                  ></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${frameColor} rounded-xl animate-pulse opacity-50`}
                  ></div>
                  <img
                    src={user?.avatar ?? "/hostImage/avatarLanding.png"}
                    alt="Avatar"
                    className="relative w-20 h-20 rounded-xl object-cover border-2 border-white group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                  {/* Indicador de nivel en la esquina */}
                  <div
                    className={`absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br ${frameColor} rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-md`}
                  >
                    {currentLevel}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900">
                {fullName}
              </h2>
              <p className="text-sm text-gray-600">@{user?.userName ?? "-"}</p>
              {joinDate && (
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {joinDate}
                </p>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            <button
              onClick={onEdit}
              className="w-full rounded-lg border border-orange-200 bg-white hover:bg-amber-50 px-3 py-2 text-xs font-medium transition-colors cursor-pointer"
            >
              Editar perfil
            </button>
            <button
              onClick={onDelete}
              className="w-full rounded-lg border bg-white hover:bg-rose-50 px-3 py-2 text-xs text-rose-700 border-rose-200 font-medium transition-colors cursor-pointer"
            >
              Eliminar cuenta
            </button>
          </div>
        </div>

        {/* Card de nivel mejorada */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 overflow-hidden relative">
          {/* Fondo decorativo */}
          <div
            className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${frameColor} opacity-10 rounded-full blur-3xl -mr-16 -mt-16`}
          ></div>

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Nivel Actual
              </h3>
              <span
                className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${frameColor} text-white font-semibold shadow-sm`}
              >
                {levelLabel}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${frameColor} flex items-center justify-center text-white font-bold text-2xl shadow-lg relative`}
              >
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                <span className="relative z-10">{currentLevel}</span>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-900">
                  Nivel {currentLevel}
                </p>
                <p className="text-sm text-gray-600">
                  Continúa leyendo para avanzar
                </p>
              </div>
            </div>

            {/* Puntos obtenidos */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-orange-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 font-medium">
                  Puntos totales
                </span>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {cantPoints.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de vista previa del avatar */}
      {showAvatarModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowAvatarModal(false)}
        >
          <div
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setShowAvatarModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Imagen */}
            <div className="bg-white rounded-2xl p-2 shadow-2xl">
              {frameUrl ? (
                <div className="relative">
                  <img
                    src={frameUrl}
                    alt="Marco de nivel"
                    className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
                  />
                  <img
                    src={user?.avatar ?? "/hostImage/avatarLanding.png"}
                    alt="Avatar"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div
                    className={`absolute -inset-4 bg-gradient-to-br ${frameColor} rounded-2xl blur-xl opacity-50`}
                  ></div>
                  <img
                    src={user?.avatar ?? "/hostImage/avatarLanding.png"}
                    alt="Avatar"
                    className="relative w-full h-auto rounded-xl border-4 border-white shadow-lg"
                  />
                </div>
              )}
            </div>

            {/* Info del nivel */}
            <div className="mt-4 text-center text-white">
              <p className="text-lg font-semibold">{fullName}</p>
              <p
                className={`text-sm inline-block px-4 py-1 rounded-full bg-gradient-to-r ${frameColor} mt-2 font-medium`}
              >
                {levelLabel} - Nivel {currentLevel}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
