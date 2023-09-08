import React, { useState, useEffect } from "react";
import { useUserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

export const ProfileEmployee = () => {
  const { getTokenFromCookies } = useUserContext();
  const [userData, setUserData] = useState({
    name: "",
    documentType: "",
    documentNumber: "",
    cellphoneNumberUser: "",
    email: "",
  });

  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) {
      const user = jwtDecode(token);
      console.log(user);
      setUserData(user);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://serverformacion.up.railway.app/api/updateEmployeeData/${userData.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userData.name,
            cellphoneNumberUser: userData.cellphoneNumberUser,
            email: userData.email,
          }),
        }
      );
      if (response.status === 200) {
        toast.success("Datos actualizados correctamente");
      } else {
        toast.error("Error al actualizar datos");
      }
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      toast.error("Error al actualizar datos");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-around">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-5xl w-full shadow-md border border-neutral-300 rounded-md px-8 pt-6 pb-8 mb-4">
        <h2 className="text-4xl font-semibold mb-4 text-center py-5">
          Editar Datos Personales
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="name">
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded-md w-full h-16 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Nombre"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="cellphoneNumberUser">
            Número de Teléfono
          </label>
          <input
            className="shadow appearance-none border rounded-md w-full h-16 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cellphoneNumberUser"
            name="cellphoneNumberUser"
            type="text"
            placeholder="Número de Teléfono"
            value={userData.cellphoneNumberUser}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-bold mb-2"
            htmlFor="email">
            Correo Electrónico
          </label>
          <input
            className="shadow appearance-none border rounded-md w-full h-16 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Correo Electrónico"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};
