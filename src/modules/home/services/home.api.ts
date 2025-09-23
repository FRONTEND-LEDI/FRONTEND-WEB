import type { Book, BookWithProgress } from "../../../types/books";
// import { FALLBACK_COVER } from "../../../types/books";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3402";

const authHeaders = (token: string | null): HeadersInit => {
  const h: HeadersInit = { "x-client": "web" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

// tipos para recomendaciones
type ApiRecommendation = {
  _id: string;
  title: string;
  summary?: string;
  subgenre?: string[];
  language?: string;
  available: boolean;
  yearBook?: string;
  synopsis?: string;
  contentBook?: { idContentBook?: string; url_secura?: string; _id?: string };
  bookCoverImage?: {
    idBookCoverImage?: string;
    url_secura?: string;
    _id?: string;
  };
  theme?: string[];
  genre?: string;
  level?: string;
  format?: "ebook" | "audiobook" | "videobook" | string;
  fileExtension: string;
  totalPages?: number;
  duration?: number;
  createdAt?: string;
  updatedAt?: string;
  author?: Array<{ _id: string; name: string }>;
};

function mapApiRecToBook(api: ApiRecommendation): Book {
  return {
    _id: api._id,
    title: api.title,
    author: api.author ?? [],
    bookCoverImage: { url_secura: api.bookCoverImage?.url_secura },
    summary: api.summary,
    synopsis: api.synopsis,
    available: api.available,
    subgenre: api.subgenre,
    theme: api.theme,
    yearBook: api.yearBook,
    contentBook: { url_secura: api.contentBook?.url_secura },
    totalPages: api.totalPages,
    duration: api.duration,
    genre: api.genre,
    level: api.level,
    format: (api.format as Book["format"]) ?? undefined,
    fileExtension: api.fileExtension,
  };
}

export async function fetchRecommendations(
  token: string | null
): Promise<Book[]> {
  const res = await fetch(`${API_URL}/recommendations`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al obtener recomendaciones");

  const raw = await res.json();
  const arr: unknown = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object" && "json" in raw
    ? (raw as any).json
    : [];

  if (!Array.isArray(arr))
    throw new Error("Formato de recomendaciones no reconocido");

  return (arr as ApiRecommendation[]).map(mapApiRecToBook);
}

// tipos para "seguir leyendo"
function coalesceProgress(api: any): number {
  if (typeof api?.progressPct === "number") return api.progressPct;
  if (typeof api?.progress === "number") return api.progress;
  if (typeof api?.progress?.percentage === "number")
    return api.progress.percentage;
  return 0;
}

function mapApiProgressToBook(api: any): BookWithProgress {
  const base: Book = {
    _id: api._id,
    title: api.title,
    author: api.author ?? [],
    bookCoverImage: { url_secura: api.bookCoverImage?.url_secura },
    summary: api.summary,
    synopsis: api.synopsis,
    available: api.available,
    subgenre: api.subgenre,
    theme: api.theme,
    yearBook: api.yearBook,
    contentBook: { url_secura: api.contentBook?.url_secura },
    totalPages: api.totalPages,
    duration: api.duration,
    genre: api.genre,
    level: api.level,
    format: api.format,
    fileExtension: api.fileExtension ?? "PDF",
  };
  return { ...base, progressPct: coalesceProgress(api) };
}

export async function fetchContinueReading(
  token: string | null
): Promise<BookWithProgress[]> {
  const res = await fetch(`${API_URL}/booksProgress`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al obtener progreso");

  const raw = await res.json();
  const arr: unknown = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object" && "json" in raw
    ? (raw as any).json
    : [];

  if (!Array.isArray(arr)) throw new Error("Formato de progreso no reconocido");

  return (arr as any[]).map(mapApiProgressToBook);
}
