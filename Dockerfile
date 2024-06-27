# Use an official Node.js image as the base
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package*.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the port
EXPOSE 80

# Run the command to start the Node.js server
CMD ["npm", "start"]