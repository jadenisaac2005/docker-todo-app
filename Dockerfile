# 1. Start with a lightweight version of Node.js
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package.json and install dependencies first
# This takes advantage of Docker's layer caching.
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the application source code
COPY . .

# 5. Expose the port that the app runs on
EXPOSE 3000

# 6. Define the command to run the application
CMD [ "node", "app.js" ]
