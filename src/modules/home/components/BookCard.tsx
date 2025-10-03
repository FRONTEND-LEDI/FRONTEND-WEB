import {
  Book as BookIcon,
  BookOpenText,
  Headphones,
  Clapperboard,
} from "lucide-react";
import ProgressBadge from "./ProgressBadge";

type BookCardProps = {
  id: string;
  title: string;
  authorNames?: string;
  coverUrl: string;
  onOpen?: (id: string) => void;
  progress?: number; // 0-100
  format?: "ebook" | "audiobook" | "videobook" | string;
};

export default function BookCard({
  id,
  title,
  authorNames,
  coverUrl,
  onOpen,
  progress,
  format,
}: BookCardProps) {
  const renderFormatIcon = () => {
    if (!format) return null;
    const f = String(format).toLowerCase();
    let Icon = BookIcon;
    let bg = "bg-gray-400/80";
    let tooltip = format;

    if (f.includes("ebook")) {
      Icon = BookOpenText;
      bg = "bg-primary/80";
      tooltip = "Libro electrónico";
    } else if (f.includes("audiobook")) {
      Icon = Headphones;
      bg = "bg-green-400/80";
      tooltip = "Audio libro";
    } else if (f.includes("videobook")) {
      Icon = Clapperboard;
      bg = "bg-red-400/80";
      tooltip = "Video libro";
    }

    return (
      <div
        className={`absolute top-3 right-3 ${bg} text-white rounded-full p-1.5 shadow-md z-10`}
        title={tooltip}
      >
        <Icon size={14} />
      </div>
    );
  };

  return (
    <div className="snap-start w-[220px] shrink-0 group">
      <div
        className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-card border border-border group-hover:scale-[1.02] group-hover:border-primary/20"
        onClick={() => onOpen?.(id)}
      >
        {/* Progreso a la izquierda */}
        {typeof progress === "number" && <ProgressBadge progress={progress} />}
        {/* Formato a la derecha */}
        {renderFormatIcon()}

        <img
          src={coverUrl || "/portada-no-disponible.png"}
          alt={`Portada de ${title}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/portada-no-disponible.png";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="mt-4 px-1">
        <p className="text-sm font-semibold line-clamp-2 text-foreground leading-snug mb-1">
          {title}
        </p>
        {authorNames && (
          <p className="text-xs text-muted-foreground line-clamp-1 font-medium">
            {authorNames}
          </p>
        )}
      </div>
    </div>
  );
}
