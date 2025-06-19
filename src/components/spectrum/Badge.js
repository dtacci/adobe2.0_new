import React from 'react';
import './Badge.css';

const Badge = ({ 
  variant = 'neutral',
  size = 'm',
  children,
  className = '',
  ...props 
}) => {
  const classes = [
    'spectrum-badge',
    `spectrum-badge--size-${size}`,
    `spectrum-badge--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={classes}
      role="img"
      aria-label={typeof children === 'string' ? children : undefined}
      {...props}
    >
      <span className="spectrum-badge-label">
        {children}
      </span>
    </div>
  );
};

export default Badge; 