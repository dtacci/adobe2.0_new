import React, { useState, useRef, useCallback } from 'react';
import './ColorArea.css';

const ColorArea = ({ 
  value = { hue: 0, saturation: 100, lightness: 50 },
  disabled = false,
  size = 'medium',
  onChange,
  ...props 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const areaRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    if (disabled) return;
    
    setIsDragging(true);
    updatePosition(e);
  }, [disabled]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || disabled) return;
    updatePosition(e);
  }, [isDragging, disabled]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const updatePosition = (e) => {
    if (!areaRef.current) return;

    const rect = areaRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    
    setPosition({ x, y });
    
    if (onChange) {
      const saturation = x * 100;
      const lightness = (1 - y) * 100;
      onChange({ ...value, saturation, lightness });
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const classNames = [
    'spectrum-colorarea',
    `spectrum-colorarea--size-${size}`,
    disabled && 'spectrum-colorarea--disabled',
    isDragging && 'spectrum-colorarea--dragging'
  ].filter(Boolean).join(' ');

  const backgroundStyle = {
    background: `linear-gradient(to top, black, transparent), linear-gradient(to right, white, hsl(${value.hue}, 100%, 50%))`
  };

  const handleStyle = {
    left: `${position.x * 100}%`,
    top: `${position.y * 100}%`
  };

  return (
    <div className={classNames} {...props}>
      <div 
        ref={areaRef}
        className="spectrum-colorarea-gradient"
        style={backgroundStyle}
        onMouseDown={handleMouseDown}
        role="slider"
        aria-label="Color area"
        tabIndex={disabled ? -1 : 0}
      >
        <div 
          className="spectrum-colorarea-handle"
          style={handleStyle}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ColorArea; 