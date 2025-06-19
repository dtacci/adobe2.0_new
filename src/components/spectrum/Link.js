import React from 'react';
import './Link.css';

const Link = ({ 
  variant = 'primary',
  isQuiet = false,
  staticColor,
  href,
  target,
  rel,
  children,
  className = '',
  ...props 
}) => {
  const classes = [
    'spectrum-link',
    `spectrum-link--${variant}`,
    isQuiet && 'spectrum-link--quiet',
    staticColor && `spectrum-link--static-${staticColor}`,
    className
  ].filter(Boolean).join(' ');

  // Add security attributes for external links
  const linkProps = {
    href,
    target,
    rel: target === '_blank' ? 'noopener noreferrer' : rel,
    ...props
  };

  return (
    <a 
      className={classes}
      {...linkProps}
    >
      {children}
    </a>
  );
};

export default Link; 