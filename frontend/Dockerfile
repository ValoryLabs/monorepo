FROM oven/bun:1-alpine

WORKDIR /app

FROM base AS installer
COPY package.json bun.lock tsconfig.json tsconfig.app.json tsconfig.node.json ./
RUN bun install --no-save

FROM base AS builder
COPY --from=installer /app/node_modules node_modules
COPY tsconfig.json tsconfig.app.json tsconfig.node.json ./

COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev", "--host", "0.0.0.0"]
