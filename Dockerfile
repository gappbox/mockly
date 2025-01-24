FROM node:current-alpine3.21

ARG APP_VERSION

LABEL org.opencontainers.image.title="Mockly"
LABEL org.opencontainers.image.description="Easily generate and manage mock data for testing and development"
LABEL org.opencontainers.image.version=${APP_VERSION}
LABEL org.opencontainers.image.source="https://github.com/gappbox/mockly"
LABEL org.opencontainers.image.authors="Ievgen Golovachov"
LABEL org.opencontainers.image.licenses="MIT"

WORKDIR /usr/src/app

COPY ./mockly-backend ./
COPY ./mockly-frontend/dist ./public

RUN npm install --omit=dev && npm cache clean --force

EXPOSE 5174

CMD ["npm", "run", "start"]