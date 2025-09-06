export type AuthorItem = { _id: string; name: string } | string;
export type NormalizedAuthor = { id?: string; name: string };


export interface Book {
  _id: string;
  title: string;
  author: AuthorItem[];
  bookCoverImage?: { url_secura?: string };
  summary?: string;
  synopsis?: string;
  subgenre?: string[];
  theme?: string[];
  yearBook?: string;
  contentBook?: { url_secura?: string };
  totalPages?: number;
  genre?: string;
  level?: string;
  format?: "ebook" | "audiobook" | "videobook";
}

export type ProgressStatus = "reading" | "finished" | "paused";

export interface BookProgress {
  _id: string;
  idUser: string;
  idBook: string;
  currentPage: number;
  status: ProgressStatus;
  startDate?: string;
  lastReadAt?: string;
  completedAt?: string | null;
  __v?: number;
}

