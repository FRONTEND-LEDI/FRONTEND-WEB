import type { BookWithProgress } from "../../../types/books";
import { authorNames, coverUrlOf } from "../../../types/books";

type Props = {
  items: BookWithProgress[];
  loading?: boolean;
  error?: string;
};

export default function ProgressList({ items, loading, error }: Props) {
  if (loading) return <SkeletonList />;
  if (error) return <ErrorState msg={error} />;
  if (!items || items.length === 0)
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">
          Aún no tenés lecturas en curso. Aparecerán acá cuando comiences una.
        </p>
      </div>
    );

  return (
    <ul className="divide-y divide-gray-100">
      {items.map((b) => (
        <li
          key={b._id}
          className="p-5 flex items-center gap-4 hover:bg-gray-50/100 transition-colors cursor-pointer"
        >
          <img
            src={coverUrlOf(b)}
            alt={`Portada de ${b.title}`}
            className="w-20 h-28 rounded-lg object-cover border shadow-sm"
            loading="lazy"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 text-base">
                {b.title}
              </h3>
              <FormatPill format={b.format} />
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {authorNames(b.author)}
            </p>

            <div className="mt-2">
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${Math.round(b.progressPct)}%` }}
                />
              </div>
              <div className="mt-1.5 text-xs text-gray-600 font-medium">
                {Math.round(b.progressPct)}% completado
              </div>
            </div>
          </div>

          <button className="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-amber-50 hover:border-amber-300 transition-colors font-medium whitespace-nowrap">
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
  format?: "ebook" | "audiobook" | "videovideo" | string;
}) {
  const label =
    format === "audiobook"
      ? "Audio"
      : format === "videobook"
      ? "Video"
      : "Libro";
  return (
    <span className="text-xs px-2 py-1 rounded-full border border-gray-300 bg-white text-gray-700 font-medium">
      {label}
    </span>
  );
}

function SkeletonList() {
  return (
    <ul className="divide-y">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className="p-4 sm:p-5 flex items-center gap-4">
          <div className="w-12 h-16 rounded-md bg-gray-300 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
            <div className="h-2 w-full bg-gray-400 rounded animate-pulse" />
          </div>
          <div className="h-7 w-20 bg-gray-300 rounded animate-pulse" />
        </li>
      ))}
    </ul>
  );
}

function ErrorState({ msg }: { msg: string }) {
  return (
    <div className="p-6">
      <p className="text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
        {msg}
      </p>
    </div>
  );
}
