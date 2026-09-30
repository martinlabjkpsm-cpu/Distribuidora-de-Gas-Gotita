import React from 'react';

export const LinkNav = ({ href, children, className = '' }) => {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};
