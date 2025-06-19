import React from 'react';
import './Radio.css';

const Radio = ({ 
  checked = false,
  disabled = false,
  invalid = false,
  readonly = false,
  emphasized = false,
  size = 'medium',
  label = 'Radio',
  name,
  value,
  onChange,
  ...props 
}) => {
  const classNames = [
    'spectrum-radio',
    `spectrum-radio--size-${size}`,
    disabled && 'spectrum-radio--disabled',
    invalid && 'spectrum-radio--invalid',
    readonly && 'spectrum-radio--readonly',
    emphasized && 'spectrum-radio--emphasized'
  ].filter(Boolean).join(' ');

  return (
    <label className={classNames}>
      <input
        type="radio"
        checked={checked}
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      />
      <span className="spectrum-radio-button">
        <span className="spectrum-radio-button-dot"></span>
      </span>
      <span className="spectrum-radio-label">{label}</span>
    </label>
  );
};

export default Radio; 