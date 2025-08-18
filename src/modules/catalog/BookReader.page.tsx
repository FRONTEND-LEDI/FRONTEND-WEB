import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import PDFViewer from "../../common/components/books/PDFViewer";
import { useAuth } from "../../context/AuthContext";
import type { Book } from "../../types/books";

const BookReaderPage: React.FC = () => {
  const [, params] = useRoute("/lectura/:id");
  const { id } = params || {};
  const { token } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:3402/book/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "x-client": "web",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        });
        if (!res.ok) throw new Error("No se pudo obtener el libro");
        const data: Book = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-fund">
        <main className="flex-1 w-full flex justify-center items-center">
          <p>Cargando…</p>
        </main>
      </div>
    );
  }

  const pdfUrl = book?.contentBook?.url_secura;

  return (
    <div className="flex flex-col min-h-screen bg-fund">
      <main className="flex-1 w-full flex justify-center">
        {pdfUrl ? (
          <PDFViewer pdfUrl={pdfUrl} />
        ) : (
          <p className="mt-8">Libro no encontrado o sin contenido</p>
        )}
      </main>
    </div>
  );
};

export default BookReaderPage;
