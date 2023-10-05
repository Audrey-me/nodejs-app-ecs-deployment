# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Copy all the backend related files(server.js, package.json) to the container
COPY . .

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "server.js"]
