export type AuthorItem = { _id: string; fullName: string } | string;
export type NormalizedAuthor = { id?: string; fullName: string };

export interface Book {
  _id: string;
  title: string;
  author: AuthorItem[];
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
  format?: "ebook" | "audiobook" | "videobook";
  fileExtension: string;
  language?: string;
  anthology?: boolean;
}

export type AdminCreateBookInput = {
  title: string;
  author: string[]; // ids
  summary: string;
  subgenre: string[];
  language: string;
  available?: boolean;
  yearBook: string;
  synopsis: string;
  theme: string[];
  genre: string;
  level: string;
  format: string;
  totalPages?: number;
  duration?: number;
  fileExtension: string;
  imgFile: File; // campo "img"
  bookFile: File; // campo "file"
  anthology?: boolean;
};

export interface BookWithProgress extends Book {
  progressPct: number;
}

export const FALLBACK_COVER =
  "https://placehold.co/400x600/png?text=Sin+Portada";

export function authorNames(authors: AuthorItem[] = []): string {
  return authors
    .map((a) => (typeof a === "string" ? a : a?.fullName ?? "").trim())
    .filter(Boolean)
    .join(", ");
}

export function coverUrlOf(b: Book, fallback = FALLBACK_COVER): string {
  return b.bookCoverImage?.url_secura?.trim() || fallback;
}
