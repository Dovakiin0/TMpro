
# Base Image
FROM node:18-alpine as base
WORKDIR /app/TMPro/server
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# TEST
FROM base as test

# Development
FROM base as development
CMD ["npm","run", "dev"]

# Production
FROM base as production
RUN npm run build
CMD ["node", "dist/index.js"]

