FROM node:10.19.0-alpine

RUN mkdir -p /usr/local/server/

COPY . /usr/local/server

EXPOSE 3000

WORKDIR /usr/local/server
CMD ["node",  "app.js"]