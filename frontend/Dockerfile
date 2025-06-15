FROM oven/bun:1-alpine AS base

WORKDIR /app

FROM base AS installer
COPY package.json bun.lock tsconfig.json tsconfig.app.json tsconfig.node.json ./
RUN bun install --frozen-lockfile

FROM base AS builder
COPY --from=installer /app/node_modules node_modules
COPY tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY . .

ARG APP_BACKEND_URL
ENV APP_BACKEND_URL=$APP_BACKEND_URL
ENV NODE_ENV=production

ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV BUN_RUNTIME_TRANSPILER_CACHE_PATH=0

RUN bunx --bun vite build --mode production

FROM devforth/spa-to-http:latest
COPY --from=builder /app/dist/ .
