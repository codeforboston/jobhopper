FROM node:14.15-alpine as debug
 
# Project root
WORKDIR /app
 
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
 
# Installs all node packages
RUN npm install
 
# Copies everything over to Docker environment
COPY . .
 
# Exposes port which is used by the actual application
EXPOSE 3000
 
# Finally runs the application
CMD [ "npm", "start" ]

FROM debug as release

RUN npm run build