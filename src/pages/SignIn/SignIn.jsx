import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";

export const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // Estado para el loader

  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // Usa useNavigate para la redirección

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

    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:3000/api/signIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Inicio de sesión exitosa!");
          const data = await response.json(); // Parsear la respuesta como JSON

          // Vaciar los campos del formulario
          setFormData({
            email: "",
            password: "",
          });

          // Restablecer los errores
          setErrors({});

          // Almacenar el token en una cookie
          Cookies.set("token", data.token, { expires: 1 }); // Cambia las opciones de expiración según tus necesidades

          // Redirigir al usuario a la página deseada
          navigate("/"); // Asegúrate de importar navigate desde 'react-router-dom'
        } else {
          toast.error("Credenciales inválidas");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        toast.error("Error al iniciar sesión");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-screen min-w-full flex flex-col justify-center items-center">
      <Navbar title={"Iniciar Sesión"} />
      <div className="max-w-[29rem] my-10 lg:my-auto md:max-w-4xl xl:max-w-6xl m-auto border border-neutral-400 h-[600px] w-full">
        <form
          className="w-full h-full flex flex-col justify-center items-center gap-y-20"
          action=""
          onSubmit={handleSubmit}>
          <div>
            <input
              onChange={handleInputChange}
              value={formData.email}
              name="email"
              type="email"
              className="max-w-lg border border-black shadow-md h-[60px] w-[24rem] xl:w-[576px] text-lg px-4 py-1"
              placeholder="Correo electrónico"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <input
              onChange={handleInputChange}
              value={formData.password}
              name="password"
              type="password"
              className="max-w-lg border border-black shadow-md h-[60px] w-[24rem] xl:w-[576px] text-lg px-4 py-1"
              placeholder="Contraseña"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="max-w-md w-full flex justify-center ">
            <button className="bg-blue-600 hover:bg-blue-700 px-24 py-6 text-lg text-white">
              {loading ? (
                <Loader2 color="white" size={20} className="animate-spin" />
              ) : (
                <>Iniciar</>
              )}{" "}
            </button>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 text-lg">
            <Link
              to={"/register"}
              className="text-blue-700 hover:underline hover:cursor-pointer">
              Crear Nueva Cuenta
            </Link>
            <p className="font-medium">
              ¿Olvidó su contraseña?{" "}
              <span className="text-blue-600 underline font-normal hover:underline-offset-2 hover:cursor-pointer">
                Recuperar
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
