FROM node:10-alpine as frontend-build-stage

WORKDIR /build

COPY ./build ./build
COPY ./data ./data
COPY ./resources ./resources
COPY ./tiles ./tiles
COPY ./src ./src
COPY ./bower.json ./bower.json
COPY ./gulpfile.js ./gulpfile.js

RUN npm install gulp bower -g

RUN apk add git


COPY package.json package.json
RUN npm install
RUN bower install --allow-root
RUN gulp setup

FROM nginx:alpine
COPY ./docker/frontend.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build-stage /build/dist/ /var/www/html