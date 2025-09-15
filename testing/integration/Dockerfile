FROM node:24.8.0-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY ./testing/integration/package.json ./testing/integration/
RUN npm i --prefix ./testing/integration

COPY ./testing/integration ./testing/integration

WORKDIR /app/testing/integration

CMD ["npm", "run", "test"]