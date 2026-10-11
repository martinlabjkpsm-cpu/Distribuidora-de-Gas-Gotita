import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LinkNav = ({ to, onClick, children, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <a href={to || '#'} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default LinkNav;