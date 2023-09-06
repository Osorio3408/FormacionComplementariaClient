import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

export const ModalEditCourse = ({ assignedCourse, onClose }) => {
  //Se crea data para simplificar la asignación de valores del curso.
  const data = assignedCourse;

  const [nameEnterprise, setNameEnterprise] = useState(
    data.enterprise.nameEnterprise
  );
  const [nit, setNit] = useState(data.enterprise.nit);
  const [cityEnterprise, setCityEnterprise] = useState(
    data.enterprise.cityEnterprise
  );
  const [nameManager, setNameManager] = useState(
    data.enterprise.manager.nameManager
  );
  const [cellphoneManager, setCellphoneManager] = useState(
    data.enterprise.manager.cellphoneManager
  );
  const [emailManager, setEmailManager] = useState(
    data.enterprise.manager.emailManager
  );
  const [courseNumber, setCourseNumber] = useState(data.course.courseNumber);
  const [nameCourse, setNameCourse] = useState(data.course.nameCourse);
  const [nameCourseAssigned, setNameCourseAssigned] = useState(
    data.course.nameCourseAssigned
  );
  const [radicado, setRadicado] = useState(data.course.radicado);
  const [nis, setNis] = useState(data.course.nis);
  const [instructor, setInstructor] = useState(data.course.instructor);
  const [responseDate, setResponseDate] = useState(data.course.responseDate);
  const [startDate, setStartDate] = useState(data.course.startDate);
  const [contactDate, setContactDate] = useState(data.createdAt);
  //Fecha de contacto formateada para que el input tipo datetime-local la pueda leer
  const formattedDate = new Date(contactDate).toISOString().slice(0, 16);

  const [radicadoConfirmation, setRadicadoConfirmation] = useState(
    data.course.radicadoConfirmation
  );
  const [state, setState] = useState(data.idState);
  const [documentNumberAdmin, setDocumentNumberAdmin] = useState("");

  // Función para formatear una fecha en formato legible
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const date = new Date(dateString);

    // Verifica si la fecha es válida antes de formatearla
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString("es-ES", options);
    } else {
      // Si la fecha no es válida, devuelve una cadena vacía o un mensaje de error
      return "";
    }
  };

  // Manejar cambios en el campo de fecha y hora
  const handleContactDateChange = (e) => {
    // Convierte el valor del input a un objeto Date
    const selectedDate = new Date(e.target.value);
    // Formatea el objeto Date y establece el resultado en el estado
    setContactDate(formatDate(selectedDate));
  };

  const handleSubmit = () => {};
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300`}>
      <div className="bg-white max-w-7xl w-full px-8 pt-5 pb-10 rounded-lg shadow-lg relative">
        <h2 className="text-4xl font-semibold mb-4 text-center">
          Creación y Asignación de Formación
        </h2>
        <span className="absolute top-5 right-8" onClick={onClose}>
          <X size={18} className="cursor-pointer" />
        </span>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div>
            {/* Empresa */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Empresa
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly // Esto evita que el usuario modifique este campo
                value={nameEnterprise}
                onChange={(e) => setNameEnterprise(e.target.value)}
              />
            </div>

            {/* Datos de la Empresa seleccionada */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Ciudad
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly // Esto evita que el usuario modifique este campo
                value={cityEnterprise}
                onChange={(e) => setCityEnterprise(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Nombre del Encargado (Manager)
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly
                value={nameManager}
                onChange={(e) => setNameManager(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Teléfono del Manager
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly
                value={cellphoneManager}
                onChange={(e) => setCellphoneManager(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Correo del Manager
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly
                value={emailManager}
                onChange={(e) => setEmailManager(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                NIS
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={nis}
                onChange={(e) => setNis(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Confirmación del Radicado
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={radicadoConfirmation}
                onChange={(e) => setRadicadoConfirmation(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Radicado
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={radicado}
                onChange={(e) => setRadicado(e.target.value)}
              />
            </div>
          </div>

          {/* Columna derecha */}
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Número de Ficha
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={courseNumber}
                onChange={(e) => setCourseNumber(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Formación solicitada
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={nameCourse}
                onChange={(e) => setNameCourse(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Formación asignada
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={nameCourseAssigned}
                onChange={(e) => setNameCourseAssigned(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Instructor
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Respuesta
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={responseDate}
                onChange={(e) => setResponseDate(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Inicio
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                <option value="1">Pendiente</option>
                <option value="2">En proceso</option>
                <option value="3">En curso</option>
                <option value="4">Finalizado</option>
                <option value="5">Cancelado</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Fecha de contácto
              </label>
              <input
                type="datetime-local"
                disabled
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formattedDate}
                onChange={handleContactDateChange}
              />
            </div>
          </div>
        </form>

        <div className="flex justify-end mt-5">
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 mr-4 hover:border-red-500 hover:border px-3 rounded-md">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Guardar Cambioss
          </button>
        </div>
      </div>
    </div>
  );
};
