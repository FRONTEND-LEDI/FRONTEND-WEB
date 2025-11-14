import { Link } from "wouter";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

 

  // Función para obtener el color del marco según el nivel
  const getLevelFrameColor = (level?: number) => {
    const colors: Record<number, string> = {
      1: "from-gray-400 to-gray-600",
      2: "from-green-400 to-green-600",
      3: "from-blue-400 to-blue-600",
      4: "from-purple-400 to-purple-600",
      5: "from-yellow-400 to-yellow-600",
      6: "from-pink-400 via-red-500 to-yellow-500",
    };
    return colors[level || 1] || colors[1];
  };

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
              <div tabIndex={0} role="button" className="relative">
                {/* Avatar con marco de nivel */}
                {user.level?.img?.url_secura ? (
                  // Si tiene marco personalizado
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <img
                      src={user.level.img.url_secura}
                      alt="Marco de nivel"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                    />
                    <img
                      src={user.avatar || "/profile.png"}
                      alt="AvatarProfile"
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  </div>
                ) : (
                  // Marco con gradiente si no tiene imagen
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${getLevelFrameColor(
                        user.level?.level
                      )} rounded-full blur-sm opacity-75`}
                    />
                    <img
                      src={user.avatar || "/profile.png"}
                      alt="AvatarProfile"
                      className="relative w-9 h-9 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    {/* Badge de nivel */}
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-gradient-to-br ${getLevelFrameColor(
                        user.level?.level
                      )} rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow-md z-10`}
                    >
                      {user.level?.level || 1}
                    </div>
                  </div>
                )}
              </div>

              {/* Menú desplegable */}
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 text-black rounded-box w-52 p-2 shadow z-50"
              >
                {/* Título con nombre usuario */}
                <li className="menu-title">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-gray-900 text-lg">
                      {user.userName || "Usuario"}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r ${getLevelFrameColor(
                        user.level?.level
                      )} text-white font-semibold`}
                    >
                      Nv. {user.level?.level || 1}
                    </span>
                  </div>
                </li>

                {/* Links visibles solo en móvil */}
                <li className="lg:hidden">
                  <Link href="/home">Inicio</Link>
                </li>
                <li className="lg:hidden">
                  <Link href="/catalogo">Catálogo</Link>
                </li>
                <li className="lg:hidden">
                  <Link href="/clubdelectura">Club de Lectura</Link>
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
