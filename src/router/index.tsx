import { Route, Switch } from "wouter";
import LandingPage from '../modules/landing/LandingPage';
import LoginPage from "../modules/login/Login.page";
import RegisterPage from "../modules/register/Register.page";
import Test from "../modules/test/Test";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../modules/home/Home.page";
import CatalogPage from "../modules/catalog/Catalog.page";
import BookDetailPage from "../modules/catalog/BookDetail.page";
import BookReaderPage from "../modules/catalog/BookReader.page";
import Profile from "../modules/profile/Profile.page";
import ForumPage from "../modules/forum/Forum.page";
import { BiblioGames } from "../modules/games/Games.page";
import { Author } from "../modules/author/Author.page";
import { AuthorDetail } from "../modules/author/Author.Detail.page";

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" component={LandingPage}/>
      <Route path="/login" component={LoginPage} /> 
      <Route path="/register" component={RegisterPage} />
      <Route path="/test" component={Test} />
      <Route path="/profile" component={Profile}/>

      <Route path="/home">
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      </Route>

      <Route path="/catalogo">
        <ProtectedRoute>
          < CatalogPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/ClubdeLectura">
      <ProtectedRoute>
        <ForumPage/>
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

      <Route path="/lectura/:id">
        <ProtectedRoute>
          <BookReaderPage />
        </ProtectedRoute>
      </Route>


      {/* las demás rutas acá */}
      <Route>404 - Página no encontrada</Route>
    </Switch>
  );
};

export default AppRouter;
