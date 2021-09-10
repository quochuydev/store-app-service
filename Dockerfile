FROM node:12.22.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# package: git+http
RUN apk update && apk add git

RUN yarn install

# RUN npm ci --only=production

COPY . .

EXPOSE 4000

CMD [ "node", "index.js" ]
