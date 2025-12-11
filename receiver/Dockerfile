FROM node:20-alpine

WORKDIR /app

# ติดตั้ง dependency
COPY package*.json ./
RUN npm install --only=production

# ก็อปโค้ดทั้งหมดเข้าไป
COPY . .

# ถ้า receiver ใช้พอร์ต 8080
EXPOSE 8080

CMD ["node", "app.js"]
