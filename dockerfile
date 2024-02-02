FROM node:20-alpine

WORKDIR /node
COPY package*.json ./
COPY ./files ./files
RUN \
 npm ci && \
 npm cache clean --force

COPY ./dist .

CMD ["node", "src/main.js", "files/2016-readings.csv"]