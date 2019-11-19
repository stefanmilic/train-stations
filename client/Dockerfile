FROM node:lts-slim

RUN mkdir -p /app

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN yarn

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]