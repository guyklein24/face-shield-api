# Stage 1: Build the application
FROM node:18.19.1 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:18.19.1-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json from the build stage
COPY --from=build /app/package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy the compiled application code from the build stage
COPY --from=build /app/dist ./dist

# Expose the port your app runs on
EXPOSE 3000

# Start the Nest.js application
CMD ["npm", "run", "start:prod"]
