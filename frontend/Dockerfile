FROM node:16-alpine

RUN apk add --no-cache yarn

RUN yarn global add @vue/cli
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
COPY .env* ./
RUN yarn global add dotenv
RUN yarn build
CMD [ "yarn", "serve" ]