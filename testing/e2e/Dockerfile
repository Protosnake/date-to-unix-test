FROM mcr.microsoft.com/playwright:v1.55.0-noble

WORKDIR /app

# Install root dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Install e2e test dependencies
COPY testing/e2e/package.json testing/e2e/package-lock.json* ./testing/e2e/
RUN npm ci --prefix ./testing/e2e

# Copy the rest of the code
COPY . .

WORKDIR /app/testing/e2e
CMD ["npm", "run", "test"]
