import { Bell } from "lucide-react";

export default function AsideNotificaciones() {
  const notificaciones = [
    {
      id: 1,
      titulo: "Nuevo logro desbloqueado",
      descripcion: "¡Felicitaciones! Obtuviste el nivel Plata en Lectura.",
      fecha: "Hace 2 h",
    },
    {
      id: 2,
      titulo: "Recomendación personalizada",
      descripcion: "Te sugerimos continuar con tu lectura actual.",
      fecha: "Ayer",
    },
    {
      id: 3,
      titulo: "Novedad en la plataforma",
      descripcion: "Nueva sección de desafíos añadida.",
      fecha: "Hace 3 días",
    },
  ];

  return (
    <aside className="w-80 mt-35 bg-white shadow-xl border border-gray-200 rounded-xl p-4 max-h-[80vh] ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Bell className="w-5 h-5" /> Noticias
        </h2>
      </div>

      {/* Lista */}
      <div className="space-y-4">
        {notificaciones.map((n) => (
          <div
            key={n.id}
            className="p-4 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <h3 className="font-semibold text-lg">{n.titulo}</h3>
            <p className="text-sm text-gray-600 mt-1">{n.descripcion}</p>
            <span className="text-xs text-gray-400 mt-2 block">{n.fecha}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
