// /server/controllers/vpnController.js
const pool = require('../db/database');
const { sendTelegramMessage } = require('../utils/telegram');

const generateCredentials = async (req, res) => {
  const { telegram_id, subscription_duration } = req.body;
  
  try {
    // Получаем один доступный ключ из базы данных
    const result = await pool.query('SELECT * FROM vpn_credentials LIMIT 1');
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No credentials available' });
    }

    const vpnCredential = result.rows[0];
    const username = vpnCredential.username;
    const vpn_key = vpnCredential.vpn_key;
    const now = new Date();
    const subscriptionStart = now.toISOString().split('T')[0];
    const expirationDate = new Date(now.setDate(now.getDate() + subscription_duration));

    // Сохраняем данные пользователя в базе данных
    await pool.query(
      'INSERT INTO users (telegram_id, username, vpn_key, subscription_start, subscription_duration) VALUES ($1, $2, $3, $4, $5)',
      [telegram_id, username, vpn_key, subscriptionStart, subscription_duration]
    );

    // Отправляем сообщение пользователю через Telegram
    sendTelegramMessage(telegram_id, `Ваши данные: Юзернейм: ${username}, Ключ: ${vpn_key}, Срок подписки: ${subscription_duration} дней.`);
    
    res.status(200).json({
      username,
      vpn_key,
      subscription_start: subscriptionStart,
      expiration_date: expirationDate.toISOString().split('T')[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { generateCredentials };
