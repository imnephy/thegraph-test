FROM --platform=amd64 node:16-alpine as builder

ARG DOCKER_ENV=development

WORKDIR /app

COPY ./ .
RUN npm ci \
  && npm run build:$DOCKER_ENV
FROM --platform=amd64 node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY ./ .

RUN npm ci --omit=dev

EXPOSE 3000
CMD npm run serve
