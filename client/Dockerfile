FROM node:20-alpine3.20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY . .

RUN npm run build

EXPOSE 5173

ENV VITE_HOST=0.0.0.0

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]