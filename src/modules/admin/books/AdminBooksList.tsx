// modules/admin/books/AdminBooksList.tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllBooks } from "../../../db/services/books";
import { adminDeleteBook } from "../../../db/services/adminBooks";
import { useAuth } from "../../../context/AuthContext";
import type { Book } from "../../../types/books";
import { Link } from "wouter";
import toast from "react-hot-toast";
import LoadingGate from "../../../common/components/LoadingGate";

export default function AdminBooksList() {
  const { token, user } = useAuth();
  const qc = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-books"],
    queryFn: () => getAllBooks(token),
    staleTime: 60_000,
  });

  const delMutation = useMutation({
    mutationFn: (id: string) => adminDeleteBook(id, token),
    onSuccess: () => {
      toast.success("Libro eliminado");
      qc.invalidateQueries({ queryKey: ["admin-books"] });
    },
    onError: (e: any) => {
      toast.error(e?.message ?? "Error al eliminar");
    },
  });

  if (isLoading) return <LoadingGate message="Cargando libros…" />;
  if (isError)
    return <div className="text-red-600">Error: {(error as any)?.message}</div>;

  const books = (data ?? []) as Book[];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Libros</h2>
        <Link href="/admin/books/new" className="btn btn-primary btn-sm">
          Nuevo
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Formato</th>
              <th>Año</th>
              <th>Disponible</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b._id}>
                <td className="font-medium">{b.title}</td>
                <td>{b.format}</td>
                <td>{b.yearBook}</td>
                <td>{b.available ? "Sí" : "No"}</td>
                <td className="flex gap-2">
                  <Link
                    href={`/admin/books/${b._id}/edit`}
                    className="btn btn-ghost btn-xs"
                  >
                    Editar
                  </Link>
                  {user?.rol === "admin" && (
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => {
                        if (
                          !confirm(
                            "¿Eliminar este libro? Sólo hazlo con libros creados por vos (riesgoso)."
                          )
                        )
                          return;
                        delMutation.mutate(b._id);
                      }}
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8">
                  Sin libros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
