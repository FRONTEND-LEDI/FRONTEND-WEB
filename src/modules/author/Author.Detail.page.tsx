import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Navbar from "../../common/components/navbar";
import { getAuthorsbyId, getBookbyAuthorId } from "../../db/services/author";
import { AuthorBooks } from "./Author.books";
import Footer from "../../common/components/Footer";
import type { Author } from "../../types/author";
import { formatDateAvoidTimezone } from "../../common/utils/date";

function capitalizeSentence(text: string) {
  if (!text) return "";
  text = text.trim();
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function AuthorDetail() {
  const [, params] = useRoute<{ id: string }>("/authors/:id");
  const id = params?.id;

  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([
        getAuthorsbyId(id).then(setAuthor),
        getBookbyAuthorId(id).then(setBooks),
      ]).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  if (!author) return null;

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-8 pt-32 pb-16">
        {/* Header + Bio + Libros */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16 pb-12 border-b border-base-300">
          {/* Columna izquierda: Avatar + Info + Biografía */}
          <div className="lg:col-span-2 flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-shrink-0">
              <img
                src={author.avatar.url_secura}
                alt={author.fullName}
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full"
              />
            </div>

            <div className="flex-1 space-y-6">
              {/* Info */}
              <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                {author.fullName}
              </h1>

              <div className="space-y-3 text-gray-600">
                <p className="text-lg">{author.profession}</p>
                {author.birthdate && (
                  <p className="text-sm">
                    {formatDateAvoidTimezone(author.birthdate)}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {author.writingGenre.map((genre: string, i: number) => (
                  <span
                    key={i}
                    className="text-sm px-3 py-1 bg-base-200 rounded-full text-gray-700"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Biografía */}
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed mt-6">
                <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
                  Biografía
                </h2>
                {author.biography.split("\n").map((paragraph, i) => (
                  <p key={i} className="text-justify">
                    {capitalizeSentence(paragraph)}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha: Libros */}
          <div className="lg:col-span-1">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
              Obras
            </h2>
            <AuthorBooks author={author} books={books} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
