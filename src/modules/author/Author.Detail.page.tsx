import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Navbar from "../../common/components/navbar";
import { getAuthorsbyId } from "../../db/services/author";
import { getBookbyAuthorId } from "../../db/services/author";
import { AuthorBooks } from "./Author.books";
import Footer from "../../common/components/Footer";
import type { Author } from "../../types/author";
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

  useEffect(() => {
    if (id) {
      // obtener autor
      getAuthorsbyId(id).then((res) => {
        setAuthor(res);
      });

      // obtener libros del autor
      getBookbyAuthorId(id).then((res) => {
        setBooks(res);
      });
    }
  }, [id]);

  if (!author) return <div className="p-6">Cargando autor...</div>;

  return (
    <div >
        <Navbar/>
   <div className="flex flex-col sm:flex-row lg:flex-row gap-8 w-full justify-center items-start mt-18 px-4">
  {/* Columna 1: Biografía del autor */}
  <div className=" mt-4 md:w-2/4 justify-center">
    <div className="flex gap-6">
      <div className="avatar">
        <div className="w-48 rounded-full">
          <img
            src={author.avatar.url_secura}
            alt={author.fullName}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-bold text-black">
            <tr>
              <th>{author.fullName}</th>
            </tr>
          </thead>
          <tbody className="text-xs text-gray-500">
            <tr>
              <th>Fecha de nacimiento</th>
              <td>{author.birthdate}</td>
            </tr>
            <tr className="hover:bg-base-300">
              <th>Trabajo</th>
              <td>{author.profession}</td>
            </tr>
            <tr>
              <th>Géneros</th>
              <td className="gap-2" >{author.writingGenre}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="mt-4 text-lg leading-relaxed">
      {author.biography.split("\n").map((p, i) => (
        <p key={i} className="mb-4 indent-8">
          {capitalizeSentence(p)}
        </p>
      ))}
    </div>
  </div>

  {/* Columna 2: Libros del autor */}
  <div className="w-1/4">
    <AuthorBooks author={author} books={books} />
  </div>
</div>
<Footer />
</div>
  );
 }



