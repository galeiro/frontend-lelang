FROM node:16
WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install --legacy-peer-deps
CMD [ "npm", "start" ]

EXPOSE 3000
