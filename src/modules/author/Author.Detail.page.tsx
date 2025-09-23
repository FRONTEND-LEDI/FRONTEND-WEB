import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Navbar from "../../common/components/navbar";
import { getAuthorsbyId } from "../../db/services/author";
import { getBookbyAuthorId } from "../../db/services/author";
import { Author } from "./Author.page";
import { AuthorBooks } from "./Author.books";

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
   <div className="flex flex-col sm:flex-row lg:flex-row gap-8 w-full justify-center items-start mt-20 px-4">
  {/* Columna 1: Biografía del autor */}
  <div className=" mt-4 md:w-2/4 justify-center">
    <div className="flex gap-6">
      <div className="avatar">
        <div className="w-48 rounded-full">
          <img
            src={author.avatar.url_secura}
            alt={author.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>{author.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Fecha de nacimiento</th>
              <td>23-56-09</td>
            </tr>
            <tr className="hover:bg-base-300">
              <th>Trabajo</th>
              <td>Docente</td>
            </tr>
            <tr>
              <th>Géneros</th>
              <td>Romance, Amor, Nostalgia</td>
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
</div>
  );
 }
// <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-start mt-20 px-4">
//   {/* Columna izquierda: Autor (principal) */}
//   <div className="flex-1 w-full md:w-3/4">
//     {/* 👇 acá va todo el contenido del autor */}
//   </div>

//   {/* Columna derecha: Libros (sidebar chico) */}
//   <div className="w-full md:w-1/4">
//     <AuthorBooks author={author} books={books} />
//   </div>
// </div>


