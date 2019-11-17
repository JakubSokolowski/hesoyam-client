FROM node:9.6.1 as npm_builder
RUN mkdir /usr/hesoyam-client
COPY ./package.json /usr/hesoyam-client
COPY ./package-lock.json /usr/hesoyam-client

WORKDIR /usr/hesoyam-client
RUN npm install --silent

FROM npm_builder as builder
COPY . /usr/hesoyam-client
ENV PATH /usr/hesoyam-client/node_modules/.bin:$PATH
WORKDIR /usr/hesoyam-client
RUN npm run build

FROM nginx
COPY --from=builder /usr/hesoyam-client/dist /usr/share/nginx/html
