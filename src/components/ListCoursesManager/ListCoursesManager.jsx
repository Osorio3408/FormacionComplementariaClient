import React from "react";

export const ListCoursesManager = () => {
  return (
    <div className="w-full h-screen">
      <h2 className="text-2xl font-semibold text-center">
        Lista de empleados de la empresa{" "}
        <span className="font-bold text-3xl"></span>
      </h2>
      <table className="mt-4 w-full border-collapse border border-slate-300">
        <thead>
          <tr>
            <th className="border border-slate-300 px-4 py-2">Nro Curso</th>
            <th className="border border-slate-300 px-4 py-2">
              Radicado del curso
            </th>
            <th className="border border-slate-300 px-4 py-2">
              Nombre del curso
            </th>
            <th className="border border-slate-300 px-4 py-2">
              Estado del curso
            </th>
            <th className="border border-slate-300 px-4 py-2">Inscritos</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};
