// Service de autenticación: una función por operación de /api/v1/auth.
import { api } from './api';

// POST /auth/login -> { accessToken, tipo, expiraEnSegundos, usuario }
export async function iniciarSesion(dto) {
  const respuesta = await api.post('/auth/login', dto);
  return respuesta.data;
}

// POST /auth/register -> 201 con el usuario creado (rol CLIENTE)
export async function registrarCliente(dto) {
  const respuesta = await api.post('/auth/register', dto);
  return respuesta.data;
}

// GET /auth/me -> usuario dueño del token (sirve para confirmar la sesión al recargar)
export async function obtenerPerfil() {
  const respuesta = await api.get('/auth/me');
  return respuesta.data;
}
