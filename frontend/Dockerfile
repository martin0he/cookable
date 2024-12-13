FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose Vite's development server port
EXPOSE 3000

# Run the Vite development server
CMD ["npm", "run", "dev"]
