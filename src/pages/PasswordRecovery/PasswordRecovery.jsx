import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail } from "lucide-react"; // Icono de correo electrónico
import { Loader2 } from "lucide-react";

export const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://serverformacion.up.railway.app/api/passwordRecovery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        toast.success("Se ha enviado un correo electrónico con instrucciones.");
        setEmail("");
      } else {
        toast.error("Correo electrónico no encontrado.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      toast.error("Error al enviar la solicitud.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen min-w-full flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-xl w-full py-10">
        <h2 className="text-3xl font-semibold mb-10">
          Recuperación de Contraseña
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-lg">
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese su correo electrónico"
                required
              />
              <Mail className="absolute h-6 w-6 top-1/2 transform -translate-y-1/2 right-2 text-gray-400" />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-10 rounded-lg flex items-center justify-center space-x-2 mx-auto"
            disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span>Enviando...</span>
              </>
            ) : (
              "Enviar"
            )}
          </button>
        </form>
        <div className="mt-4 text-center pt-10">
          <Link
            to="/login"
            className="text-blue-600 hover:underline hover:cursor-pointer">
            Volver al Inicio de Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};
