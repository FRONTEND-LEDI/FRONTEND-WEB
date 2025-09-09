// modules/admin/books/AdminBooksEdit.tsx
import { useRoute } from "wouter";

export default function AdminBooksEdit() {
  const [, params] = useRoute("/admin/books/:id/edit");
  const id = params?.id!;
  // TODO: fetch del libro por id y reutilizar el form con valores iniciales
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Editar libro #{id}</h2>
      <div className="rounded-lg border bg-white p-4">
        Formulario de edición (en cuanto esté el endpoint)
      </div>
    </div>
  );
}
