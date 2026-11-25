import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { leerSesion, guardarSesion, borrarSesion } from '../services/sesion';
import { obtenerPerfil } from '../services/authService';

// Contexto de sesión: quién está conectado, su token y cuándo vence.
const AuthContext = createContext({
  usuario: null,
  cargando: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  const logout = useCallback(() => {
    borrarSesion();
    setUsuario(null);
  }, []);

  // Al recargar la página: recupera la sesión de sessionStorage (si no venció)
  // y la confirma con GET /auth/me (si el backend la rechaza, se cierra).
  useEffect(() => {
    const sesion = leerSesion();
    if (!sesion) {
      setCargando(false);
      return;
    }
    setUsuario(sesion.usuario);
    obtenerPerfil()
      .then((perfil) => {
        setUsuario(perfil);
        guardarSesion({ ...sesion, usuario: perfil });
      })
      .catch((error) => {
        if (error.response?.status === 401) logout();
      })
      .finally(() => setCargando(false));
  }, [logout]);

  // Cierra la sesión justo cuando vence el token.
  useEffect(() => {
    const sesion = leerSesion();
    if (!usuario || !sesion) return undefined;
    const temporizador = setTimeout(logout, sesion.expiraEn - Date.now());
    return () => clearTimeout(temporizador);
  }, [usuario, logout]);

  // El interceptor de Axios avisa cuando la API responde 401 (token vencido o inválido).
  useEffect(() => {
    window.addEventListener('sesion-expirada', logout);
    return () => window.removeEventListener('sesion-expirada', logout);
  }, [logout]);

  // Recibe la sesión ya armada por el DTO de salida (token, usuario, expiraEn).
  const login = (sesion) => {
    guardarSesion(sesion);
    setUsuario(sesion.usuario);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;