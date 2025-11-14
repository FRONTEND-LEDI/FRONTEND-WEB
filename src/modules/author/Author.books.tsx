
    import { CircleChevronDown } from 'lucide-react';
import { useLocation } from "wouter"; // ← Agregar esta importación

export interface Book {
  _id: string;
  title: string;
  summary: string;
  synopsis: string;
  bookCoverImage?: {
    url_secura: string;
  };
}

export interface AuthorBooksProps {
  author: Author;
  books: Book[];
}

export function AuthorBooks({ author, books }: AuthorBooksProps) {
  const [, setLocation] = useLocation(); // ← Hook para navegación
  
  if (!books || books.length === 0) return null;

  // Función corregida que recibe el bookId
  const handleReadBook = (bookId: string) => {
    setLocation(`/libro/${bookId}`); // ← Usar el ID real del libro
  };

  return (
    <div className=" ">
 <ul className="w-100 border-l-2 border-gray-200 border-0 border-b-transparent ">
        <li className="p-4 pb-2 text-xs  opacity-80 tracking-wide">
          Libros de {author.name}
        </li>

        {books.map((book) => (
          <li
            key={book._id}
            className="list-row flex flex-col md:flex-row gap-4  border-gray-200 border-0 p-4 border-b"
          >
            {/* Imagen de portada */}
            <div className="flex-shrink-0">
              <img
                className="w-16 h-24 rounded-lg object-cover"
                src={book.bookCoverImage?.url_secura}
                alt={book.title}
              />
            </div>

            {/* Datos del libro */}
            <div className="flex-1">
              <div className="font-bold text-sm md:text-base">{book.title}</div>
              <p className="text-xs line-clamp-2 mt-1">{book.synopsis}</p>
              
              <div className=" flex-row md:justify-center flex items-center 
                  gap-1
                  px-2
                  
                    bg-primary 
                    text-white font-light
                    rounded-lg 
                    shadow-md 
                    text-xs
                    cursor-pointer 
                    
                    hover:bg-primary/90 w-20 h-8
                    transition-colors md:items-end  md:mt-1"
                    >
                <div className="flex w-full flex-col lg:flex-row">
                <button
                  onClick={() => handleReadBook(book._id)} 
                  title="Leer libro"
                  className="px-2 py-1 cursor-pointer"
                >Leer 
                </button>
              
  <div className="divider lg:divider-horizontal m-0 mt-2 "></div>

  <div className="dropdown dropdown-bottom">
  <div tabIndex={0} role="button" className="btn m-0 py-0 px-0 border-0 flex justify-center items-center bg-transparent shadow-none ml-1 w-4 text-white">
    <CircleChevronDown />
  </div>
  <ul tabIndex={0} className="dropdown-content menu bg-primary text-white rounded-box z-1 w-42 ">
    <li><a>Guardar en lista</a></li>
    <li><a>Leyendo</a></li>
    <li><a>Terminado</a></li>
  </ul>
</div>
              </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
{/* <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-start mt-20 px-4">
  {/* Columna 1: Autor */}
  // <div className="flex-1 max-w-3xl">
    {/* contenido autor */}
  // </div>

  {/* Columna 2: Libros */}
  // <div className="w-full md:w-96">
  //   <AuthorBooks author={author} books={books} />
  // </div>
// </div> */}
