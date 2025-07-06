import { Link } from "wouter";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";


export default function Navbar( ) {
  const {user, logout} = useAuth()
  const [openProfile, setOpenProfile] = useState(false)
  return (
    <nav className="fixed top-0 left-0 w-full bg-primary shadow z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="flex items-center  text-2xl font-bold text-white">
        TintasFormoseñas
        </h1>
        <div className="flex space-x-6 items-center">
        {user ? (
          <div className="flex font-semibold text-white gap-12 items-center">
              <Link href="/">Inicio</Link>
              <Link href="/catalogo">Catalogo</Link>
              <Link href="/foro">Foro</Link>
              <Link href="/autores">Autores</Link>
              <div className="relative">
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  aria-haspopup="true"
                  aria-expanded={openProfile}
                  className=" flex justify-center "
                >
                  <img
                    // {  src={user.profileimg || "/img.png"} */}
                    src="/public/profile.png"
                    alt="AvatarProfile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                {openProfile && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 text-black gap-4 bg-white flex flex-col items-center justify-center rounded shadow w-40 z-50 p-2">
                    <Link href="/perfil">Perfil</Link>
                    <button
                      onClick={() => {
                        logout();
                        setOpenProfile(false);
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
        ):(
        <div className="flex justify-evenly gap-6">
          <Link rel="stylesheet" href="/login"  className="bg-orange-500 text-[#DED8E7] font-semibold px-2 py-2 rounded-xl shadow-md hover:bg-orange-400 transition">
          Iniciar Sesión
          </Link>
          <Link  rel="stylesheet" href="/register" className="bg-orange-500 text-[#DED8E7] font-semibold px-2 py-2 rounded-xl shadow-md hover:bg-orange-300 transition">
          Registrarse
          </Link>
        </div>
        )}
        </div>
      </div>
    </nav>
  );
}

