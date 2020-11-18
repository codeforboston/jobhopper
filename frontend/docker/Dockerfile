FROM node:14.15-alpine
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
