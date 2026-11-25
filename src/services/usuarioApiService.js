// CRUD de usuarios contra la API (/api/v1/usuarios). Solo el ADMINISTRADOR puede usar estas rutas;
// el token lo agrega el interceptor de api.js. Los errores se dejan subir para que la página
// muestre el mensaje con obtenerMensajeError().
import { api } from './api';
import {
  crearUsuarioRequestDto,
  actualizarUsuarioRequestDto,
  cambiarRolRequestDto,
  cambiarActivoRequestDto,
  usuarioDesdeApi,
} from '../dto/usuario.dto';

export const usuarioApiService = {
  // READ: GET /usuarios → 200 lista (401 sin token, 403 si no es ADMINISTRADOR)
  async listar() {
    const { data } = await api.get('/usuarios');
    return data.map(usuarioDesdeApi);
  },

  // CREATE: POST /usuarios → 201 (400 datos inválidos, 409 RUT o correo repetido)
  async crear(datos) {
    const { data } = await api.post('/usuarios', crearUsuarioRequestDto(datos));
    return usuarioDesdeApi(data);
  },

  // UPDATE: PUT /usuarios/{id} → 200 (nombre, correo y teléfono)
  async actualizar(id, datos) {
    const { data } = await api.put(`/usuarios/${id}`, actualizarUsuarioRequestDto(datos));
    return usuarioDesdeApi(data);
  },

  // UPDATE: PATCH /usuarios/{id}/rol → 200 (409 si el admin intenta cambiar su propio rol)
  async cambiarRol(id, rol) {
    const { data } = await api.patch(`/usuarios/${id}/rol`, cambiarRolRequestDto(rol));
    return usuarioDesdeApi(data);
  },

  // UPDATE: PATCH /usuarios/{id}/activo → 200 (409 si el admin intenta desactivarse)
  async cambiarActivo(id, activo) {
    const { data } = await api.patch(`/usuarios/${id}/activo`, cambiarActivoRequestDto(activo));
    return usuarioDesdeApi(data);
  },

  // DELETE: DELETE /usuarios/{id} → 204. La API desactiva la cuenta para no perder sus pedidos.
  async eliminar(id) {
    await api.delete(`/usuarios/${id}`);
  },
};

export default usuarioApiService;