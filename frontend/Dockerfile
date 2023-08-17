FROM node:18-alpine

WORKDIR /srv/app

COPY package*.json /srv/app

RUN npm install
COPY . /srv/app

EXPOSE 5173