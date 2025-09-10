FROM oven/bun:1-alpine AS base
WORKDIR /app

COPY package.json bun.lock turbo.json ./
COPY apps/frontend/package.json ./apps/frontend/

RUN bun install --frozen-lockfile

COPY apps/frontend/ ./apps/frontend/

WORKDIR /app/apps/frontend

ARG APP_BACKEND_URL
ENV APP_BACKEND_URL=$APP_BACKEND_URL
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=1536 --max-semi-space-size=64"
ENV BUN_RUNTIME_TRANSPILER_CACHE_PATH=0

RUN bunx --bun vite build --mode production

FROM devforth/spa-to-http:latest
COPY --from=base /app/apps/frontend/dist/ .
