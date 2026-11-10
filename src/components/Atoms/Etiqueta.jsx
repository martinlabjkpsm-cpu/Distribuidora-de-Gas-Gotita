// Átomo: etiqueta (badge) con el color de cada estado de pedido.
// Recibe el estado por props: <Etiqueta estado="PENDIENTE" />
const coloresPorEstado = {
  PENDIENTE: 'bg-warning text-dark',
  'EN CAMINO': 'bg-info text-dark',
  ENTREGADO: 'bg-success',
  CANCELADO: 'bg-danger',
};

function Etiqueta(props) {
  const estado = props.estado || 'PENDIENTE';
  const color = coloresPorEstado[String(estado).toUpperCase()] || 'bg-secondary';
  const clases = `badge ${color} ${props.className || ''}`.trim();

  return <span className={clases}>{props.texto ?? props.children ?? estado}</span>;
}

export { Etiqueta };
export default Etiqueta;
