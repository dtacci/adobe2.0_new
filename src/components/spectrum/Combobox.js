import React, { useState, useRef, useEffect } from 'react';
import './Combobox.css';

const Combobox = ({ 
  options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' }
  ],
  value = '',
  placeholder = 'Select an option...',
  disabled = false,
  invalid = false,
  readonly = false,
  size = 'medium',
  onChange,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const filtered = options.filter(option => 
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
    setFocusedIndex(-1);
  }, [inputValue, options]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleOptionSelect = (option) => {
    setInputValue(option.label);
    setIsOpen(false);
    
    if (onChange) {
      onChange(option.value);
    }
  };

  const handleKeyDown = (e) => {
    if (disabled || readonly) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          handleOptionSelect(filteredOptions[focusedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      default:
        // No action needed for other keys
        break;
    }
  };

  const handleBlur = (e) => {
    // Delay closing to allow option selection
    setTimeout(() => {
      if (!e.currentTarget.contains(document.activeElement)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }, 100);
  };

  const classNames = [
    'spectrum-combobox',
    `spectrum-combobox--size-${size}`,
    disabled && 'spectrum-combobox--disabled',
    invalid && 'spectrum-combobox--invalid',
    readonly && 'spectrum-combobox--readonly',
    isOpen && 'spectrum-combobox--open'
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} onBlur={handleBlur} {...props}>
      <div className="spectrum-combobox-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="spectrum-combobox-input"
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => !readonly && setIsOpen(true)}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="combobox-listbox"
        />
        <button
          type="button"
          className="spectrum-combobox-button"
          disabled={disabled}
          onClick={() => !readonly && setIsOpen(!isOpen)}
          aria-label="Open combobox"
          tabIndex={-1}
        >
          <svg className="spectrum-icon" viewBox="0 0 12 12" focusable="false">
            <path d="M6 8.5L1.5 4h9z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      
      {isOpen && (
        <div className="spectrum-combobox-popover">
          <ul 
            ref={listRef}
            id="combobox-listbox"
            className="spectrum-combobox-listbox"
            role="listbox"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  className={`spectrum-combobox-option ${
                    index === focusedIndex ? 'spectrum-combobox-option--focused' : ''
                  }`}
                  role="option"
                  aria-selected={inputValue === option.label}
                  onClick={() => handleOptionSelect(option)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="spectrum-combobox-option spectrum-combobox-option--empty">
                No options found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Combobox; 