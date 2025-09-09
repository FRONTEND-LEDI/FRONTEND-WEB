import React, { useState } from "react";
import BookCard from "../../common/components/books/BookCard";
import Navbar from "../../common/components/navbar";
import Footer from "../../common/components/Footer";
import { useAuth } from "../../context/AuthContext";
// import SearchBar from "../../common/components/catalog/SearchBar";
import { useCatalogOptions } from "../../common/hooks/useCatalogOptions";
//import FiltersBar from "../../common/components/catalog/FiltersBar";
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
  const { years, genres, subgenres, formats } = useCatalogOptions(token);

  const { data, isLoading, error } = useBooks({ query, filters, token });
  const books = data ?? [];

  return (
    <div className="flex flex-col min-h-screen bg-fund">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto p-4 pt-23">
        {/* filtros y buscador */}
        <ImprovedFiltersBar
          years={years || []}
          genres={genres || []}
          subgenres={subgenres || []}
          formats={formats || []}
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
