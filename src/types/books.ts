export interface Book {
  _id: string;
  title: string;
  author: string[];
  bookCoverImage: {
    url_secura: string;
  };
}
