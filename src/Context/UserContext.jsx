import jwtDecode from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  // Función para obtener el token almacenado en las cookies
  const getTokenFromCookies = () => {
    const tokenFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    return tokenFromCookie;
  };

  // Función para limpiar el contexto
  const clearToken = () => {
    setToken("");
  };

  useEffect(() => {
    const tokenFromCookies = getTokenFromCookies();
    try {
      const decoded = jwtDecode(tokenFromCookies);
      setToken(decoded);
    } catch (error) {
      console.error("Error decoding token:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue = {
    token,
    clearToken,
    getTokenFromCookies,
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
