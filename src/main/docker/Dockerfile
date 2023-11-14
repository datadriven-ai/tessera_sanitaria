# Stage 1
FROM node:14.15.4-alpine as build-step
ARG k8s_env
RUN mkdir -p /app
WORKDIR /app

COPY app/package.json /app/

RUN npm install

COPY app /app

RUN npm run build:$k8s_env

# Stage 2
FROM nginx:1.17.1-alpine
COPY app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/dist/backoffice2 /usr/share/nginx/html
