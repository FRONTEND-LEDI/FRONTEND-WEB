import { Link } from "wouter";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user,logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary shadow z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="flex items-center text-2xl font-bold text-white">
          TintasFormoseñas
        </h1>
        <div className="flex space-x-6 items-center">
          {user ? (
            <div className="flex font-semibold text-white gap-12 items-center">
              <Link href="/home">Inicio</Link>
              <Link href="/catalogo">Catálogo</Link>
              <Link href="/foro">Foro</Link>
              <Link href="/autores">Autores</Link>
              <div className="dropdown dropdown-center dropdown-hover">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-none avatar">
                 <div className="w-8 h-8 rounded-full overflow-hidden">
                 <img
                     src={user.avatar || "/profile.png"}
                     alt="AvatarProfile"
                     className="w-full h-full object-cover"
                  />
                </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 text-black flex justify-center items-center rounded-box z-50 w-40 p-2 shadow"
                >
                  <li>
                    <Link href="/perfil">Perfil</Link>
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
      </div>
    </nav>
  );
}
