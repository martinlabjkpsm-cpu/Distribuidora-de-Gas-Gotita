import React from 'react';
import { LinkNav } from '../Atoms/LinkNav';

export const Footer = () => {
  return (
    <footer className="pie py-3 bg-light text-center border-top">
      <LinkNav to="/" className="text-decoration-none">
        Volver al inicio
      </LinkNav>
    </footer>
  );
};

export default Footer;