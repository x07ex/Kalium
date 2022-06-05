ARG TAG="alpine-18@sha256:0677e437543d10f6cb050d92c792a14e5eb84340e3d5b4c25a88baa723d8a4ae"
FROM node:${TAG}

RUN apk add --no-cache -U dumb-init
ENV NODE_ENV production \
  PORT 4201

WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app
RUN npm ci --only=production

USER node

CMD ["dumb-init", "node", "index.js"]
