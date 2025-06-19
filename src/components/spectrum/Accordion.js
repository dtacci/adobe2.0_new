import React, { useState } from 'react';
import './Accordion.css';

const AccordionItem = ({ title, children, isOpen, onToggle, disabled = false }) => {
  return (
    <div className={`spectrum-Accordion-item ${isOpen ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''}`}>
      <button
        className="spectrum-Accordion-itemHeader"
        onClick={onToggle}
        disabled={disabled}
        aria-expanded={isOpen}
      >
        <span className="spectrum-Accordion-itemIndicator">
          <svg className="spectrum-Icon spectrum-UIIcon-ChevronRight100" focusable="false" aria-hidden="true">
            <path d="M7.5 4.25L12.75 9.5L7.5 14.75L6.25 13.5L10.25 9.5L6.25 5.5Z"/>
          </svg>
        </span>
        <span className="spectrum-Accordion-itemTitle">{title}</span>
      </button>
      <div className="spectrum-Accordion-itemContent">
        <div className="spectrum-Accordion-itemBody">
          {children}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ 
  children, 
  allowMultiple = false, 
  defaultOpenItems = [],
  className = '',
  ...props 
}) => {
  const [openItems, setOpenItems] = useState(new Set(defaultOpenItems));

  const handleToggle = (index) => {
    const newOpenItems = new Set(openItems);
    
    if (allowMultiple) {
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
    } else {
      // Single mode - close all others
      if (newOpenItems.has(index)) {
        newOpenItems.clear();
      } else {
        newOpenItems.clear();
        newOpenItems.add(index);
      }
    }
    
    setOpenItems(newOpenItems);
  };

  return (
    <div className={`spectrum-Accordion ${className}`} {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === AccordionItem) {
          return React.cloneElement(child, {
            isOpen: openItems.has(index),
            onToggle: () => handleToggle(index)
          });
        }
        return child;
      })}
    </div>
  );
};

Accordion.Item = AccordionItem;

export default Accordion; 