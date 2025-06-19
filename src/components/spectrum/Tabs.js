import React, { useState, useEffect } from 'react';
import './Tabs.css';

const TabPanel = ({ children, tabId, activeTab, className = '', ...props }) => {
  if (tabId !== activeTab) return null;
  
  return (
    <div 
      className={`spectrum-TabsPanel ${className}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
      id={`panel-${tabId}`}
      {...props}
    >
      {children}
    </div>
  );
};

const Tabs = ({ 
  children,
  defaultTab,
  activeTab: controlledActiveTab,
  onTabChange,
  orientation = 'horizontal',
  size = 'medium',
  emphasized = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || null);
  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  // Extract tab items and panels from children
  const tabs = [];
  const panels = [];
  
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === TabItem) {
        tabs.push(child);
      } else if (child.type === TabPanel) {
        panels.push(child);
      }
    }
  });

  // Set initial active tab if not provided
  useEffect(() => {
    if (!activeTab && tabs.length > 0 && !isControlled) {
      const firstTab = tabs[0];
      if (firstTab && firstTab.props.tabId) {
        setInternalActiveTab(firstTab.props.tabId);
      }
    }
  }, [tabs, activeTab, isControlled]);

  const handleTabClick = (tabId, tabDisabled) => {
    if (disabled || tabDisabled) return;
    
    if (!isControlled) {
      setInternalActiveTab(tabId);
    }
    
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const classes = [
    'spectrum-Tabs',
    `spectrum-Tabs--${orientation}`,
    `spectrum-Tabs--${size}`,
    emphasized && 'spectrum-Tabs--emphasized',
    disabled && 'is-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div 
        className="spectrum-Tabs-list" 
        role="tablist"
        aria-orientation={orientation}
      >
        {tabs.map((tab) => 
          React.cloneElement(tab, {
            key: tab.props.tabId,
            active: activeTab === tab.props.tabId,
            onClick: () => handleTabClick(tab.props.tabId, tab.props.disabled),
            parentDisabled: disabled
          })
        )}
      </div>
      <div className="spectrum-Tabs-content">
        {panels.map((panel) =>
          React.cloneElement(panel, {
            key: panel.props.tabId,
            activeTab
          })
        )}
      </div>
    </div>
  );
};

const TabItem = ({ 
  children,
  tabId,
  disabled = false,
  active = false,
  onClick,
  parentDisabled = false,
  className = '',
  ...props 
}) => {
  const classes = [
    'spectrum-Tabs-item',
    active && 'is-selected',
    (disabled || parentDisabled) && 'is-disabled',
    className
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (!disabled && !parentDisabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      className={classes}
      role="tab"
      aria-selected={active}
      aria-controls={`panel-${tabId}`}
      id={`tab-${tabId}`}
      tabIndex={active ? 0 : -1}
      disabled={disabled || parentDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span className="spectrum-Tabs-itemLabel">{children}</span>
    </button>
  );
};

Tabs.Item = TabItem;
Tabs.Panel = TabPanel;

export default Tabs; 