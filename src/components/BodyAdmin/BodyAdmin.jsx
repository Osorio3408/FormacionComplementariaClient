import React, { useState } from "react";
import { FormCreateManager } from "../FormCreateManager/FormCreateManager";
import { FormCreateUser } from "../FormCreateUser/FormCreateUser";
import { LogOut } from "lucide-react";
import { CreateAssingCourse } from "../CreateAssingCourse/CreateAssingCourse";
import { FormCreateEmployee } from "../FormCreateEmployee/FormCreateEmployee";
import { ViewHistory } from "../ViewHistory/ViewHistory";

export const BodyAdmin = ({ handleLogout, nit }) => {
  const [selectedTab, setSelectedTab] = useState("empresarial");

  return (
    <div className="max-w-[100rem] m-auto border border-neutral-400 h-full my-10 w-full">
      <div className="flex items-center justify-between border-b mx-4 h-[9%] border-neutral-500 py-6">
        <ul className="flex gap-10 items-center justify-center ">
          <li
            className={`cursor-pointer py-2 ${
              selectedTab === "empresarial"
                ? "border-b border-blue-600 text-blue-600"
                : "hover:border-b hover:border-neutral-400"
            }`}
            onClick={() => setSelectedTab("empresarial")}>
            Crear cuenta encargado/empresa
          </li>
          <li
            className={`cursor-pointer py-2 ${
              selectedTab === "CreateEmployee"
                ? "border-b border-blue-600 text-blue-600"
                : "hover:border-b hover:border-neutral-400"
            }`}
            onClick={() => setSelectedTab("CreateEmployee")}>
            Crear cuenta Empleado/Instructor
          </li>
          <li
            className={`cursor-pointer py-2 ${
              selectedTab === "CreateAssignCourse"
                ? "border-b border-blue-600 text-blue-600"
                : "hover:border-b hover:border-neutral-400"
            }`}
            onClick={() => setSelectedTab("CreateAssignCourse")}>
            Crear y Asignar curso
          </li>
          <li
            className={`cursor-pointer py-2 ${
              selectedTab === "ViewHistory"
                ? "border-b border-blue-600 text-blue-600"
                : "hover:border-b hover:border-neutral-400"
            }`}
            onClick={() => setSelectedTab("ViewHistory")}>
            Ver historial
          </li>
        </ul>
        <div className="flex justify-center items-center ">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 w-[130px] text-center h-[30px] flex justify-center items-center text-lg text-white rounded-lg">
            Cerrar sesión <LogOut className="ml-2" size={16} />
          </button>
        </div>
      </div>
      <div className="mx-4 py-10 h-full ">
        {selectedTab === "empresarial" && <FormCreateManager />}
        {selectedTab === "CreateEmployee" && (
          <FormCreateEmployee admin={true} nit={nit} />
        )}
        {selectedTab === "CreateAssignCourse" && <CreateAssingCourse />}
        {selectedTab === "ViewHistory" && <ViewHistory />}
        {/* {selectedTab === "empresarial" && <FormCreateManager />} */}
      </div>
    </div>
  );
};
