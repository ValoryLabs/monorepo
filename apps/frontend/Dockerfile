FROM oven/bun:1-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN bun add --global turbo@2.4.5-canary.6
COPY . .

RUN turbo prune web --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN bun install --frozen-lockfile
COPY --from=builder /app/out/full/ .

ARG APP_BACKEND_URL
ENV APP_BACKEND_URL=$APP_BACKEND_URL
ENV NODE_ENV=production

ENV NODE_OPTIONS="--max-old-space-size=1536 --max-semi-space-size=64"
ENV BUN_RUNTIME_TRANSPILER_CACHE_PATH=0

RUN bunx --bun vite build --mode production

FROM devforth/spa-to-http:latest
COPY --from=builder /app/dist/ .
