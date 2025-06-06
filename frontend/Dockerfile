FROM oven/bun:1-alpine AS base

WORKDIR /app

FROM base AS installer
COPY package.json bun.lock tsconfig.json tsconfig.app.json tsconfig.node.json ./
RUN bun install --frozen-lockfile

FROM base AS builder
COPY --from=installer /app/node_modules node_modules
COPY tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev", "--host", "0.0.0.0"]
