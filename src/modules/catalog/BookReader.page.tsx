import { useState, useEffect } from "react";
import { useRoute } from "wouter";

import PDFViewer from "../../common/components/books/PDFViewer";

const BookReaderPage: React.FC = () => {
  const [, params] = useRoute('/lectura/:id');
  const { id } = params || {};

  const [ book, setBook ] = useState<any>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const rest = await fetch(`http://localhost:3402/book/${id}`);
        const data = await rest.json();
        setBook(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        
      }
    }
    if (id) fetchBook();

  }, [id]);

  const pdfUrl = book?.contentBook?.url_secura;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lector de Libro</h1>
        {pdfUrl ? <PDFViewer pdfUrl={pdfUrl} /> : <p>Libro no encontrado o sin contenido</p>}
      </main>
    </div>
  );
};

export default BookReaderPage;
