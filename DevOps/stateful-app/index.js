// /Users/wayub-m3/my-project/stateful-app/index.js
const express = require('express');
const app = express();

// ใช้ port 4000 (ต่างจาก stateless ที่ 3000)
const PORT = 4000;

// state ที่อยู่ใน RAM ของ process นี้ → Stateful
let counter = 0;

// ทุกครั้งที่ยิง /count → counter +1
app.get('/count', (req, res) => {
  counter += 1;

  res.json({
    count: counter,
    note: 'ตัวเลขนี้เก็บอยู่ใน memory ของ pod นี้ (stateful)',
    pod: process.env.HOSTNAME || 'unknown'
  });
});

app.listen(PORT, () => {
  console.log(`Stateful app listening on port ${PORT}`);
});
