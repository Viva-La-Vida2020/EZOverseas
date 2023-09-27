# syntax=docker/dockerfile:1

FROM node:16-alpine AS deps
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci --production
COPY . .

FROM node:16-alpine AS dev
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN apk add --no-cache --virtual pkgs python3 make g++ && npm ci && apk del pkgs
COPY . .
ENV NODE_ENV development
EXPOSE 5001
CMD ["npm", "run", "dev"]

FROM deps AS development
ENV NODE_ENV development
EXPOSE 5001
CMD ["npm", "run", "start"]

FROM deps AS staging
ENV NODE_ENV staging
EXPOSE 5001
CMD ["npm", "run", "start"]

FROM deps AS production
ENV NODE_ENV production
EXPOSE 5001
CMD ["npm", "run", "start"]
