FROM node:16
RUN apt-get update && apt-get install -y yarn
RUN yarn global add @vue/cli
WORKDIR /app
COPY package*.json yarn.lock ./
COPY .env* ./
RUN yarn install
COPY . .
RUN yarn global add dotenv
RUN yarn build
CMD [ "node", "node_modules/@vue/cli-service/bin/vue-cli-service.js", "serve" ]
