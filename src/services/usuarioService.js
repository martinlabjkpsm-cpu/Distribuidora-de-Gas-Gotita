import { usuarios } from '../data/usuarios';
import { limpiarRut } from '../utils/validaciones';

const USUARIOS_STORAGE_KEY = 'gas_el_volcan_usuarios';

export const usuarioService = {
  // Obtener todos los usuarios
  getUsuarios: () => {
    const usuariosGuardados = localStorage.getItem(USUARIOS_STORAGE_KEY);
    if (!usuariosGuardados) {
      localStorage.setItem(USUARIOS_STORAGE_KEY, JSON.stringify(usuarios));
      return usuarios;
    }
    return JSON.parse(usuariosGuardados);
  },

  // Autenticar credenciales
  autenticar: (identificador, password) => {
    const listaUsuarios = usuarioService.getUsuarios();
    const idLimpio = limpiarRut(identificador).toUpperCase();

    const usuarioEncontrado = listaUsuarios.find((user) => {
      const rutUserLimpio = limpiarRut(user.rut).toUpperCase();
      const emailUser = user.email.toLowerCase();
      const idInput = identificador.toLowerCase();

      return (rutUserLimpio === idLimpio || emailUser === idInput) && user.password === password;
    });

    if (!usuarioEncontrado) {
      throw new Error('Credenciales inválidas. Verifica tu RUT/Email y contraseña.');
    }

    const { password: _, ...usuarioSinPassword } = usuarioEncontrado;
    return usuarioSinPassword;
  },

  // Crear un nuevo usuario
  crearUsuario: (datosUsuario) => {
    const lista = usuarioService.getUsuarios();
    const rutLimpioNuevo = limpiarRut(datosUsuario.rut).toUpperCase();

    // Validar duplicado por RUT o Email
    const existe = lista.some(
      (u) =>
        limpiarRut(u.rut).toUpperCase() === rutLimpioNuevo ||
        u.email.toLowerCase() === datosUsuario.email.toLowerCase()
    );

    if (existe) {
      throw new Error('Ya existe un usuario registrado con ese RUT o Correo Electrónico.');
    }

    const nuevoUsuario = {
      rut: datosUsuario.rut,
      nombre: datosUsuario.nombre,
      email: datosUsuario.email,
      password: datosUsuario.password || 'gas123Password',
      rol: datosUsuario.rol.toUpperCase()
    };

    const listaActualizada = [...lista, nuevoUsuario];
    localStorage.setItem(USUARIOS_STORAGE_KEY, JSON.stringify(listaActualizada));
    return nuevoUsuario;
  },

  // Eliminar usuario
  eliminarUsuario: (rutAEliminar) => {
    const lista = usuarioService.getUsuarios();
    const rutLimpioDel = limpiarRut(rutAEliminar).toUpperCase();

    const listaActualizada = lista.filter(
      (u) => limpiarRut(u.rut).toUpperCase() !== rutLimpioDel
    );

    localStorage.setItem(USUARIOS_STORAGE_KEY, JSON.stringify(listaActualizada));
    return listaActualizada;
  }
};

export default usuarioService;