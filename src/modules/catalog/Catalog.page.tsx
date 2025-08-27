import React, { useState } from "react";
import BookCard from "../../common/components/books/BookCard";
import Navbar from "../../common/components/navbar";
import Footer from "../../common/components/Footer";
import { useAuth } from "../../context/AuthContext";
import SearchBar from "./SearchBar";
import { useBooks } from "../../common/hooks/useBooks";
import {
  normalizeAuthors,
  formatAuthorsForCard,
} from "../../common/utils/authorHelper";

const CatalogPage: React.FC = () => {
  const { token } = useAuth();
  const [query, setQuery] = useState("");
  const { data, isLoading, error } = useBooks(query, token);
  const books = data ?? [];

  return (
    <div className="flex flex-col min-h-screen bg-fund">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto p-4 pt-23">
        <SearchBar onSearch={setQuery} />
        {/* Acá van ir los filtros después */}

        {isLoading ? (
          <p className="text-center">Cargando libros...</p>
        ) : error ? (
          <p className="text-center text-red-500">
            No se pudieron cargar los libros.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.map((book) => {
              const authors = normalizeAuthors(book.author);
              const authorLabel = formatAuthorsForCard(authors);

              return (
                <BookCard
                  key={book._id}
                  id={book._id}
                  title={book.title}
                  author={authorLabel}
                  bookCoverImage={
                    book.bookCoverImage?.url_secura ||
                    "https://via.placeholder.com/150"
                  }
                />
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CatalogPage;
