import React, { useState } from 'react';
import './Textfield.css';

const Textfield = ({ 
  value: controlledValue,
  defaultValue = '',
  placeholder,
  disabled = false,
  invalid = false,
  quiet = false,
  multiline = false,
  rows = 3,
  label,
  helpText,
  errorMessage,
  type = 'text',
  size = 'medium',
  onChange,
  onFocus,
  onBlur,
  ...props 
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const hasValue = value && value.length > 0;

  const handleChange = (e) => {
    const newValue = e.target.value;
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const sizeClass = size !== 'medium' ? `spectrum-textfield--size-${size}` : '';
  const quietClass = quiet ? 'spectrum-textfield--quiet' : '';
  const multilineClass = multiline ? 'spectrum-textfield--multiline' : '';
  const focusedClass = isFocused ? 'is-focused' : '';
  const hasValueClass = hasValue ? 'has-value' : '';

  const InputComponent = multiline ? 'textarea' : 'input';
  const inputProps = multiline 
    ? { rows } 
    : { type };

  return (
    <div className={`spectrum-textfield ${sizeClass} ${quietClass} ${multilineClass} ${disabled ? 'is-disabled' : ''} ${invalid ? 'is-invalid' : ''} ${focusedClass} ${hasValueClass}`}>
      {label && (
        <label className="spectrum-fieldlabel spectrum-textfield-label">
          {label}
        </label>
      )}
      <div className="spectrum-textfield-input-container">
        <InputComponent
          {...inputProps}
          className="spectrum-textfield-input"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </div>
      {(helpText || errorMessage) && (
        <div className="spectrum-textfield-helptext">
          {invalid && errorMessage ? (
            <div className="spectrum-helptext spectrum-helptext--negative">
              {errorMessage}
            </div>
          ) : helpText ? (
            <div className="spectrum-helptext">
              {helpText}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Textfield; 