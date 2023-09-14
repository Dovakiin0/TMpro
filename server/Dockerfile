FROM node:18-alpine

WORKDIR /app/TaskMaster/server

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3030
CMD ["node", "dist/index.js"]
