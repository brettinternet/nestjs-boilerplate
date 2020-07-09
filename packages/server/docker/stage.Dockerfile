FROM node:12

ARG PORT

ARG CI
ENV CI $CI

ENV DOCKER true

WORKDIR /home/app

COPY package.json package-lock.json ./

COPY . .

RUN npm ci

RUN npm run build

CMD npm run fixtures && npm run start:prod
