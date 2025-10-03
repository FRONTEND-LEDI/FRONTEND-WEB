export type Books = {
  id: string;
  title: string;
  author: string;
  bookCoverImage: string;
  format?: "ebook" | "audiobook" | "videobook";
}