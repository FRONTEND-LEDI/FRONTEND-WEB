import React from "react";
import { Link } from "wouter";
import { Book, BookOpenText, Headphones, Clapperboard } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  bookCoverImage: string;
  format?: "ebook" | "audiobook" | "videobook";
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  bookCoverImage,
  format,
}) => {
  const renderFormatIcon = () => {
    if (!format) return null;

    const formatLower = format.toLowerCase();
    let IconComponent;
    let bgColor;
    let iconColor;
    let tooltipText;

    // determino qué icino y colores usar según el formato
    if (formatLower.includes("ebook")) {
      IconComponent = BookOpenText;
      bgColor = "bg-primary/80";
      iconColor = "text-white";
      tooltipText = "Libro electrónico";
    } else if (formatLower.includes("audiobook")) {
      IconComponent = Headphones;
      bgColor = "bg-green-400/80";
      iconColor = "text-white";
      tooltipText = "Audio libro";
    } else if (formatLower.includes("videobook")) {
      IconComponent = Clapperboard;
      bgColor = "bg-red-400/80";
      iconColor = "text-white/";
      tooltipText = "Video libro";
    } else {
      // formato por defecto si no coincide con ninguno
      IconComponent = Book;
      bgColor = "bg-gray-400/80";
      iconColor = "text-white";
      tooltipText = format;
    }
    return (
      <div
        className={`absolute top-2 right-2 ${bgColor} ${iconColor} rounded-full p-1.5 shadow-md z-10`}
        title={tooltipText}
      >
        <IconComponent size={14} />
      </div>
    );
  };
  return (
    <Link
      href={`/libro/${id}`}
      className="rounded-2xl shadow p-4 flex flex-col items-center bg-fund hover:shadow-lg transition hover:transform-[scale(1.1)] hover:bg-violet-50 relative"
    >
      {renderFormatIcon()}
      <img
        src={bookCoverImage || "/portada-no-disponible.png"}
        alt={title}
        className="w-full h-100% object-cover rounded-lg mb-2"
      />
      <h3 className="text-lg font-semibold text-center line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 text-center mt-1 line-clamp-1">
        {author}
      </p>
    </Link>
  );
};

export default BookCard;
