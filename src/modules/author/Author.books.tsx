import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getBookbyAuthorId } from "../../db/services/author";
import type { Book } from "../../types/books";
import type  { Author } from "../../types/author";
import { useLocation } from "wouter";
interface AuthorBooksProps {
  author: Author;
}

export function AuthorBooks({ author }: AuthorBooksProps) {
  const { token } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        setError("No hay token de autenticación.");
        setLoading(false);
        return;
      }

      try {
        const data = await getBookbyAuthorId(author._id, token);
        setBooks(data);
      } catch (err) {
        console.error("Error al obtener libros:", err);
        setError("No se pudieron cargar los libros.");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [author._id, token]);

  if (loading) return <p className="text-center py-4">Cargando libros...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;
  if (books.length === 0) return <p className="text-center py-4">No hay libros disponibles.</p>;

  const handleReadBook = (bookId: string) => setLocation(`/libro/${bookId}`);
  return (
    <div>
      <ul className="w-full border-l-2 border-gray-200">
        <li className="p-4 pb-2 text-xs opacity-80 tracking-wide">
          Libros de {author.fullName}
        </li>

        {books.map((book) => (
         <li
  key={book._id}
  className="list-row flex flex-col md:flex-row gap-4 p-4 border-b border-gray-200 cursor-pointer hover:bg-orange-100 transition-all duration-150"
  onClick={() => handleReadBook(book._id)}
>

            <div className="flex-shrink-0">
              <img
                className="w-16 h-24 rounded-lg object-cover"
                src={book.bookCoverImage?.url_secura}
                alt={book.title}
              />
            </div>
            

            <div className="flex-1">
              <div className="font-bold text-sm md:text-base">{book.title}</div>
              <p className="text-xs line-clamp-2 mt-1">{book.synopsis}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
