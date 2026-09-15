FROM oven/bun:1-alpine AS builder

ARG API_URL

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM scratch AS export
COPY --from=builder /app/dist /dist
