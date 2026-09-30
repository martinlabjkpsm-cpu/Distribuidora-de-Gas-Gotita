export const Etiqueta = ({ variant = 'pendiente', children, className = '' }) => {

  const EtiquetaClass = `etiqueta etiqueta-${variant.toString().toLowerCase()}`;

  return (
    <span className={`${EtiquetaClass} ${className}`.trim()}>
      {children}
    </span>
  );
};
