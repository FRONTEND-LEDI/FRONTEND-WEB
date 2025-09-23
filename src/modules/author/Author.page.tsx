import { useEffect, useState } from "react";
import Navbar from "../../common/components/navbar";
import { getAuthors } from "../../db/services/author";
import { Link } from "wouter";

export interface Author {
  _id: string;
  name: string;
  biography: string;
  avatar: {
    id_image: string;
    url_secura: string;
  };
}

export function Author() {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    getAuthors().then((res) => {
      setAuthors(res.result);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6 mt-18 h-full bg-fund">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">
          Autores
        </h1>

        <div className="flex flex-wrap  justify-center gap-8">
          {authors.map((author) => (
            <div
              key={author._id}
              className="card backdrop-blur-sm shadow-lg rounded-xl  w-72 overflow-hidden hover:shadow-2xl transition-all "
            >
              {/* Imagen */}
              <figure className="h-70 w-72">
                <img
                  src={author.avatar.url_secura}
                  alt={author.name}
                  className="w-full h-full object-cover shadow-lg"
                />
              </figure>

              {/* Info */}
              <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold text-primary flex items-center gap-2">
                  {author.name}
                  <span className="badge badge-secondary backdrop-blur-sm">Autor</span>
                </h2>

                <p className="text-sm text-gray-600 line-clamp-1">
                  {author.biography}
                </p>

                {/* Botón con Link */}
                <div className="card-actions justify-end mt-3">
                  <Link href={`/authors/${author._id}`}>
                    <button className="btn btn-sm bg-primary text-white hover:bg-primary-focus rounded-lg shadow-md">
                      Ver Biografia
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
