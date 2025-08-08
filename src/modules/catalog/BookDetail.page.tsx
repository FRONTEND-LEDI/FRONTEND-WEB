import React, { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import Navbar from "../../common/components/navbar";
import Footer from "../../common/components/Footer";

interface BookDetail {
  _id: string;
  title: string;
  author: string[];
  synopsis: string;
  subgenre: string[];
  bookCoverImage: {
    url_secura: string;
  };
}

const BookDetailPage: React.FC = () => {
  const [, params] = useRoute("/libro/:id");
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
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Cargando...</p>;
  if (!book) return <p className="text-center mt-8">Libro no encontrado</p>;

  return (
    <div className="flex flex-col min-h-screen bg-fund">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-23">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Imagen */}
          <img
            src={
              book.bookCoverImage.url_secura ||
              "https://via.placeholder.com/400x600"
            }
            alt={book.title}
            className="w-full max-w-xs md:w-1/3 object-cover rounded-lg shadow-md"
          />

          {/* Contenido */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-lg text-gray-700 mb-2">
              {book.author.join(", ") || "Autor Desconocido"}
            </p>

            {/* Subgéneros */}
            <div className="flex flex-wrap gap-2 mb-4">
              {book.subgenre?.map((genre, i) => (
                <span
                  key={i}
                  className="bg-secondary text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Sinopsis */}
            <p className="text-gray-600 mb-6">{book.synopsis}</p>

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/lectura/${id}`}
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Leer
              </Link>
              <button
                disabled
                className="bg-yellow-100 text-yellow-600 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
                title="Función no disponible aún"
              >
                Escuchar
              </button>
              <button
                disabled
                className="bg-yellow-100 text-yellow-600 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
                title="Función no disponible aún"
              >
                Ver video
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookDetailPage;
