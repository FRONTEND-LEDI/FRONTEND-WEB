import type { BookWithProgress } from "../../../types/books";
import { authorNames, coverUrlOf } from "../../../types/books";
import { AlertCircle, Book, Headphones, Video } from "lucide-react";

type Props = {
  items: BookWithProgress[];
  loading?: boolean;
  error?: string;
};

export default function ProgressList({ items, loading, error }: Props) {
  if (loading) return <SkeletonList />;
  if (error) return <ErrorState msg={error} />;
  if (!items || items.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
          <span className="text-2xl">📚</span>
        </div>
        <p className="text-sm text-gray-600 font-medium">
          Aún no tenés lecturas en curso
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Aparecerán acá cuando comiences una
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {items.map((b) => (
        <li
          key={b._id}
          className="p-5 flex items-center gap-4 hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-orange-50/50 transition-all duration-200 cursor-pointer group"
        >
          <div className="relative group">
            <img
              src={coverUrlOf(b)}
              alt={`Portada de ${b.title}`}
              className="w-20 h-28 rounded-lg object-cover border-2 border-gray-200 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg p-2">
              <div className="text-white text-xs font-bold text-center">
                {Math.round(b.progressPct)}%
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 text-base group-hover:text-amber-600 transition-colors">
                {b.title}
              </h3>
              <FormatPill format={b.format} />
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {authorNames(b.author)}
            </p>

            <div className="mt-2">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600 transition-all duration-500 ease-out relative"
                  style={{ width: `${Math.round(b.progressPct)}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
              <div className="mt-1.5 text-xs text-gray-600 font-medium">
                {Math.round(b.progressPct)}% completado
              </div>
            </div>
          </div>

          <button className="text-sm px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-200 font-medium whitespace-nowrap group-hover:scale-105">
            <a href={`/libro/${b._id}`}>Reanudar</a>
          </button>
        </li>
      ))}
    </ul>
  );
}

function FormatPill({
  format,
}: {
  format?: "ebook" | "audiobook" | "videobook" | string;
}) {
  const config =
    format === "audiobook"
      ? {
          icon: Headphones,
          label: "Audio",
          color: "from-purple-100 to-purple-200 text-purple-700",
        }
      : format === "videobook"
      ? {
          icon: Video,
          label: "Video",
          color: "from-blue-100 to-blue-200 text-blue-700",
        }
      : {
          icon: Book,
          label: "Libro",
          color: "from-gray-100 to-gray-200 text-gray-700",
        };

  const IconComponent = config.icon;

  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${config.color} font-medium shadow-sm flex items-center gap-1`}
    >
      <IconComponent className="w-3 h-3" />
      {config.label}
    </span>
  );
}

function SkeletonList() {
  return (
    <ul className="divide-y divide-gray-100">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className="p-5 flex items-center gap-4">
          <div className="w-20 h-28 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-full bg-gray-200 rounded-full animate-pulse" />
          </div>
          <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
        </li>
      ))}
    </ul>
  );
}

function ErrorState({ msg }: { msg: string }) {
  return (
    <div className="p-12 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-rose-600" />
      </div>
      <p className="text-sm text-gray-700 font-medium">{msg}</p>
    </div>
  );
}
