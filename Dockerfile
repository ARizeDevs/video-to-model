# Use the official Node.js 18 base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .


RUN npm run build

# Expose the port on which your Nest.js application listens
EXPOSE 8080

# Specify the command to run your application
CMD ["npm", "run", "start:prod"]
