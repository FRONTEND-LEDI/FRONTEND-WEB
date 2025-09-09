import { Link } from "wouter";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-fund">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 border-r p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-4">Administración</h2>
        <nav className="menu">
          <ul className="space-y-1">
            <li>
              <Link href="/admin">Dashboard</Link>
            </li>
            <li className="menu-title mt-2">
              <span>Libros</span>
            </li>
            <li>
              <Link href="/admin/books">Listado</Link>
            </li>
            <li>
              <Link href="/admin/books/new">Crear libro</Link>
            </li>
            <li className="menu-title mt-2">
              <span>Autores</span>
            </li>
            <li>
              <Link href="/admin/authors">Listado</Link>
            </li>
            <li>
              <Link href="/admin/authors/new">Crear autor</Link>
            </li>
            {/* Futuro: Autores, Colecciones, Moderación, etc. */}
          </ul>
        </nav>
        <div className="mt-6">
          <Link href="/home" className="btn btn-sm w-full mb-2">
            Volver al Sitio
          </Link>
          <button className="btn btn-outline btn-sm w-full" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
