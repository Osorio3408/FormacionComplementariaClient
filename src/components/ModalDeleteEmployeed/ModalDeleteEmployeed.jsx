import React from "react";

export const ModalDeleteEmployeed = ({ isOpen, onClose, documentNumber }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300`}>
      <div className="bg-white max-w-lg px-8 pt-5 pb-10 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-semibold mb-8">
          ¿Está seguro de elimar este usuario?
        </h2>

        <div className="flex justify-center mt-5">
          <button
            className="text-blue-500 hover:text-blue-700 mr-4 hover:border-blue-500 hover:border px-3 rounded-md"
            onClick={onClose}>
            Cancelar
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
