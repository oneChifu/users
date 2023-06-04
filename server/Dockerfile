# Використовуємо базовий образ Node.js з Yarn
FROM node:14-alpine

# Встановлюємо Yarn
RUN apk add --no-cache yarn

# Встановлюємо директорію робочої зони в контейнері
WORKDIR /app

# Копіюємо файли package.json та yarn.lock в контейнер
COPY package.json yarn.lock ./

# Встановлюємо залежності проекту
RUN yarn install

# Встановлення @nestjs/cli
RUN yarn global add @nestjs/cli

# Копіюємо всі файли проекту в контейнер
COPY . .

# Компілюємо TypeScript код
RUN yarn build

# Виконуємо команду для запуску сервера
CMD ["yarn", "start:prod"]
