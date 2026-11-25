// DTOs de usuarios: arman exactamente el cuerpo que espera la API (UsuarioDtos.java)
// y convierten la respuesta de la API al objeto que usan los componentes.

const limpiarTelefono = (telefono) => {
  const valor = String(telefono || '').trim();
  return valor ? valor : null; // la API acepta null cuando no hay teléfono
};

// POST /usuarios → CrearUsuarioRequest { rut, nombre, email, telefono, password, rol }
export const crearUsuarioRequestDto = (datos) => ({
  rut: datos.rut.trim(),
  nombre: datos.nombre.trim(),
  email: datos.email.trim().toLowerCase(),
  telefono: limpiarTelefono(datos.telefono),
  password: datos.password,
  rol: datos.rol,
});

// PUT /usuarios/{id} → ActualizarUsuarioRequest { nombre, email, telefono }
// (la API no deja cambiar RUT, rol ni contraseña por esta ruta)
export const actualizarUsuarioRequestDto = (datos) => ({
  nombre: datos.nombre.trim(),
  email: datos.email.trim().toLowerCase(),
  telefono: limpiarTelefono(datos.telefono),
});

// PATCH /usuarios/{id}/rol → CambiarRolRequest { rol }
export const cambiarRolRequestDto = (rol) => ({ rol });

// PATCH /usuarios/{id}/activo → CambiarActivoRequest { activo }
export const cambiarActivoRequestDto = (activo) => ({ activo: Boolean(activo) });

// UsuarioResponse de la API → objeto para la tabla y el formulario.
// La API nunca envía la contraseña ni su hash.
export const usuarioDesdeApi = (u) => ({
  id: u.id,
  rut: u.rut,
  nombre: u.nombre,
  email: u.email,
  telefono: u.telefono || '',
  rol: u.rol,
  activo: u.activo,
  fechaRegistro: u.fechaRegistro,
});