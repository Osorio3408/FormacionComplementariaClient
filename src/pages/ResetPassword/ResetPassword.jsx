import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Importa los íconos de ojo abierto y cerrado

export const ResetPassword = () => {
  const { token } = useParams();
  console.log(token);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Por favor confirme la contraseña";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.passwords = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      try {
        const response = await fetch(
          `https://serverformacion.up.railway.app/api/resetPassword/${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          toast.success("Contraseña cambiada exitosamente!");
          setFormData({
            password: "",
            confirmPassword: "",
          });
          navigate("/login");
        } else {
          toast.error("Error al cambiar la contraseña");
        }
      } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        toast.error("Error al cambiar la contraseña");
      } finally {
        setLoading(false);
      }
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen min-w-full flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-xl w-full">
        <h2 className="text-3xl font-semibold mb-4">Cambio de Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4 py-7">
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg">
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Cambia el tipo de input para mostrar/ocultar la contraseña
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese su nueva contraseña"
                required
              />
              <span
                className="absolute h-6 w-6 top-1/2 transform -translate-y-1/2 right-2 text-gray-400 cursor-pointer"
                onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOff /> : <Eye />} {/* Ícono de ojo */}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-lg">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Cambia el tipo de input para mostrar/ocultar la contraseña
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirme su nueva contraseña"
                required
              />
              <span
                className="absolute h-6 w-6 top-1/2 transform -translate-y-1/2 right-2 text-gray-400 cursor-pointer"
                onClick={togglePasswordVisibility}>
                {showPassword ? <EyeOff /> : <Eye />} {/* Ícono de ojo */}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
            {errors.passwords && (
              <p className="text-red-500">{errors.passwords}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-10 rounded-lg flex items-center justify-center space-x-2 mx-auto">
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span>Cambiar Contraseña</span>
              </>
            ) : (
              "Cambiar Contraseña"
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 hover:underline">
            Volver al Inicio de Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};
