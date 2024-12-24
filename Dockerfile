# Используем официальный образ Node.js
FROM node:16 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем React приложение
RUN npm run build --prefix client/oclique-vpn

# Создаем финальный образ
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы из предыдущего этапа
COPY --from=build /app /app

# Статический сайт из React
RUN cp -r /app/client/oclique-vpn/build /app/server/build

# Устанавливаем зависимости на серверную часть
WORKDIR /app/server
RUN npm install

# Открываем порт для сервера
EXPOSE 3000

# Запускаем сервер
CMD ["node", "index.js"]
