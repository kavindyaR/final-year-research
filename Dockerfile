FROM node:current-alpine3.20 AS builder

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

FROM nginx:stable-alpine AS production

RUN rm -rf /usr/share/nginx/html/*

ARG ENV=dev
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/${ENV}/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]