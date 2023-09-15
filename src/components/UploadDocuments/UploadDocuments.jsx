import React, { useState } from "react";
import { toast } from "react-toastify";

const UploadDocuments = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Limitar la cantidad de archivos seleccionados a 30
    const selectedFilesLimited = files.slice(0, 30);

    setSelectedFiles(selectedFilesLimited);
  };

  const handleUpload = async () => {
    // Verifica si se seleccionaron archivos
    if (selectedFiles.length === 0) {
      alert("Por favor seleccione archivos antes de subirlos.");
      return;
    }

    // Crea un objeto FormData para enviar archivos
    const formData = new FormData();

    // Agrega los archivos seleccionados al FormData
    selectedFiles.forEach((file, index) => {
      formData.append("files", file); // Utiliza "files" como clave
    });

    try {
      // Realiza una solicitud POST al servidor utilizando fetch
      console.log(formData);
      const response = await fetch(
        "https://serverformacion.up.railway.app/api/uploadDocuments",
        {
          method: "POST",
          body: formData,
        }
      );

      // Verifica el estado de la respuesta
      if (response.status === 200) {
        // Muestra un mensaje de éxito
        toast.success("Archivos subidos con éxito.");

        // Limpia la selección de archivos
        setSelectedFiles([]);
      } else {
        // Muestra un mensaje de error si la respuesta no es exitosa
        toast.error("Error al cargar archivos.");
      }
    } catch (error) {
      console.error("Error al cargar archivos:", error);
      toast.error("Error al cargar archivos.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Subir Documentos PDF de Cédulas (Máximo 30)
          </h2>
          <p className="text-neutral-500 text-center mt-2 font-medium">
            Por favor subir los documentos PDF con el siguiente formato:
            <br />
            <strong>"Número de Documento / Nombre.pdf"</strong>
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          encType="multipart/form-data" // Importante establecer esto
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="files" className="block text-gray-700 font-bold">
                Seleccione archivos PDF:
              </label>
              <input
                type="file"
                id="files"
                name="files"
                accept=".pdf"
                multiple // Permitir múltiples archivos
                onChange={handleFileChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleUpload}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Subir
            </button>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-2 text-center text-gray-600">
              Archivos seleccionados ({selectedFiles.length} de 30):
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadDocuments;
