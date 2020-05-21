FROM node:current-slim

WORKDIR /usr/src/app

RUN apt-get update

COPY . .

RUN npm install

CMD [ "npm", "start" ]