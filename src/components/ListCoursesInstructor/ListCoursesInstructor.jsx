import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import { Download } from "lucide-react";

export const ListCoursesInstructor = () => {
  const { getTokenFromCookies } = useUserContext();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = getTokenFromCookies();
    const { userId } = jwtDecode(token);

    fetch(
      `https://serverformacion.up.railway.app/api/getCoursesByInstructor/${userId}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCourses(data);
      });
  }, []);

  const handleDownloadEnrolledStudents = async (courseId) => {
    try {
      // Realiza una solicitud para descargar la lista de aprendices inscritos en el curso
      const response = await fetch(
        `https://serverformacion.up.railway.app/api/getEnrolledStudents/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Si la solicitud es exitosa, redirige al usuario a la descarga del archivo
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Lista_de_Aprendices.xlsx"; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        // Maneja cualquier error de descarga aquí
        console.error("Error al descargar la lista de aprendices");
        // Muestra un mensaje de error o realiza alguna otra acción
      }
    } catch (error) {
      console.error("Error al descargar la lista de aprendices:", error);
      // Muestra un mensaje de error o realiza alguna otra acción
    }
  };

  return (
    <div className="w-full h-screen">
      <table className="mt-4 w-full border-collapse border border-slate-300">
        <thead>
          <tr>
            <th className="border border-slate-300 px-4 py-2">Empresa </th>
            <th className="border border-slate-300 px-4 py-2">
              Ficha de la formación
            </th>
            <th className="border border-slate-300 px-4 py-2">
              Radicado del curso
            </th>
            <th className="border border-slate-300 px-4 py-2">
              Nombre de la formación
            </th>
            <th className="border border-slate-300 px-4 py-2">Inscritos</th>
            <th className="border border-slate-300 px-4 py-2">Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr>
              <td className="border border-slate-300 px-4 py-2">
                {course.enterprise.nameEnterprise}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {course.course.courseNumber}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {course.course.radicado}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {course.course.nameCourseConfirmation
                  ? course.course.nameCourseConfirmation
                  : course.course.nameCourse}{" "}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {course.course.inscribeedNumber}/50
              </td>
              <td className="border border-slate-300 px-4 py-2">
                <button className="flex justify-center text-center w-full">
                  <Download
                    onClick={() => handleDownloadEnrolledStudents(course._id)}
                    className="hover:text-emerald-500 transition-all duration-500 cursor-pointer"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
