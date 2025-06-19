import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ collapsed, componentData, selectedComponent, onComponentSelect }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleComponentClick = (componentName) => {
    onComponentSelect(componentName);
    navigate(`/component/${componentName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleHomeClick = () => {
    onComponentSelect(null);
    navigate('/');
  };

  const isHomePage = location.pathname === '/';

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <div 
          className={`sidebar-home ${isHomePage ? 'active' : ''}`}
          onClick={handleHomeClick}
        >
          📖 Welcome
        </div>
        
        {/* Flat component list matching Storybook */}
        <div className="sidebar-section">
          {componentData.map(componentName => (
            <div
              key={componentName}
              className={`sidebar-item ${selectedComponent === componentName ? 'active' : ''}`}
              onClick={() => handleComponentClick(componentName)}
            >
              {componentName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 