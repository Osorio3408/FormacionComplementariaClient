import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, Send } from "lucide-react";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    documentType: "Cédula de ciudadania",
    documentNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false); // Estado para el loader

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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

    // Validations
    if (!formData.name) {
      newErrors.name = "Nombre completo es requerido";
    }

    if (!formData.documentNumber) {
      newErrors.documentNumber = "Número de documento es requerido";
    }
    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Por favor confirme la contraseña";
    }

    if (formData.password != formData.confirmPassword) {
      newErrors.passwords = "Las contraseñas deben concidir";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true); // Activar el loader mientras se envía la solicitud

      try {
        const response = await fetch(
          "https://serverformacion.up.railway.app/api/newUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          // Vaciar los campos del formulario
          setFormData({
            fullName: "",
            documentType: "Cédula de ciudadania",
            documentNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
          });

          // Restablecer los errores
          setErrors({});
          toast.success("Se ha creado la cuenta exitosamente!");
          navigate("/");
        } else {
          toast.error("Error al crear la cuenta");
        }
      } catch (error) {
        console.error("Error al crear la cuenta:", error);
        toast.error("Error al crear la cuenta");
      } finally {
        setLoading(false); // Desactivar el loader después de completar la solicitud
      }
    }
  };
  return (
    <div className="h-full min-w-full space-y-10 pb-20">
      <Navbar title={"Registrarse"} />
      <div className="max-w-6xl h-full m-auto border border-neutral-400 w-full py-10 mb-4">
        <form
          className="w-full h-full flex flex-col justify-center items-center gap-y-20"
          action=""
          onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="max-w-lg border border-black shadow-md h-[60px] w-[576px] text-lg px-4 py-1"
              placeholder="Nombre completo"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div>
            <select
              type="number"
              name="documentType"
              value={formData.documentType}
              onChange={handleInputChange}
              className="max-w-lg border border-black shadow-md h-[60px] w-[576px] text-lg px-4 py-1">
              <option value="Cédula de ciudadania">Cedula de ciudadania</option>
              <option value="Cédula de extranjeria">
                Cédula de extranjeria
              </option>
              <option value="Registro civil">Registro civil</option>
              <option value="Tarjeta de identidad">Tarjeta de identidad</option>
            </select>
          </div>
          <div>
            <input
              type="number"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleInputChange}
              className="max-w-lg border border-black shadow-md h-[60px] w-[576px] text-lg px-4 py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Número de documento"
            />
            {errors.documentNumber && (
              <p className="text-red-500">{errors.documentNumber}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="max-w-lg border border-black shadow-md h-[60px] w-[576px] text-lg px-4 py-1"
              placeholder="Correo electrónico"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="max-w-lg border border-black shadow-md h-[60px] w-[576px] text-lg px-4 py-1"
              placeholder="Contraseña"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="max-w-lg border border-black shadow-md h-[60px] w-[576px] text-lg px-4 py-1"
              placeholder="Confirmar Contraseña"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
            {errors.passwords && (
              <p className="text-red-500">{errors.passwords}</p>
            )}
          </div>
          <div className="max-w-md w-full flex justify-between ">
            <Link
              to={"/Login"}
              className="bg-blue-600 hover:bg-blue-700 px-12 py-6 text-lg text-white">
              Volver
            </Link>
            <button className="bg-blue-600 hover:bg-blue-700 px-12 py-6 text-lg text-white">
              {loading ? (
                <Loader2 color="white" size={10} className="animate-spin" />
              ) : (
                <>Aceptar</>
              )}
            </button>
          </div>
          <div className="text-lg">
            <p className="font-medium flex gap-4">
              ¿Ya tienes una cuenta?
              <Link
                to={"/Login"}
                className="text-blue-600 underline font-normal hover:underline-offset-2 hover:cursor-pointer">
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
