import React, { useEffect, useState } from "react";
import { getAllBooks, getBooksByQuery } from "../../db/services/books";
import BookCard from "../../common/components/books/BookCard";
import Navbar from "../../common/components/navbar";
import Footer from "../../common/components/Footer";
import { useAuth } from "../../context/AuthContext";
import SearchBar from "./SearchBar";

interface Book {
  _id: string;
  title: string;
  author: string[];
  bookCoverImage: {
    url_secura: string;
  };
}

const CatalogPage: React.FC = () => {
  const { token } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks(token);
        setBooks(data);
      } catch (err) {
        setError("No se pudieron cargar los libros");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [token]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      let results;

      if (query.trim() === "") {
        // Si no hay texto, traer todos los libros
        results = await getAllBooks(token);
      } else {
        // Buscar por query
        results = await getBooksByQuery(query, token);
        console.log("query:", query);
        console.log("Resultados de búsqueda:", results);
        
        
      }

      setBooks(results);
    } catch {
      setError("Ocurrió un error al buscar libros.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-fund">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto p-4 pt-23">
        {/*<h1 className="text-2xl font-bold mb-4">Catálogo de Libros</h1>*/}

        <SearchBar onSearch={handleSearch} />
        {/* Acá van ir los filtros después */}

        {loading ? (
          <p className="text-center">Cargando libros...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.map((book) => (
              <BookCard
                key={book._id}
                id={book._id}
                title={book.title}
                author={book.author[0] || "Autor desconocido"}
                bookCoverImage={
                  book.bookCoverImage?.url_secura ||
                  "https://via.placeholder.com/150"
                }
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CatalogPage;
