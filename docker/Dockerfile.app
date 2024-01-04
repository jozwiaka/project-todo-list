# Use the official Node.js LTS image
FROM node:14-alpine

WORKDIR /app

COPY app/package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

WORKDIR /app/app

CMD ["node", "app.js"]
