import React from 'react';
import './Divider.css';

const Divider = ({ 
  orientation = 'horizontal',
  variant = 'medium',
  className = '',
  ...props 
}) => {
  const dividerClasses = [
    'spectrum-divider',
    `spectrum-divider--${orientation}`,
    `spectrum-divider--size-${variant}`,
    className
  ].filter(Boolean).join(' ');

  if (orientation === 'vertical') {
    return (
      <div 
        className={dividerClasses}
        aria-orientation="vertical"
        {...props}
      />
    );
  }

  return (
    <hr 
      className={dividerClasses}
      {...props}
    />
  );
};

export default Divider; 