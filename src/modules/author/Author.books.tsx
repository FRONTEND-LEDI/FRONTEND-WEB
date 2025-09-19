import { Author } from "./Author.page";
import { getBookbyAuthorId } from "../../db/services/author";

export interface AuthorBooksProps {
  author: Author;

}


export function AuthorBooks({ author }: AuthorBooksProps) {
  if (!author || !author.books) return null;


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Libros de {author.name}
        </li>

        {author.books.map((book, index) => (
          <li key={index} className="list-row flex flex-col md:flex-row gap-4 p-4 border-b">
            <div className="flex-shrink-0">
              <img
                className="w-24 h-36 rounded-lg object-cover"
                src={book.coverUrl}
                alt={book.title}
              />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm md:text-base">{book.title}</div>
              {book.subtitle && (
                <div className="text-xs uppercase font-semibold opacity-60">
                  {book.subtitle}
                </div>
              )}
              <p className="text-xs mt-2">{book.description}</p>
            </div>
            <div className="flex flex-col gap-2 md:justify-start md:items-end mt-2 md:mt-0">
              <button className="btn btn-square btn-ghost">
                {/* Icono de reproducir / leer */}
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3L20 12 6 21 6 3z"></path>
                </svg>
              </button>
              <button className="btn btn-square btn-ghost">
                {/* Icono de favorito */}
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}