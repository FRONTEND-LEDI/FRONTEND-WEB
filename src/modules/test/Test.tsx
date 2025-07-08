import { useState } from "react";
import { Link } from 'wouter';

type DialogProps = {
  dialog: string;
};

const dialog: DialogProps[] = [
  { dialog: "Hola, soy tu bibliotecario virtual personal!" },
  { dialog: "Si gustás te realizaré unas series de preguntas que me ayudarán a darte una mejor experiencia." },
  { dialog: "Elegí al menos 3 opciones de tu género favorito" },
  { dialog: "Elegí al menos 3 opciones de tu formato de libro favorito" },
  { dialog: "¡Elegí tu avatar!" }
];

export default function Test() {
  const [progressSteps, setProgressSteps] = useState(0);

  const handleNext = () => {
    if (progressSteps < dialog.length - 1) {
      setProgressSteps(progressSteps + 1);
    }

  };
  const handleBack = ()=>{
    if (progressSteps > 0) {
    setProgressSteps(progressSteps - 1);
  }
  }

  return (
    <div className="flex justify-center items-center flex-col min-h-screen  ">
    <div className="w-full flex justify-center items-start fixed top-5 z-0 ">
      <ul className="steps steps-horizontal w-150 lg:steps-horizontal">
        {dialog.map((_, index) => (
          <li
            key={index}
            data-content={index + 1}
            className={`step ${index <= progressSteps ? "step-primary" : ""}`}
          >
          
          </li>
        ))}
      </ul>
       <Link href="/home" className="text-sm underline text-gray-500 cursor-pointer">
       Omitir
       </Link>
        </div>
   
      <div
  id="dialog"
  className={`flex justify-center items-center w-150 botton-5 ${
    progressSteps > 2 ? "fixed top-20 z-0" : ""
  }`}
>
  <div className="w-32 h-32">
    <img
      src="/zorro-login.png"
      alt="avatar zorro"
      className="w-full h-full object-contain"
    />
  </div>

  <div className="chat chat-start">
    <div className="chat-bubble bg-secondary text-base-content">
      {dialog[progressSteps].dialog}
    </div>
  </div>
</div>

         <div className="w-150 flex justify-center ">
      {progressSteps >= 2 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {progressSteps === 2 && (
            <>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="" alt="Fantasía" className="rounded-lg  h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Fantasía</p>
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="" alt="Terror" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Terror</p>
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="" alt="Romance" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Romance</p>
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="" alt="Aventura" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Aventura</p>
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="" alt="Aventura" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Nostalgico</p>
              </div>
               <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="" alt="Aventura" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Psicologico</p>
              </div>
            
            </>
          )}

          {progressSteps === 3 && (
            <>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="" alt="Libro físico" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Poema</p>
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="" alt="E-book" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Cuento Narrativo</p>
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="" alt="Audiolibro" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Audiolibro</p>
              </div>
            </>
            
          )}


          {progressSteps === 4 && (
            <>
 <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src=""  className="rounded-lg cursor-pointer  h-40 w-50 object-cover" />
                
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="" className="rounded-lg shadow cursor-pointer h-40 w-50 object-cover" />
                
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="" className="rounded-lg shadow cursor-pointer h-40 w-50 object-cover" />
                
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src=""  className="rounded-lg shadow cursor-pointer h-40 w-50 object-cover" />
                
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="" className="rounded-lg shadow h-40 cursor-pointer w-50 object-cover" />
                
              </div>
               <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src=""  className="rounded-lg shadow h-40 w-50  cursor-pointer object-cover" />
                
              </div>
          </>
          )}
        
      </div>
        )}
          
    
      </div>

      <div className="flex gap-4 mt-4">
  {progressSteps > 0 && (
    <button
      onClick={handleBack}
      className="text-sm underline text-gray-500 font-bold py-2 px-6 cursor-pointer"
    >
      Atrás
    </button>
  )}

  <button
    onClick={handleNext}
    className="bg-primary text-white font-bold py-2 px-6 cursor-pointer rounded"
  >
    Continuar
  </button>
</div>

    </div>
  );
}
