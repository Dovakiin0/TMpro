# Base Image
FROM node:18-alpine as base
WORKDIR /app/TMPro/client
COPY package.json ./
RUN yarn
COPY . .
RUN yarn build

FROM nginx:1.25.2-alpine
COPY --from=base /app/TMPro/client/dist /usr/share/nginx/html
