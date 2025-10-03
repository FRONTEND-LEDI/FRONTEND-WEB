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
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30">
      <div className="w-full max-w-md rounded-2xl bg-fund shadow-lg border p-6">
        <h3 className="text-lg font-semibold mb-2 text-rose-700">
          Eliminar cuenta
        </h3>
        <p className="text-sm text-muted-foreground">
          Esta acción es irreversible. ¿Seguro que querés continuar?
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg border bg-white cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-3 py-2 rounded-lg border bg-rose-600 text-white cursor-pointer"
          >
            {loading ? "Eliminando..." : "Sí, eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
