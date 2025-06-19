import React, { useState, useRef } from 'react';
import './Picker.css';

const Picker = ({ 
  items = [
    { id: 'option1', textValue: 'Option 1' },
    { id: 'option2', textValue: 'Option 2' },
    { id: 'option3', textValue: 'Option 3' },
    { id: 'option4', textValue: 'Option 4' },
    { id: 'option5', textValue: 'Option 5' }
  ],
  selectedKey = '',
  placeholder = 'Select an option...',
  disabled = false,
  invalid = false,
  readonly = false,
  size = 'medium',
  onSelectionChange,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const selectedItem = items.find(item => item.id === selectedKey);
  const displayValue = selectedItem ? selectedItem.textValue : placeholder;

  const handleToggle = () => {
    if (!disabled && !readonly) {
      setIsOpen(!isOpen);
      setFocusedIndex(-1);
    }
  };

  const handleOptionSelect = (item) => {
    if (onSelectionChange) {
      onSelectionChange(item.id);
    }
    setIsOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
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
            prev < items.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : items.length - 1
          );
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (focusedIndex >= 0) {
          handleOptionSelect(items[focusedIndex]);
        }
        break;
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
        }
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
    'spectrum-picker',
    `spectrum-picker--size-${size}`,
    disabled && 'spectrum-picker--disabled',
    invalid && 'spectrum-picker--invalid',
    readonly && 'spectrum-picker--readonly',
    isOpen && 'spectrum-picker--open'
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} onBlur={handleBlur} {...props}>
      <button
        ref={buttonRef}
        type="button"
        className="spectrum-picker-button"
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={selectedItem ? undefined : 'picker-placeholder'}
      >
        <span 
          className={`spectrum-picker-label ${!selectedItem ? 'spectrum-picker-label--placeholder' : ''}`}
          id={!selectedItem ? 'picker-placeholder' : undefined}
        >
          {displayValue}
        </span>
        <svg className="spectrum-icon spectrum-picker-icon" viewBox="0 0 12 12" focusable="false">
          <path d="M6 8.5L1.5 4h9z" fill="currentColor"/>
        </svg>
      </button>
      
      {isOpen && (
        <div className="spectrum-picker-popover">
          <ul 
            ref={listRef}
            className="spectrum-picker-listbox"
            role="listbox"
          >
            {items.map((item, index) => (
              <li
                key={item.id}
                className={`spectrum-picker-option ${
                  index === focusedIndex ? 'spectrum-picker-option--focused' : ''
                } ${
                  item.id === selectedKey ? 'spectrum-picker-option--selected' : ''
                }`}
                role="option"
                aria-selected={item.id === selectedKey}
                onClick={() => handleOptionSelect(item)}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                <span className="spectrum-picker-option-label">{item.textValue}</span>
                {item.id === selectedKey && (
                  <svg className="spectrum-icon spectrum-picker-option-checkmark" viewBox="0 0 12 12" focusable="false">
                    <path d="M4.5 9L1.5 6l1-1 2 2 4.5-4.5L10 3.5z" fill="currentColor"/>
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Picker; 