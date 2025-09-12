import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-secondary py-4 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center mb-2 md:mb-0">
<<<<<<< HEAD
         <img
          src="/hostImage/LOGO-COLOR.svg"
          alt="Logo Tinta Nativa"
          className="w-10 h-10 mr-2"
        />
=======
          <img
            src="/zorro-login.png"
            alt="Logo Tinta Nativa"
            className="w-10 h-10 mr-2"
          />
>>>>>>> b119c24211a6e5b323ef38b219c109b119a3da78
          <span className="text-sm">&copy; 2025 Tintas Formoseñas, Inc.</span>
        </div>
        <div className="flex space-x-4 text-sm">
          <Link href="/terminos" className="hover:underline">
            Términos
          </Link>
          <Link href="/privacidad" className="hover:underline">
            Privacidad
          </Link>
          <Link href="/contacto" className="hover:underline">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
}
