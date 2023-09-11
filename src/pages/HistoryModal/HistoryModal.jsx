import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../../Context/UserContext";
import jwtDecode from "jwt-decode";

export const HistoryModal = ({ onClose, onSaveHistory }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [documentNumber, setDocumentNumber] = useState();

  const { getTokenFromCookies } = useUserContext();

  useEffect(() => {
    const token = getTokenFromCookies();
    const { userId } = jwtDecode(token);
    console.log(userId);
    setDocumentNumber(userId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida que los campos no estén vacíos
    if (!title.trim() || !description.trim()) {
      toast.info("Por favor complete todos los campos.");
      return;
    }

    // Crea un objeto con los datos del historial
    const historyData = {
      title,
      description,
      documentNumber,
    };

    try {
      const response = await fetch(
        "https://serverformacion.up.railway.app/api/saveHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(historyData),
        }
      );

      if (response.status === 200) {
        // El historial se creó correctamente
        toast.success("Se ha creado un nuevo registro en el historial");
        onSaveHistory();
        // Cierra el modal después de guardar el historial
        onClose();
      } else {
        // Maneja errores si es necesario
        toast.error("Error al guardar el historial.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      toast.error("Error al guardar el historial.");
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300`}>
      <div
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-xl font-semibold mb-4">Historial de cambios</h2>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-bold mb-2">
                Título:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2">
                Descripción:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
