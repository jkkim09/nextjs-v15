# ----------------------
# 1단계: 빌드
# ----------------------
FROM --platform=linux/amd64 node:20-alpine AS builder

# 빌드 의존성 설치
RUN apk add --no-cache python3 g++ make

WORKDIR /app

# 패키지 설치
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 앱 소스 복사
COPY . .

# Next.js Standalone 빌드
RUN yarn build

# ----------------------
# 2단계: 런타임
# ----------------------
FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

# production 의존성만 설치 (standalone용)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# 필요 시 환경변수 복사
COPY --from=builder /app/.env* ./

EXPOSE 3000

# standalone build의 패키지.json 기반 시작
CMD ["node", "server.js"]