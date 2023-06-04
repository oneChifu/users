# Використовуємо базовий образ Node.js з Yarn
FROM node:14-alpine

# Копіюємо .env файл у контейнер
COPY .env .env

# Запускаємо команду для запуску проекту
CMD ["sh", "-c", "yarn && yarn serve"]