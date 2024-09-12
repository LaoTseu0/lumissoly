
# Use the official Node.js image as the base image
FROM node:20.11-slim

# Set the working directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "dev" ]