// /server/utils/telegram.js
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

// Твой ключ бота
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

// Отправка кнопки с Web App
const sendWebAppButton = (chatId) => {
  const message = {
    chat_id: chatId,
    text: "Нажми кнопку, чтобы начать использование Web App",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Перейти в Web App",
            web_app: {
              url: "https://oclique-vpn.vercel.app" // URL твоего приложения на Vercel
            }
          }
        ]
      ]
    }
  };

  // Отправка запроса с помощью axios
  axios.post(TELEGRAM_API_URL, message)
    .then((response) => {
      console.log("Message sent successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};

module.exports = { sendWebAppButton };