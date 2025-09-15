FROM node:24.8.0-alpine

# Install k6. These commands are for the Alpine Linux OS.
RUN apk add --no-cache curl && \
    curl -L https://github.com/grafana/k6/releases/download/v0.50.0/k6-v0.50.0-linux-amd64.tar.gz | tar xz && \
    mv k6-v0.50.0-linux-amd64/k6 /usr/bin/k6

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY ./testing/stress/package.json ./testing/stress/
RUN npm i --prefix ./testing/stress

COPY ./testing/stress ./testing/stress

WORKDIR /app/testing/stress

CMD ["npm", "run", "test"]