FROM node:16
RUN apt-get update && apt-get install -y yarn
RUN yarn global add @nestjs/cli
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
RUN yarn build
CMD [ "yarn", "start" ]