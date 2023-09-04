import React, { useState } from "react";

export const FormCreateUser = () => {
  const [formDataA, setFormDataA] = useState({
    name: "",
    email: "",
    phone: "",
    documentNumber: "",
    password: "",
  });

  const handleInputChangeA = (e) => {
    const { name, value } = e.target;
    setFormDataA((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <form className="flex flex-col justify-between h-screen">
      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 place-content-center ">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xl">
            Nombre del administrador:
          </label>
          <input
            id="name"
            onChange={handleInputChangeA}
            value={formDataA.name}
            name="name"
            type="text"
            className="max-w-lg border border-neutral-400 rounded-md shadow-md h-[60px] w-full text-lg px-4 py-1"
            placeholder="Nombre"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xl">
            Correo del administrador:
          </label>
          <input
            id="email"
            onChange={handleInputChangeA}
            value={formDataA.email}
            name="email"
            type="email"
            className="max-w-lg border border-neutral-400 rounded-md shadow-md h-[60px] w-full text-lg px-4 py-1"
            placeholder="Correo electrónico"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-xl">
            Teléfono o celular del administrador:
          </label>
          <input
            id="phone"
            onChange={handleInputChangeA}
            value={formDataA.phone}
            name="phone"
            type="text"
            className="max-w-lg border border-neutral-400 rounded-md shadow-md h-[60px] w-full text-lg px-4 py-1"
            placeholder="Teléfono"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="documentNumber" className="text-xl">
            Número de documento del administrador:
          </label>
          <input
            id="documentNumber"
            onChange={handleInputChangeA}
            value={formDataA.documentNumber}
            name="documentNumber"
            type="text"
            className="max-w-lg border border-neutral-400 rounded-md shadow-md h-[60px] w-full text-lg px-4 py-1"
            placeholder="Número de documento"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-xl">
            Contraseña:
          </label>
          <input
            id="password"
            onChange={handleInputChangeA}
            value={formDataA.password}
            name="password"
            type="password"
            className="max-w-lg border border-neutral-400 rounded-md shadow-md h-[60px] w-full text-lg px-4 py-1"
            placeholder="Contraseña"
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-24">
        <button className="w-[180px] bg-blue-600 text-white h-[50px] hover:bg-blue-800 text-xl">
          Crear cuenta
        </button>
      </div>
    </form>
  );
};
