FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

# sender ใช้พอร์ต 3000
EXPOSE 3000

CMD ["node", "app.js"]
