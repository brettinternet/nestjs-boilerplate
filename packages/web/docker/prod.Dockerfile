FROM node:12 AS base

ARG PORT

ARG CI
ENV CI $CI

ENV DOCKER true

#### NGINX CONFIG
# Setup nginx configuration files
# Later use env vars to change HOSTNAME in our custom
WORKDIR /usr/src/nginx
# We're okay that the next command will detach from HEAD (it's on purpose) - turn off warning
RUN git config --global advice.detachedHead false
# pull specific version of custom community nginx configuration and remove default configurations in conf.d
RUN git clone --branch '3.1.0' --depth 1 --quiet https://github.com/h5bp/server-configs-nginx.git . && rm -rf conf.d
COPY nginx conf.d

WORKDIR /home/app

COPY package.json package-lock.json ./

COPY . .

RUN npm ci

RUN npm run build


FROM nginx

WORKDIR /home/app

RUN mv /etc/nginx/ /etc/old_nginx/
COPY --from=base /usr/src/nginx /etc/nginx
COPY --from=base /usr/src/build/ /var/www/site/public/

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]
