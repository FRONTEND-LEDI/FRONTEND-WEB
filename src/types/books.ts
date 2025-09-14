export type AuthorItem = { _id: string; name: string } | string;
export type NormalizedAuthor = { id?: string; name: string };

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
}

export type AdminCreateBookInput = {
  title: string;
  author: string[]; // ids
  summary: string;
  subgenre: string[];
  language: string;
  available: boolean;
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
};
