# ===========================
# Stage 1: Build Angular App
# ===========================
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies (including dev deps)
COPY app/package*.json ./
RUN npm install

# Ensure Angular CLI is available (global install)
RUN npm install -g @angular/cli

# Copy the rest of your Angular project
COPY app/. .

# Build Angular app for production
RUN ng build --configuration production

# ===========================
# Stage 2: Serve with Nginx
# ===========================
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/Apiculture/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

