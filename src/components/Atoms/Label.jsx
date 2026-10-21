import React from 'react';

export const Label = ({ htmlFor, children, className = '' }) => { 
  return ( 
    <label htmlFor={htmlFor} className={`form-label ${className}`}> 
      {children} 
    </label> 
  ); 
}; 

export default Label;
