const Imagen = ({ src, alt = "Imagen", className = "logo" }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
    />
  );
};

export default Imagen;