const express = require("express");
const app = express();
app.use(express.json());

const messages = []; // ของจริงค่อยย้ายไป DB / queue

// ฟังค์ชันช่วยนับ 5 นาทีล่าสุด
function countLast5Min() {
  const now = Date.now();
  const fiveMinutesAgo = now - 5 * 60 * 1000;
  return messages.filter((m) => m.receivedAtMs >= fiveMinutesAgo).length;
}

// รับข้อมูลจาก sender
app.post("/api/receive", (req, res) => {
  const body = req.body || {};
  const now = new Date();

  const record = {
    source: body.source || "unknown",
    message: body.message || "",
    tag: body.tag || "unknown",
    correlationId: body.correlationId || null,
    sentAt: body.sentAt || null,
    receivedAt: now.toISOString(),
    receivedAtMs: now.getTime(),
  };

  messages.push(record);
  if (messages.length > 5000) {
    messages.shift(); // กัน memory พุ่ง
  }

  console.log("RECEIVED:", record);

  res.json({
    status: "ok",
    stored: true,
    receivedAt: record.receivedAt,
  });
});

// ให้หน้าเว็บ Receiver ใช้ดึงข้อมูล
app.get("/api/messages", (req, res) => {
  const items = [...messages].reverse().slice(0, 50);
  res.json({
    total: messages.length,
    last5m: countLast5Min(),
    items,
  });
});

// health check
app.get("/healthz", (req, res) => {
  res.json({ status: "ok", totalMessages: messages.length });
});

// static web
app.use(express.static("public"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Receiver listening on port ${port}`);
});
