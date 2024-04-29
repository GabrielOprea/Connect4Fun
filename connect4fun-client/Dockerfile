FROM node:20-alpine as builder

ENV NODE_ENV production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json /app

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app

# Expose the port the app will run on
EXPOSE 3000

# Build the React app
RUN npm run build

# Start the application
CMD ["npm", "start"]