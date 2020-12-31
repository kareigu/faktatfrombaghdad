FROM node:12-alpine

WORKDIR /usr/src/faktatfrombaghdad

COPY package*.json ./

RUN apk add --no-cache ffmpeg \
    && apk add --no-cache git \
    && npm install \
    && apk add --no-cache bash

COPY ./ ./

CMD [ "node", "bot.js" ]
