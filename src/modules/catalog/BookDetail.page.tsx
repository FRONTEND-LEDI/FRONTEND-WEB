import React, { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';  
import Navbar from '../../common/components/navbar';
import Footer from '../../common/components/Footer';

interface BookDetail {
  _id: string;
  title: string;
  author: string[];
  synopsis: string;
  bookCoverImage: {
    url_secura: string;
  };
}

const BookDetailPage: React.FC = () => {
  const [, params] = useRoute('/libro/:id');
  const { id } = params || {};  
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!id) return;
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:3402/book/${id}`);
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Cargando...</p>;
  if (!book) return <p className="text-center mt-8">Libro no encontrado</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto p-4">
        <img 
          src={book.bookCoverImage.url_secura || 'https://via.placeholder.com/400x600'} 
          alt={book.title} 
          className="w-full max-h-96 object-cover rounded-lg mb-4" />
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-lg text-gray-700 mb-4">{book.author.join(', ') || 'Autor Desconocido'}</p>
        <p className="text-gray-600 mb-6">{book.synopsis}</p>

        <Link 
          href={`/lectura/${id}`} 
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg">
          Leer ahora
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default BookDetailPage;