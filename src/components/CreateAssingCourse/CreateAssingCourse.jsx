import { MoreHorizontal, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ModalCreateCourse } from "../ModalCreateCourse/ModalCreateCourse";
import { ModalEditCourse } from "../ModalEditCourse/ModalEditCourse";

export const CreateAssingCourse = () => {
  const [openModalCreateCourse, setOpenModalCreateCourse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [assignedCourse, setAssignedCourse] = useState();
  const [openModalEditCourse, setOpenModalEditCourse] = useState(false);

  useEffect(() => {
    fetch("https://serverformacion.up.railway.app/api/getCourses")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setCourses(res);
        console.log(res);
      });
  }, [openModalCreateCourse, openModalEditCourse]);

  const estadoCurso = {
    1: "Pendiente",
    2: "En proceso",
    3: "En curso",
    4: "Finalizado",
    5: "Cancelado",
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full flex justify-end">
        <button
          onClick={() => {
            setOpenModalCreateCourse(true);
          }}
          className="flex group/btn items-center bg-blue-500 text-white px-4 py-2 gap-x-3 text-lg rounded-md hover:bg-blue-600">
          Crear formación{" "}
          <Plus
            className="group-hover/btn:rotate-180 transition-all duration-1000"
            size={18}
          />
        </button>
      </div>
      <table className="mt-4 w-full border-collapse border border-slate-300">
        <thead>
          <tr>
            <th className="border border-slate-300 px-4 py-2">Ficha</th>
            <th className="border border-slate-300 px-4 py-2">Formación</th>
            <th className="border border-slate-300 px-4 py-2">Empresa</th>
            <th className="border border-slate-300 px-4 py-2">Instructor</th>
            <th className="border border-slate-300 px-4 py-2">Estado</th>
            <th className="border border-slate-300 px-4 py-2">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr>
              <td className="border border-slate-300 px-4 py-2">
                {course.course.courseNumber === ""
                  ? "NO ASIGNADO"
                  : course.course.courseNumber}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {course.course.nameCourseAssigned === ""
                  ? course.course.nameCourse
                  : course.course.nameCourseAssigned}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {course.enterprise.nameEnterprise === ""
                  ? "NO ASIGNADO"
                  : course.enterprise.nameEnterprise}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {course.course.instructor === ""
                  ? "NO ASIGNADO"
                  : course.course.instructor}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {estadoCurso[course.idState]}
              </td>
              <td className="border border-slate-300 px-4 py-2 text-center">
                <span
                  className="flex justify-center"
                  onClick={() => {
                    setOpenModalEditCourse(true);
                    setAssignedCourse(course);
                  }}>
                  <MoreHorizontal
                    className="rotate-90 hover:rotate-0 duration-500 hover:text-indigo-600 transition-all cursor-pointer"
                    size={24}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openModalCreateCourse && (
        <ModalCreateCourse
          onClose={() => {
            setOpenModalCreateCourse(false);
          }}
        />
      )}
      {openModalEditCourse && (
        <ModalEditCourse
          assignedCourse={assignedCourse}
          onClose={() => {
            setOpenModalEditCourse(false);
          }}
        />
      )}
    </div>
  );
};
