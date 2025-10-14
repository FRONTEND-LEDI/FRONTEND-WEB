import introJs from "intro.js";
import "intro.js/introjs.css";

export default function TourNavbar() {
  const startTour = () => {
    introJs()
      .setOptions({
        steps: [
          { element: "#Inicio", intro: "Aquí puedes volver al inicio." },
          { element: "#Catalogo", intro: "Aquí puedes explorar el catálogo de libros." },
          { element: "#ClubDeLectura", intro: "Únete al Club de Lectura." },
          { element: "#Bibliogames", intro: "Juega en la sección BiblioGames." },
          { element: "#Autores", intro: "Descubre tus autores favoritos." }
        ]
      })
      .start();
  };

  return (
    <button 
      onClick={startTour} 
      className="ml-4 px-3 py-1 rounded bg-primary text-white"
    >
      Iniciar Tour
    </button>
  );
}
