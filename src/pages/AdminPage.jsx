import React, { useState, useEffect } from 'react';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Title, Boton, Select } from '../components/Atoms';
import { CampoFormulario } from '../components/Molecules';
import { usuarioService } from '../services/usuarioService';
import { pedidoService } from '../services/pedidoService';
import { formatearMoneda } from '../utils/formato';
import { validarRut, validarEmail, validarNombre, validarPassword } from '../utils/validaciones';

export const AdminPage = () => {
  const [pestanaActiva, setPestanaActiva] = useState('CAJA'); 
  

  const [usuariosList, setUsuariosList] = useState([]);
  const [pedidosList, setPedidosList] = useState([]);
  const [filtroRol, setFiltroRol] = useState('TODOS');
  const [notificacion, setNotificacion] = useState(null);


  const [nuevoRut, setNuevoRut] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [nuevoPassword, setNuevoPassword] = useState('');
  const [nuevoRol, setNuevoRol] = useState('OPERADOR');
  const [errorForm, setErrorForm] = useState('');

  const cargarDatos = () => {
    setUsuariosList(usuarioService.getUsuarios());
    setPedidosList(pedidoService.getPedidos());
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const mostrarMensaje = (msg) => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(null), 4000);
  };


  const handleCrearUsuario = (e) => {
    e.preventDefault();
    setErrorForm('');

    if (!validarRut(nuevoRut)) {
      setErrorForm('El RUT ingresado no es válido (Ej: 12345678-9).');
      return;
    }
    if (!validarNombre(nuevoNombre)) {
      setErrorForm('El nombre debe contener al menos 3 caracteres.');
      return;
    }
    if (!validarEmail(nuevoEmail)) {
      setErrorForm('El correo electrónico no tiene un formato válido.');
      return;
    }
    if (!validarPassword(nuevoPassword)) {
      setErrorForm('La contraseña debe tener mínimo 6 caracteres.');
      return;
    }

    try {
      usuarioService.crearUsuario({
        rut: nuevoRut,
        nombre: nuevoNombre,
        email: nuevoEmail,
        password: nuevoPassword,
        rol: nuevoRol
      });

      mostrarMensaje(`✓ Usuario "${nuevoNombre}" creado exitosamente como ${nuevoRol}.`);
      setNuevoRut('');
      setNuevoNombre('');
      setNuevoEmail('');
      setNuevoPassword('');
      cargarDatos();
    } catch (err) {
      setErrorForm(err.message);
    }
  };


  const handleEliminarUsuario = (rut, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar al usuario ${nombre} (${rut})?`)) {
      const listaActualizada = usuarioService.eliminarUsuario(rut);
      setUsuariosList(listaActualizada);
      mostrarMensaje(`Usuario ${nombre} eliminado.`);
    }
  };


  const pedidosEntregados = pedidosList.filter((p) => p.estado === 'ENTREGADO');
  const totalRecaudadoGeneral = pedidosEntregados.reduce((acc, p) => acc + (p.total || 0), 0);

  const totalEfectivo = pedidosEntregados
    .filter((p) => p.metodoPago === 'EFECTIVO')
    .reduce((acc, p) => acc + (p.total || 0), 0);

  const totalTransferencia = pedidosEntregados
    .filter((p) => p.metodoPago === 'TRANSFERENCIA')
    .reduce((acc, p) => acc + (p.total || 0), 0);

  const totalDebito = pedidosEntregados
    .filter((p) => p.metodoPago === 'DEBITO')
    .reduce((acc, p) => acc + (p.total || 0), 0);


  const repartidores = usuariosList.filter((u) => u.rol?.toUpperCase() === 'REPARTIDOR');
  const rendicionPorRepartidor = repartidores.map((rep) => {
    const pedidosChofer = pedidosEntregados.filter((p) => p.repartidorRut === rep.rut);
    const montoRendir = pedidosChofer.reduce((acc, p) => acc + (p.total || 0), 0);
    const efectRendir = pedidosChofer
      .filter((p) => p.metodoPago === 'EFECTIVO')
      .reduce((acc, p) => acc + (p.total || 0), 0);

    return {
      rut: rep.rut,
      nombre: rep.nombre,
      cantEntregados: pedidosChofer.length,
      montoTotal: montoRendir,
      efectivoARendir: efectRendir
    };
  });


  const usuariosFiltrados = filtroRol === 'TODOS'
    ? usuariosList
    : usuariosList.filter((u) => u.rol?.toUpperCase() === filtroRol);

  return (
    <MainLayoutTemplate tituloHeader="Panel de Administración - Gas Gotita">
      <div className="container-fluid py-2">
        
   
        {notificacion && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {notificacion}
            <button type="button" className="btn-close float-end" onClick={() => setNotificacion(null)}></button>
          </div>
        )}

     
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${pestanaActiva === 'CAJA' ? 'active' : ''}`}
              onClick={() => setPestanaActiva('CAJA')}
            >
               Rendición de Caja y Ventas
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${pestanaActiva === 'USUARIOS' ? 'active' : ''}`}
              onClick={() => setPestanaActiva('USUARIOS')}
            >
               Gestión de Usuarios y Roles ({usuariosList.length})
            </button>
          </li>
        </ul>

        
        {pestanaActiva === 'CAJA' && (
          <div>
         
            <div className="row g-3 mb-4">
              <div className="col-md-3">
                <div className="card border-start border-success border-4 p-3 shadow-sm bg-white">
                  <span className="text-muted small fw-bold">TOTAL VENDIDO</span>
                  <span className="fs-3 fw-bold text-success">{formatearMoneda(totalRecaudadoGeneral)}</span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-start border-primary border-4 p-3 shadow-sm bg-white">
                  <span className="text-muted small fw-bold">EFECTIVO A RENDIR</span>
                  <span className="fs-3 fw-bold text-primary">{formatearMoneda(totalEfectivo)}</span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-start border-info border-4 p-3 shadow-sm bg-white">
                  <span className="text-muted small fw-bold">TRANSFERENCIAS</span>
                  <span className="fs-3 fw-bold text-info">{formatearMoneda(totalTransferencia)}</span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-start border-secondary border-4 p-3 shadow-sm bg-white">
                  <span className="text-muted small fw-bold">DÉBITO / POS</span>
                  <span className="fs-3 fw-bold text-secondary">{formatearMoneda(totalDebito)}</span>
                </div>
              </div>
            </div>

       
            <div className="card shadow-sm bg-white border mb-4">
              <div className="card-header bg-dark text-white fw-bold">
                 Rendición de Dinero por Repartidor
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle m-0">
                  <thead className="table-light">
                    <tr className="small">
                      <th>CHOFER / RUT</th>
                      <th>ENTREGAS COMPLETADAS</th>
                      <th>MONTO TOTAL RECAUDADO</th>
                      <th>EFECTIVO EN FÍSICO A RENDIR</th>
                      <th>ESTADO DE CAJA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rendicionPorRepartidor.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-3 text-muted">
                          No hay repartidores registrados en el sistema.
                        </td>
                      </tr>
                    ) : (
                      rendicionPorRepartidor.map((rep) => (
                        <tr key={rep.rut}>
                          <td>
                            <strong className="d-block">{rep.nombre}</strong>
                            <small className="text-muted">{rep.rut}</small>
                          </td>
                          <td>
                            <span className="badge bg-light text-dark border fs-6">
                              {rep.cantEntregados} pedidos
                            </span>
                          </td>
                          <td>
                            <strong className="text-dark">{formatearMoneda(rep.montoTotal)}</strong>
                          </td>
                          <td>
                            <strong className="text-success fs-6">{formatearMoneda(rep.efectivoARendir)}</strong>
                          </td>
                          <td>
                            <span className={`badge ${rep.cantEntregados > 0 ? 'bg-success' : 'bg-secondary'}`}>
                              {rep.cantEntregados > 0 ? 'Con Cierre Pendiente' : 'Sin Movimientos'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        
        {pestanaActiva === 'USUARIOS' && (
          <div className="row g-4">
            
            
            <div className="col-lg-4 col-md-12">
              <div className="card p-4 shadow-sm bg-white border">
                <Title level={3} className="fs-5 mb-3"> Registrar Nuevo Usuario</Title>

                {errorForm && (
                  <div className="alert alert-danger py-2 small mb-3">{errorForm}</div>
                )}

                <form onSubmit={handleCrearUsuario}>
                  <CampoFormulario
                    id="new-rut"
                    name="rut"
                    label="RUT del Usuario"
                    placeholder="Ej: 12345678-9"
                    value={nuevoRut}
                    onChange={(e) => setNuevoRut(e.target.value)}
                    required
                    className="mb-2"
                  />

                  <CampoFormulario
                    id="new-nombre"
                    name="nombre"
                    label="Nombre Completo"
                    placeholder="Ej: Pedro Morales"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    required
                    className="mb-2"
                  />

                  <CampoFormulario
                    id="new-email"
                    name="email"
                    type="email"
                    label="Correo Electrónico"
                    placeholder="ejemplo@gaselvolcan.cl"
                    value={nuevoEmail}
                    onChange={(e) => setNuevoEmail(e.target.value)}
                    required
                    className="mb-2"
                  />

                  <CampoFormulario
                    id="new-password"
                    name="password"
                    type="password"
                    label="Contraseña Iniciar Sesión"
                    placeholder="••••••••"
                    value={nuevoPassword}
                    onChange={(e) => setNuevoPassword(e.target.value)}
                    required
                    className="mb-2"
                  />

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Rol en el Sistema:</label>
                    <Select
                      id="select-nuevo-rol"
                      name="rol"
                      value={nuevoRol}
                      onChange={(e) => setNuevoRol(e.target.value)}
                      options={[
                        { value: 'ADMINISTRADOR', label: ' Administrador' },
                        { value: 'OPERADOR', label: ' Operadora de Despacho' },
                        { value: 'REPARTIDOR', label: ' Repartidor / Chofer' },
                        { value: 'CLIENTE', label: ' Cliente Final' }
                      ]}
                    />
                  </div>

                  <Boton type="submit" variant="primary" fullWidth className="btn btn-primary w-100">
                    Guardar Usuario
                  </Boton>
                </form>
              </div>
            </div>

           
            <div className="col-lg-8 col-md-12">
              <div className="card shadow-sm bg-white border">
                <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                  <Title level={3} className="fs-5 m-0"> Lista de Usuarios</Title>
                  
                 
                  <div className="d-flex align-items-center gap-2">
                    <label className="small fw-bold">Filtrar:</label>
                    <div className="btn-group btn-group-sm">
                      {['TODOS', 'ADMINISTRADOR', 'OPERADOR', 'REPARTIDOR', 'CLIENTE'].map((r) => (
                        <button
                          key={r}
                          type="button"
                          className={`btn ${filtroRol === r ? 'btn-dark' : 'btn-outline-dark'}`}
                          onClick={() => setFiltroRol(r)}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle m-0">
                    <thead className="table-light">
                      <tr className="small">
                        <th>RUT</th>
                        <th>NOMBRE Y CORREO</th>
                        <th>ROL</th>
                        <th>ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuariosFiltrados.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-muted">
                            No hay usuarios con el rol "{filtroRol}".
                          </td>
                        </tr>
                      ) : (
                        usuariosFiltrados.map((u) => (
                          <tr key={u.rut}>
                            <td><strong>{u.rut}</strong></td>
                            <td>
                              <strong className="d-block text-dark">{u.nombre}</strong>
                              <small className="text-muted">{u.email}</small>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  u.rol === 'ADMINISTRADOR'
                                    ? 'bg-danger'
                                    : u.rol === 'OPERADOR'
                                    ? 'bg-warning text-dark'
                                    : u.rol === 'REPARTIDOR'
                                    ? 'bg-primary'
                                    : 'bg-secondary'
                                }`}
                              >
                                {u.rol}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                title="Eliminar Usuario"
                                onClick={() => handleEliminarUsuario(u.rut, u.nombre)}
                              >
                                 Eliminar
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </MainLayoutTemplate>
  );
};

export default AdminPage;