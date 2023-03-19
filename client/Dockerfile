FROM node:18 as build-stage

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./client-nginx.conf /etc/nginx/conf.d/client-nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]