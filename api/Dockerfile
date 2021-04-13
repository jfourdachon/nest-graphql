FROM node:14.15.1-alpine
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update
RUN apk add mongodb=3.4.4-r0
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .


CMD ["yarn", "start:dev"]