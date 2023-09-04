import { Plus } from "lucide-react";
import React, { useState } from "react";
import { ModalCreateCourse } from "../ModalCreateCourse/ModalCreateCourse";

export const CreateAssingCourse = () => {
  const [openModalCreateCourse, setOpenModalCreateCourse] = useState(false);
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full flex justify-end">
        <button
          onClick={() => {
            setOpenModalCreateCourse(true);
          }}
          className="flex items-center bg-blue-500 text-white px-4 py-2 gap-x-3 text-lg rounded-md hover:bg-blue-600">
          Crear formación <Plus size={18} />
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
        <tbody></tbody>
      </table>
      {openModalCreateCourse && (
        <ModalCreateCourse
          onClose={() => {
            setOpenModalCreateCourse(false);
          }}
        />
      )}
    </div>
  );
};
