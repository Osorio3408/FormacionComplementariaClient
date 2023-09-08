import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../../Context/UserContext";
import jwtDecode from "jwt-decode";

export const ModalCreateCourse = ({ onClose }) => {
  // Nuevo estado para almacenar la lista de instructores
  const [instructors, setInstructors] = useState([]);

  // Nuevo estado para almacenar la selección del instructor
  const [selectedInstructor, setSelectedInstructor] = useState("");

  // Estado para almacenar el documento del instructor seleccionado
  const [selectedInstructorDocument, setSelectedInstructorDocument] =
    useState("");

  useEffect(() => {
    // Obtener la lista de instructores del backend
    fetch("https://serverformacion.up.railway.app/api/getInstructors")
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado con la lista de instructores
        setInstructors(data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de instructores", error);
      });
  }, []);

  // Estado para todos los campos del formulario
  const [formData, setFormData] = useState({
    nameEnterprise: "",
    nit: "",
    cityEnterprise: "",
    nameManager: "",
    cellphoneManager: "",
    emailManager: "",
    courseNumber: "",
    nameCourse: "",
    nameCourseAssigned: "",
    radicado: "",
    nis: "",
    instructor: selectedInstructor,
    responseDate: "",
    startDate: "",
    finishDate: "",
    minRequirement: 0,
    radicadoConfirmation: "",
    inscribeedNumber: 0,
    documentNumberTeacher: selectedInstructorDocument,
    documentNumber: "",
  });

  // Estado para almacenar las opciones de empresas
  const [empresasOptions, setEmpresasOptions] = useState([]);

  const { getTokenFromCookies } = useUserContext();

  // Obtener las opciones de empresas desde la API
  useEffect(() => {
    fetch("https://serverformacion.up.railway.app/api/enterprises") // Ajusta la URL de la API según tu configuración
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
    setFormData((prevData) => ({
      ...prevData,
      documentNumber: userId,
    }));
  }, []);

  // Función para cargar los detalles de la empresa seleccionada
  const cargarDetallesEmpresa = (nameEnterprise) => {
    fetch(
      `https://serverformacion.up.railway.app/api/enterprise/${nameEnterprise}`
    ) // Ajusta la URL de la API según tu configuración
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Actualiza el estado con los detalles de la empresa
        setFormData((prevData) => ({
          ...prevData,
          cityEnterprise: data.enterprise.cityEnterprise,
          emailManager: data.enterprise.manager.emailUser,
          nameManager: data.enterprise.manager.nameUser,
          cellphoneManager: data.enterprise.manager.cellphoneNumberUser,
          nit: data.enterprise.nit,
          // ... (otros campos)
        }));
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la empresa", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.instructor);
      const response = await fetch(
        "https://serverformacion.up.railway.app/api/newCourse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData, // Envía todos los campos del formulario en el cuerpo de la solicitud
            idState: 1,
          }),
        }
      );

      if (response.status === 201) {
        // El curso se creó exitosamente
        toast.success("Curso creado exitosamente!");
        onClose(); // Cierra el modal después de crear el curso
      } else {
        // Maneja cualquier otro estado de respuesta, por ejemplo, error de validación
        const data = await response.json();
        toast.error(`Error al crear el curso: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al crear el curso", error);
      toast.error("Error al crear el curso desde el servidor");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Actualiza el estado de formData
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Si el campo modificado es "instructor", actualiza también "documentNumberTeacher"
    if (name === "instructor") {
      const selectedInstructorData = instructors.find(
        (instructor) => instructor.nameUser === value
      );

      setSelectedInstructorDocument(
        selectedInstructorData?.documentNumber || ""
      );

      // Actualiza el instructor seleccionado en formData
      setFormData((prevData) => ({
        ...prevData,
        instructor: value,
        documentNumberTeacher: selectedInstructorData?.documentNumber || "",
      }));
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
              <label className="block text-sm font-bold text-gray-700">
                Empresa
              </label>
              <select
                name="nameEnterprise"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.nameEnterprise}
                onChange={(e) => {
                  handleInputChange(e);
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
              <label className="block text-sm font-bold text-gray-700">
                Ciudad
              </label>
              <input
                type="text"
                name="cityEnterprise"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly // Esto evita que el usuario modifique este campo
                value={formData.cityEnterprise}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Nombre del Encargado (Manager)
              </label>
              <input
                type="text"
                name="nameManager"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly
                value={formData.nameManager}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Teléfono del Manager
              </label>
              <input
                type="text"
                name="cellphoneManager"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly
                value={formData.cellphoneManager}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Correo del Manager
              </label>
              <input
                type="text"
                name="emailManager"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly
                value={formData.emailManager}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Radicado
              </label>
              <input
                type="text"
                name="radicado"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.radicado}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Confirmación del Radicado
              </label>
              <input
                type="text"
                name="radicadoConfirmation"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.radicadoConfirmation}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                NIS
              </label>
              <input
                type="text"
                name="nis"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.nis}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Columna derecha */}
          <div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Número de Ficha
              </label>
              <input
                type="text"
                name="courseNumber"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.courseNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Formación solicitada
              </label>
              <input
                type="text"
                name="nameCourse"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.nameCourse}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Formación programada
              </label>
              <input
                type="text"
                name="nameCourseAssigned"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.nameCourseAssigned}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Instructor
              </label>
              <select
                name="instructor"
                value={formData.instructor}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                <option value="">Selecciona un instructor</option>
                {instructors.map((instructor) => (
                  <option
                    key={instructor.documentNumber}
                    value={instructor.nameUser}>
                    {instructor.nameUser}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Minimo de aprendices requeridos
              </label>
              <input
                type="number"
                name="minRequirement"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.minRequirement}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Fecha de Respuesta
              </label>
              <input
                type="date"
                name="responseDate"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.responseDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Fecha de Inicio
              </label>
              <input
                type="date"
                name="startDate"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Fecha de Finalización
              </label>
              <input
                type="date"
                name="finishDate"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.finishDate}
                onChange={handleInputChange}
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
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
