import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";

export const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = Cookies.get("token");

  useEffect(() => {
    // Si el usuario no está autenticado, redirige al formulario de inicio de sesión
    if (!isAuthenticated) {
      navigate("/Login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/Login");
    toast.success("Cierre de sesión exitoso");
    // Aquí podrías redirigir a la página de inicio de sesión si lo deseas
  };

  return (
    <div className="h-screen min-w-full flex flex-col justify-center items-center">
      <Navbar title={"¡Bienvenido!"} />
      <div className="max-w-7xl m-auto border border-neutral-400 h-[600px] w-full">
        <div className="flex justify-center items-center mt-5">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-8 py-4 text-lg text-white rounded-lg flex items-center">
            Cerrar sesión <LogOut className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
