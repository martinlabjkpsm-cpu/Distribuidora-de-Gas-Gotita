import React from 'react';

// Átomo: enlace real (<a href>) que NO conoce el router.
// Al hacer clic cancela la recarga (preventDefault) y avisa con onNavegar(ruta).
// Quien crea "navigate" es la plantilla o la página, y lo pasa por props.
export const LinkNav = ({ to = '/', onNavegar, onClick, children, className = '' }) => {
  const manejarClic = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    if (onNavegar) onNavegar(to);
  };

  return (
    <a href={to} onClick={manejarClic} className={className}>
      {children}
    </a>
  );
};

export default LinkNav;
