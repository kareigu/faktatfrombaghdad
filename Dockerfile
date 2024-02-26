FROM node:16-alpine

WORKDIR /usr/src/faktatfrombaghdad

COPY package*.json ./

RUN apk update && apk upgrade

RUN apk add --no-cache ffmpeg \
    && apk add --no-cache git \
    && apk add --no-cache python3 \
    && apk add --no-cache make \
    && apk add --no-cache build-base \
    && npm install \
    && apk add --no-cache bash

COPY ./ ./

CMD [ "node", "bot.js" ]
