import { useEffect, useState } from "react";
import Navbar from "../../common/components/navbar";
import { getAuthors } from "../../db/services/author";
import { Link } from "wouter";
import { Letras } from "./Author.concurso";
import Footer from "../../common/components/Footer";
import type { Author } from "../../types/author";

export function Author() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuthors()
      .then((res) => {
        setAuthors(res.result);
      })
      .catch((error) => {
        console.error("Error al cargar autores:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-fund">
      
<div className="pt-28 pb-12 px-6 text-center ">
  {/* Contenido central */}
  <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-4">
    Antología de Autores Formoseños
  </h1>
  <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-6">
    Descubrí las voces que dan vida a la literatura formoseña y forma parte de las próximas ediciones
  </p>

 
</div>


        {/* Grid de autores */}
        <div className="px-6 mt-10 pb-16">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : authors.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No hay autores registrados aún
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-6xl mx-auto">
              {authors.map((author) => (
                <div
                  key={author._id}
                  className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Imagen */}
                  <figure className="aspect-square w-full overflow-hidden bg-gray-200">
                    <img
                      src={author.avatar.url_secura}
                      alt={`Foto de ${author.fullName}`}
                      className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </figure>

                  {/* Info */}
                  <div className="card-body p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="card-title text-lg font-bold text-gray-800 flex-1">
                        {author.fullName}
                      </h2>
                     
                    </div>


             {author.writingGenre && author.writingGenre.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {author.writingGenre.map((genre: string, i: number) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                  {author.biography && (
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {author.biography}
                  </p>
                )}
                    

                
                    <div className="card-actions justify-end mt-auto">
                      <Link 
                        href={`/authors/${author._id}`}
                        
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 group/btn"
                  
                    >
                        Ver Biografía
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="py-16 px-6">
<div className="divider divider-secondary font-semibold text-primary">
  ¿Cómo ser autor de las proximas antologias?
</div>
          <Letras />
        </div>
      </main>

      <Footer />
    </div>
  );
}
