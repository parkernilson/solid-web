FROM node:20-alpine as build

WORKDIR /home/app

COPY package.json ./
COPY --from=monorepo package-lock.json ./
COPY --from=monorepo apps/ ./apps/
# COPY --from=monorepo packages/ ./packages/

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /opt/app

COPY --from=build /home/app/build ./dist
COPY --from=build /home/app/package.json ./
COPY --from=build /home/app/node_modules/ ./node_modules

EXPOSE 3000

ENTRYPOINT ["node", "dist"]