import React, { useState } from 'react';
import './Switch.css';

const Switch = ({ 
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  emphasized = false,
  size = 'medium',
  children,
  onChange,
  ...props 
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleChange = (e) => {
    const newChecked = e.target.checked;
    
    if (controlledChecked === undefined) {
      setInternalChecked(newChecked);
    }
    
    if (onChange) {
      onChange(e);
    }
  };

  const sizeClass = size !== 'medium' ? `spectrum-switch--size-${size}` : '';
  const emphasizedClass = emphasized ? 'spectrum-switch--emphasized' : '';

  return (
    <label 
      className={`spectrum-switch ${sizeClass} ${emphasizedClass} ${disabled ? 'is-disabled' : ''} ${checked ? 'is-checked' : ''}`}
      {...props}
    >
      <input
        type="checkbox"
        className="spectrum-switch-input"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className="spectrum-switch-indicator">
        <span className="spectrum-switch-handle" />
      </span>
      {children && (
        <span className="spectrum-switch-label">{children}</span>
      )}
    </label>
  );
};

export default Switch; 