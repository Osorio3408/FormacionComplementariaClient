import { LogOut } from "lucide-react";
import React, { useState } from "react";
import { FormCreateManager } from "../FormCreateManager/FormCreateManager";
import { FormCreateUser } from "../FormCreateUser/FormCreateUser";
import { Upload } from "../../pages/Upload/Upload";
import { FormCreateEmployee } from "../FormCreateEmployee/FormCreateEmployee";
import { ListEmployees } from "../ListEmployees/ListEmployees";
import { ListCoursesManager } from "../ListCoursesManager/ListCoursesManager";

export const BodyManager = ({ handleLogout, nit }) => {
  const [selectedTab, setSelectedTab] = useState("newEmployees");

  return (
    <div className="max-w-[100rem] m-auto border border-neutral-400 h-full my-10 w-full">
      <div className="flex items-center justify-between border-b mx-4 h-[9%] border-neutral-500 py-6">
        <ul className="flex gap-10 items-center justify-center ">
          <li
            className={`cursor-pointer py-2 ${
              selectedTab === "newEmployees"
                ? "border-b border-blue-600 text-blue-600"
                : "hover:border-b hover:border-neutral-400"
            }`}
            onClick={() => setSelectedTab("newEmployees")}>
            Register Empleados
          </li>
          <li
            className={`cursor-pointer py-2 ${
              selectedTab === "newEmployee"
                ? "border-b border-blue-600 text-blue-600"
                : "hover:border-b hover:border-neutral-400"
            }`}
            onClick={() => setSelectedTab("newEmployee")}>
            Crear un Nuevo Empleado
          </li>
          <li
            className={`cursor-pointer py-2 ${
              selectedTab === "seeCourses"
                ? "border-b border-blue-600 text-blue-600"
                : "hover:border-b hover:border-neutral-400"
            }`}
            onClick={() => setSelectedTab("seeCourses")}>
            Ver cursos
          </li>
          <li
            className={`cursor-pointer py-2 ${
              selectedTab === "seeEmployees"
                ? "border-b border-blue-600 text-blue-600"
                : "hover:border-b hover:border-neutral-400"
            }`}
            onClick={() => setSelectedTab("seeEmployees")}>
            Ver empleados
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
        {selectedTab == "newEmployees" && <Upload nit={nit} />}
        {selectedTab == "newEmployee" && <FormCreateEmployee nit={nit} />}
        {selectedTab == "seeCourses" && <ListCoursesManager />}
        {selectedTab == "seeEmployees" && <ListEmployees nit={nit} />}
      </div>
    </div>
  );
};
