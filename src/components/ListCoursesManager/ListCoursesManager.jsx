import React, { useEffect, useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import jwtDecode from "jwt-decode";

export const ListCoursesManager = () => {
  const [nit, setNit] = useState("");
  const [courses, setCourses] = useState([]);
  const { getTokenFromCookies } = useUserContext();
  // Obtener las opciones de empresas desde la API

  useEffect(() => {
    const token = getTokenFromCookies();
    const { nit } = jwtDecode(token);
    setNit(nit);
  }, []);

  useEffect(() => {
    if (nit) {
      fetch(`http://localhost:3000/api/getCoursesEnterprise/${nit}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setCourses(res);
        });
    }
  });

  const estadoCurso = {
    1: "Pendiente",
    2: "En proceso",
    3: "En curso",
    4: "Finalizado",
    5: "Cancelado",
  };
  return (
    <div className="w-full h-screen">
      <h2 className="text-2xl font-semibold text-center">
        Lista de empleados de la empresa{" "}
        <span className="font-bold text-3xl"></span>
      </h2>
      <table className="mt-4 w-full border-collapse border border-slate-300">
        <thead>
          <tr>
            <th className="border border-slate-300 px-4 py-2">
              Ficha de la formación
            </th>
            <th className="border border-slate-300 px-4 py-2">
              Radicado del curso
            </th>
            <th className="border border-slate-300 px-4 py-2">
              Nombre de la formación
            </th>
            <th className="border border-slate-300 px-4 py-2">
              Estado de la formación
            </th>
            <th className="border border-slate-300 px-4 py-2">Inscritos</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr>
              <td className="border border-slate-300 px-4 py-2">
                {course.course.courseNumber
                  ? course.course.couseNumber
                  : "PENDIENTE"}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {course.course.radicado ? course.course.radicado : "PENDIENTE"}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {course.course.nameCourseConfirmation
                  ? course.course.nameCourseConfirmation
                  : course.course.nameCourse}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {estadoCurso[course.idState]}
              </td>
              <td className="border border-slate-300 px-4 py-2">0/0</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
