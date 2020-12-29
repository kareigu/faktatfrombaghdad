FROM node:12

WORKDIR /usr/src/faktatfrombaghdad

COPY package*.json ./

RUN npm install

COPY . .

COPY ./img/ ./img

CMD [ "node", "index.js" ]
