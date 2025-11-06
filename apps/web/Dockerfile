FROM oven/bun:1-alpine AS base
WORKDIR /app

FROM base AS installer
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production=false

FROM base AS builder
COPY --from=installer /app/node_modules node_modules
COPY . .

ARG APP_BACKEND
ENV APP_BACKEND=$APP_BACKEND
ENV NODE_ENV=production

RUN bun run build --mode production

FROM devforth/spa-to-http:latest
COPY --from=builder /app/dist/ .

EXPOSE 8080
CMD ["--port", "8080"]
