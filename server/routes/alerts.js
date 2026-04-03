const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const ALERTS_FILE = path.join(__dirname, '../data/mock/alerts.json');

// Ensure alerts file exists
function loadAlerts() {
  try {
    if (fs.existsSync(ALERTS_FILE)) {
      return JSON.parse(fs.readFileSync(ALERTS_FILE, 'utf8'));
    }
  } catch {}
  return [];
}

function saveAlerts(alerts) {
  const dir = path.dirname(ALERTS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(ALERTS_FILE, JSON.stringify(alerts, null, 2));
}

// Simulate price fluctuation for demo
function simulateCurrentPrice(from, to, mode) {
  const seed = (from + to + mode).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const base = mode === 'Train' ? 800 : 500;
  const variation = Math.sin(Date.now() / 3600000 + seed) * 300;
  return Math.round(base + Math.abs(variation));
}

// GET /api/v1/alerts - list all alerts
router.get('/', (req, res) => {
  const alerts = loadAlerts();
  // Update current prices dynamically
  const updated = alerts.map(a => ({
    ...a,
    currentPrice: simulateCurrentPrice(a.from, a.to, a.mode),
    status: simulateCurrentPrice(a.from, a.to, a.mode) <= a.threshold ? 'triggered' : 'watching'
  }));
  res.json({ alerts: updated, count: updated.length });
});

// POST /api/v1/alerts - create new alert
router.post('/', (req, res) => {
  const { from, to, mode, quota, threshold } = req.body;
  if (!from || !to || !mode || !threshold) {
    return res.status(400).json({ error: 'Missing required fields: from, to, mode, threshold' });
  }
  const alerts = loadAlerts();
  const newAlert = {
    id: `PA${String(alerts.length + 1).padStart(3, '0')}-${Date.now().toString(36)}`,
    route: `${from} → ${to}`,
    from, to, mode,
    quota: quota || 'Regular',
    threshold: Number(threshold),
    currentPrice: simulateCurrentPrice(from, to, mode),
    status: 'watching',
    createdAt: new Date().toISOString().split('T')[0],
    notified: false
  };
  newAlert.status = newAlert.currentPrice <= newAlert.threshold ? 'triggered' : 'watching';
  alerts.unshift(newAlert);
  saveAlerts(alerts);
  res.status(201).json(newAlert);
});

// DELETE /api/v1/alerts/:id - delete alert
router.delete('/:id', (req, res) => {
  let alerts = loadAlerts();
  const before = alerts.length;
  alerts = alerts.filter(a => a.id !== req.params.id);
  if (alerts.length === before) {
    return res.status(404).json({ error: 'Alert not found' });
  }
  saveAlerts(alerts);
  res.json({ message: 'Alert deleted', id: req.params.id });
});

module.exports = router;
