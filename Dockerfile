# pull from base image
FROM node:19-alpine

# use src as the working directory
WORKDIR /src

ARG VITE_API_SECRET

ENV VITE_API_SECRET=$VITE_API_SECRET

# Copy the files from the current directory to src
COPY . /src

# Install Dependencies
RUN npm install

# Build production app
RUN npm run build

# Listen on the specified port
EXPOSE 3000

# Set node server
ENTRYPOINT npm run start