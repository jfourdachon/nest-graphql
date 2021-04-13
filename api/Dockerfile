FROM node:14.15.1-alpine
RUN apt-get update && apt-get install -y mongodb
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .


CMD ["yarn", "start:dev"]