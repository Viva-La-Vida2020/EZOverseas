##################################
# Local dev image without build  #
##################################
FROM node:16-alpine AS dev
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
ENV NODE_ENV development
EXPOSE 3000
ENV PORT 3000
CMD npm run dev

# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production

# Get dependencies before build
FROM node:16-alpine AS builder-deps
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1

# Build with corresponding env
FROM builder-deps AS builder-development
ENV TARGET_ENV development
RUN npm run build

FROM builder-deps AS builder-staging
ENV TARGET_ENV staging
RUN npm run build

FROM builder-deps AS builder-production
ENV TARGET_ENV production
RUN npm run build

##################################
# Final image with environments  #
##################################
FROM node:16-alpine AS development
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder-development /app/next.config.js ./
COPY --from=builder-development /app/public ./public
COPY --from=builder-development /app/package.json ./package.json
COPY --from=builder-development /app/.env.production ./.env.productionn
# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder-development --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder-development --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV production
CMD node server.js

FROM node:16-alpine AS staging
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder-staging /app/next.config.js ./
COPY --from=builder-staging /app/public ./public
COPY --from=builder-staging /app/package.json ./package.json
COPY --from=builder-staging /app/.env.production ./.env.productionn
# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder-staging --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder-staging --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV production
CMD node server.js

FROM node:16-alpine AS production
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder-production /app/next.config.js ./
COPY --from=builder-production /app/public ./public
COPY --from=builder-production /app/package.json ./package.json
COPY --from=builder-production /app/.env.production ./.env.productionn
# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder-production --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder-production --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV production
CMD node server.js
