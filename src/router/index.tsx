import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../modules/login/Login.page";
import RegisterPage from "../modules/register/Register.page";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
