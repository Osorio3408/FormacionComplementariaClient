import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import { Delete, Edit, Pencil, Trash } from "lucide-react";
import { ModalEditEmployee } from "../ModalEditEmployee/ModalEditEmployee";
import { ModalDeleteEmployeed } from "../ModalDeleteEmployeed/ModalDeleteEmployeed";

export const ListEmployees = ({ nit }) => {
  const [employees, setEmployees] = useState([]);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedDocumentNumber, setSelectedDocumentNumber] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/getEmployees/${nit}`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setEmployees(res);
      });
  }, []);

  const [nameEnterprise, setNameEnterprise] = useState("");
  const { getTokenFromCookies } = useUserContext();

  useEffect(() => {
    const token = getTokenFromCookies();
    const { nameEnterprise } = jwtDecode(token);
    console.log(nameEnterprise);
    setNameEnterprise(nameEnterprise);
  }, []);
  return (
    <div className="w-full h-screen">
      <h2 className="text-2xl font-semibold text-center">
        Lista de empleados de la empresa{" "}
        {/* <span className="font-bold text-3xl">{nameEnterprise}</span> */}
      </h2>
      <table className="mt-4 w-full border-collapse border border-slate-300">
        <thead>
          <tr>
            <th className="border border-slate-300 px-4 py-2">
              Número de documento
            </th>
            <th className="border border-slate-300 px-4 py-2">
              Tipo de documento
            </th>
            <th className="border border-slate-300 px-4 py-2">
              Nombre completo
            </th>
            <th className="border border-slate-300 px-4 py-2">
              Número de telefono
            </th>
            <th className="border border-slate-300 px-4 py-2">Correo</th>
            <th className="border border-slate-300 px-4 py-2">Editar</th>
            <th className="border border-slate-300 px-4 py-2">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="">
              <td className="border border-slate-300 px-4 py-2">
                {employee["documentNumber"]}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {employee["documentType"]}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {employee["nameUser"]}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {employee["cellphoneNumberUser"]}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {employee["emailUser"]}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                <span className="flex justify-center items-center">
                  <Pencil
                    size={18}
                    className="text-neutral-600 cursor-pointer hover:text-indigo-500 transition-all duration-300"
                    onClick={() => {
                      setIsModalEditOpen(true);
                      setSelectedDocumentNumber(employee["documentNumber"]);
                    }}
                  />
                </span>
              </td>

              <td className="border border-blue-300 px-4 py-2">
                <span className="flex justify-center items-center">
                  <Trash
                    onClick={() => {
                      setIsModalDeleteOpen(true);
                    }}
                    size={18}
                    className="text-neutral-600 cursor-pointer hover:text-red-500 transition-all duration-300"
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalEditOpen && (
        <ModalEditEmployee
          documentNumber={selectedDocumentNumber}
          isOpen={isModalEditOpen}
          onClose={() => setIsModalEditOpen(false)}
        />
      )}
      {isModalDeleteOpen && (
        <ModalDeleteEmployeed
          documentNumber={selectedDocumentNumber}
          isOpen={isModalDeleteOpen}
          onClose={() => setIsModalDeleteOpen(false)}
        />
      )}
    </div>
  );
};
