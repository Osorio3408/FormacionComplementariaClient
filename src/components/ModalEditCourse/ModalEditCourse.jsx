import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HistoryModal } from "../../pages/HistoryModal/HistoryModal";

export const ModalEditCourse = ({ assignedCourse, onClose }) => {
  //Se crea data para simplificar la asignacións de valores del curso.
  const data = assignedCourse;
  console.log(data);

  const [formData, setFormData] = useState({
    nameEnterprise: data.enterprise.nameEnterprise,
    cityEnterprise: data.enterprise.cityEnterprise,
    nit: data.enterprise.nit,
    nameManager: data.enterprise.manager.nameManager,
    cellphoneManager: data.enterprise.manager.cellphoneManager,
    emailManager: data.enterprise.manager.emailManager,
    courseNumber: data.course.courseNumber,
    nameCourse: data.course.nameCourse,
    nameCourseAssigned: data.course.nameCourseAssigned,
    radicado: data.course.radicado,
    nis: data.course.nis,
    instructor: data.course.instructor,
    responseDate: data.course.responseDate,
    startDate: data.course.startDate,
    contactDate: data.createdAt,
    radicadoConfirmation: data.course.radicadoConfirmation,
    state: data.idState,
    documentNumberTeacher: data.documentNumberTeacher,
    inscribeedNumber: data.course.inscribeedNumber,
  });

  // Nuevo estado para almacenar la lista de instructores
  const [instructors, setInstructors] = useState([]);

  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Nuevo estado para almacenar la selección del instructor
  const [selectedInstructor, setSelectedInstructor] = useState(
    data.course.instructor // Establece el instructor actual como seleccionado por defecto
  );
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

  //Fecha de contacto formateada para que el input tipo datetime-local la pueda leer
  const formattedDate = new Date(formData.contactDate)
    .toISOString()
    .slice(0, 16);

  const handleShowHistoryModal = () => {
    setShowHistoryModal(true);
  };

  const handleUpdateCourse = async () => {
    try {
      const updatedCourse = {
        enterprise: {
          nameEnterprise: formData.nameEnterprise,
          nit: formData.nit,
          cityEnterprise: formData.cityEnterprise,
          manager: {
            nameManager: formData.nameManager,
            cellphoneManager: formData.cellphoneManager,
            emailManager: formData.emailManager,
          },
        },
        course: {
          courseNumber: formData.courseNumber,
          nameCourse: formData.nameCourse,
          nameCourseAssigned: formData.nameCourseAssigned,
          radicado: formData.radicado,
          nis: formData.nis,
          instructor: selectedInstructor, // Usa el instructor seleccionado
          responseDate: formData.responseDate,
          startDate: formData.startDate,
          radicadoConfirmation: formData.radicadoConfirmation,
          inscribeedNumber: formData.inscribeedNumber,
          minRequirement: data.course.minRequirement, // No tengo el valor actual de minRequirement en formData, así que lo tomo de data
        },
        documentNumberTeacher: selectedInstructor
          ? instructors.find(
              (instructor) => instructor.nameUser === selectedInstructor
            )?.documentNumber || ""
          : "", // Obtiene el documentNumber del instructor seleccionado
        idState: formData.state,
      };

      const response = await fetch(
        `https://serverformacion.up.railway.app/api/updateCourse/${assignedCourse._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCourse),
        }
      );

      console.log(response);
      if (response.status === 200) {
        // El curso se actualizó correctamente
        toast.success("Curso actualizado exitosamente");
        onClose(); // Cierra el modal después de la actualización
      } else {
        // Maneja errores si es necesario
        toast.error("Error al actualizar el curso");
      }
    } catch (error) {
      toast.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300`}>
      <div className="bg-white max-w-[85rem] w-full px-8 pt-5 pb-10 rounded-lg shadow-lg relative h-[550px] overflow-y-scroll md:overflow-auto">
        <h2 className="text-4xl font-semibold mb-4 text-center">
          Creación y Asignación de Formación
        </h2>
        <span className="absolute top-5 right-8" onClick={onClose}>
          <X size={18} className="cursor-pointer" />
        </span>

        <form
          onSubmit={handleUpdateCourse}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 place-content-center">
          {/* Columna izquierda */}
          <div>
            {/* Empresa */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Empresa
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly // Esto evita que el usuario modifique este campo
                value={formData.nameEnterprise}
                onChange={(e) =>
                  setFormData({ ...formData, nameEnterprise: e.target.value })
                }
              />
            </div>

            {/* Datos de la Empresa seleccionada */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Ciudad
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly // Esto evita que el usuario modifique este campo
                value={formData.cityEnterprise}
                onChange={(e) =>
                  setFormData({ ...formData, cityEnterprise: e.target.value })
                }
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Nombre del Encargado (Manager)
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly
                value={formData.nameManager}
                onChange={(e) =>
                  setFormData({ ...formData, nameManager: e.target.value })
                }
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Teléfono del Manager
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly
                value={formData.cellphoneManager}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cellphoneManager: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Correo del Manager
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                readOnly
                value={formData.emailManager}
                onChange={(e) =>
                  setFormData({ ...formData, emailManager: e.target.value })
                }
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                NIS
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.nis}
                onChange={(e) =>
                  setFormData({ ...formData, nis: e.target.value })
                }
              />
            </div>
          </div>

          {/* Columna del medio */}
          <div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Confirmación del Radicado
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.radicadoConfirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    radicadoConfirmation: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Radicado
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.radicado}
                onChange={(e) =>
                  setFormData({ ...formData, radicado: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Fecha de contácto
              </label>
              <input
                type="datetime-local"
                disabled
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formattedDate}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Fecha de Respuesta
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.responseDate}
                onChange={(e) =>
                  setFormData({ ...formData, responseDate: e.target.value })
                }
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Fecha de Inicio
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Fecha de Finalización
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.courseNumber}
                onChange={(e) =>
                  setFormData({ ...formData, courseNumber: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Formación solicitada
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.nameCourse}
                onChange={(e) =>
                  setFormData({ ...formData, nameCourse: e.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Formación Asignada
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.nameCourseAssigned}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nameCourseAssigned: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Número de aprendices actuales
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.inscribeedNumber}
                readOnly
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700">
                Instructor
              </label>
              <select
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.target.value)}
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
                Estado
              </label>
              <select
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                <option value="1">Pendiente</option>
                <option value="2">En proceso</option>
                <option value="3">En curso</option>
                <option value="4">Finalizado</option>
                <option value="5">Cancelado</option>
              </select>
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
            onClick={handleShowHistoryModal}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Guardar Cambios
          </button>
        </div>
      </div>
      {showHistoryModal && (
        <HistoryModal
          nit={formData.nit}
          isOpen={showHistoryModal}
          onClose={() => {
            setShowHistoryModal(false);
          }}
          onSaveHistory={() => {
            // Luego, llama a la función para actualizar el curso
            handleUpdateCourse();
          }}
        />
      )}
    </div>
  );
};
