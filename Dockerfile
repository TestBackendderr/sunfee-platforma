FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npm prune --omit=dev

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY .env .env
COPY --from=builder /app/prisma ./prisma


RUN npx prisma migrate deploy

CMD ["node", "dist/main"]