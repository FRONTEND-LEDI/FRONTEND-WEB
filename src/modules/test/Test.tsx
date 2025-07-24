import { useState } from "react";
import { Link, useLocation } from 'wouter';
// separo la función de registro para mantener el código limpio
import { useCompleteRegistration } from "../../common/utils/registerHelper"; 


export default function Test() {
  const completeRegistration = useCompleteRegistration();
  const [, navigate ] = useLocation();

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

// avatars ramdoms para probar
const avatars = [
  "https://cdn-icons-png.flaticon.com/512/847/847969.png",
  "https://cdn-icons-png.flaticon.com/512/219/219969.png",
  "https://cdn-icons-png.flaticon.com/512/236/236831.png",
  "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
  "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
  "https://cdn-icons-png.flaticon.com/512/2922/2922511.png"
];

  const handleNext = () => {
    if (progressSteps < dialog.length - 1) {
      setProgressSteps(progressSteps + 1);
    }
  };

  const [progressSteps, setProgressSteps] = useState(0);

  const handleBack = ()=>{
    if (progressSteps > 0) {
    setProgressSteps(progressSteps - 1);
  }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-10 px-4">
      {/* Barra de pasos */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-8 relative">
        <ul className="steps w-full">
          {dialog.map((_, index) => (
            <li
              key={index}
              data-content={index + 1}
              className={`step ${index <= progressSteps ? "step-primary" : ""}`}
            />
          ))}
        </ul>
        <Link
          href="/home"
          onClick={() => completeRegistration(selectedGenres, selectedFormats, selectedAvatar, navigate)}
          className="absolute right-0 text-sm underline text-gray-500 cursor-pointer"
        >
          Omitir
        </Link>
      </div>

      {/* Zorro + Mensaje */}
      <div className="flex flex-row items-center text-center mb-8 space-y-4">
        <img
          src="/public/zorro-login.png"
          alt="Zorro"
          className="w-28 h-28 object-contain"
        />
        <div className="chat chat-start">
          <div className="chat-bubble bg-secondary text-base-content">
            {dialog[progressSteps].dialog}
          </div>
        </div>
      </div>

      {/* Opciones */}
      <div className="w-full max-w-5xl flex justify-center">
        {progressSteps >= 2 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Géneros */}
            {progressSteps === 2 &&
              ["Fantasía", "Terror", "Romance", "Aventura", "Nostalgico", "Psicologico"].map((genre) => (
                <div
                  key={genre}
                  onClick={() =>
                    setSelectedGenres((prev) =>
                      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
                    )
                  }
                  className={`text-center cursor-pointer hover:scale-105 transition rounded-lg p-2 ${
                    selectedGenres.includes(genre) ? "ring-4 ring-primary" : ""
                  }`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    alt={genre}
                    className="rounded-lg h-32 w-full object-cover mx-auto"
                  />
                  <p className="mt-2 font-semibold">{genre}</p>
                </div>
              ))}

            {/* Formatos */}
            {progressSteps === 3 &&
              ["Poema", "Cuento Narrativo", "Audiolibro"].map((format) => (
                <div
                  key={format}
                  onClick={() =>
                    setSelectedFormats((prev) =>
                      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
                    )
                  }
                  className={`text-center cursor-pointer hover:scale-105 transition rounded-lg p-2 ${
                    selectedFormats.includes(format) ? "ring-4 ring-primary" : ""
                  }`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    alt={format}
                    className="rounded-lg h-32 w-full object-cover mx-auto"
                  />
                  <p className="mt-2 font-semibold">{format}</p>
                </div>
              ))}

            {/* Avatares */}
            {progressSteps === 4 &&
              avatars.map((avatarUrl, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedAvatar(avatarUrl)}
                  className={`text-center cursor-pointer hover:scale-105 transition rounded-lg p-2 ${
                    selectedAvatar === avatarUrl ? "ring-4 ring-primary" : ""
                  }`}
                >
                  <img
                    src={avatarUrl}
                    alt={`Avatar ${index + 1}`}
                    className="rounded-lg h-32 w-full object-cover mx-auto"
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
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
              completeRegistration(selectedGenres, selectedFormats, selectedAvatar, navigate);
            } else {
              handleNext();
            }
          }}
          className="bg-primary text-white font-bold py-2 px-6 rounded hover:bg-primary/90"
        >
          {progressSteps === dialog.length - 1 ? "Finalizar Registro" : "Continuar"}
        </button>
      </div>
    </div>

  );
}
