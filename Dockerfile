ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /app 

# Build
FROM base as build

COPY package.json pnpm-lock.yaml .
RUN corepack enable && pnpm install --production=false

COPY . .

RUN pnpm run build


# Run
FROM base

ENV PORT=$PORT
ENV NUXT_PUBLIC_ENV_TEST=prod

COPY --from=build /app/ /app/
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "pnpm", "run", "preview" ]