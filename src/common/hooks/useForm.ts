import { useState } from "react";

// tipo genérico oara los valores del formulario
type FormValues = {
  [key: string]: any;
};

// hook personalizado para manejar todos los formularios
const useForm = <T extends FormValues>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  // manejador de cambios de inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;

    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // reset de formulario
  const resetForm = () => setValues(initialValues);

  return {
    values, // valores actuales del formulario
    handleChange, // función para actualizar los valores
    resetForm // función para resetear el formulario
  };

};

export default useForm;