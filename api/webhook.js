// /api/webhook.js
const fetch = require('node-fetch');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const message = req.body.message;
    if (message) {
      const chatId = message.chat.id;
      const text = message.text;

      const token = '7677806057:AAFp-_fcvaXvQvp0b0Az8oBGxzIjCPrdNsE';
      const botUrl = `https://api.telegram.org/bot${token}/sendMessage`;

      const response = await fetch(botUrl, {
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

    res.status(200).send('OK');
  } else {
    res.status(404).send('Not Found');
  }
}
