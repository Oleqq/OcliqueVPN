import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [vpnKey, setVpnKey] = useState('');
  const [subscriptionPeriod, setSubscriptionPeriod] = useState('1'); // По умолчанию 1 месяц
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Для отображения ошибки

  const handlePurchase = async () => {
    setLoading(true);
    setError(null); // Сбрасываем ошибку перед новым запросом

    try {
      // Запрос на сервер для получения username и ключа
      const response = await fetch('/get-vpn-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '123', // Замените userId на реальный идентификатор пользователя
          subscriptionPeriod: subscriptionPeriod, // Передаём срок подписки
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }

      const data = await response.json();
      setUsername(data.username);
      setVpnKey(data.key);

      alert(`Подписка успешно оформлена на ${subscriptionPeriod} месяц(а/ев)`);
    } catch (error) {
      setError(error.message); // Сохраняем ошибку в состояние для отображения
      console.error('Ошибка:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ПРИВЕТ, МЫ СКАМ-КОМПАНИЯ ПО ПЕРЕПРОДАЖЕ ВПН-ДОСТУПА</h1>
        <div className="credentials-container">
          <div className="input-container">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              readOnly
              placeholder="Нажмите 'Купить', чтобы получить"
            />
          </div>
          <div className="input-container">
            <label htmlFor="vpnKey">VPN Key:</label>
            <input
              type="text"
              id="vpnKey"
              value={vpnKey}
              readOnly
              placeholder="Нажмите 'Купить', чтобы получить"
            />
          </div>
          <div className="input-container">
            <label htmlFor="subscriptionPeriod">Срок подписки (в месяцах):</label>
            <select
              id="subscriptionPeriod"
              value={subscriptionPeriod}
              onChange={(e) => setSubscriptionPeriod(e.target.value)}
            >
              <option value="1">1 месяц</option>
              <option value="3">3 месяца</option>
              <option value="6">6 месяцев</option>
              <option value="12">12 месяцев</option>
            </select>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображение ошибки */}
          <button className="purchase-button" onClick={handlePurchase} disabled={loading}>
            {loading ? 'Загрузка...' : 'Купить'}
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
