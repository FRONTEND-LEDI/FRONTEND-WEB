import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icono animado */}
        <div className="flex justify-center">
          <div className="relative">
            <AlertTriangle className="w-24 h-24 text-warning animate-bounce" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-error rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">!</span>
            </div>
          </div>
        </div>

        {/* Título y descripción */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-semibold text-base-content">
            Página no encontrada
          </h2>
          <p className="text-lg text-base-content/70 max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o fue sido movida.
          </p>
        </div>

        {/* Botones de navegación */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={goBack} className="btn btn-outline gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver atrás
          </button>

          <Link href="/home" className="btn btn-primary gap-2">
            <Home className="w-4 h-4" />
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
