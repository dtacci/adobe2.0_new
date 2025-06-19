import React, { useState, useEffect, useCallback } from 'react';
import './Toast.css';

const Toast = ({ 
  variant = 'info',
  timeout = 6000,
  children,
  onClose,
  open = false,
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(open);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      if (onClose) {
        onClose();
      }
    }, 200); // Animation duration
  }, [onClose]);

  useEffect(() => {
    setIsVisible(open);
    setIsClosing(false);
  }, [open]);

  useEffect(() => {
    if (isVisible && timeout > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [isVisible, timeout, handleClose]);

  const getIcon = () => {
    switch (variant) {
      case 'positive':
        return (
          <svg className="spectrum-icon spectrum-icon--checkmark" viewBox="0 0 10 10">
            <path d="M3.5 9.5a.999.999 0 0 1-.774-.368l-2.45-3a1 1 0 1 1 1.548-1.264L3.5 7.159l4.676-5.291a1 1 0 0 1 1.548 1.264l-5.45 6a.999.999 0 0 1-.774.368z"/>
          </svg>
        );
      case 'negative':
        return (
          <svg className="spectrum-icon spectrum-icon--alert" viewBox="0 0 10 10">
            <path d="M8.564 1.435L6.5 3.5 8.564 5.565a.5.5 0 0 1-.707.707L5.793 4.207 3.728 6.272a.5.5 0 0 1-.707-.707L5.086 3.5 3.021 1.435a.5.5 0 0 1 .707-.707L5.793 2.793l2.064-2.065a.5.5 0 0 1 .707.707z"/>
          </svg>
        );
      case 'notice':
        return (
          <svg className="spectrum-icon spectrum-icon--alert" viewBox="0 0 10 10">
            <path d="M5 0C2.25 0 0 2.25 0 5s2.25 5 5 5 5-2.25 5-5S7.75 0 5 0zM4 3h2v4H4V3zm0 5h2v1H4V8z"/>
          </svg>
        );
      case 'info':
        return (
          <svg className="spectrum-icon spectrum-icon--info" viewBox="0 0 10 10">
            <path d="M5 0C2.25 0 0 2.25 0 5s2.25 5 5 5 5-2.25 5-5S7.75 0 5 0zM4 3h2v1H4V3zm0 2h2v3H4V5z"/>
          </svg>
        );
      default:
        return (
          <svg className="spectrum-icon spectrum-icon--info" viewBox="0 0 10 10">
            <path d="M5 0C2.25 0 0 2.25 0 5s2.25 5 5 5 5-2.25 5-5S7.75 0 5 0zM4 3h2v1H4V3zm0 2h2v3H4V5z"/>
          </svg>
        );
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`spectrum-toast spectrum-toast--${variant} ${isClosing ? 'spectrum-toast--closing' : ''}`}
      role="alert"
      aria-live="polite"
      {...props}
    >
      <div className="spectrum-toast-icon">
        {getIcon()}
      </div>
      <div className="spectrum-toast-body">
        {children}
      </div>
      <button
        className="spectrum-toast-close spectrum-clearbutton"
        onClick={handleClose}
        aria-label="Close"
      >
        <svg className="spectrum-icon spectrum-icon--cross" viewBox="0 0 10 10">
          <path d="M9.2.7 8.5 0 5 3.5 1.5 0 .8.7 4.3 5 .8 9.3l.7.7L5 6.5 8.5 10l.7-.7L5.7 5 9.2.7z"/>
        </svg>
      </button>
    </div>
  );
};

// Toast container component for managing multiple toasts
export const ToastContainer = ({ children, position = 'bottom-right' }) => {
  return (
    <div className={`spectrum-toast-container spectrum-toast-container--${position}`}>
      {children}
    </div>
  );
};

export default Toast; 