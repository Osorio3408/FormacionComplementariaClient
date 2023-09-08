import { Loader } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

export const Upload = ({ nit }) => {
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para el loader
  const [tableVisible, setTableVisible] = useState(true); // Estado para la tabla
  const inputFileRef = useRef(null); // Referencia al input

  console.log(nit);

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

      const usersWithRoleAndId = jsonData.map((user) => ({
        nameUser: user["Nombre completo"],
        documentType: user["Tipo de documento"],
        documentNumber: user["Número de documento"],
        cellphoneNumberUser: user["Teléfono"],
        emailUser: user["correo electrónico"],
        rol: "Employee",
        nit: nit,
        password: "a2rjdksir384jfvnm",
      }));

      setNewUsers(usersWithRoleAndId);
    };

    reader.readAsArrayBuffer(file);
  };

  const uploadData = async () => {
    console.log(newUsers);
    if (newUsers.length) {
      try {
        setLoading(true); // Mostrar el loader
        setTableVisible(false); // Ocultar la tabla

        const response = await fetch(
          "https://serverformacion.up.railway.app/api/newEmployees",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUsers),
          }
        );

        setLoading(false); // Ocultar el loader
        setTableVisible(true); // Mostrar la tabla
        inputFileRef.current.value = null; // Limpiar el input

        if (response.ok) {
          toast.success("Usuarios creados exitosamente");
          setUsers([]);
          setNewUsers([]);
        } else {
          console.error("Error al cargar los datos");
        }
      } catch (error) {
        setLoading(false); // Ocultar el loader en caso de error
        console.error("Error al cargar los datos", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md flex flex-col justify-center items-center gap-6 rounded-md w-full md:w-3/4 lg:w-2/3 xl:w-[80%]">
        <h2 className="text-2xl font-semibold mb-4">
          Cargar Usuarios Desde Excel
        </h2>
        <div className="mb-4">
          <input
            ref={inputFileRef}
            type="file"
            id="file"
            accept=".xlsx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="file"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full md:w-1/2 lg:w-1/3 xl:w-1/4 text-center">
            Seleccionar Archivo Excel
          </label>
        </div>

        {loading && (
          <div className="w-full h-full bg-neutral-950 z-0 opacity-90 fixed top-0 left-0 flex items-center justify-center">
            <Loader size={40} className="fixed z-50 text-white animate-spin" />
          </div>
        )}
        {tableVisible && users.length > 0 && (
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Número de documento
                </th>
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">
                  Tipo de documento
                </th>

                <th className="border border-gray-300 px-4 py-2">
                  Número de telefono
                </th>
                <th className="border border-gray-300 px-4 py-2">Correo</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {user["Número de documento"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user["Nombre completo"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user["Tipo de documento"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user["Teléfono"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user["correo electrónico"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button
          className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
            newUsers.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={uploadData}
          disabled={newUsers.length === 0}>
          Cargar Datos
        </button>
      </div>
    </div>
  );
};
