
import type { StepType, StylesObj } from "@reactour/tour";

// Pasos del tour con personalidad de bibliotecario
export const tourSteps: StepType[] = [
  {
    selector: "#Inicio",
    content: "Este botón te llevará al inicio de la biblioteca. Siempre es bueno saber dónde estamos.",
    position: 'bottom',
  },
  {
    selector: "#Catalogo",
    content: "Aquí puedes explorar nuestro extenso catálogo de libros. Busca por título, autor o género. ¡Te ayudaré a encontrar lecturas interesantes!",
    position: 'bottom',
  },
  {
    selector: "#ClubDeLectura",
    content: "Únete al Club de Lectura. Los lectores comparten opiniones y reflexiones. Aprender de otros y compartir tus ideas es parte del placer de leer.",
    position: 'bottom',
  },
  {
    selector: "#Bibliogames",
    content: "En BiblioGames encontrarás diversión mientras aprendes. Juegos diseñados para ejercitar la mente y descubrir nuevas historias.",
    position: 'bottom',
  },
  {
    selector: "#Autores",
    content: "Descubre la vida y obra de tus autores favoritos. Sigue a los que más te gusten para no perderte sus novedades.",
    position: 'bottom',
  },
  {
    selector: "#Recomendaciones",
    content: "Aquí te mostraré libros que podrían interesarte. Piensa en mí como tu guía personal para encontrar joyas literarias.",
    position: 'bottom',
  },
  {
    selector: "#SeguirLeyendo",
    content: "Si dejaste un libro a mitad, aquí puedes continuar exactamente desde donde lo dejaste. Yo me encargo de que no pierdas el hilo de la historia.",
    position: 'bottom',
  },
  {
    selector: "#Chat",
    content: "Si tienes preguntas o dudas, este es tu lugar. Escríbeme y te ayudaré como lo haría un bibliotecario en persona.",
    position: 'top',
  }
];

// Estilos personalizados del tour
export const tourStyles: StylesObj = {
  popover: (base) => ({
    ...base,
    backgroundColor: '#fff8f0', // color cálido tipo biblioteca
    color: '#333',
    padding: '20px',
    borderRadius: '12px',
    fontFamily: '"Georgia", serif',
    fontSize: '16px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    border: '#d97706'
  }),
  badge: (base) => ({
    ...base,
    backgroundColor: '#d97706', 
    color: '#fff',
  }),
  close: (base) => ({
    ...base,
    color: '#d97706',
    fontSize: '20px',
  }),
  mask: (base) => ({
    ...base,
    backgroundColor: 'rgba(0,0,0,0.4)',
  }),
  nextButton: (base) => ({
    ...base,
    backgroundColor: '#d97706',
    color: '#fff',
    borderRadius: '8px',
    padding: '8px 16px',
    fontWeight: 'bold',
  }),
  prevButton: (base) => ({
    ...base,
    backgroundColor: '#f3f3f3',
    color: '#333',
    borderRadius: '8px',
    padding: '8px 16px',
    fontWeight: 'bold',
    border: '1px solid #d97706',
  }),
};
