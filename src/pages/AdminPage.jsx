import React, { useState } from 'react';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Title, Boton, Etiqueta, Input } from '../components/Atoms';
import { TarjetaResumenCaja } from '../components/Molecules';
import { FormularioProducto } from '../components/Organisms/FormularioProducto';
import { TablaProductos } from '../components/Organisms/TablaProductos';
import { FormularioUsuario } from '../components/Organisms/FormularioUsuario';
import { TablaUsuarios } from '../components/Organisms/TablaUsuarios';
import { ComprobantePedido } from '../components/Organisms/ComprobantePedido';
import { SeccionReporteCaja } from '../components/Organisms/SeccionReporteCaja';
import { useProductos } from '../context/ProductosContext';
import { useAuth } from '../context/AuthContext';
import { usuarioService } from '../services/usuarioService';
import { pedidoService } from '../services/pedidoService';
import { formatearMoneda, formatearFecha } from '../utils/formato';
import { esStockCritico } from '../utils/precios';
import { useTituloPagina } from '../hooks/useTituloPagina';

const pestanas = [
  { id: 'RESUMEN', texto: 'Resumen' },
  { id: 'PEDIDOS', texto: 'Pedidos' },
  { id: 'PRODUCTOS', texto: 'Productos' },
  { id: 'CRITICOS', texto: 'Stock crítico' },
  { id: 'CATEGORIAS', texto: 'Categorías' },
  { id: 'USUARIOS', texto: 'Usuarios' },
  { id: 'REPORTES', texto: 'Reportes' },
  { id: 'PERFIL', texto: 'Mi perfil' },
];

const sumarTotales = (lista) => lista.reduce((acc, p) => acc + (p.total || 0), 0);

