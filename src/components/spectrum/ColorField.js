import React, { useState } from 'react';
import './ColorField.css';

const ColorField = ({ 
  value = '#ff0000', 
  placeholder = '#000000',
  disabled = false,
  invalid = false,
  readonly = false,
  size = 'medium',
  onChange,
  ...props 
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const classNames = [
    'spectrum-colorfield',
    `spectrum-colorfield--size-${size}`,
    disabled && 'spectrum-colorfield--disabled',
    invalid && 'spectrum-colorfield--invalid',
    readonly && 'spectrum-colorfield--readonly'
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className="spectrum-colorfield-input-wrapper">
        <input 
          type="text" 
          className="spectrum-colorfield-input"
          value={inputValue} 
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          onChange={handleChange}
          {...props}
        />
      </div>
      <div 
        className="spectrum-colorfield-swatch"
        style={{ backgroundColor: inputValue }}
        aria-hidden="true"
      />
    </div>
  );
};

export default ColorField; 