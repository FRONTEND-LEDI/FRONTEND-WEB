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
import NotFound from "../common/components/notFound/NotFound";

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
import AdminNotFound from "../common/components/notFound/AdminNotFound";
import { BookSelector } from "../common/components/games/BookSelector";
import { CreatuHistoria } from "../common/components/games/CreaTuHistoria";
import { Quiz } from "../common/components/games/Preguntados";
import AdminAvatarsList from "../modules/admin/avatars/AdminAvatarsList";
import AdminAvatarsNew from "../modules/admin/avatars/AdminAvatarsNew";
import AdminAvatarsEdit from "../modules/admin/avatars/AdminAvatarsEdit";
import AdminNewsList from "../modules/admin/news/AdminNewsList";
import AdminNewsNew from "../modules/admin/news/AdminNewsNew";
import AdminNewsEdit from "../modules/admin/news/AdminNewsEdit";
import MetricsPage from "../modules/admin/metrics/MetricsPage";

const AppRouter = () => {
  return (
    <Switch>
      {/* -------------------- RUTAS PÚPLICAS ----------------------------- */}

      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/test" component={Test} />

      <Route path="/probando">
        <LoadingGate message="Cargando…" />
      </Route>
      <Route path="/probando2">
        <div className="flex items-center justify-center h-screen bg-transparent">
          <span className="loading loading-spinner loading-xl bg-secondary"></span>
        </div>
      </Route>
      {/* -------------------- FIN - RUTAS PÚPLICAS ----------------------------- */}

      {/* -------------------------- Modulo: HOME ------------------------------------- */}

      <Route path="/home">
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      </Route>
      {/* -------------------------- FIN Modulo: HOME ------------------------------------- */}

      {/* -------------------------- Modulo: LIBROS ------------------------------------- */}
      <Route path="/catalogo">
        <ProtectedRoute>
          <CatalogPage />
        </ProtectedRoute>
      </Route>

      <Route path="/libro/:id">
        <ProtectedRoute>
          <BookDetailPage />
        </ProtectedRoute>
      </Route>

      {/* -------------------------- FIN Modulo: LIBROS ------------------------------------- */}

      <Route path="/ClubdeLectura">
        <ProtectedRoute>
          <ForumPage />
        </ProtectedRoute>
      </Route>

      <Route path="/BiblioGames">
        <ProtectedRoute>
          <BiblioGames />
        </ProtectedRoute>
      </Route>

      <Route path="/games/select-book/:gameType" component={BookSelector} />
      <Route path="/games/historia/:bookId" component={CreatuHistoria} />
      <Route path="/games/quiz/:bookId" component={Quiz} />

      <Route path="/libro/:id" />
      {/* -------------------------- Modulo: AUTORES ------------------------------------- */}
      <Route path="/Autores">
        <ProtectedRoute>
          <Author />
        </ProtectedRoute>
      </Route>

      <Route path="/authors/:id">
        <ProtectedRoute>
          <AuthorDetail />
        </ProtectedRoute>
      </Route>
      {/* -------------------------- fin Modulo: AUTORES ------------------------------------- */}

      {/* ----------------------------- Modulo: PERFIL ------------------------------------- */}
      <Route path="/profile">
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      </Route>
      {/* -------------------------- fin Modulo: PERFIL ------------------------------------- */}

      {/* -------------------------- Modulo: BiBLIO GAMES ------------------------------------- */}
      <Route path="/BiblioGames">
        <ProtectedRoute>
          <BiblioGames />
        </ProtectedRoute>
      </Route>

      <Route path="/games/select-book/:gameType" component={BookSelector} />
      <Route path="/games/historia/:bookId" component={CreatuHistoria} />
      {/* <Route path="/games/preguntados/:bookId" component={Preguntados} /> */}

      {/* --------------------------FIN Modulo: BiBLIO GAMES ------------------------------------- */}

      {/* ======================= MODULO ADMIN ============================ */}
      {/* root exacto */}
      <Route path="/admin">
        <AdminRoute>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </AdminRoute>
      </Route>

      {/*subrutas */}
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
              <Route path="/admin/metrics" component={MetricsPage} />
              <Route path="/admin/avatars" component={AdminAvatarsList} />
              <Route path="/admin/avatars/new" component={AdminAvatarsNew} />
              <Route
                path="/admin/avatars/:id/edit"
                component={AdminAvatarsEdit}
              />
              {/* Sección Noticias */}
              <Route path="/admin/news" component={AdminNewsList} />
              <Route path="/admin/news/new" component={AdminNewsNew} />
              <Route path="/admin/news/:id/edit" component={AdminNewsEdit} />
              <AdminNotFound />
            </Switch>
          </AdminLayout>
        </AdminRoute>
      </Route>
      {/* ======================= FIN MODULO ADMIN ============================ */}

      {/* ===== 404 SIEMPRE AL FINAL ===== */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default AppRouter;
