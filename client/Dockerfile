# Base Image
FROM node:18-alpine as base
WORKDIR /app/TMPro/client
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve the static build on nginx
FROM nginx:1.25.2-alpine
COPY --from=base /app/TMPro/client/dist /usr/share/nginx/html
