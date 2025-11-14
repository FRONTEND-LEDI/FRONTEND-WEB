import { Loader2, Trash2, AlertCircle } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading?: boolean;
};

export default function DeleteAccountDialog({
  open,
  onClose,
  onConfirm,
  loading,
}: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-red-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Eliminar cuenta</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-rose-800 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Esta acción es irreversible
            </p>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Se eliminarán todos tus datos, progreso de lectura y
            configuraciones. No podrás recuperar tu cuenta una vez eliminada.
          </p>
          <p className="text-sm text-gray-700 font-medium mt-3">
            ¿Estás seguro que querés continuar?
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Sí, eliminar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
