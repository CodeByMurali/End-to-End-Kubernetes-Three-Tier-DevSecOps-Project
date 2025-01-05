FROM node:14
WORKDIR /usr/src/app
# Copy package.json and package-lock.json first to leverage Docker's cache for npm install,
# ensuring dependencies are only reinstalled when package files change, not when the app code changes.
# remeber Docker uses a layer caching mechanism for each instruction in the Dockerfile
# This step will only be re-run if the package.json or package-lock.json files change.
COPY package*.json ./
RUN npm install
# Copy the rest of the application code after installing dependencies.
COPY . .
CMD ["node", "index.js"]