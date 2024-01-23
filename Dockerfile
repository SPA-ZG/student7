# Use the official Vue.js image as the base image
FROM node:lts as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the project files into the container
COPY . .

# Build the application for production
RUN npm run build

# Use the official Nginx image for a production build
FROM nginx:stable as production-stage

# Copy the built app to Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80
EXPOSE 443

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]