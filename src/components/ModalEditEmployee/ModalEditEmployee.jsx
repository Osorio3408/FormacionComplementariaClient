import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";

export const ModalEditEmployee = ({ isOpen, onClose, documentNumber }) => {
  const [employeed, setEmployeed] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/api/getEmployeed/${documentNumber}`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setEmployeed(res[0]);
        console.log(res[0]);
      });
  }, []);
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
          defaultValue={employeed.nameUser}
          placeholder="Nombre completo"
        />
        <input
          type="number"
          className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4"
          defaultValue={employeed.documentNumber}
          placeholder="Número de documento"
        />
        <input
          type="number"
          className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4"
          defaultValue={employeed.cellphoneNumberUser}
          placeholder="Número de celular"
        />
        <input
          type="email"
          className="w-full border border-gray-300 px-3 py-2 rounded-md mb-4"
          defaultValue={employeed.emailUser}
          placeholder="Correo electrónico"
        />

        <div className="flex justify-end mt-5">
          <button
            className="text-red-500 hover:text-red-700 mr-4 hover:border-red-500 hover:border px-3 rounded-md"
            onClick={onClose}>
            Cancelar
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
