const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();
app.use(express.json());

// Ваш Telegram токен
const TELEGRAM_TOKEN = '7677806057:AAFp-_fcvaXvQvp0b0Az8oBGxzIjCPrdNsE';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/`;

// Хранение информации о том, кто уже получил кнопку Web App
let processedChats = new Set(); // Множество для хранения чатов, которым уже была отправлена кнопка

// Функция для отправки кнопки с Web App
const sendWebAppButton = (chatId) => {
  const message = {
    chat_id: chatId,
    text: "Нажми кнопку, чтобы перейти в Web App",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Перейти в Web App",
            web_app: {
              url: "https://oclique-vpn.vercel.app" // Ссылка на ваше приложение на Vercel
            }
          }
        ]
      ]
    }
  };

  // Отправка запроса с помощью axios
  axios.post(`${TELEGRAM_API_URL}sendMessage`, message)
    .then((response) => {
      console.log("Message sent successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};

// Функция для получения обновлений от Telegram
const getUpdates = (offset = 0) => {
  axios.get(`${TELEGRAM_API_URL}getUpdates`, { params: { offset } })
    .then(response => {
      const updates = response.data.result;

      if (updates && updates.length > 0) {
        updates.forEach(update => {
          // Проверяем, что обновление содержит сообщение и чат
          if (update.message && update.message.chat) {
            const chatId = update.message.chat.id;
            const text = update.message.text;

            // Проверяем, если пользователь написал команду /start
            if (text && text === "/start" && !processedChats.has(chatId)) {
              sendWebAppButton(chatId); // Отправляем кнопку с Web App на команду /start
              processedChats.add(chatId); // Добавляем chatId в множество, чтобы не отправить кнопку повторно
            }
          } else {
            console.log("Received update without message or chat field:", update);
          }

          // Если обновление от callback query (кнопка была нажата)
          if (update.callback_query) {
            const chatId = update.callback_query.message.chat.id;
            const callbackData = update.callback_query.data;

            // Выводим сообщение при нажатии на кнопку
            if (callbackData === 'web_app_button') {
              sendWebAppButton(chatId);
            }
          }
        });

        // Устанавливаем новый offset, чтобы получать новые сообщения
        const lastUpdateId = updates[updates.length - 1].update_id;
        getUpdates(lastUpdateId + 1); // Рекурсивный вызов с новым offset
      } else {
        // Если нет новых обновлений, снова вызываем getUpdates через 3 секунды
        setTimeout(() => getUpdates(offset), 3000);
      }
    })
    .catch(error => {
      console.error('Error fetching updates:', error);
      setTimeout(() => getUpdates(offset), 3000); // Повторный вызов в случае ошибки
    });
};

// Запуск бота
getUpdates();

// Статические файлы для React клиента
// app.use(express.static(path.join(__dirname, '../client/oclique-vpn/build')));

// // Для обработки всех запросов и отдачи index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/oclique-vpn/build/index.html'));
// });

// Порт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
