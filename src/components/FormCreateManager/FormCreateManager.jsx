import React, { useState } from "react";
import { toast } from "react-toastify";

export const FormCreateManager = () => {
  const [formDataE, setFormDataE] = useState({
    nameUser: "",
    documentType: "Cédula de ciudadania",
    documentNumber: "",
    cellphoneNumberUser: "",
    emailUser: "",
    password: "",
    rol: "manager",
    nameEnterprise: "",
    address: "",
    cellphoneNumberEnterprise: "",
    cityEnterprise: "",
    nit: "",
  });

  const handleInputChangeE = (e) => {
    const { name, value } = e.target;
    setFormDataE((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "nameUser",
      "documentNumber",
      "cellphoneNumberUser",
      "emailUser",
      "password",
      "nameEnterprise",
      "address",
      "cellphoneNumberEnterprise",
      "cityEnterprise",
      "nit",
    ];

    // Verificar si hay campos vacíos
    const missingFields = requiredFields.filter((field) => !formDataE[field]);
    if (missingFields.length > 0) {
      toast.error("Por favor, complete todos los campos obligatorios.");

      // Aplicar clase solo a campos faltantes
      requiredFields.forEach((field) => {
        if (missingFields.includes(field)) {
          document.getElementById(field)?.classList.add("border-red-500");
        } else {
          document.getElementById(field)?.classList.remove("border-red-500");
        }
      });

      return;
    }

    // Restaurar bordes a su estado original
    requiredFields.forEach((field) => {
      document.getElementById(field)?.classList.remove("border-red-500");
    });

    if (formDataE.password !== formDataE.confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/newManager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataE),
      });

      if (response.ok) {
        toast.success("Cuenta de encargado/empresa fue creada exitosamente!");
        setFormDataE({
          nameUser: "",
          documentType: "Cédula de ciudadania",
          documentNumber: "",
          cellphoneNumberUser: "",
          emailUser: "",
          confirmPassword: "",
          password: "",
          rol: "manager",
          nameEnterprise: "",
          address: "",
          cellphoneNumberEnterprise: "",
          cityEnterprise: "",
          nit: "",
        });
      } else {
        // Procesar errores, mostrar mensaje de error, etc.
      }
    } catch (error) {
      // Procesar errores, mostrar mensaje de error, etc.
    }
  };

  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-3 gap-x-10 place-content-center ">
        <div className="flex flex-col gap-2">
          <label htmlFor="nameUser" className="text-xl">
            Nombre del encargado:
          </label>
          <input
            id="nameUser"
            onChange={handleInputChangeE}
            value={formDataE.nameUser}
            name="nameUser"
            type="text"
            className="max-w-lg border border-neutral-400 shadow-md h-[60px] w-full text-lg px-4 py-1 rounded-md"
            placeholder="Ingrese Nombre del encargado..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="documentType" className="text-xl">
            Tipo de documento:
          </label>
          <select
            id="documentType"
            name="documentType"
            value={formDataE.documentType}
            onChange={handleInputChangeE}
            className="max-w-lg border border-neutral-400 shadow-md h-[60px] w-full text-lg px-4 py-1 rounded-md">
            <option value="Cédula de ciudadania">Cédula de ciudadanía</option>
            <option value="Cédula de extranjeria">Cédula de extranjería</option>
            <option value="Registro civil">Registro civil</option>
            <option value="Tarjeta de identidad">Tarjeta de identidad</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="documentNumber" className="text-xl">
            Número de documento:
          </label>
          <input
            id="documentNumber"
            onChange={handleInputChangeE}
            value={formDataE.documentNumber}
            name="documentNumber"
            type="number"
            className="max-w-lg border border-neutral-400 shadow-md h-[60px] w-full text-lg px-4 py-1 rounded-md"
            placeholder="Ingrese Número de documento..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cellphoneNumberUser" className="text-xl">
            Número de celular del encargado:
          </label>
          <input
            id="cellphoneNumberUser"
            onChange={handleInputChangeE}
            value={formDataE.cellphoneNumberUser}
            name="cellphoneNumberUser"
            type="number"
            className="max-w-lg border border-neutral-400 shadow-md h-[60px] w-full text-lg px-4 py-1 rounded-md"
            placeholder="Ingrese Número de celular..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="emailUser" className="text-xl">
            Correo del encargado:
          </label>
          <input
            id="emailUser"
            onChange={handleInputChangeE}
            value={formDataE.emailUser}
            name="emailUser"
            type="email"
            className="max-w-lg border border-neutral-400 shadow-md h-[60px] w-full text-lg px-4 py-1 rounded-md"
            placeholder="Ingrese Correo electrónico..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-xl">
            Contraseña:
          </label>
          <input
            id="password"
            onChange={handleInputChangeE}
            value={formDataE.password}
            name="password"
            type="password"
            className="max-w-lg border border-neutral-400 shadow-md h-[60px] w-full text-lg px-4 py-1 rounded-md"
            placeholder="Ingrese Contraseña..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-xl">
            Confirmar contraseña:
          </label>
          <input
            id="confirmPassword"
            onChange={handleInputChangeE}
            value={formDataE.confirmPassword}
            name="confirmPassword"
            type="password"
            className="max-w-lg border border-neutral-400 shadow-md h-[60px] w-full text-lg px-4 py-1 rounded-md"
            placeholder="Repite la contraseña..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="nameEnterprise" className="text-xl">
            Nombre de la empresa:
          </label>
          <input
            id="nameEnterprise"
            onChange={handleInputChangeE}
            value={formDataE.nameEnterprise}
            name="nameEnterprise"
            type="text"
            className="max-w-lg border border-neutral-400 shadow-md h-[60px] w-full text-lg px-4 py-1 rounded-md"
            placeholder="Ingrese Nombre de la empresa..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-xl">
            Dirección de la empresa:
          </label>
          <input
            id="address"
            onChange={handleInputChangeE}
            value={formDataE.address}
            name="address"
            type="text"
            className="max-w-lg border border-neutral-400 shadow-md h-[60px] w-full text-lg px-4 py-1 rounded-md"
            placeholder="Ingrese Dirección de la empresa..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cellphoneNumberEnterprise..." className="text-xl">
            Número telefónico de la empresa:
          </label>
          <input
            id="cellphoneNumberEnterprise"
            onChange={handleInputChangeE}
            value={formDataE.cellphoneNumberEnterprise}
            name="cellphoneNumberEnterprise"
            type="number"
            className="max-w-lg border border-neutral-400 shadow-md h-[60px] w-full text-lg px-4 py-1 rounded-md"
            placeholder="Ingrese Número telefónico de la empresa..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="nit" className="text-xl">
            Ciudad de la empresa:
          </label>
          <input
            id="cityEnterprise"
            onChange={handleInputChangeE}
            value={formDataE.cityEnterprise}
            name="cityEnterprise"
            type="text"
            className="max-w-lg border border-neutral-400 shadow-md h-[60px] w-full text-lg px-4 py-1 rounded-md"
            placeholder="Ingrese Ciudad de la empresa..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="nit" className="text-xl">
            Nit de la empresa:
          </label>
          <input
            id="nit"
            onChange={handleInputChangeE}
            value={formDataE.nit}
            name="nit"
            type="text"
            className="max-w-lg border border-neutral-400 shadow-md h-[60px] w-full text-lg px-4 py-1 rounded-md"
            placeholder="Ingrese Nit de la empresa..."
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-24 h-auto">
        <button className="w-[180px] bg-blue-600 text-white h-[50px] hover:bg-blue-800 text-xl">
          Crear cuenta
        </button>
      </div>
    </form>
  );
};
