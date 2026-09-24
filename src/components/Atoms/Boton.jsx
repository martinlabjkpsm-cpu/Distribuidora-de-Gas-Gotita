function Boton({ texto, variante = "primary", type = "button", className = "", onClick }) {
  return (
    <button
     type={type}
      className={`btn btn-${variante} ${className}`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
}

export default Boton;