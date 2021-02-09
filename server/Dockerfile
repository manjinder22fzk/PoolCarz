FROM node:10-alpine

WORKDIR /cloud1-server

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]