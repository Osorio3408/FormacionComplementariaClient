import React, { useEffect, useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

export const ListCoursesManager = ({ Employee }) => {
  const [nit, setNit] = useState("");
  const [courses, setCourses] = useState([]);
  const [documentNumber, setDocumentNumber] = useState();
  const { getTokenFromCookies } = useUserContext();

  useEffect(() => {
    const token = getTokenFromCookies();
    const { nit, userId } = jwtDecode(token);
    setDocumentNumber(userId);
    console.log(userId);
    setNit(nit);
  }, []);

  useEffect(() => {
    if (nit) {
      fetch(
        `https://serverformacion.up.railway.app/api/getCoursesEnterprise/${nit}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setCourses(res);
        });
    }
  }, [nit]);

  useEffect(() => {
    // Esta función verificará la inscripción del usuario en cada curso
    const checkUserInCourses = async () => {
      try {
        const token = getTokenFromCookies();
        const { userId } = jwtDecode(token);
        console.log(userId);

        const updatedCourses = await Promise.all(
          courses.map(async (course) => {
            const response = await fetch(
              `https://serverformacion.up.railway.app/api/checkUserInCourse/${course._id}/${userId}`,
              {
                method: "GET",
              }
            );

            if (response.status === 200) {
              const data = await response.json();
              console.log(data);
              return {
                ...course,
                isUserInCourse: data.isUserInCourse,
              };
            }

            return course;
          })
        );

        setCourses(updatedCourses);
      } catch (error) {
        console.error(
          "Error al verificar la inscripción del usuario en los cursos:",
          error
        );
      }
    };

    // Llama a la función para verificar la inscripción cuando cambie la lista de cursos
    checkUserInCourses();
  }, []);

  const estadoCurso = {
    1: "Pendiente",
    2: "En proceso",
    3: "En curso",
    4: "Finalizado",
    5: "Cancelado",
  };

  // Filtra los cursos basados en la condición
  const filteredCourses = courses.filter((course) => {
    // Si Employee es FALSO, muestra todos los cursos
    if (!Employee) {
      return true;
    }
    // Si Employee es TRUE, verifica el estado del curso
    return course.idState === 2 || course.idState === 3; // Muestra "En proceso" o "En curso"
  });

  const enrollUserInCourse = async (courseId) => {
    try {
      const token = getTokenFromCookies();
      const { userId } = jwtDecode(token);
      console.log(userId);

      const response = await fetch(
        `https://serverformacion.up.railway.app/api/enrollUserInCourse/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (response.status === 200) {
        toast.success("Se inscribió correctamente");
      }
    } catch (error) {
      console.error("Error al inscribir al usuario en el curso:", error);
    }
  };

  return (
    <div className="w-full h-screen">
      <h2 className="text-2xl font-semibold text-center">
        Lista de cursos de la empresa{" "}
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
            {Employee ? (
              <th className="border border-slate-300 px-4 py-2">Inscribirse</th>
            ) : (
              <th className="border border-slate-300 px-4 py-2">Inscritos</th>
            )}
          </tr>
        </thead>
        <tbody>
          {/* {courses.length === 0 && <p>Cargando cursos...</p>} */}

          {filteredCourses.map((course) => (
            <tr key={course._id}>
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
              {Employee ? (
                <td className="border border-slate-300 px-4 py-2 text-center">
                  {course.inscribed.length === 0 ||
                  !course.inscribed.includes(documentNumber) ? (
                    <button
                      onClick={() => {
                        enrollUserInCourse(course._id);
                      }}
                      className="bg-blue-600 text-white px-8 py-2 rounded-md">
                      Inscribirse
                    </button>
                  ) : (
                    <p className="font-medium">Registrado</p>
                  )}
                </td>
              ) : (
                <td className="border border-slate-300 px-4 py-2">
                  {course.course.inscribeedNumber}/50
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
