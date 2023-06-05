FROM node:16-alpine
RUN yarn global add @nestjs/cli
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
RUN yarn build
CMD [ "yarn", "start" ]