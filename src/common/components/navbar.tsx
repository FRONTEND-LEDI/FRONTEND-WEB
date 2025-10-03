import { Link } from "wouter";
import { useAuth } from "../../context/AuthContext";
import { useTour } from "@reactour/tour";
import { useEffect, useState } from "react";
export default function Navbar() {
  const { user, logout } = useAuth();
 const { setSteps, setIsOpen } = useTour();
  const [showTourButton, setShowTourButton] = useState(false);

  useEffect(() => {
    if (user) {
      // check si ya vio el tour
      const seenTour = localStorage.getItem("seenTour");
      if (!seenTour) setShowTourButton(true);
    }
  }, [user]);

  const startTour = () => {
    if (!setSteps || !setIsOpen) return;
    setSteps([
      { selector: "#Inicio", content: "Aquí puedes volver al inicio." },
      { selector: "#Catalogo", content: "Explora todo el catálogo de libros." },
      { selector: "#ClubDeLectura", content: "Únete a Club de Lectura y comparte tus opiniones." },
      { selector: "#Bibliogames", content: "Juega en la sección BiblioGames." },
      { selector: "#Autores", content: "Descubre tus autores favoritos." },
    ]);
    setIsOpen(true);

    // marcar como visto
    localStorage.setItem("seenTour", "true");
    setShowTourButton(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary shadow z-50">
      <div className="max-full mx-auto px-12 py-4 flex justify-between items-center">
       <div className="flex colum self-baseline">
       

        <h1 className="flex karaoke items-center text-2xl font-bold text-white">
          Tintas Formoseñas
        </h1>
      </div>
        {user ? (
          <div className="flex font-semibold text-white gap-12 items-center">
            {/* Links en pantalla grande */}
            <div className="hidden lg:flex gap-12 items-center">
              <Link id="Inicio" href="/home">Inicio</Link>
              <Link id="Catalogo" href="/catalogo">Catálogo</Link>
              <Link id="ClubdeLectura" href="/clubdeLectura">Club de Lectura</Link>
              <Link id="Bibliogames" href="/biblioGames">BiblioGames</Link>
              <Link id="Autores" href="/Autores">Autores</Link>
               {showTourButton && (
        <button
          onClick={startTour}
          className="ml-4 px-3 py-1 rounded cursor-pointer bg-white text-primary"
        >
          Iniciar Tour
        </button>
      )}
            </div>

            {/* Botón de perfil */}
            <div className="dropdown dropdown-end dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={user.avatar || "/profile.png"}
                    alt="AvatarProfile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* menú combinado: muestra todo en movil, solo perfil/cerrar en grande */}
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 text-black rounded-box w-52 p-2 shadow z-50"
              >
                {/* Solo visible en mobile */}
                <li className="menu-title">
                  <span className="font-bold text-gray-900 text-lg">
                    {user.userName || "Ayelén"}
                  </span>
                </li>
                <li className="lg:hidden">
                  <Link href="/home">Inicio</Link>
                </li>
                <li className="lg:hidden">
                  <Link href="/catalogo">Catálogo</Link>
                </li>
                <li className="lg:hidden">
                  <Link href="/club">Club de Lectura</Link>
                </li>
                <li className="lg:hidden">
                  <Link href="/autores">Autores</Link>
                </li>
                {user.rol === "Admin" && (
                  <li>
                    <Link href="/admin">Panel de Administración</Link>
                  </li>
                )}
                <li>
                  <Link href="/profile">Perfil</Link>
                </li>
                <li>
                  <button onClick={logout}>Cerrar sesión</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex justify-evenly gap-6">
            <Link
              href="/login"
              className="bg-white text-primary font-semibold px-2 py-2 rounded-xl shadow-lg hover:bg-secondary hover:text-white transition"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="bg-white text-primary font-semibold px-2 py-2 rounded-xl shadow-lg hover:bg-secondary hover:text-white transition"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
