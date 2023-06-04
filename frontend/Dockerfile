FROM node:14-alpine

RUN apk add --no-cache yarn

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

RUN yarn global add @vue/cli

COPY . .

COPY .env* ./

RUN yarn build

CMD [ "yarn", "serve" ]