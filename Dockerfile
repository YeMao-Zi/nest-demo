# build-stage
FROM node:18-alpine AS build-stage

# 安装兼容版本的 pnpm
RUN npm install -g pnpm@8

WORKDIR /app

# 复制 package 文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 构建应用
RUN pnpm run build

# production stage
FROM node:18-alpine AS production-stage

# 安装兼容版本的 pnpm
RUN npm install -g pnpm@8

WORKDIR /app

# 复制 package 文件
COPY package.json pnpm-lock.yaml ./

# 只安装生产依赖
RUN pnpm install --prod

# 从构建阶段复制编译后的文件
COPY --from=build-stage /app/dist ./dist

# 确保 crypto 模块可用
RUN apk add --no-cache nodejs

EXPOSE 3000

CMD ["node", "dist/main"]