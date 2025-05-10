FROM node:current-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "src/server.js"]