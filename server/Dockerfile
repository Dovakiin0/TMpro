
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
EXPOSE 3030
CMD ["npm","run", "dev"]

# Production
FROM base as production
RUN npm run build
EXPOSE 3030
CMD ["node", "dist/index.js"]

