import { Route, Switch } from "wouter";
import LoginPage from "../modules/login/Login.page";
import RegisterPage from "../modules/register/Register.page";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../modules/home/Home.page";
import LandingPage from '../modules/landing/LandingPage';
import CatalogPage from "../modules/catalog/Catalog.page";
import Test from "../modules/test/Test";

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" component={LandingPage}/>
      <Route path="/login" component={LoginPage} /> 
      <Route path="/register" component={RegisterPage} />
      <Route path="/test" component={Test} />
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

      {/* las demás rutas acá */}
      <Route>404 - Página no encontrada</Route>
    </Switch>
  );
};

export default AppRouter;
