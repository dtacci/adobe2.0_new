import React from 'react';
import './Button.css';

const Button = ({ 
  children = 'Button', 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  quiet = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const classNames = [
    'spectrum-button',
    `spectrum-button--${variant}`,
    `spectrum-button--size-${size}`,
    quiet && 'spectrum-button--quiet',
    disabled && 'spectrum-button--disabled'
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      <span className="spectrum-button-label">{children}</span>
    </button>
  );
};

export default Button; 