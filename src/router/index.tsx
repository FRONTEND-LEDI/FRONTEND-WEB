import { Route, Switch } from "wouter";
import LandingPage from "../modules/landing/LandingPage";
import LoginPage from "../modules/login/Login.page";
import RegisterPage from "../modules/register/Register.page";
import Test from "../modules/test/Test";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../modules/home/Home.page";
import CatalogPage from "../modules/catalog/Catalog.page";
import BookDetailPage from "../modules/catalog/BookDetail.page";
import Profile from "../modules/profile/Profile.page";
import ForumPage from "../modules/forum/Forum.page";
import { BiblioGames } from "../modules/games/Games.page";
import LoadingGate from "../common/components/LoadingGate";
import { Author } from "../modules/author/Author.page";
import { AuthorDetail } from "../modules/author/Author.Detail.page";

// Admin
import AdminRoute from "./AdminRoute";
import AdminLayout from "../modules/admin/AdminLayout";
import AdminDashboard from "../modules/admin/AdminDashboard";
import AdminBooksList from "../modules/admin/books/AdminBooksList";
import AdminBooksNew from "../modules/admin/books/AdminBooksNew";
import AdminBooksEdit from "../modules/admin/books/AdminBooksEdit";
import AdminAuthorsList from "../modules/admin/authors/AdminAuthorsList";
import AdminAuthorsNew from "../modules/admin/authors/AdminAuthorsNew";
import AdminAuthorsEdit from "../modules/admin/authors/AdminAuthorsEdit";

const AppRouter = () => {
  return (
    <Switch>
      {/* Públicas / protegidas de usuario */}
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/test" component={Test} />
      <Route path="/profile" component={Profile} />

      <Route path="/probando">
        <LoadingGate message="Cargando…" />
      </Route>

      <Route path="/home">
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      </Route>

      <Route path="/catalogo">
        <ProtectedRoute>
          <CatalogPage />
        </ProtectedRoute>
      </Route>

      <Route path="/ClubdeLectura">
        <ProtectedRoute>
          <ForumPage />
        </ProtectedRoute>
      </Route>
      
    <Route path="/Autores">
      <ProtectedRoute>
        <Author/>
      </ProtectedRoute>
      </Route>
      <Route path="/authors/:id">
      <ProtectedRoute>
        <AuthorDetail/>
      </ProtectedRoute>
      </Route>


      <Route path="/BiblioGames">
      <ProtectedRoute>
        <BiblioGames/>
      </ProtectedRoute>
      </Route>

      <Route path="/libro/:id">
        <ProtectedRoute>
          <BookDetailPage/>
        </ProtectedRoute>
      </Route>

      {/* ===== ADMIN ===== */}
      {/* root exacto */}
      <Route path="/admin">
        <AdminRoute>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </AdminRoute>
      </Route>

      {/* subrutas */}
      <Route path="/admin/*">
        <AdminRoute>
          <AdminLayout>
            <Switch>
              <Route path="/admin/books" component={AdminBooksList} />
              <Route path="/admin/books/new" component={AdminBooksNew} />
              <Route path="/admin/books/:id/edit" component={AdminBooksEdit} />
              <Route path="/admin/authors" component={AdminAuthorsList} />
              <Route path="/admin/authors/new" component={AdminAuthorsNew} />
              <Route
                path="/admin/authors/:id/edit"
                component={AdminAuthorsEdit}
              />
              <Route>Admin: 404</Route>
            </Switch>
          </AdminLayout>
        </AdminRoute>
      </Route>

      {/* ===== 404 SIEMPRE AL FINAL ===== */}
      <Route>404 - Página no encontrada</Route>
    </Switch>
  );
};

export default AppRouter;
