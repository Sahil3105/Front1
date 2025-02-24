FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Install 'serve' globally to serve the build
RUN npm install -g serve

# Build the app
RUN npm run build

# Expose port 9091
EXPOSE 9091

# Run the app using 'serve'
CMD ["serve", "-s", "build", "-l", "9091"]