// Página: panel de administración (solo rol ADMINISTRADOR).
export const AdminPage = () => {
  useTituloPagina('Panel de administración');
  const { usuario } = useAuth();
  const {
    productos, categorias, crear, actualizar, eliminar,
    crearCategoria, actualizarCategoria, eliminarCategoria,
  } = useProductos();

  const [pestana, setPestana] = useState('RESUMEN');
  const [usuarios, setUsuarios] = useState(() => usuarioService.getUsuarios());
  const [pedidos, setPedidos] = useState(() => pedidoService.getPedidos());
  const [mensaje, setMensaje] = useState(null);

  // Estado de cada sección
  const [productoEditar, setProductoEditar] = useState(null);
  const [errorProducto, setErrorProducto] = useState('');
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [errorUsuario, setErrorUsuario] = useState('');
  const [filtroRol, setFiltroRol] = useState('TODOS');
  const [pedidoVer, setPedidoVer] = useState(null);
  const [filtroCliente, setFiltroCliente] = useState('TODOS');
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [categoriaEditar, setCategoriaEditar] = useState(null);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [porEliminar, setPorEliminar] = useState(null); // confirmación sin window.confirm

  const avisar = (texto, tipo = 'success') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 4000);
  };

  const cambiarPestana = (id) => {
    setPestana(id);
    setPorEliminar(null);
    setPedidos(pedidoService.getPedidos()); // siempre ver los pedidos actualizados
  };

  // ---------- Productos ----------
  const guardarProducto = (datos) => {
    try {
      if (productoEditar) {
        actualizar(productoEditar.codigo, datos);
        avisar(`Producto ${productoEditar.codigo} actualizado.`);
        setProductoEditar(null);
      } else {
        crear(datos);
        avisar(`Producto ${datos.codigo.toUpperCase()} creado.`);
      }
      setErrorProducto('');
    } catch (error) {
      setErrorProducto(error.message);
    }
  };

  // ---------- Usuarios ----------
  const guardarUsuario = (datos) => {
    try {
      if (usuarioEditar) {
        setUsuarios(usuarioService.actualizarUsuario(usuarioEditar.rut, datos));
        avisar(`Usuario ${datos.nombre} actualizado.`);
        setUsuarioEditar(null);
      } else {
        usuarioService.crearUsuario(datos);
        setUsuarios(usuarioService.getUsuarios());
        avisar(`Usuario ${datos.nombre} creado como ${datos.rol}.`);
      }
      setErrorUsuario('');
    } catch (error) {
      setErrorUsuario(error.message);
    }
  };

  // ---------- Categorías ----------
  const guardarCategoria = (e) => {
    e.preventDefault();
    try {
      if (categoriaEditar) {
        actualizarCategoria(categoriaEditar, nombreCategoria);
        avisar(`Categoría renombrada a ${nombreCategoria}.`);
        setCategoriaEditar(null);
      } else {
        crearCategoria(nuevaCategoria);
        avisar(`Categoría ${nuevaCategoria} creada.`);
        setNuevaCategoria('');
      }
    } catch (error) {
      avisar(error.message, 'danger');
    }
  };

  // ---------- Eliminar con confirmación ----------
  const confirmarEliminacion = () => {
    try {
      if (porEliminar.tipo === 'producto') eliminar(porEliminar.id);
      if (porEliminar.tipo === 'usuario') setUsuarios(usuarioService.eliminarUsuario(porEliminar.id));
      if (porEliminar.tipo === 'categoria') eliminarCategoria(porEliminar.id);
      avisar(`${porEliminar.texto} eliminado.`);
    } catch (error) {
      avisar(error.message, 'danger');
    }
    setPorEliminar(null);
  };

  // ---------- Datos calculados ----------
  const entregados = pedidos.filter((p) => p.estado === 'ENTREGADO');
  const porMetodo = (metodo) => sumarTotales(entregados.filter((p) => p.metodoPago === metodo));
  const criticos = productos.filter((p) => esStockCritico(p));
  const clientes = usuarios.filter((u) => u.rol === 'CLIENTE');
  const pedidosFiltrados = filtroCliente === 'TODOS' ? pedidos : pedidos.filter((p) => p.clienteRut === filtroCliente);
  const usuariosFiltrados = filtroRol === 'TODOS' ? usuarios : usuarios.filter((u) => u.rol === filtroRol);
  const repartidores = usuarios.filter((u) => u.rol === 'REPARTIDOR');

  return (
    <MainLayoutTemplate tituloHeader="Panel de administración">
      {mensaje && <div className={`alert alert-${mensaje.tipo}`} role="alert">{mensaje.texto}</div>}

      {porEliminar && (
        <div className="alert alert-warning d-flex flex-wrap justify-content-between align-items-center gap-2" role="alert">
          <span>¿Seguro que quieres eliminar <strong>{porEliminar.texto}</strong>?</span>
          <div className="d-flex gap-2">
            <Boton variant="danger" className="btn-sm" onClick={confirmarEliminacion}>Sí, eliminar</Boton>
            <Boton variant="outline-secondary" className="btn-sm" onClick={() => setPorEliminar(null)}>Cancelar</Boton>
          </div>
        </div>
      )}

      {/* Pestañas: en celular se ordenan en varias filas (flex-wrap) */}
      <ul className="nav nav-pills flex-wrap gap-1 mb-4">
        {pestanas.map((p) => (
          <li className="nav-item" key={p.id}>
            <button type="button" className={`nav-link ${pestana === p.id ? 'active' : ''}`} onClick={() => cambiarPestana(p.id)}>
              {p.texto}
            </button>
          </li>
        ))}
      </ul>

      {pestana === 'RESUMEN' && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
          <div className="col"><TarjetaResumenCaja titulo="Pedidos totales" monto={pedidos.length} esDinero={false} /></div>
          <div className="col"><TarjetaResumenCaja titulo="Pendientes" monto={pedidos.filter((p) => p.estado === 'PENDIENTE').length} esDinero={false} color="warning" /></div>
          <div className="col"><TarjetaResumenCaja titulo="Productos en catálogo" monto={productos.length} esDinero={false} color="dark" /></div>
          <div className="col"><TarjetaResumenCaja titulo="Usuarios" monto={usuarios.length} esDinero={false} color="info" /></div>
          <div className="col"><TarjetaResumenCaja titulo="Productos con stock crítico" monto={criticos.length} esDinero={false} color="danger" /></div>
          <div className="col"><TarjetaResumenCaja titulo="Total vendido" monto={sumarTotales(entregados)} color="success" /></div>
        </div>
      )}

      {pestana === 'PEDIDOS' && (
        <div className="row g-4">
          <div className="col-12 col-xl-7">
            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
              <label htmlFor="filtro-cliente" className="small fw-bold">Historial de:</label>
              <select id="filtro-cliente" className="form-select form-select-sm w-auto" value={filtroCliente}
                onChange={(e) => setFiltroCliente(e.target.value)}>
                <option value="TODOS">Todos los clientes</option>
                {clientes.map((c) => <option key={c.rut} value={c.rut}>{c.nombre}</option>)}
              </select>
            </div>
            <div className="table-responsive bg-white border rounded shadow-sm">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr className="small"><th>Pedido</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th><th></th></tr>
                </thead>
                <tbody>
                  {pedidosFiltrados.length === 0 ? (
                    <tr><td colSpan="6" className="text-center text-muted py-3">No hay pedidos.</td></tr>
                  ) : (
                    pedidosFiltrados.map((p) => (
                      <tr key={p.id}>
                        <td className="fw-bold small">{p.id}</td>
                        <td className="small">{p.clienteNombre}</td>
                        <td className="small">{formatearFecha(p.fecha)}</td>
                        <td className="small">{formatearMoneda(p.total)}</td>
                        <td><Etiqueta variant={p.estado} /></td>
                        <td><Boton variant="outline-danger" className="btn-sm" onClick={() => setPedidoVer(p)}>Comprobante</Boton></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12 col-xl-5">
            {pedidoVer ? <ComprobantePedido pedido={pedidoVer} /> : <p className="text-muted">Elige un pedido para ver su comprobante.</p>}
          </div>
        </div>
      )}

      {pestana === 'PRODUCTOS' && (
        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <div className="card p-3 shadow-sm">
              <FormularioProducto
                key={productoEditar?.codigo || 'nuevo'}
                productoEditar={productoEditar}
                categorias={categorias}
                errorGeneral={errorProducto}
                onEnviar={guardarProducto}
                onCancelar={() => setProductoEditar(null)}
              />
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className="card p-3 shadow-sm">
              <Title level={3} className="fs-5 fw-bold mb-3">Catálogo ({productos.length})</Title>
              <TablaProductos
                productos={productos}
                onEditar={(p) => { setProductoEditar(p); setErrorProducto(''); }}
                onEliminar={(p) => setPorEliminar({ tipo: 'producto', id: p.codigo, texto: p.producto })}
              />
            </div>
          </div>
        </div>
      )}

      {pestana === 'CRITICOS' && (
        <div className="card p-3 shadow-sm">
          <Title level={3} className="fs-5 fw-bold">Productos con stock crítico (20 o menos)</Title>
          <TablaProductos
            productos={criticos}
            onEditar={(p) => { setProductoEditar(p); setPestana('PRODUCTOS'); }}
          />
        </div>
      )}

      {pestana === 'CATEGORIAS' && (
        <div className="row g-4">
          <div className="col-12 col-md-5">
            <form className="card p-3 shadow-sm" onSubmit={guardarCategoria}>
              <Title level={3} className="fs-5 fw-bold mb-3">
                {categoriaEditar ? `Renombrar "${categoriaEditar}"` : 'Nueva categoría'}
              </Title>
              <Input
                id="categoria-nombre"
                value={categoriaEditar ? nombreCategoria : nuevaCategoria}
                onChange={(e) => (categoriaEditar ? setNombreCategoria(e.target.value) : setNuevaCategoria(e.target.value))}
                placeholder="Nombre de la categoría"
              />
              <div className="d-flex gap-2 mt-3">
                <Boton type="submit" variant="primary">{categoriaEditar ? 'Guardar' : 'Crear'}</Boton>
                {categoriaEditar && <Boton variant="outline-secondary" onClick={() => setCategoriaEditar(null)}>Cancelar</Boton>}
              </div>
            </form>
          </div>
          <div className="col-12 col-md-7">
            <ul className="list-group shadow-sm">
              {categorias.map((cat) => (
                <li key={cat} className="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2">
                  <span>{cat} <small className="text-muted">({productos.filter((p) => p.categoria === cat).length} productos)</small></span>
                  <div className="d-flex gap-1">
                    <Boton variant="outline-primary" className="btn-sm" onClick={() => { setCategoriaEditar(cat); setNombreCategoria(cat); }}>Editar</Boton>
                    <Boton variant="outline-danger" className="btn-sm" onClick={() => setPorEliminar({ tipo: 'categoria', id: cat, texto: cat })}>Eliminar</Boton>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {pestana === 'USUARIOS' && (
        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="card p-3 shadow-sm">
              <FormularioUsuario
                key={usuarioEditar?.rut || 'nuevo'}
                usuarioEditar={usuarioEditar}
                errorGeneral={errorUsuario}
                onEnviar={guardarUsuario}
                onCancelar={() => setUsuarioEditar(null)}
              />
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="card p-3 shadow-sm">
              <div className="d-flex flex-wrap gap-1 mb-3">
                {['TODOS', 'ADMINISTRADOR', 'OPERADOR', 'REPARTIDOR', 'CLIENTE'].map((r) => (
                  <Boton key={r} variant={filtroRol === r ? 'dark' : 'outline-dark'} className="btn-sm" onClick={() => setFiltroRol(r)}>{r}</Boton>
                ))}
              </div>
              <TablaUsuarios
                usuarios={usuariosFiltrados}
                onEditar={(u) => { setUsuarioEditar(u); setErrorUsuario(''); }}
                onCambiarActivo={(rut) => setUsuarios(usuarioService.cambiarActivo(rut))}
                onEliminar={(u) => setPorEliminar({ tipo: 'usuario', id: u.rut, texto: u.nombre })}
                onVerHistorial={(u) => { setFiltroCliente(u.rut); cambiarPestana('PEDIDOS'); }}
              />
            </div>
          </div>
        </div>
      )}

      {pestana === 'REPORTES' && (
        <>
          <SeccionReporteCaja
            reporte={{
              totalVentas: sumarTotales(entregados),
              efectivo: porMetodo('EFECTIVO'),
              transferencias: porMetodo('TRANSFERENCIA'),
              debito: porMetodo('DEBITO'),
            }}
          />
          <Title level={3} className="fs-5 fw-bold mb-3">Rendición por repartidor</Title>
          <div className="table-responsive bg-white border rounded shadow-sm">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr className="small"><th>Repartidor</th><th>Entregas</th><th>Total recaudado</th><th>Efectivo a rendir</th></tr>
              </thead>
              <tbody>
                {repartidores.map((rep) => {
                  const suyos = entregados.filter((p) => p.repartidorRut === rep.rut);
                  return (
                    <tr key={rep.rut}>
                      <td><strong className="d-block small">{rep.nombre}</strong><small className="text-muted">{rep.rut}</small></td>
                      <td>{suyos.length}</td>
                      <td>{formatearMoneda(sumarTotales(suyos))}</td>
                      <td>{formatearMoneda(sumarTotales(suyos.filter((p) => p.metodoPago === 'EFECTIVO')))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {pestana === 'PERFIL' && (
        <div className="card p-4 shadow-sm max-w-md">
          <Title level={3} className="fs-5 fw-bold mb-3">Mi perfil</Title>
          <p className="mb-1"><strong>Nombre:</strong> {usuario?.nombre}</p>
          <p className="mb-1"><strong>RUT:</strong> {usuario?.rut}</p>
          <p className="mb-1"><strong>Correo:</strong> {usuario?.email}</p>
          <p className="mb-0"><strong>Rol:</strong> {usuario?.rol}</p>
        </div>
      )}
    </MainLayoutTemplate>
  );
};

export default AdminPage;
