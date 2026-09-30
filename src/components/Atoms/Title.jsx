import React from 'react';

export const Title = ({ level = 1, children, className = '' }) => {
  const Tag = `h${level}`;
  return <Tag className={`title title-h${level} ${className}`}>{children}</Tag>;
};
