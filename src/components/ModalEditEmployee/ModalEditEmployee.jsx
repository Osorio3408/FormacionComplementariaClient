import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { toast } from "react-toastify";

export const ModalEditEmployee = ({
  isOpen,
  onClose,
  documentNumber,
  fetchEmployees,
}) => {
  const [employeeData, setEmployeeData] = useState({
    nameUser: "",
    documentNumber: 0,
    cellphoneNumberUser: 0,
    emailUser: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch(
      `https://serverformacion.up.railway.app/api/getEmployeed/${documentNumber}`
    )
      .then((response) => response.json())
      .then((res) => {
        setEmployeeData(res[0]);
        console.log(res[0]);
      });
  }, [documentNumber]);

  // Función para manejar cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleSaveEmployee = () => {
    try {
      fetch(
        `https://serverformacion.up.railway.app/api/editEmployee/${documentNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        }
      )
        .then((res) => {
          if (res.status === 200) {
            // Puedes realizar alguna acción adicional después de la edición exitosa
            toast.success("Empleado editado correctamente");
            fetchEmployees();
          } else {
            toast.error("Error al editar el empleado");
          }
          return res.json();
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.error("Error al editar el empleado:", error);
      setErrorMessage("Error al editar el empleado");
    }

    // Cierra el modal después de editar o si hay un error
    onClose();
  };

  // ...

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300`}>
      <div className="bg-white max-w-lg px-8 pt-5 pb-10 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-semibold mb-8">Editar Empleado</h2>
        <span className="absolute top-5 right-8">
          <X size={18} onClick={onClose} className="cursor-pointer" />
        </span>
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4"
          name="nameUser"
          value={employeeData.nameUser}
          onChange={handleInputChange}
          placeholder="Nombre completo"
        />
        <input
          type="number"
          className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4"
          name="documentNumber"
          value={employeeData.documentNumber}
          onChange={handleInputChange}
          placeholder="Número de documento"
        />
        <input
          type="number"
          className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4"
          name="cellphoneNumberUser"
          value={employeeData.cellphoneNumberUser}
          onChange={handleInputChange}
          placeholder="Número de celular"
        />
        <input
          type="email"
          className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4"
          name="emailUser"
          value={employeeData.emailUser}
          onChange={handleInputChange}
          placeholder="Correo electrónico"
        />

        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}

        <div className="flex justify-end mt-5">
          <button
            className="text-red-500 hover:text-red-700 mr-4 hover:border-red-500 hover:border px-3 rounded-md"
            onClick={onClose}>
            Cancelar
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={handleSaveEmployee}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
