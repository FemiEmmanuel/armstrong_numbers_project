FROM node:18-bullseye-slim
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]