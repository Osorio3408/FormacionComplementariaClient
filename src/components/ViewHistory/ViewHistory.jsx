import React, { useState, useEffect } from "react";

export const ViewHistory = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Realiza la solicitud FETCH para obtener el historial
    fetch("https://serverformacion.up.railway.app/api/getHistory")
      .then((response) => response.json())
      .then((data) => {
        // Almacena los datos del historial en el estado
        setHistoryData(data);
      })
      .catch((error) => {
        console.error("Error al obtener el historial:", error);
      });
  }, []);

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Historial de Cambios</h2>
      <ul>
        {historyData.map((historyItem) => (
          <li key={historyItem._id} className="mb-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-2">
                {historyItem.title}
              </h3>
              <p className="text-gray-700">{historyItem.description}</p>
              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <div>Número de Documento: {historyItem.documentNumber}</div>
                <div>
                  Fecha de Creación:{" "}
                  {new Date(historyItem.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
