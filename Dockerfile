# syntax=docker/dockerfile:1

# ---- Builder stage ----
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn prisma generate
RUN yarn build

# ---- Production stage ----
FROM node:18-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/main"] 