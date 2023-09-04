import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, Send } from "lucide-react";

export const FormCreateEmployee = ({ nit }) => {
  const [formData, setFormData] = useState({
    nameUser: "",
    documentType: "Cédula de ciudadania",
    documentNumber: "",
    cellphoneNumberUser: "",
    emailUser: "",
    password: "",
    confirmPassword: "",
    rol: "Employee",
    nit: nit || "", // Si nit no existe, deja el campo vacío
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
    if (!formData.nameUser) {
      newErrors.nameUser = "Nombre completo es requerido";
    }

    if (!formData.documentNumber) {
      newErrors.documentNumber = "Número de documento es requerido";
    }

    if (!formData.cellphoneNumberUser) {
      newErrors.cellphoneNumberUser = "Número de teléfono es requerido";
    }
    if (!formData.emailUser) {
      newErrors.emailUser = "El correo electrónico es requerido";
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
        const response = await fetch("http://localhost:3000/api/newUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Vaciar los campos del formulario
          setFormData({
            nameUser: "",
            documentType: "Cédula de ciudadania",
            documentNumber: "",
            cellphoneNumberUser: "",
            emailUser: "",
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
    <form
      className="w-full h-full flex flex-col justify-center items-center gap-y-20"
      action=""
      onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="nameUser"
          value={formData.nameUser}
          onChange={handleInputChange}
          className="max-w-lg border border-gray-400 rounded-md shadow-md h-[60px] w-[24rem] xl:w-[576px] text-lg px-4 py-1"
          placeholder="Nombre completo"
        />
        {errors.nameUser && <p className="text-red-500">{errors.nameUser}</p>}
      </div>
      <div>
        <select
          type="number"
          name="documentType"
          value={formData.documentType}
          onChange={handleInputChange}
          className="max-w-lg border border-gray-400 rounded-md shadow-md h-[60px] w-[24rem] xl:w-[576px] text-lg px-4 py-1">
          <option value="Cédula de ciudadania">Cedula de ciudadania</option>
          <option value="Cédula de extranjeria">Cédula de extranjeria</option>
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
          className="max-w-lg border border-gray-400 rounded-md shadow-md h-[60px] w-[24rem] xl:w-[576px] text-lg px-4 py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Número de documento"
        />
        {errors.documentNumber && (
          <p className="text-red-500">{errors.documentNumber}</p>
        )}
      </div>
      <div>
        <input
          type="number"
          name="cellphoneNumberUser"
          value={formData.cellphoneNumberUser}
          onChange={handleInputChange}
          className="max-w-lg border border-gray-400 rounded-md shadow-md h-[60px] w-[24rem] xl:w-[576px] text-lg px-4 py-1"
          placeholder="Número de teléfono/celular"
        />
        {errors.cellphoneNumberUser && (
          <p className="text-red-500">{errors.cellphoneNumberUser}</p>
        )}
      </div>
      <div>
        <input
          type="email"
          name="emailUser"
          value={formData.emailUser}
          onChange={handleInputChange}
          className="max-w-lg border border-gray-400 rounded-md shadow-md h-[60px] w-[24rem] xl:w-[576px] text-lg px-4 py-1"
          placeholder="Correo electrónico"
        />
        {errors.emailUser && <p className="text-red-500">{errors.emailUser}</p>}
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="max-w-lg border border-gray-400 rounded-md shadow-md h-[60px] w-[24rem] xl:w-[576px] text-lg px-4 py-1"
          placeholder="Contraseña"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
      <div>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="max-w-lg border border-gray-400 rounded-md shadow-md h-[60px] w-[24rem] xl:w-[576px] text-lg px-4 py-1"
          placeholder="Confirmar Contraseña"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}
        {errors.passwords && <p className="text-red-500">{errors.passwords}</p>}
      </div>
      <div
        className={`max-w-sm xl:max-w-md w-full flex ${
          nit ? "justify-center" : "justify-between"
        } `}>
        {!nit && (
          <Link
            to={"/Login"}
            className="bg-blue-600 hover:bg-blue-700 px-12 py-6 text-lg text-white">
            Volver
          </Link>
        )}
        <button className="bg-blue-600 rounded-md hover:bg-blue-700 px-12 py-6 text-lg text-white">
          {loading ? (
            <Loader2 color="white" size={10} className="animate-spin" />
          ) : (
            <>Aceptar</>
          )}
        </button>
      </div>
      {!nit && (
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
      )}
    </form>
  );
};
