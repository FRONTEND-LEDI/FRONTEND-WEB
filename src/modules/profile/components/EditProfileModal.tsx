import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateUser, diffUserUpdate } from "../services/user.api";
import toast from "react-hot-toast";

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

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30">
      <div className="w-full max-w-lg rounded-2xl bg-fund shadow-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Editar perfil</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Nombre</label>
              <input
                className="w-full border rounded-lg px-3 py-2"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-xs text-rose-600">Requerido</p>
              )}
            </div>
            <div>
              <label className="text-sm">Apellido</label>
              <input
                className="w-full border rounded-lg px-3 py-2"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <p className="text-xs text-rose-600">Requerido</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm">Usuario</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              {...register("userName", { required: true })}
            />
            {errors.userName && (
              <p className="text-xs text-rose-600">Requerido</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Fecha de nacimiento</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2"
                {...register("birthDate")}
              />
            </div>
            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-xs text-rose-600">Requerido</p>
              )}
            </div>
          </div>

          <hr className="my-2" />

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-sm">Contraseña actual</label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2"
                {...register("currentPassword")}
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Sólo requerida si querés cambiar la contraseña.
              </p>
            </div>
            <div>
              <label className="text-sm">Nueva contraseña</label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2"
                {...register("newPassword")}
              />
            </div>
            <div>
              <label className="text-sm">Confirmar nueva contraseña</label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2"
                {...register("confirmPassword", {
                  validate: (v) => !newPwd || v === newPwd || "No coincide",
                })}
              />
              {errors.confirmPassword?.message && (
                <p className="text-xs text-rose-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg border bg-white cursor-pointer"
            >
              Cancelar
            </button>
            <button
              disabled={saving}
              className="px-3 py-2 rounded-lg border bg-amber-500 text-white cursor-pointer"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
