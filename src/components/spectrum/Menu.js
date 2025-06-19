import React, { useState } from 'react';
import './Menu.css';

const Menu = ({ 
  items = [
    { id: 'item1', label: 'Menu Item 1', disabled: false },
    { id: 'item2', label: 'Menu Item 2', disabled: false },
    { id: 'item3', label: 'Menu Item 3', disabled: true },
    { id: 'divider', type: 'divider' },
    { id: 'item4', label: 'Menu Item 4', disabled: false },
    { id: 'item5', label: 'Menu Item 5', disabled: false }
  ],
  selectedKeys = [],
  selectionMode = 'none', // 'none', 'single', 'multiple'
  size = 'medium',
  onAction,
  onSelectionChange,
  ...props 
}) => {
  const [internalSelection, setInternalSelection] = useState(new Set(selectedKeys));

  const handleItemClick = (item) => {
    if (item.disabled || item.type === 'divider') return;

    if (onAction) {
      onAction(item.id);
    }

    if (selectionMode !== 'none') {
      const newSelection = new Set(internalSelection);
      
      if (selectionMode === 'single') {
        newSelection.clear();
        newSelection.add(item.id);
      } else if (selectionMode === 'multiple') {
        if (newSelection.has(item.id)) {
          newSelection.delete(item.id);
        } else {
          newSelection.add(item.id);
        }
      }
      
      setInternalSelection(newSelection);
      
      if (onSelectionChange) {
        onSelectionChange(Array.from(newSelection));
      }
    }
  };

  const classNames = [
    'spectrum-menu',
    `spectrum-menu--size-${size}`,
    selectionMode !== 'none' && `spectrum-menu--selectable`
  ].filter(Boolean).join(' ');

  return (
    <ul className={classNames} role="menu" {...props}>
      {items.map((item) => {
        if (item.type === 'divider') {
          return (
            <li key={item.id} className="spectrum-menu-divider" role="separator" />
          );
        }

        const isSelected = internalSelection.has(item.id);
        const itemClassNames = [
          'spectrum-menu-item',
          item.disabled && 'spectrum-menu-item--disabled',
          isSelected && 'spectrum-menu-item--selected'
        ].filter(Boolean).join(' ');

        return (
          <li
            key={item.id}
            className={itemClassNames}
            role={selectionMode !== 'none' ? 'menuitemcheckbox' : 'menuitem'}
            aria-disabled={item.disabled}
            aria-checked={selectionMode !== 'none' ? isSelected : undefined}
            onClick={() => handleItemClick(item)}
            tabIndex={item.disabled ? -1 : 0}
          >
            {selectionMode === 'multiple' && (
              <span className="spectrum-menu-item-checkmark">
                {isSelected && (
                  <svg className="spectrum-icon" viewBox="0 0 12 12" focusable="false">
                    <path d="M4.5 9L1.5 6l1-1 2 2 4.5-4.5L10 3.5z" fill="currentColor"/>
                  </svg>
                )}
              </span>
            )}
            
            <span className="spectrum-menu-item-label">{item.label}</span>
            
            {item.shortcut && (
              <span className="spectrum-menu-item-value">{item.shortcut}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Menu; 