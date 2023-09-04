import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../../Context/UserContext";
import jwtDecode from "jwt-decode";

export const ModalCreateCourse = ({ onClose }) => {
  // Estados para los campos de entrada
  const [nameEnterprise, setNameEnterprise] = useState("");
  const [nit, setNit] = useState("");
  const [cityEnterprise, setCityEnterprise] = useState("");
  const [nameManager, setNameManager] = useState("");
  const [telefonoEmpresa, setTelefonoEmpresa] = useState("");
  const [cellphoneManager, setCellphoneManager] = useState("");
  const [emailManager, setEmailManager] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [nameCourse, setNameCourse] = useState("");
  const [radicado, setRadicado] = useState("");
  const [nis, setNis] = useState("");
  const [instructor, setInstructor] = useState("");
  const [responseDate, setResponseDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [radicadoConfirmation, setRadicadoConfirmation] = useState("");
  const [documentNumberAdmin, setDocumentNumberAdmin] = useState("");
  // Estado para almacenar las opciones de empresas
  const [empresasOptions, setEmpresasOptions] = useState([]);

  const { getTokenFromCookies } = useUserContext();
  // Obtener las opciones de empresas desde la API
  useEffect(() => {
    fetch("http://localhost:3000/api/enterprises") // Ajusta la URL de la API según tu configuración
      .then((response) => response.json())
      .then((data) => {
        const nameEnterpriseArray = data.map((item) => item.nameEnterprise);
        setEmpresasOptions(nameEnterpriseArray);
      })
      .catch((error) => {
        console.error("Error al obtener las empresas", error);
      });
  }, []);

  useEffect(() => {
    const token = getTokenFromCookies();
    const { userId } = jwtDecode(token);
    console.log(userId);
    setDocumentNumberAdmin(userId);
  }, []);

  // Función para cargar los detalles de la empresa seleccionada
  const cargarDetallesEmpresa = (nameEnterprise) => {
    fetch(`http://localhost:3000/api/enterprise/${nameEnterprise}`) // Ajusta la URL de la API según tu configuración
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Actualiza los estados con los detalles de la empresa
        setCityEnterprise(data.enterprise.cityEnterprise);
        setEmailManager(data.enterprise.manager.emailUser);
        setNameManager(data.enterprise.manager.nameUser);
        setCellphoneManager(data.enterprise.manager.cellphoneNumberUser);
        setTelefonoEmpresa(data.enterprise.cellphoneNumberEnterprise);
        setNit(data.enterprise.nit);

        // ... (otros campos)
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la empresa", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/newCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nit,
          nameEnterprise,
          cityEnterprise,
          nameManager,
          cellphoneManager,
          emailManager,
          courseNumber,
          nameCourse,
          radicado,
          nis,
          instructor,
          responseDate,
          startDate,
          radicadoConfirmation,
          documentNumber: documentNumberAdmin,
          idState: 1,
        }),
      });

      if (response.status === 201) {
        // El curso se creó exitosamente
        toast.success("Curso creado exitosamente!");
        onClose(); // Cierra el modal después de crear el curso
      } else {
        // Maneja cualquier otro estado de respuesta, por ejemplo, error de validación
        const data = await response.json();
        // alert(`Error al crear el curso: ${data.message}`);
        toast.error(`Error al crear el curso: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al crear el curso", error);
      toast.error("Error al crear el curso desde el servidor");
    }
  };

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
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={nameEnterprise}
                onChange={(e) => {
                  setNameEnterprise(e.target.value);
                  cargarDetallesEmpresa(e.target.value); // Carga los detalles de la empresa seleccionada
                }}>
                <option value="">Seleccione una empresa</option>
                {empresasOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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
                Teléfono de la Empresa
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly
                value={telefonoEmpresa}
                onChange={(e) => setTelefonoEmpresa(e.target.value)}
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
                Confirmación del Radicado
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={radicadoConfirmation}
                onChange={(e) => setRadicadoConfirmation(e.target.value)}
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
                Nombre del curso
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
                Radicado
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={radicado}
                onChange={(e) => setRadicado(e.target.value)}
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
