import { Route, Switch } from "wouter";
import LoginPage from "../modules/login/Login.page";
import RegisterPage from "../modules/register/Register.page";

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route>404 - Página no encontrada</Route>
    </Switch>
  );
};

export default AppRouter;
