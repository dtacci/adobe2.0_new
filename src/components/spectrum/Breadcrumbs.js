import React from 'react';
import './Breadcrumbs.css';

const BreadcrumbItem = ({ 
  children, 
  href,
  isCurrentPage = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const classes = [
    'spectrum-Breadcrumbs-item',
    isCurrentPage && 'is-current',
    disabled && 'is-disabled',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <span className="spectrum-Breadcrumbs-itemLabel">
      {children}
    </span>
  );

  if (isCurrentPage || disabled || !href) {
    return (
      <span 
        className={classes}
        aria-current={isCurrentPage ? 'page' : undefined}
        {...props}
      >
        {content}
      </span>
    );
  }

  return (
    <a 
      className={classes}
      href={href}
      {...props}
    >
      {content}
    </a>
  );
};

const Breadcrumbs = ({ 
  children,
  showRoot = true,
  size = 'medium',
  multiline = false,
  className = '',
  ...props 
}) => {
  const items = React.Children.toArray(children).filter(child => 
    React.isValidElement(child) && child.type === BreadcrumbItem
  );

  const classes = [
    'spectrum-Breadcrumbs',
    `spectrum-Breadcrumbs--${size}`,
    multiline && 'spectrum-Breadcrumbs--multiline',
    className
  ].filter(Boolean).join(' ');

  const renderSeparator = (index) => (
    <span 
      key={`separator-${index}`}
      className="spectrum-Breadcrumbs-separator"
      aria-hidden="true"
    >
      <svg className="spectrum-Icon spectrum-UIIcon-ChevronRight100" focusable="false">
        <path d="M7.5 4.25L12.75 9.5L7.5 14.75L6.25 13.5L10.25 9.5L6.25 5.5Z"/>
      </svg>
    </span>
  );

  return (
    <nav className={classes} aria-label="Breadcrumbs" {...props}>
      <ol className="spectrum-Breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="spectrum-Breadcrumbs-listItem">
              {React.cloneElement(item, {
                isCurrentPage: isLast,
                ...item.props
              })}
              {!isLast && renderSeparator(index)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.Item = BreadcrumbItem;

export default Breadcrumbs; 