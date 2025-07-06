// src/common/components/Footer.tsx
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-secondary text-black py-4 mt-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center mb-2 md:mb-0">
          <img
            src="../public/zorro-login.png"
            alt="Logo Tinta Nativa"
            className="w-10 h-10 mr-2"
          />
          <span className="text-sm">&copy; 2025 Tintas Formoseñas, Inc.</span>
        </div>
        <div className="flex space-x-4 text-sm">
          <Link href="/terminos" className="hover:underline">Términos</Link>
          <Link href="/privacidad" className="hover:underline">Privacidad</Link>
          <Link href="/contacto" className="hover:underline">Contacto</Link>
        </div>
      </div>
    </footer>
  );
}
