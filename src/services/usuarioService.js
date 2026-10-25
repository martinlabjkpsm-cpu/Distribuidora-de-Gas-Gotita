// usuarioService: CRUD de usuarios guardados en localStorage.
import { usuarios } from '../data/usuarios';
import { limpiarRut } from '../utils/validaciones';

const USUARIOS_STORAGE_KEY = 'gas_el_volcan_usuarios';

const guardar = (lista) => localStorage.setItem(USUARIOS_STORAGE_KEY, JSON.stringify(lista));
const mismoRut = (a, b) => limpiarRut(a).toUpperCase() === limpiarRut(b).toUpperCase();

export const usuarioService = {
  // READ: todos los usuarios
  getUsuarios: () => {
    const usuariosGuardados = localStorage.getItem(USUARIOS_STORAGE_KEY);
    if (!usuariosGuardados) {
      guardar(usuarios);
      return usuarios;
    }
    return JSON.parse(usuariosGuardados);
  },

  // Login: busca por RUT (con o sin puntos) y contraseña. Devuelve el usuario sin la contraseña.
  autenticar: (rut, password) => {
    const usuarioEncontrado = usuarioService
      .getUsuarios()
      .find((user) => mismoRut(user.rut, rut) && user.password === password);

    if (!usuarioEncontrado) {
      throw new Error('RUT o contraseña incorrectos.');
    }
    if (usuarioEncontrado.activo === false) {
      throw new Error('Tu cuenta está desactivada. Contacta al administrador.');
    }

    const { password: _omitida, ...usuarioSinPassword } = usuarioEncontrado;
    return usuarioSinPassword;
  },

  // CREATE
  crearUsuario: (datosUsuario) => {
    const lista = usuarioService.getUsuarios();

    const existe = lista.some(
      (u) =>
        mismoRut(u.rut, datosUsuario.rut) ||
        u.email.toLowerCase() === String(datosUsuario.email).toLowerCase()
    );
    if (existe) {
      throw new Error('Ya existe un usuario registrado con ese RUT o correo electrónico.');
    }

    const nuevoUsuario = {
      rut: datosUsuario.rut,
      nombre: datosUsuario.nombre,
      email: datosUsuario.email,
      password: datosUsuario.password,
      rol: String(datosUsuario.rol || 'CLIENTE').toUpperCase(),
      activo: true,
    };

    guardar([...lista, nuevoUsuario]);
    return nuevoUsuario;
  },

  // UPDATE: cambia nombre, correo, rol o contraseña (si viene una nueva)
  actualizarUsuario: (rut, cambios) => {
    const lista = usuarioService.getUsuarios();
    if (!lista.some((u) => mismoRut(u.rut, rut))) {
      throw new Error('No existe un usuario con ese RUT.');
    }
    const cambiosLimpios = { ...cambios };
    if (!cambiosLimpios.password) delete cambiosLimpios.password; // contraseña vacía = no cambiar
    if (cambiosLimpios.rol) cambiosLimpios.rol = cambiosLimpios.rol.toUpperCase();

    const listaActualizada = lista.map((u) =>
      mismoRut(u.rut, rut) ? { ...u, ...cambiosLimpios, rut: u.rut } : u
    );
    guardar(listaActualizada);
    return listaActualizada;
  },

  // UPDATE: activa o desactiva una cuenta
  cambiarActivo: (rut) => {
    const listaActualizada = usuarioService
      .getUsuarios()
      .map((u) => (mismoRut(u.rut, rut) ? { ...u, activo: u.activo === false } : u));
    guardar(listaActualizada);
    return listaActualizada;
  },

  // DELETE
  eliminarUsuario: (rutAEliminar) => {
    const listaActualizada = usuarioService
      .getUsuarios()
      .filter((u) => !mismoRut(u.rut, rutAEliminar));
    guardar(listaActualizada);
    return listaActualizada;
  },
};

export default usuarioService;
