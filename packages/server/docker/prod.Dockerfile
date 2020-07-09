FROM node:12 AS base

ARG PORT

ARG CI
ENV CI $CI

ENV DOCKER true

WORKDIR /home/app

COPY package.json package-lock.json ./

COPY . .

RUN npm ci

RUN npm run build


FROM node:12

WORKDIR /home/app

COPY --from=base /home/app/dist /home/app/build ./

EXPOSE $PORT

CMD node main
