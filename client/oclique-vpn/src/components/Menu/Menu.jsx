// components/menu/menu.js
import React from 'react';

const Menu = ({ setActiveScreen }) => {
  return (
    <nav className="navigation-bar">
      <button className="nav-item" onClick={() => setActiveScreen('home')}>
        Главная
      </button>
      <button
        className="nav-item"
        onClick={() => setActiveScreen('subscription')}
      >
        Подписка
      </button>
      <button className="nav-item" onClick={() => setActiveScreen('settings')}>
        Настройки
      </button>
    </nav>
  );
};

export default Menu;
