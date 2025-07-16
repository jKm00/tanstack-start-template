FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.output ./output

ENV NODE_ENV=production

WORKDIR /app/output/server

EXPOSE 3000

CMD ["node", "index.mjs"]