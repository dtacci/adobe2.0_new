import React, { useState, useRef, useCallback } from 'react';
import './Slider.css';

const Slider = ({ 
  min = 0, 
  max = 100, 
  step = 1,
  value: controlledValue,
  defaultValue = min,
  disabled = false,
  label,
  showValue = false,
  formatValue,
  onChange,
  onChangeEnd,
  ...props 
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const thumbRef = useRef(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = useCallback((newValue) => {
    const clampedValue = Math.max(min, Math.min(max, newValue));
    const steppedValue = Math.round(clampedValue / step) * step;
    
    if (controlledValue === undefined) {
      setInternalValue(steppedValue);
    }
    
    if (onChange) {
      onChange(steppedValue);
    }
  }, [min, max, step, controlledValue, onChange]);

  const getValueFromPosition = useCallback((clientX) => {
    if (!sliderRef.current) return value;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = (clientX - rect.left) / rect.width;
    const newValue = min + percentage * (max - min);
    
    return newValue;
  }, [min, max, value]);

  const handleMouseDown = useCallback((e) => {
    if (disabled) return;
    
    setIsDragging(true);
    const newValue = getValueFromPosition(e.clientX);
    handleChange(newValue);
    
    const handleMouseMove = (e) => {
      const newValue = getValueFromPosition(e.clientX);
      handleChange(newValue);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      if (onChangeEnd) {
        onChangeEnd(value);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [disabled, getValueFromPosition, handleChange, onChangeEnd, value]);

  const handleKeyDown = useCallback((e) => {
    if (disabled) return;
    
    let newValue = value;
    
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        newValue = value - step;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        newValue = value + step;
        break;
      case 'Home':
        e.preventDefault();
        newValue = min;
        break;
      case 'End':
        e.preventDefault();
        newValue = max;
        break;
      case 'PageDown':
        e.preventDefault();
        newValue = value - (max - min) / 10;
        break;
      case 'PageUp':
        e.preventDefault();
        newValue = value + (max - min) / 10;
        break;
      default:
        return;
    }
    
    handleChange(newValue);
    if (onChangeEnd) {
      onChangeEnd(newValue);
    }
  }, [disabled, value, step, min, max, handleChange, onChangeEnd]);

  const displayValue = formatValue ? formatValue(value) : value;

  return (
    <div className={`spectrum-slider ${disabled ? 'is-disabled' : ''}`} {...props}>
      {label && (
        <div className="spectrum-slider-label">
          <label className="spectrum-fieldlabel">{label}</label>
          {showValue && (
            <div className="spectrum-slider-value">{displayValue}</div>
          )}
        </div>
      )}
      <div className="spectrum-slider-controls">
        <div
          ref={sliderRef}
          className={`spectrum-slider-track ${isDragging ? 'is-dragging' : ''}`}
          onMouseDown={handleMouseDown}
        >
          <div 
            className="spectrum-slider-fill"
            style={{ width: `${percentage}%` }}
          />
          <div
            ref={thumbRef}
            className="spectrum-slider-handle"
            style={{ left: `${percentage}%` }}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={displayValue}
            aria-label={label}
            aria-disabled={disabled}
            onKeyDown={handleKeyDown}
          >
            <div className="spectrum-slider-thumb" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider; 