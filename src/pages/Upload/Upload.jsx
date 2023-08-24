import React, { useState } from "react";
import * as XLSX from "xlsx";

export const Upload = () => {
  const [users, setUsers] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      setUsers(jsonData);
      console.log(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const uploadData = async () => {
    if (users.length) {
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
        });

        if (response.ok) {
          console.log("Datos cargados exitosamente");
        } else {
          console.error("Error al cargar los datos");
        }
      } catch (error) {
        console.error("Error al cargar los datos", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4">Cargar Archivo Excel</h1>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          className="mb-4"
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={uploadData}>
          Cargar Datos
        </button>
        {users.length > 0 && (
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Número de documento
                </th>
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Correo</th>
                <th className="border border-gray-300 px-4 py-2">
                  Número de Teléfono
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {user["número de documento"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user["nombre completo"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user["correo electrónico"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user["teléfono"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
