import { Link } from "wouter";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";


export default function Navbar( ) {
  const {user, logout} = useAuth()
  const [openProfile, setOpenProfile] = useState(false)
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#f29200] shadow z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">LeDi</h1>
        <div className="flex space-x-6 items-center">
        {user ? (
          <div className="flex space-x-6 items-center">
            <Link href="/">Inicio</Link>
            <Link href="/Catalogo">Catalogo</Link>
            <Link href="/Foro">Foro</Link>
            <div className="relative">
             <button
                  onClick={() => setOpenProfile(!openProfile)}
                  aria-haspopup="true"
                  aria-expanded={openProfile}
                  className="focus:outline-none"
                >
                  <img
                // {  src={user.profileimg || "/img.png"} */}
                src="/public/profile.png"
                    alt="AvatarProfile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
            {openProfile && (
               <div className="absolute right-0 mt-2 bg-white rounded shadow w-40 z-50 p-2">
                 <Link href="/Perfil">Perfil</Link>
                 <button onClick={() => {
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
          <div>
          <button>Iniciar Sesion</button>
          <button>Registrarse</button>
          <Link
            id="buttoncontact"
            className="inline-block shadow-2xl rounded-3xl p-2 transition-colors duration-300"
            style={{ color: "#f0ebf8", backgroundColor: "#8c5e8c" }}
            href="https://wa.me/5493705090746"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ayuda 
            </Link>
            </div>
        )}
        </div>
      </div>
    </nav>
  );
}

