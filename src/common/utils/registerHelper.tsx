import { registerUser, loginUser, getUserData } from "../../db/services/auth";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export function useCompleteRegistration() {
  const { login: saveSession } = useAuth();
    const completeRegistration = async (
      selectedGenres: string[],
      selectedFormats: string[],
      selectedAvatar: string,
      navigate: (path: string) => void
    ) => {
    const saved = localStorage.getItem("registroPendiente");

    if (!saved) {
      toast.error("Por favor, completa primero el formulario de registro.");
      navigate("/register");
      return;
    }  
    const userForm = JSON.parse(saved);

    const dataToSend = {
      ...userForm,
      avatar: selectedAvatar || null,
      preference: {
        category: selectedGenres.length > 0 ? selectedGenres : ["general"],
        format: selectedFormats.length > 0 ? selectedFormats : ["general"],
        language: "es"
      }
    };

    console.log("Datos que se enviarán al backend:", dataToSend);
    
    try {
      // registramos al usuario
      await registerUser(dataToSend);

      // login automático después del registro
      const loginResponse = await loginUser({
        email: userForm.email,
        password: userForm.password,
      });

      const token = loginResponse.token;
      const userData = await getUserData(token);

      // guardar el contexto
      saveSession(userData, token);

      toast.success("Registro exitoso. ¡Bienvenido a Tinta Nativa!");
      localStorage.removeItem("registroPendiente");

      navigate("/home");
    } catch (error) {
      toast.error("Algo salió mal. Revisá tus datos e intentá de nuevo.");
      }
    
    };
    return completeRegistration;
};