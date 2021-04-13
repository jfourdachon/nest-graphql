FROM node:14.15.1-alpine
RUN apk update && apk add mongodb
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .


CMD ["yarn", "start:dev"]