FROM node:22-alpine AS builder

WORKDIR /app

COPY ./packages/server/package.json ./packages/server/package.json
COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./

RUN \
    npm i -g pnpm && \
    pnpm install --frozen-lockfile --prod=false;

COPY ./packages/server ./packages/server/

RUN \
    pnpm --filter="@logchimp/api" tsc;

FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/packages/server/package.json ./packages/server/package.json
COPY --from=builder /app/packages/server/dist ./packages/server/dist

RUN \
    npm i -g pnpm && \
    pnpm install --filter="@logchimp/api";

ENTRYPOINT ["node", "./packages/server/dist/index.js"]
