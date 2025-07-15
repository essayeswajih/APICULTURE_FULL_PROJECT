# Step 1: Build the Angular app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json from the app folder
COPY ./app/package.json ./
COPY ./app/package-lock.json ./

# Install dependencies
RUN npm install -g @angular/cli@20 && npm install

# Copy the rest of the Angular project files into the container
COPY ./app ./

# Build the Angular project in production mode
RUN npm run build -- --configuration production

# Step 2: Serve the Angular app with NGINX
FROM nginx:alpine

# Copy the built Angular app from the build stage to NGINX's default html folder
COPY --from=build ./app/dist/Apiculture /usr/share/nginx/html

# Copy the custom NGINX configuration (optional)
COPY ./app/nginx.conf /etc/nginx/nginx.conf 

# Expose port 80 to make the app accessible
EXPOSE 80

# Optionally, you can set a default command (nginx starts by default)
CMD ["nginx", "-g", "daemon off;"]

