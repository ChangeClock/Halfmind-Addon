# https://developers.home-assistant.io/docs/add-ons/configuration#add-on-dockerfile
ARG BUILD_FROM
FROM $BUILD_FROM

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Set working directory
WORKDIR /app

# Copy package files
COPY rootfs/app/package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY rootfs/app/src ./src
COPY rootfs/app/public ./public
COPY rootfs/app/tsconfig.json ./

# Build TypeScript
RUN npm run build

# Create the final directory and copy everything needed
RUN mkdir -p /usr/local/bin/halfmind/public
RUN cp -r dist/* /usr/local/bin/halfmind/
RUN cp -r public/* /usr/local/bin/halfmind/public/
RUN cp -r node_modules /usr/local/bin/halfmind/
RUN cp package*.json /usr/local/bin/halfmind/

# Set the working directory for the final image
WORKDIR /usr/local/bin/halfmind

# Set the entrypoint
ENTRYPOINT ["node", "server.js"]

# Set environment variables
ENV PYTHONUNBUFFERED=1