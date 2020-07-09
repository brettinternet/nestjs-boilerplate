FROM node:12

ARG PORT

ARG CI
ENV CI $CI

ENV DOCKER true

WORKDIR /home/app

COPY package.json package-lock.json ./

COPY . .

RUN npm ci

EXPOSE $PORT

CMD npm run start
