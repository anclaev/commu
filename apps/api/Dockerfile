ARG node_version=18.16.0

# Stage 1: Установка зависимостей
FROM node:${node_version} AS deps

LABEL maintainer="anclaev<iahugo@yandex.ru>"
LABEL description="Darcr"

WORKDIR /api

COPY dist/apps/api/package.json ./package.json
COPY prisma ./prisma
COPY apps/api/entrypoint.sh ./entrypoint.sh

RUN yarn install
RUN yarn add -D prisma 
RUN yarn prisma generate

# Stage 3: Запуск приложения
FROM node:${node_version} AS runtime

ENV NODE_ENV production
ENV API_PORT 3001

WORKDIR /home/user/comduty/api

COPY --from=deps /api/node_modules ./node_modules
COPY --from=deps /api/package.json ./package.json
COPY --from=deps /api/prisma ./prisma
COPY --from=deps /api/entrypoint.sh ./entrypoint.sh

COPY dist/apps/api/* .

RUN chown -R node:node .
RUN chmod +x ./entrypoint.sh

USER node

EXPOSE ${API_PORT}

ENTRYPOINT ["./entrypoint.sh"]