import { registerUser, loginUser, getUserData } from "../../db/services/auth";
import { useAuth } from "../../context/AuthContext";

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
      alert("No se encontraron los datos del registro. Por favor volvé al formulario.");
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

      alert("Registro exitoso. ¡Bienvenido!");
      localStorage.removeItem("registroPendiente");

      navigate("/home");
    } catch (error) {
      alert("Ocurrió un error al registrar. Revisá tus datos.");
      }
    
    };
    return completeRegistration;
};