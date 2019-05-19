# The first instruction in a Dockerfile must be FROM, which selects a base image. Since it's recommended to use official Docker images, we will use the official image for node. We will chose a specific image rather than defaulting to latest as future node versions may break our application.
FROM node:11-alpine

# Sets the working directory to /usr/src/app.
WORKDIR /usr/src/app

# Sets the amount of memory to be used by Node, the default causes api-console to crash
ENV NODE_MAX_MEM=8192

# install git
RUN apk add --no-cache git

# Copies the package file for NPM to the working directory.
COPY package*.json /usr/src/app/

# Installs the required NPM packages.
RUN npm install

# Copies the application from the current directory to the working directory of the image.
COPY build.js /usr/src/app/build.js
COPY theme.html /usr/src/app/theme.html
COPY ./api-console-source /usr/src/app/api-console-source

# If an action does not use the runs configuration option, the commands in ENTRYPOINT will execute. The Docker ENTRYPOINT instruction has a shell form and exec form. We will use the exec form of the ENTRYPOINT instruction to call our node script. This will allow us to pass arguments to the script when we run the container.
ENTRYPOINT ["npm", "start"]
