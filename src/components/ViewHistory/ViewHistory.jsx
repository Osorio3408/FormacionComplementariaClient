import jsPDF from "jspdf";
import { FilePlus2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import "jspdf-autotable"; // Importa la extensión para tablas

export const ViewHistory = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Realiza la solicitud FETCH para obtener el historial
    //https://serverformacion.up.railway.app
    fetch("http://localhost:3000/api/getHistory")
      .then((response) => response.json())
      .then((data) => {
        // Almacena los datos del historial en el estado
        setHistoryData(data);
      })
      .catch((error) => {
        console.error("Error al obtener el historial:", error);
      });
  }, []);

  const generatePDF = () => {
    // Crea una nueva instancia de jsPDF
    const doc = new jsPDF();

    // Define el contenido del PDF, por ejemplo, el historial de cambios
    const historyRows = historyData.map((historyItem, index) => [
      index + 1,
      historyItem.title,
      historyItem.description,
      historyItem.documentNumber,
      new Date(historyItem.createdAt).toLocaleString(),
      historyItem.companyName, // Nombre de la empresa
    ]);

    // Encabezados de la tabla
    const headers = [
      "#",
      "Título",
      "Descripción",
      "Número de Documento",
      "Fecha de Creación",
      "Nombre de la Empresa",
    ];

    // Define las opciones de estilo para la tabla
    const tableOptions = {
      startY: 20, // Posición vertical de inicio de la tabla
      margin: { top: 20 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      bodyStyles: { textColor: 0 },
    };

    // Agrega la tabla al PDF
    doc.autoTable(headers, historyRows, tableOptions);

    // Agrega el título del PDF
    doc.setFontSize(16);
    doc.text("Historial de Cambios", 14, 15);

    // Guarda o descarga el PDF (puedes personalizar el nombre del archivo)
    doc.save("historial.pdf");
  };
  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="flex justify-between flex-row-reverse">
        <button
          onClick={generatePDF}
          className="bg-blue-500 flex items-center gap-x-2 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4">
          Generar PDF
          <span>
            <FilePlus2 size={16} />
          </span>
        </button>
        <h2 className="text-2xl font-bold mb-4">Historial de Cambios</h2>
      </div>
      <ul>
        {historyData.map((historyItem) => (
          <li key={historyItem._id} className="mb-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold mb-2">
                  Titutlo: {historyItem.title}
                </h3>
                <span className="text-md text-gray-500">
                  {historyItem.companyName}
                </span>
              </div>
              <p className="text-gray-700">
                Descripción: {historyItem.description}
              </p>
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
