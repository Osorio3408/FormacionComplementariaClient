import { X, Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AddEmployee = ({ onClose, nit, fetchEmployees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Estado para almacenar el empleado seleccionado
  const [allEmployees, setAllEmployees] = useState([]); // Estado para almacenar todos los empleados sin empresa

  useEffect(() => {
    fetch(
      "https://serverformacion.up.railway.app/api/getEmployeesWithoutCompany"
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setAllEmployees(res);
      });
  }, []);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleSaveEmployee = () => {
    try {
      // Verifica que se haya seleccionado un empleado y que se haya ingresado un NIT
      if (!selectedEmployee || !nit) {
        // Puedes mostrar un mensaje de error o realizar la validación que desees aquí
        console.error(
          "Por favor, selecciona un empleado y proporciona un NIT."
        );
        return;
      }

      // Convierte el documentNumber a número antes de enviarlo al servidor
      const data = {
        nit: nit,
        documentNumber: selectedEmployee.documentNumber,
      };

      // Realiza una solicitud POST al servidor para asignar el NIT al empleado
      fetch("https://serverformacion.up.railway.app/api/assignNITToEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error al asignar NIT al empleado.");
          }
          return res.json();
        })
        .then((res) => {
          toast.success("Empleado agregado correctamente");
          fetchEmployees();
          // Puedes realizar alguna acción adicional aquí si es necesario
        })
        .catch((error) => {
          console.error("Error:", error);
          // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error al usuario
        });
    } catch (error) {
      console.error("Error:", error);
    }

    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300`}>
      <div className="bg-white max-w-3xl w-full px-8 pt-5 pb-10 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-semibold mb-8">Buscar Empleados</h2>
        <span className="absolute top-5 right-8">
          <X size={18} onClick={onClose} className="cursor-pointer" />
        </span>
        {/* Campo de búsqueda */}

        {/* Campo de selección para todos los empleados sin empresa */}
        <div className="mb-4">
          <select
            className="w-full border border-gray-300 px-3 h-10 py-2 rounded-md"
            onChange={(e) =>
              handleEmployeeSelect(
                allEmployees.find(
                  (employee) =>
                    employee.documentNumber === parseInt(e.target.value)
                )
              )
            }>
            <option value="">Selecciona un empleado</option>
            {allEmployees.map((employee) => (
              <option
                key={employee.documentNumber}
                value={employee.documentNumber}>
                {employee.nameUser} - {employee.documentNumber}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end mt-2 items-center gap-x-4">
          {/* Botón para guardar el empleado seleccionado */}
          {selectedEmployee && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              onClick={handleSaveEmployee}>
              Guardar Empleado
            </button>
          )}
          <button
            className="text-white bg-red-500 mr-4 py-2 px-6 rounded-md"
            onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
