const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const RECEIVER_BASE_URL = process.env.RECEIVER_BASE_URL || "http://receiver-svc.internal-api-demo.svc.cluster.local:8080";

// static web
app.use(express.static("public"));

// health check receiver
app.get("/api/receiver-health", async (req, res) => {
  try {
    const r = await axios.get(`${RECEIVER_BASE_URL}/healthz`, { timeout: 1500 });
    res.status(r.status).json({ ok: true });
  } catch (err) {
    res.status(503).json({ ok: false, error: err.message });
  }
});

// endpoint ที่หน้าเว็บเรียก -> ส่งต่อไป receiver
app.post("/api/send", async (req, res) => {
  const payload = req.body;
  const started = Date.now();
  try {
    const r = await axios.post(`${RECEIVER_BASE_URL}/api/receive`, payload, {
      timeout: 3000,
    });
    const duration = Date.now() - started;
    res.json({
      status: "ok",
      durationMs: duration,
      receiverStatus: r.status,
      receiverResponse: r.data,
    });
  } catch (err) {
    const duration = Date.now() - started;
    console.error("Error calling receiver:", err.message);
    res.status(500).json({
      status: "error",
      durationMs: duration,
      error: err.message,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sender listening on port ${port}`);
});
