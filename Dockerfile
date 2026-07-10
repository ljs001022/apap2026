# 1. Base 이미지 (의존성 설치용)
FROM node:20-alpine AS base
WORKDIR /app
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# 2. Dependencies 설치
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
# prisma 스키마 복사 (postinstall 스크립트 등에서 prisma generate가 실행되게 하려면 필요)
COPY prisma ./prisma
RUN npm ci

# 3. Build 이미지
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# 프로덕션 환경 변수 주입 (빌드 시 필요한 환경 변수가 있다면 여기에 추가)
ENV NEXT_TELEMETRY_DISABLED 1

# Prisma client 생성 및 Next.js 앱 빌드
RUN npx prisma generate
RUN npm run build

# 4. Production 이미지 (Runner)
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# public 폴더 (정적 파일) 복사
COPY --from=builder /app/public ./public

# Next.js standalone 모드 설정 시 아래 주석 해제 (next.config.js에서 output: 'standalone' 설정 필요)
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 만약 standalone 모드가 아니라면 node_modules와 빌드 결과물 전체 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 실행 (standalone 모드일 경우: CMD ["node", "server.js"])
CMD ["npm", "start"]
