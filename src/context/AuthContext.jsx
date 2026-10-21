import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  usuario: null,
  cargando: true,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem('usuario_gas_el_volcan');
      if (guardado && guardado !== 'undefined' && guardado !== 'null') {
        const datos = JSON.parse(guardado);
        if (datos && typeof datos === 'object') {
          setUsuario(datos);
        }
      }
    } catch (e) {
      localStorage.removeItem('usuario_gas_el_volcan');
    } finally {
      setCargando(false);
    }
  }, []);

  const login = (datosUsuario) => {
    if (!datosUsuario) return;
    setUsuario(datosUsuario);
    localStorage.setItem('usuario_gas_el_volcan', JSON.stringify(datosUsuario));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario_gas_el_volcan');
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      usuario: null,
      cargando: false,
      login: () => {},
      logout: () => {}
    };
  }
  return context;
};

export default AuthContext;