
export const formatearMoneda = (monto) => {
  const valor = Number(monto) || 0;
  return `$${valor.toLocaleString('es-CL')} CLP`;
};


export const formatearFecha = (fechaISO) => {
  if (!fechaISO) return '';
  const fecha = new Date(fechaISO);
  return fecha.toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default {
  formatearMoneda,
  formatearFecha
};