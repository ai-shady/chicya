FROM node:26-bookworm-slim

ENV NODE_ENV=production
ENV PORT=9000
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/package.json

RUN npm ci --include-workspace-root

COPY apps/backend apps/backend

# admin dashboard is pre-built on the host; link it where `medusa start` expects it
RUN mkdir -p /app/apps/backend/public && ln -sfn ../.medusa/server/public/admin /app/apps/backend/public/admin

WORKDIR /app/apps/backend

# node:20 cannot `require()` medusa-config.ts / instrumentation.ts; use compiled copies
RUN ln -sfn .medusa/server/medusa-config.js medusa-config.js \
 && ln -sfn .medusa/server/instrumentation.js instrumentation.js

EXPOSE 9000

CMD ["node", "/app/node_modules/.bin/medusa", "start"]