FROM node:16
# alternatively you can use FROM strapi/base:latest

# Set up working directory
WORKDIR /app

# Copy package.json to root directory
COPY package.json .

# Copy yarn.lock to root directory
COPY yarn.lock .

# Install dependencies, but not generate a yarn.lock file and fail if an update is needed
RUN yarn install --frozen-lockfile

# Copy strapi project files
COPY . .
# ...

ENV NODE_OPTIONS "--max-old-space-size=8192"
# Build admin panel
RUN yarn build

# Run on port 3000
EXPOSE 3000

# Start strapi server
CMD ["yarn", "start"]