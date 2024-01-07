ARG node_version=18.16.0

# Stage 1: Установка зависимостей
FROM node:${node_version} AS deps

LABEL maintainer="anclaev<iahugo@yandex.ru>"
LABEL description="Darcr"

RUN apk add --no-cache libc6-compat
WORKDIR /api

COPY dist/apps/api/package*.json ./
COPY prisma ./prisma

RUN yarn install --silent && yarn prisma generate

# Stage 3: Запуск приложения
FROM node:${node_version} AS runtime

RUN apk add --no-cache dumb-init

ENV NODE_ENV production
ENV PORT 3001

WORKDIR /home/user/comduty/api

COPY --from=deps /api/node_modules ./node_modules
COPY --from=deps /api/package.json ./package.json
COPY --from=deps /api/prisma ./prisma

COPY dist/apps/api .

RUN chown -R node:node .
USER node

EXPOSE 3001

CMD ["dumb-init", "node", "main.js"]
