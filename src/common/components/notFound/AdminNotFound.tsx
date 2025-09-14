import { Shield, ArrowLeft } from "lucide-react";

export default function AdminNotFound() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Header admin */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center">
              <Shield className="w-12 h-12 text-error animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -right-2 badge badge-error text-white font-bold">
              404
            </div>
          </div>
        </div>

        {/* Título */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">
            Admin: Página no encontrada
          </h1>
          <p className="text-lg text-base-content/70">
            La página administrativa que buscas no existe o no tienes permisos
            para acceder.
          </p>
        </div>

        {/* Alerta de acceso */}
        <div className="alert alert-warning">
          <Shield className="w-5 h-5" />
          <div>
            <h3 className="font-bold">Acceso restringido</h3>
            <div className="text-sm">
              Verifica que tengas los permisos necesarios para acceder a esta
              sección.
            </div>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={goBack} className="btn btn-outline gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
}
