# Stage 0, based on Node.js, to build and compile Angular
FROM node:8.11.2-alpine as builder

# FIX SECURITY PROBLEMS
RUN npm install npm@latest -g

# Set app workdir
ARG APP_CONTAINER_PATH=/app
WORKDIR ${APP_CONTAINER_PATH}

# Copy dependencies file to the app folder inside the container
COPY package.json .

# Install and cache app dependencies
RUN npm install
RUN npm install @angular/cli@6.0.0 -g

# Copy app to the app folder inside the container
COPY . .
