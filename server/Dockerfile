
# Stage 1 - create a base image
FROM node:18-alpine as base
WORKDIR /app/TMPro/server
COPY package.json ./
RUN yarn
COPY . .

# Stage 2 - Run Test
FROM base as test

#Stage 3 - Run Development
FROM base as development
EXPOSE 3030
CMD ["npm","run", "dev"]

# Stage 3 - Build for production
FROM base as production
RUN npm run build
EXPOSE 3030
CMD ["node", "dist/index.js"]

