// SubscriptionInfo.js
import React from 'react';

const SubscriptionInfo = () => {
  return (
    <div className="subscription-info">
      <div className="info-item">
        <span className="icon">✔</span>
        <span>100 Mbit</span>
      </div>
      <div className="info-item">
        <span className="icon">📅</span>
        <span>21.08.2025</span>
      </div>
      <div className="info-item">
        <span className="icon">📍</span>
        <span>DE Frankfurt</span>
      </div>
    </div>
  );
};

export default SubscriptionInfo;
