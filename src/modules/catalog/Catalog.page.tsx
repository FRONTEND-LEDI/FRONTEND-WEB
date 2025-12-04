import React, { useState } from "react";
import BookCard from "../../common/components/books/BookCard";
import Navbar from "../../common/components/navbar";
import Footer from "../../common/components/Footer";
import { useAuth } from "../../context/AuthContext";
import { useCatalogOptions } from "../../common/hooks/useCatalogOptions";
import { emptyFilters, type FilterState } from "../../types/filters";
import { useBooks } from "../../common/hooks/useBooks";
import {
  normalizeAuthors,
  formatAuthorsForCard,
} from "../../common/utils/authorHelper";
import ImprovedFiltersBar from "../../common/components/catalog/ImprovedFilterBar";
import LoadingGate from "../../common/components/LoadingGate";

const CatalogPage: React.FC = () => {
  const { token } = useAuth();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const { years, genres, subgenres, formats, authors } =
    useCatalogOptions(token);

  const { data, isLoading, error } = useBooks({ query, filters, token });
  const books = data ?? [];

  return (
    <div className="flex flex-col min-h-screen bg-fund">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto p-4 pt-30 mb-10">
        {/* filtros y buscador */}
        <ImprovedFiltersBar
          years={years || []}
          genres={genres || []}
          subgenres={subgenres || []}
          formats={formats || []}
          authors={authors || []}
          filters={filters}
          onChange={setFilters}
          onSearch={setQuery}
        />

        {isLoading ? (
          <LoadingGate message="Cargando los libros…" />
        ) : error ? (
          <div className="flex justify-center items-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <span>Error! No se pudieron cargar los libros.</span>
            </div>
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-16 px-4">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8 max-w-md text-center shadow-lg">
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-orange-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No se encontraron libros
              </h3>
              <p className="text-gray-600 text-sm">
                {query
                  ? `No hay resultados para "${query}"`
                  : "Intenta ajustar los filtros o realizar una búsqueda diferente"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
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
                    "/portada-no-disponible.png"
                  }
                  format={book.format}
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
