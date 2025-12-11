FROM node:20-alpine

# โฟลเดอร์ทำงานใน container
WORKDIR /app

# คัดลอก package.json / package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install --only=production

# คัดลอกโค้ดทั้งหมดเข้าไปใน image
COPY . .

# แอปรันที่ port 3000
EXPOSE 3000

# คำสั่งรันแอป
CMD ["node", "index.js"]

