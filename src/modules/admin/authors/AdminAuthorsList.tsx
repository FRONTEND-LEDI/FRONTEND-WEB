import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import {
  adminDeleteAuthor,
  searchAuthors,
} from "../../../db/services/adminAuthors";
import type { Author } from "../../../types/author";
import { getAuthorAvatarUrl } from "../../../types/author";
import { Link } from "wouter";
import toast from "react-hot-toast";
import LoadingGate from "../../../common/components/LoadingGate";

export default function AdminAuthorsList() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-authors", debouncedQ],
    queryFn: () => searchAuthors(debouncedQ, token),
    staleTime: 30_000,
  });

  const delMut = useMutation({
    mutationFn: (id: string) => adminDeleteAuthor(id, token),
    onSuccess: () => {
      toast.success("Autor eliminado");
      qc.invalidateQueries({ queryKey: ["admin-authors"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Error al eliminar"),
  });

  if (isLoading) return <LoadingGate message="Cargando autores…" />;
  if (isError)
    return <div className="text-red-600">Error: {(error as any)?.message}</div>;

  const authors = (data ?? []) as Author[];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Autores</h2>
        <Link href="/admin/authors/new" className="btn btn-primary btn-sm">
          Nuevo
        </Link>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          className="input input-bordered w-full max-w-md"
          placeholder="Buscar por nombre…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn" onClick={() => setQ("")}>
          Limpiar
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Nombre</th>
              <th>Biografía</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {authors.map((a) => {
              const url = getAuthorAvatarUrl(a.avatar);
              return (
                <tr key={a._id}>
                  <td>
                    {url ? (
                      <img
                        src={url}
                        alt={a.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center">
                        ?
                      </div>
                    )}
                  </td>
                  <td className="font-medium">{a.name}</td>
                  <td className="max-w-xl truncate" title={a.biography}>
                    {a.biography}
                  </td>
                  <td className="flex gap-2">
                    <Link
                      href={`/admin/authors/${a._id}/edit`}
                      className="btn btn-ghost btn-xs"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => {
                        if (!confirm("¿Eliminar este autor?")) return;
                        delMut.mutate(a._id);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
            {authors.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8">
                  Sin resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
