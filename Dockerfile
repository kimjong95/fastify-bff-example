FROM node:alpine
EXPOSE 8080
ARG dir
WORKDIR '/bff'
COPY ./package.json .
RUN npm install -g pm2
COPY ./ .
ENV NODE_ENV=prod
CMD ["pm2-runtime", "-i", "max", "start", "./src/index.js"]