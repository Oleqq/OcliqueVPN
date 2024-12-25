// App.js
import React, { useState } from 'react';
import HomeScreen from './components/Home/Home';
import SubscriptionScreen from './components/Subscription/SubscriptionScreen';
import Menu from './components/Menu/Menu'; 
import './style.css';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('home');

  return (
    <div className="app">
      <main className="content">
        {activeScreen === 'home' && <HomeScreen />}
        {activeScreen === 'subscription' && <SubscriptionScreen />}
      </main>
      <Menu setActiveScreen={setActiveScreen} /> 
    </div>
  );
};

export default App;
