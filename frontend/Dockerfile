# Stage 1 - Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Accept build arguments
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_STREAM_API_KEY
ARG VITE_SENTRY_DSN
ARG VITE_API_BASE_URL

# Set them as environment variables for the build
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_STREAM_API_KEY=$VITE_STREAM_API_KEY
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# Stage 2 - Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]