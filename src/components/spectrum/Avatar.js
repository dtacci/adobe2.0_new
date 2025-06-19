import React from 'react';
import './Avatar.css';

const Avatar = ({ 
  src, 
  alt = '', 
  initials,
  size = 'medium',
  disabled = false,
  className = '',
  ...props 
}) => {
  const getInitials = () => {
    if (initials) return initials;
    if (alt) {
      return alt.split(' ')
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase();
    }
    return '';
  };

  const classes = [
    'spectrum-Avatar',
    `spectrum-Avatar--size${size.charAt(0).toUpperCase() + size.slice(1)}`,
    disabled && 'is-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {src ? (
        <img 
          className="spectrum-Avatar-image" 
          src={src} 
          alt={alt}
          onError={(e) => {
            // Hide image on error to show initials fallback
            e.target.style.display = 'none';
          }}
        />
      ) : null}
      {(!src || getInitials()) && (
        <span className="spectrum-Avatar-initials">
          {getInitials()}
        </span>
      )}
    </div>
  );
};

export default Avatar; 