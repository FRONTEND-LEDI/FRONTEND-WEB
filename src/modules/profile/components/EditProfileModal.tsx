import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateUser, diffUserUpdate } from "../services/user.api";
import toast from "react-hot-toast";
import { X, Loader2, Save, User, Mail, Calendar } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  token: string;
  initial: {
    name?: string;
    lastName?: string;
    userName?: string;
    birthDate?: string; // ISO
    email?: string;
  };
  onUpdated?: () => void;
};

type FormValues = {
  name: string;
  lastName: string;
  userName: string;
  birthDate: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export default function EditProfileModal({
  open,
  onClose,
  token,
  initial,
  onUpdated,
}: Props) {
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: initial.name ?? "",
      lastName: initial.lastName ?? "",
      userName: initial.userName ?? "",
      birthDate: initial.birthDate ? initial.birthDate.slice(0, 10) : "",
      email: initial.email ?? "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPwd = watch("newPassword");

  const onSubmit = async (values: FormValues) => {
    if (values.newPassword && values.newPassword !== values.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setSaving(true);
    try {
      const payload = diffUserUpdate(initial, {
        name: values.name,
        lastName: values.lastName,
        userName: values.userName,
        birthDate: values.birthDate, // yyyy-mm-dd
        email: values.email,
        newPassword: values.newPassword, // opcional
      });

      // Si no hay nada para actualizar, evitamos llamar al back
      if (Object.keys(payload).length === 0) {
        toast("Sin cambios");
        onClose();
        return;
      }

      await updateUser(token, payload);
      toast.success("Perfil actualizado");
      onUpdated?.();
      onClose();
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "No pudimos actualizar tu perfil");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header - fijo */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Editar perfil</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form - scrolleable */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 min-h-0"
        >
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                  <User className="w-3.5 h-3.5" />
                  Nombre
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-xs text-rose-600 mt-1">Requerido</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                  <User className="w-3.5 h-3.5" />
                  Apellido
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <p className="text-xs text-rose-600 mt-1">Requerido</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Usuario
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                {...register("userName", { required: true })}
              />
              {errors.userName && (
                <p className="text-xs text-rose-600 mt-1">Requerido</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  {...register("birthDate")}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-xs text-rose-600 mt-1">Requerido</p>
                )}
              </div>
            </div>

            <hr className="my-3 border-gray-200" />

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Contraseña actual
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  {...register("currentPassword")}
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Sólo requerida si querés cambiar la contraseña.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    {...register("newPassword")}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Confirmar nueva
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    {...register("confirmPassword", {
                      validate: (v) => !newPwd || v === newPwd || "No coincide",
                    })}
                  />
                  {errors.confirmPassword?.message && (
                    <p className="text-xs text-rose-600 mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer - fijo */}
          <div className="px-6 pb-4 pt-3 border-t bg-gray-50 flex justify-end gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 font-medium text-sm transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
