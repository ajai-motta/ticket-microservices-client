FROM node:18-alpine

WORKDIR /app

# Install dependencies first (cached layer)
COPY package.json package-lock.json* ./
RUN npm install

# Copy source (Skaffold will sync changes later)
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
