###################
# BUILD FOR DEVELOPMENT
###################

FROM node:18-alpine As development
ENV NODE_ENV development
WORKDIR /usr/app
COPY --chown=node:node ./API/package*.json ./WIntegration/API/
COPY --chown=node:node ./client/package*.json ./WIntegration/client/
USER node
RUN cd ./WIntegration/client && npm ci
RUN cd ./WIntegration/API && npm ci
COPY --chown=node:node ./API ./WIntegration/API/
COPY --chown=node:node ./client ./WIntegration/client/

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build
WORKDIR /usr/app
COPY --chown=node:node ./API/package*.json ./WIntegration/API/
COPY --chown=node:node ./client/package*.json ./WIntegration/client/

COPY --chown=node:node --from=development /usr/app/WIntegration/API/node_modules ./WIntegration/API/node_modules
COPY --chown=node:node --from=development /usr/app/WIntegration/client/node_modules ./WIntegration/client/node_modules
COPY --chown=node:node ./API ./WIntegration/API/
COPY --chown=node:node ./client ./WIntegration/client/

USER node
RUN cd ./WIntegration/API && npm run build 
RUN cd ./WIntegration/client && npm run build 

ENV NODE_ENV production
RUN cd ./WIntegration/API && npm ci --only=production && npm cache clean --force 
RUN cd ./WIntegration/client && npm ci --only=production && npm cache clean --force

###################
# PRODUCTION
###################

FROM node:18-alpine As production
WORKDIR /usr/app
COPY --chown=node:node --from=build /usr/app/WIntegration/API/node_modules ./WIntegration/API/node_modules
# COPY --chown=node:node --from=build /usr/app/WIntegration/client/node_modules ./WIntegration/client/node_modules

COPY --chown=node:node --from=build /usr/app/WIntegration/API/.env ./WIntegration/API/dist/.env

COPY --chown=node:node --from=build /usr/app/WIntegration/API/dist ./WIntegration/API/dist
COPY --chown=node:node --from=build /usr/app/WIntegration/client/build ./WIntegration/client/build

CMD [ "node", "WIntegration/API/dist/src/main.js" ]
