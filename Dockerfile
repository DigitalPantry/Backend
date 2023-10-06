# Use an official Node.js runtime as a parent image
FROM node:20

STOPSIGNAL SIGINT

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
#RUN npm install --save-dev nodemon
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

ADD https://github.com/pressly/goose/releases/download/v3.7.0/goose_linux_x86_64 /bin/goose
RUN chmod +x /bin/goose

# Start the application
CMD ["npm", "run", "dev"]