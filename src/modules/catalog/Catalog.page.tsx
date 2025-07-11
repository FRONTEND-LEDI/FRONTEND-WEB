import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../../db/services/books';
import BookCard from '../../common/components/books/BookCard';
import Navbar from '../../common/components/navbar';
import Footer from '../../common/components/Footer';
import { useAuth } from '../../context/AuthContext';

interface Book {
  _id: string;
  title: string;
  author: string[]; // Por ahora es un array de IDs
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
        setError('No se pudieron cargar los libros');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Catálogo de Libros</h1>

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
                author={book.author[0] || 'Autor desconocido'}
                bookCoverImage={book.bookCoverImage?.url_secura || 'https://via.placeholder.com/150'}
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