export interface Book {
  _id: string;
  title: string;
  author: string[];
  bookCoverImage?: { url_secura?: string };
  summary?: string;
  synopsis?: string;
  subgenre?: string[];
  yearBook?: string;
  contentBook?: { url_secura?: string };
  totalPages?: number;
  genre?: string;
  level?: string;
  format?: "ebook" | "audio" | "video";
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
