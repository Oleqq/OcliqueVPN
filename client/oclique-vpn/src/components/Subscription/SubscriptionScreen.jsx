// SubscriptionScreen.js
import React from 'react';
import QRCode from './QRCode';
import SubscriptionInfo from './SubscriptionInfo';


const SubscriptionScreen = () => {
  return (
    <div className="subscription-screen">
      <header className="logo">
        <h1>OCLIQUE VPN</h1>
      </header>
      <div className="qr-container">
        <QRCode />
        <div className="user-id">
          <label>userid:</label>
          <span>Artamoon</span>
        </div>
      </div>
      <SubscriptionInfo />
    </div>
  );
};

export default SubscriptionScreen;
