import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useUserContext } from "../../Context/UserContext";
import jwtDecode from "jwt-decode";
import { BodyManager } from "../../components/BodyManager/BodyManager";
import { BodyAdmin } from "../../components/BodyAdmin/BodyAdmin";
import { BodyEmployee } from "../../components/BodyEmployee/BodyEmployee";
import { BodyInstructor } from "../../components/BodyInstructor/BodyInstructor";

export const Home = () => {
  const navigate = useNavigate();
  const [rol, setRol] = useState("");
  const [nit, setNit] = useState("");
  const [documentNumber, setDocumentNumber] = useState();

  const isAuthenticated = Cookies.get("token");
  const { clearToken, getTokenFromCookies } = useUserContext();

  useEffect(() => {
    if (isAuthenticated) {
      const token = getTokenFromCookies();
      // const tokensito = jwtDecode(token);
      // console.log(tokensito);
      const { rol, nit, userId } = jwtDecode(token);
      setDocumentNumber(userId);
      setNit(nit);
      setRol(rol);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/Login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    Cookies.remove("token");
    clearToken();
    navigate("/Login");
    toast.success("Cierre de sesión exitoso");
  };
  return (
    <div className="min-h-screen  min-w-full flex flex-col justify-center items-center">
      <Navbar title={"Formación Complementaria"} />
      {rol === "Employee" && (
        <BodyEmployee handleLogout={handleLogout} nit={nit} />
      )}
      {rol == "manager" && (
        <BodyManager handleLogout={handleLogout} nit={nit} />
      )}

      {rol == "Instructor" && <BodyInstructor handleLogout={handleLogout} />}

      {rol === "admin" && <BodyAdmin handleLogout={handleLogout} nit={nit} />}
    </div>
  );
};
