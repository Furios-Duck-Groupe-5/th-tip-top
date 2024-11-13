# Use official Node.js 20 image as base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# Navigate to src/backend and compile TypeScript
WORKDIR /app/src/backend

# Run TypeScript compilation
RUN npx tsc

# Rename the compiled index.js file to index.cjs
RUN mv ../dist/index.js ../dist/index.cjs

# Expose port 4001 to the outside world
EXPOSE 4001

# Start the application using the compiled index.cjs
CMD ["node", "../dist/index.cjs"]
