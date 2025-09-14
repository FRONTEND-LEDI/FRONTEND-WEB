import { useRoute } from "wouter";
import { BookOpen, X } from "lucide-react";

export default function AdminBooksEdit() {
  const [, params] = useRoute("/admin/books/:id/edit");
  const id = params?.id!;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Editar Libro #{id}
            </h2>
            <p className="text-gray-600">Modifica la información del libro</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Formulario en desarrollo
          </h3>
          <p className="text-gray-600 mb-6">
            El formulario de edición estará disponible una vez que esté listo el
            endpoint correspondiente.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => history.back()}
            >
              <X className="w-4 h-4" />
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
