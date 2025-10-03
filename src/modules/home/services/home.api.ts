import type { Book, BookWithProgress } from "../../../types/books";
import { getAllProgress } from "../../../db/services/progress";
// import { FALLBACK_COVER } from "../../../types/books";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3402";

const authHeaders = (token: string | null): HeadersInit => {
  const h: HeadersInit = { "x-client": "web" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

type ApiBooksProgressItem = {
  _id: string;
  title: string;
  author?: Array<{ _id: string; name: string }>;
  bookCoverImage?: { url_secura?: string };
  summary?: string;
  synopsis?: string;
  available: boolean;
  subgenre?: string[];
  theme?: string[];
  yearBook?: string;
  contentBook?: { url_secura?: string };
  totalPages?: number;
  duration?: number;
  genre?: string;
  level?: string;
  format?: "ebook" | "audiobook" | "videobook" | string;
  fileExtension: string;
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

function mapApiToBook(api: ApiBooksProgressItem): Book {
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
    format: api.format as Book["format"],
    fileExtension: api.fileExtension,
  };
}
const clampRound = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

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

export async function fetchContinueReading(
  token: string | null
): Promise<BookWithProgress[]> {
  // 1) Libros con progreso (sin percent)
  const resBooks = await fetch(`${API_URL}/booksProgress`, {
    headers: authHeaders(token),
    credentials: "include",
  });
  if (!resBooks.ok) throw new Error("Error al obtener libros con progreso");
  const booksRaw: ApiBooksProgressItem[] = await resBooks.json();

  // 2) Todos los progresos del usuario
  const progresses = await getAllProgress(token); // /Progress -> { result: [...] } ya normalizado a []

  // 3) idBook -> percent (si hubiera duplicados, elegimos el más alto)
  const progressMap = new Map<string, number>();
  for (const p of progresses) {
    const id = p?.idBook;
    if (!id) continue;
    const current = clampRound(Number(p?.percent ?? 0));
    const prev = progressMap.get(id) ?? 0;
    if (current >= prev) progressMap.set(id, current);
  }

  // 4) Compose BookWithProgress
  return (booksRaw ?? []).map((api) => {
    const book = mapApiToBook(api);
    const progressPct = progressMap.get(book._id) ?? 0;
    return { ...book, progressPct };
  });
}
