import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ 
  variant = 'default',
  size = 'm',
  value = 50,
  maxValue = 100,
  minValue = 0,
  isIndeterminate = false,
  label,
  valueLabel,
  showValueLabel = false,
  className = '',
  ...props 
}) => {
  const classes = [
    'spectrum-progressbar',
    `spectrum-progressbar--size-${size}`,
    isIndeterminate && 'spectrum-progressbar--indeterminate',
    variant !== 'default' && `spectrum-progressbar--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const percentage = isIndeterminate ? 0 : Math.min(100, Math.max(0, ((value - minValue) / (maxValue - minValue)) * 100));
  const displayValue = showValueLabel ? (valueLabel || `${Math.round(percentage)}%`) : undefined;

  return (
    <div 
      className={classes}
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : value}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
      aria-label={label}
      aria-valuetext={displayValue}
      {...props}
    >
      {label && (
        <div className="spectrum-progressbar-label">
          {label}
          {displayValue && (
            <span className="spectrum-progressbar-percentage">
              {displayValue}
            </span>
          )}
        </div>
      )}
      <div className="spectrum-progressbar-track">
        <div 
          className="spectrum-progressbar-fill"
          style={{ width: isIndeterminate ? undefined : `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 