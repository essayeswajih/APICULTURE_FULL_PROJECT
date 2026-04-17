# ===========================
# Stage 1: Build Angular App
# ===========================
FROM node:20-alpine AS build

WORKDIR /app

# 1. Install dependencies first (CACHE LAYER)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# 2. Copy only after dependencies (important for cache)
COPY . .

# 3. Increase Node memory (VERY IMPORTANT for Angular builds)
ENV NODE_OPTIONS=--max-old-space-size=4096

# 4. Build (no global Angular CLI needed)
RUN npm run build -- --configuration production


# ===========================
# Stage 2: Serve with Nginx
# ===========================
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]