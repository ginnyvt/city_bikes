
FROM node:lts-alpine AS builder
ARG GMAPS_API_KEY
ENV REACT_APP_MAPS_API=$GMAPS_API_KEY
ENV REACT_APP_SERVER_URL=https://city-bikes-server-ingress-citybikes-ginnyvt.cloud.okteto.net
WORKDIR /stage
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.23
COPY --from=builder /stage/build /usr/share/nginx/html