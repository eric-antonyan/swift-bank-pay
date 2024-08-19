FROM node:alpine

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 6006

CMD [ "npm", "run", "dev" ]