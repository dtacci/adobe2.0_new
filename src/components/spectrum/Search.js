import React, { useState } from 'react';
import './Search.css';

const Search = ({ 
  placeholder = "Search", 
  disabled = false, 
  quiet = false, 
  invalid = false,
  value: controlledValue,
  onChange,
  onSubmit,
  ...props 
}) => {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
  };

  const handleClear = () => {
    const newValue = '';
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange({ target: { value: newValue } });
    }
  };

  return (
    <form 
      className={`spectrum-search ${quiet ? 'spectrum-search--quiet' : ''} ${disabled ? 'is-disabled' : ''} ${invalid ? 'is-invalid' : ''}`}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="spectrum-search-input">
        <svg className="spectrum-icon spectrum-icon--search" viewBox="0 0 18 18">
          <path d="m16.607 14.606-4.262-4.262a6.5 6.5 0 1 0-2.001 2.001l4.262 4.262a1.415 1.415 0 0 0 2.001-2.001zM6.5 11A4.5 4.5 0 1 1 11 6.5 4.505 4.505 0 0 1 6.5 11z"/>
        </svg>
        <input
          type="text"
          className="spectrum-textfield-input spectrum-search-input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={invalid}
        />
        {value && (
          <button
            type="button"
            className="spectrum-clearbutton"
            onClick={handleClear}
            disabled={disabled}
            aria-label="Clear search"
          >
            <svg className="spectrum-icon spectrum-icon--clear" viewBox="0 0 10 10">
              <path d="M9.2.7 8.5 0 5 3.5 1.5 0 .8.7 4.3 5 .8 9.3l.7.7L5 6.5 8.5 10l.7-.7L5.7 5 9.2.7z"/>
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default Search; 