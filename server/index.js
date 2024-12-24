// /server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const vpnRoutes = require('./routes/vpn');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Настройка API маршрутов
app.use('/api/vpn', vpnRoutes);

// Статические файлы для React клиента
app.use(express.static(path.join(__dirname, '../client/oclique-vpn/build')));

// Для обработки всех запросов и отдачи index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/oclique-vpn/build/index.html'));
});

// Порт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
