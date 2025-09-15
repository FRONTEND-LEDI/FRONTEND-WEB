import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Navbar from "../../common/components/navbar";
import {  getAuthorsbyId } from "../../db/services/author";
import { Author } from "./Author.page";


 function capitalizeSentence(text: string) {
  if (!text) return "";
  text = text.trim();
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
export function AuthorDetail() {
const [, params] = useRoute<{ id: string }>("/authors/:id");
const id = params?.id;
  const [author, setAuthor] = useState<Author | null>(null);


 useEffect(() => {
    if (id) {
      getAuthorsbyId(id).then((res) => {
        setAuthor(res); 
      });
    }
  }, [id]);

  if (!author) return <div className="p-6">Cargando autor...</div>;
  
// const birthYearMatch = author.biography.match(/nacido en (\d{4})/i);
// const birthYear = birthYearMatch ? birthYearMatch[1] : null;
  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-3xl mt-20 mx-auto bg-fund">
<div className="flex  row gap-6">
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
    {/* head */}
    <thead>
      <tr>
        <th>{author.name}</th>
     
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>fecha de nacimiento</th>
        <td>23-56-09</td>
        
      </tr>
      {/* row 2 */}
      <tr className="hover:bg-base-300">
        <th>Trabajo</th>
        <td>Docente</td>
       
      </tr>
      <tr>
        <th>Generos</th>
        <td>Romance, Amor, Nostalgia</td>
      </tr>
    </tbody>
  </table>
</div>
    {/* <h1 className="text-3xl font-bold mt-4">{author.name}</h1>
      <div className="divider"></div>

    {birthYear && <p className="font-semibold">Año de nacimiento: {birthYear}</p>} */}

</div>
       <div className="mt-4 text-lg leading-relaxed">
  {author.biography.split('\n').map((p, i) => (
    <p key={i} className="mb-4 indent-8">{capitalizeSentence(p)}</p>
  ))}
</div>

    </div>
   
    </div>
  );
}
