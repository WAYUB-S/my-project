const express = require('express');
const app = express();

// ใช้ port 3000 (ให้ตรงกับที่เราจะใช้ใน Docker/K8s)
const PORT = 3030;

// /hello?name=Test → Stateless: ไม่จำอะไรใน server
app.get('/hello', (req, res) => {
  const name = req.query.name || 'Guest';
  res.json({
    message: `Hello, ${name}!`,
    note: 'นี่คือ Stateless app ทุก request ประมวลผลจาก input อย่างเดียว'
  });
});

// /sum?a=10&b=20 → Stateless เช่นกัน
app.get('/sum', (req, res) => {
  const a = Number(req.query.a || 0);
  const b = Number(req.query.b || 0);
  res.json({
    a,
    b,
    result: a + b,
    note: 'ไม่มี state สะสมใน server'
  });
});

app.listen(PORT, () => {
  console.log(`Stateless app listening on port ${PORT}`);
});
