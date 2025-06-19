import React from 'react';
import './Card.css';

const Card = ({ 
  children,
  variant = 'primary',
  layout = 'vertical',
  selectable = false,
  selected = false,
  disabled = false,
  focused = false,
  className = '',
  onClick,
  ...props 
}) => {
  const classes = [
    'spectrum-Card',
    `spectrum-Card--${variant}`,
    layout === 'horizontal' && 'spectrum-Card--horizontal',
    selectable && 'spectrum-Card--selectable',
    selected && 'is-selected',
    disabled && 'is-disabled',
    focused && 'is-focused',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (!disabled && selectable && onClick) {
      onClick(e);
    }
  };

  return (
    <div 
      className={classes}
      onClick={handleClick}
      tabIndex={selectable && !disabled ? 0 : undefined}
      role={selectable ? 'button' : undefined}
      aria-pressed={selectable ? selected : undefined}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`spectrum-Card-header ${className}`} {...props}>
    {children}
  </div>
);

const CardBody = ({ children, className = '', ...props }) => (
  <div className={`spectrum-Card-body ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`spectrum-Card-footer ${className}`} {...props}>
    {children}
  </div>
);

const CardImage = ({ src, alt, className = '', ...props }) => (
  <img className={`spectrum-Card-image ${className}`} src={src} alt={alt} {...props} />
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`spectrum-Card-title ${className}`} {...props}>
    {children}
  </h3>
);

const CardSubtitle = ({ children, className = '', ...props }) => (
  <p className={`spectrum-Card-subtitle ${className}`} {...props}>
    {children}
  </p>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;

export default Card; 