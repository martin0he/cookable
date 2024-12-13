FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose backend port
EXPOSE 3001

# Run the application with nodemon
CMD ["npm", "run", "dev"]
