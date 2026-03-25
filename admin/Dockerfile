# ===========================
# Stage 1: Build Angular App
# ===========================
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Install Angular CLI
RUN npm install -g @angular/cli

# Copy project files
COPY . .

# Build Angular app
RUN ng build --configuration production

# ===========================
# Stage 2: Serve with Nginx
# ===========================
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# ✅ FIXED PATH
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
