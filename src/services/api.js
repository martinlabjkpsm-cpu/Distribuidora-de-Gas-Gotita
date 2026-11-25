// Instancia única de Axios: dirección base, tiempo máximo y token en cada solicitud.
// Axios solo vive en services, los componentes no saben de Axios ni de la URL del backend.
import axios from 'axios';
import { obtenerToken, borrarSesion } from './sesion';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  timeout: 10000,
});

// Antes de cada solicitud: si hay sesión, agrega Authorization: Bearer <token>.
api.interceptors.request.use((config) => {
  const token = obtenerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Después de cada respuesta: un 401 en una ruta protegida significa sesión vencida o inválida.
// Se borra la sesión y se avisa a la app (AuthContext escucha este evento y manda a /login).
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const esLogin = error.config?.url?.includes('/auth/login');
    if (error.response?.status === 401 && !esLogin) {
      borrarSesion();
      window.dispatchEvent(new Event('sesion-expirada'));
    }
    return Promise.reject(error);
  }
);

export default api;