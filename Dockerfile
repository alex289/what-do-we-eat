FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./

COPY yarn.lock ./

RUN yarn install --production

COPY ./ ./

RUN yarn build

EXPOSE 3000

USER node

CMD [ "yarn", "start" ]