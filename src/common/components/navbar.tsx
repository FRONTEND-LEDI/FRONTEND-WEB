import { Link } from "wouter";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

 

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary shadow z-50">
      <div className="max-w-full mx-auto px-12 py-4 flex justify-between items-center">
        {/* Logo / Título */}
        <h1 className="flex karaoke items-center text-2xl font-bold text-white">
          Tintas Formoseñas
        </h1>

        {/* Si el usuario está logueado */}
        {user ? (
          <div className="flex font-semibold text-white gap-12 items-center">
            {/* Links en pantalla grande */}
            <div className="hidden lg:flex gap-12 items-center">
              <Link id="Inicio" href="/home">Inicio</Link>
              <Link id="Catalogo" href="/catalogo">Catálogo</Link>
              <Link id="ClubDeLectura" href="/clubdelectura">Club de Lectura</Link>
              <Link id="Bibliogames" href="/bibliogames">BiblioGames</Link>
              <Link id="Autores" href="/autores">Autores</Link>
             
            </div>

            {/* Menú perfil */}
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

              {/* Menú desplegable */}
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 text-black rounded-box w-52 p-2 shadow z-50"
              >
                {/* Título con nombre usuario */}
                <li className="menu-title">
                  <span className="font-bold text-gray-900 text-lg">
                    {user.userName || "Usuario"}
                  </span>
                </li>

                {/* Links visibles solo en móvil */}
                <li className="lg:hidden"><Link href="/home">Inicio</Link></li>
                <li className="lg:hidden"><Link href="/catalogo">Catálogo</Link></li>
                <li className="lg:hidden"><Link href="/clubdelectura">Club de Lectura</Link></li>
                <li className="lg:hidden"><Link href="/autores">Autores</Link></li>

                {user.rol === "Admin" && (
                  <li>
                    <Link href="/admin">Panel de Administración</Link>
                  </li>
                )}

                <li><Link href="/profile">Perfil</Link></li>
                <li><button onClick={logout}>Cerrar sesión</button></li>
              </ul>
            </div>
          </div>
        ) : (
          // Si no está logueado, botones de login y registro
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

