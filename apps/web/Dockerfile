FROM oven/bun:1-alpine AS base
WORKDIR /app

FROM base AS pruner
RUN apk add --no-cache git
COPY package.json ./
RUN echo 'packageManager: "bun@1.3.1"' >> package.json
COPY . .
RUN bun install -g turbo && \
    turbo prune web --docker

FROM base AS installer
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lockb ./bun.lockb
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app

COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .

ARG APP_BACKEND
ENV APP_BACKEND=$APP_BACKEND
ENV NODE_ENV=production

RUN bun run build --filter=web

FROM devforth/spa-to-http:latest
COPY --from=builder /app/apps/web/dist/ .

EXPOSE 8080
CMD ["--port", "8080"]
