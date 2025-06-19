import React from 'react';
import './ActionButton.css';

const ActionButton = ({ 
  children = 'Action', 
  variant = 'default', 
  size = 'medium', 
  disabled = false, 
  quiet = false,
  selected = false,
  onClick,
  ...props 
}) => {
  const classNames = [
    'spectrum-actionbutton',
    `spectrum-actionbutton--${variant}`,
    `spectrum-actionbutton--size-${size}`,
    quiet && 'spectrum-actionbutton--quiet',
    selected && 'spectrum-actionbutton--selected',
    disabled && 'spectrum-actionbutton--disabled'
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <span className="spectrum-actionbutton-label">{children}</span>
    </button>
  );
};

export default ActionButton; 