import React from 'react';
import './MenuIcon.scss'; 
import { CSSProperties } from 'react';

interface MenuIconProps {
    showMenu: () => void,
    active: boolean,
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    menIcinStyles?: CSSProperties;
}

const MenuIcon:  React.FC<MenuIconProps> = ({ showMenu, active, onMouseEnter, onMouseLeave, menIcinStyles }) => {
  const activeClass = active ? 'active' : '';

  return (
    <div 
      className={`menu-icon ${activeClass}`} 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={menIcinStyles}
    >
      <input 
        type="checkbox" 
        id="trigger" 
        checked={active} 
        readOnly 
      />
      <label htmlFor="trigger" onClick={showMenu}>
        <span className="icon-line"></span>
        <span className="icon-line"></span>
        <span className="icon-line"></span>
      </label>
    </div>
  );
};

export default MenuIcon;
