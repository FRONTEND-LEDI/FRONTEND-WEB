import { Route, Switch } from "wouter";
import LoginPage from "../modules/login/Login.page";
import RegisterPage from "../modules/register/Register.page";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../modules/home/Home.page";

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" component={LoginPage} /> // el landing page acá después, agregar /login cuando esté 
      <Route path="/register" component={RegisterPage} />
      <Route path="/home">
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      </Route>
      {/* las demás rutas acá */}
      <Route>404 - Página no encontrada</Route>
    </Switch>
  );
};

export default AppRouter;
