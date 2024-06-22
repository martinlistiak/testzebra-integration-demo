FROM node:20

WORKDIR /user/src/app

COPY . .

RUN yarn install
RUN yarn build

CMD ["yarn", "preview"]