# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.15.1

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app


################################################################################
# Create a stage for installing production dependecies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=chattools-ui/package.json,target=package.json \
    --mount=type=bind,source=chattools-ui/package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the application.
FROM deps as build

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=chattools-ui/package.json,target=package.json \
    --mount=type=bind,source=chattools-ui/package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY chattools-ui .
# Run the build script.
RUN npm run build


################################################################################
# Create the final stage to serve the built files with Caddy
FROM caddy:2.8.4-alpine

# Copy built files from the build stage
COPY --from=build /usr/src/app/dist /usr/share/caddy
# COPY --from=build /usr/src/app/dist /srv

# Copy the Caddyfile
# COPY Caddyfile /etc/caddy/Caddyfile