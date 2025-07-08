import { useState } from "react";
import { registerUser } from "../../db/services/auth";
import { Link, useLocation } from 'wouter';


export default function Test() {
type DialogProps = {
  dialog: string;
};
// estados para almacenar selecciones
const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
const [selectedAvatar, setSelectedAvatar] = useState<string>("");

const dialog: DialogProps[] = [
  { dialog: "Hola, soy tu bibliotecario virtual personal!" },
  { dialog: "Si gustás te realizaré unas series de preguntas que me ayudarán a darte una mejor experiencia." },
  { dialog: "Elegí al menos 3 opciones de tu género favorito" },
  { dialog: "Elegí al menos 3 opciones de tu formato de libro favorito" },
  { dialog: "¡Elegí tu avatar!" }
];

const handleCompleteRegistration = async () => {
  const saved = localStorage.getItem("registroPendiente");
  if (!saved) {
    alert("No se encontraron los datos del registro. Por favor volvé al formulario.");
    navigate("/registro");
    return;
  }  
  const userForm = JSON.parse(saved);
  const dataToSend = {
    ...userForm,
    avatar: selectedAvatar || "https://example.com/default-avatar.png",
    preference: {
      category: selectedGenres.length >= 3 ? selectedGenres : ["general"],
      language: "es"
    }
  };
  console.log("Datos que se enviarán al backend:", dataToSend);
  
  try {

    const res = await registerUser(dataToSend);
    alert("Cuenta creada con éxito: " + res.msg);
    localStorage.removeItem("pendingRegistration");
    navigate("/home");
  } catch (error) {
    alert("Ocurrió un error al registrar. Revisá tus datos.");
    }
  
  };
  const handleNext = () => {
    if (progressSteps < dialog.length - 1) {
      setProgressSteps(progressSteps + 1);
    }
  };

  const [progressSteps, setProgressSteps] = useState(0);
  const [, navigate ] = useLocation();




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
       <Link href="/home" onClick={handleCompleteRegistration} className="text-sm underline text-gray-500 cursor-pointer">
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
              <div onClick={() => {
                  setSelectedGenres(prev => 
                    prev.includes("Fantasía") ? prev.filter(g => g !== "Fantasía") : [...prev, "Fantasía"]
                  );
                }} className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar1.png" alt="Fantasía" className="rounded-lg  h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Fantasía</p>
              </div>
              <div onClick={() => {
                  setSelectedGenres(prev => 
                    prev.includes("Terror") ? prev.filter(g => g !== "Terror") : [...prev, "Terror"]
                  );
                }} className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar1.png" alt="Terror" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Terror</p>
              </div>
              <div onClick={() => {
                  setSelectedGenres(prev => 
                    prev.includes("Romance") ? prev.filter(g => g !== "Romance") : [...prev, "Romance"]
                  );
                }} className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar1.png" alt="Romance" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Romance</p>
              </div>
              <div onClick={() => {
                  setSelectedGenres(prev => 
                    prev.includes("Aventura") ? prev.filter(g => g !== "Aventura") : [...prev, "Aventura"]
                  );
                }} className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar1.png" alt="Aventura" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Aventura</p>
              </div>
              <div onClick={() => {
                  setSelectedGenres(prev => 
                    prev.includes("Nostalgico") ? prev.filter(g => g !== "Nostalgico") : [...prev, "Nostalgico"]
                  );
                }} className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar1.png" alt="Aventura" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Nostalgico</p>
              </div>
               <div onClick={() => {
                  setSelectedGenres(prev => 
                    prev.includes("Psicologico") ? prev.filter(g => g !== "Psicologico") : [...prev, "Psicologico"]
                  );
                }} className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar1.png" alt="Aventura" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Psicologico</p>
              </div>
            
            </>
          )}

          {progressSteps === 3 && (
            <>
              <div onClick={() => {
                  setSelectedFormats(prev => 
                    prev.includes("Poema") ? prev.filter(g => g !== "Poema") : [...prev, "Poema"]
                  );
                }} className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar1.png" alt="Libro físico" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Poema</p>
              </div>
              <div onClick={() => {
                  setSelectedFormats(prev => 
                    prev.includes("Cuento Narrativo") ? prev.filter(g => g !== "Cuento Narrativo") : [...prev, "Cuento Narrativo"]
                  );
                }} className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar1.png" alt="E-book" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Cuento Narrativo</p>
              </div>
              <div onClick={() => {
                  setSelectedFormats(prev => 
                    prev.includes("Audiolibro") ? prev.filter(g => g !== "Audiolibro") : [...prev, "Audiolibro"]
                  );
                }} className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar1.png" alt="Audiolibro" className="rounded-lg shadow h-40 w-50 object-cover" />
                <p className="mt-2 font-semibold">Audiolibro</p>
              </div>
            </>
            
          )}


          {progressSteps === 4 && (
            <>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar1.png" onClick={() => setSelectedAvatar("/public/avatars/avatar1.png")} className={`rounded-lg cursor-pointer h-40 w-50 object-cover ${selectedAvatar === "/public/avatars/avatar1.png" ? 'ring-4 ring-primary' : ''}`} />
                
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar2.png" onClick={() => setSelectedAvatar("/public/avatars/avatar2.png")} className={`rounded-lg cursor-pointer h-40 w-50 object-cover ${selectedAvatar === "/public/avatars/avatar2.png" ? 'ring-4 ring-primary' : ''}`} />
                
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar3.png" onClick={() => setSelectedAvatar("/public/avatars/avatar3.png")} className={`rounded-lg cursor-pointer h-40 w-50 object-cover ${selectedAvatar === "/public/avatars/avatar3.png" ? 'ring-4 ring-primary' : ''}`} />
                
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar4.png" onClick={() => setSelectedAvatar("/public/avatars/avatar4.png")} className={`rounded-lg cursor-pointer h-40 w-50 object-cover ${selectedAvatar === "/public/avatars/avatar4.png" ? 'ring-4 ring-primary' : ''}`} />
                
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar5.png" onClick={() => setSelectedAvatar("/public/avatars/avatar5.png")} className={`rounded-lg cursor-pointer h-40 w-50 object-cover ${selectedAvatar === "/public/avatars/avatar5.png" ? 'ring-4 ring-primary' : ''}`} />
                
              </div>
              <div className="text-center cursor-pointer hover:scale-105 transition">
                <img src="/public/avatars/avatar6.png" onClick={() => setSelectedAvatar("/public/avatars/avatar6.png")} className={`rounded-lg cursor-pointer h-40 w-50 object-cover ${selectedAvatar === "/public/avatars/avatar6.png" ? 'ring-4 ring-primary' : ''}`} />
                
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
    onClick={() => {
      if (progressSteps === dialog.length - 1) {
      handleCompleteRegistration();
    } else {
      handleNext();
    }}
    }
    className="bg-primary text-white font-bold py-2 px-6 cursor-pointer rounded"
  >
    {progressSteps === dialog.length - 1 ? "Finalizar Registro" : "Continuar"}
  </button>
</div>

    </div>
  );
}
