# 构建阶段
FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package.json .
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install

COPY . .
RUN npm run build

# 生产阶段
FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

RUN npm install pm2 -g

EXPOSE 3000

CMD ["pm2-runtime", "./dist/main.js"]