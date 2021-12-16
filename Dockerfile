FROM node:alpine

# Create app directory & move in
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Building the app
EXPOSE 8080

# Running the app
ENTRYPOINT [ "npm", "run" ]