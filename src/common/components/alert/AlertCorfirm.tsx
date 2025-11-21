import { type ReactNode, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: "default" | "destructive";
}

export default function ConfirmDialog({
  trigger,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  variant = "default",
}: ConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const confirmButtonClass =
    variant === "destructive"
      ? "btn bg-red-600 hover:bg-red-700 text-white border-none"
      : "btn bg-orange-600 hover:bg-orange-700 text-white border-none";

  return (
    <>
      {/* Trigger */}
      <div onClick={() => setIsOpen(true)}>{trigger}</div>

      {/* Modal */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative max-w-md">
            {/* Close button */}
            <button
              className="btn btn-sm btn-circle absolute right-4 top-4"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  variant === "destructive" ? "bg-red-100" : "bg-orange-100"
                }`}
              >
                <AlertTriangle
                  className={`w-6 h-6 ${
                    variant === "destructive"
                      ? "text-red-600"
                      : "text-orange-600"
                  }`}
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900">{title}</h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">{description}</p>

            {/* Actions */}
            <div className="modal-action mt-6">
              <button
                className="btn btn-ghost"
                onClick={() => setIsOpen(false)}
              >
                {cancelText}
              </button>
              <button className={confirmButtonClass} onClick={handleConfirm}>
                {confirmText}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
