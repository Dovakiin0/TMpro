
# Base Image
FROM node:18-alpine as base
WORKDIR /app/TMPro/server
COPY package.json ./
RUN yarn
COPY . .

# TEST
FROM base as test

# Development
FROM base as development
CMD ["npm","run", "dev"]

# Production
FROM base as production
RUN yarn run build
CMD ["node", "dist/index.js"]

