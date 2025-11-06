FROM oven/bun:1-alpine AS base
WORKDIR /app

FROM base AS installer
COPY package.json ./
RUN bun install

FROM base AS builder
COPY --from=installer /app/node_modules node_modules
COPY . .

ARG APP_BACKEND
ENV APP_BACKEND=$APP_BACKEND
ENV NODE_ENV=production

RUN bun run build

FROM devforth/spa-to-http:latest
COPY --from=builder /app/dist/ .

CMD ["--port", "8080"]
