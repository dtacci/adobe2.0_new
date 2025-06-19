import React from 'react';
import './Checkbox.css';

const Checkbox = ({ 
  checked = false, 
  indeterminate = false,
  disabled = false,
  invalid = false,
  readonly = false,
  emphasized = false,
  size = 'medium',
  label = 'Checkbox',
  onChange,
  ...props 
}) => {
  const classNames = [
    'spectrum-checkbox',
    `spectrum-checkbox--size-${size}`,
    disabled && 'spectrum-checkbox--disabled',
    invalid && 'spectrum-checkbox--invalid',
    readonly && 'spectrum-checkbox--readonly',
    emphasized && 'spectrum-checkbox--emphasized'
  ].filter(Boolean).join(' ');

  return (
    <label className={classNames}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        ref={input => {
          if (input) input.indeterminate = indeterminate;
        }}
        {...props}
      />
      <span className="spectrum-checkbox-box">
        <svg className="spectrum-icon spectrum-checkbox-checkmark" focusable="false">
          {indeterminate ? (
            <path d="M2 8h12" stroke="currentColor" strokeWidth="2" fill="none"/>
          ) : (
            <path d="M3.5 9.5L8.5 14.5L20.5 2.5" stroke="currentColor" strokeWidth="3" fill="none"/>
          )}
        </svg>
      </span>
      <span className="spectrum-checkbox-label">{label}</span>
    </label>
  );
};

export default Checkbox; 