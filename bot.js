const fetch = require('node-fetch');
const express = require('express');
const app = express();

// Токен вашего бота
const token = '7677806057:AAFp-_fcvaXvQvp0b0Az8oBGxzIjCPrdNsE';
const botUrl = `https://api.telegram.org/bot${token}/`;

// Слушаем сообщения
app.use(express.json());

// Маршрут для корня (для проверки работы сервера)
app.get('/', (req, res) => {
  res.send('Hello, the server is running!');
});

app.post('/webhook', async (req, res) => {
  const message = req.body.message;
  if (message) {
    const chatId = message.chat.id;
    const text = message.text;

    // Отправка ответа
    const response = await fetch(`${botUrl}sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Вы написали: ${text}`,
      }),
    });

    const data = await response.json();
    console.log('Message sent:', data);
  }

  res.sendStatus(200);
});

// Устанавливаем вебхук для получения обновлений от Telegram
const setWebhook = async () => {
  const webhookUrl = 'https://oclique-vpn.vercel.app/webhook';  // Укажите URL вашего веб-приложения

  const url = `${botUrl}setWebhook?url=${webhookUrl}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Webhook set:', data);
  } catch (error) {
    console.error('Error setting webhook:', error);
  }
};

// Запуск сервера
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  setWebhook();  // Устанавливаем вебхук при старте
});


app.post('/webhook', async (req, res) => {
    const message = req.body.message;
    if (message) {
      const chatId = message.chat.id;
      const text = message.text;
  
      // Отправка сообщения с кнопкой для открытия веб-приложения
      const response = await fetch(`${botUrl}sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Вы написали: ${text}`,
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [
                {
                  text: 'Открыть веб-приложение',
                  url: 'https://ваш-сайт.com', // Замените на URL вашего веб-приложения
                },
              ],
            ],
          }),
        }),
      });
  
      const data = await response.json();
      console.log('Message sent:', data);
    }
  
    res.sendStatus(200);
  });
  