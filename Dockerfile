FROM node:20

WORKDIR /user/src/app

COPY . .

ARG VITE_APP_TESTZEBRA_API_URL
ARG VITE_APP_TESTZEBRA_API_KEY

RUN yarn install
RUN yarn build

CMD ["yarn", "preview", "--port", "3000", "--host"]