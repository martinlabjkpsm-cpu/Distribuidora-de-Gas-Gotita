import React from 'react';

export const AuthLayoutTemplate = ({ children, titulo, subtitulo }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div className="card shadow-lg p-4 border-0 rounded-4 bg-white w-100 max-w-card">
        <div className="text-center mb-4">
          <span className="fs-1">🔥</span>
          <h1 className="fs-3 fw-bold text-danger m-0">{titulo}</h1>
          {subtitulo && <p className="text-muted small m-0 mt-1">{subtitulo}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayoutTemplate;