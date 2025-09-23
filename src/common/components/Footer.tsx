export default function Footer() {
  return (
<<<<<<< HEAD
    <footer className="bg-primary text-secondary py-4  w-full  ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center mb-2 md:mb-0">
         <img
          src="/hostImage/LOGO-COLOR.svg"
          alt="Logo Tinta Nativa"
          className="w-10 h-10 mr-2"
        />
          <span className="text-sm">&copy; 2025 Tintas Formoseñas, Inc.</span>
=======
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">
                {" "}
                <img
                  src="/public/hostImage/LOGO-COLOR.svg"
                  style={{ height: 50, padding: 0 }}
                  alt=""
                />
              </span>
              <span className="text-xl font-bold text-foreground">
                Tintas Formoseñas
              </span>
            </div>
            <p className="text-sm text-secondary max-w-md">
              Descubrí la riqueza de la literatura local y conectá con historias
              que trascienden fronteras.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Explorar</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li>
                <a
                  href="/catalogo"
                  className="hover:text-white transition-colors"
                >
                  Catálogo
                </a>
              </li>
              <li>
                <a
                  href="/autores"
                  className="hover:text-white transition-colors"
                >
                  Autores
                </a>
              </li>
              <li>
                <a
                  href="/club-lectura"
                  className="hover:text-white transition-colors"
                >
                  Club de Lectura
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Soporte</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li>
                <a href="/ayuda" className="hover:text-white transition-colors">
                  Ayuda
                </a>
              </li>
              <li>
                <a
                  href="/contacto"
                  className="hover:text-white transition-colors"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="/privacidad"
                  className="hover:text-white transition-colors"
                >
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
>>>>>>> 0e84cd5a9065dfb5458b3f6ee88b82650a1f289c
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Tintas Formoseñas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
