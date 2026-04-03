const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SPLITS_FILE = path.join(__dirname, '../data/mock/splits.json');

function loadSplits() {
  try {
    if (fs.existsSync(SPLITS_FILE)) {
      return JSON.parse(fs.readFileSync(SPLITS_FILE, 'utf8'));
    }
  } catch {}
  return {};
}

function saveSplits(data) {
  const dir = path.dirname(SPLITS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(SPLITS_FILE, JSON.stringify(data, null, 2));
}

// POST /api/v1/split - create a new split group
router.post('/', (req, res) => {
  const { name, travelers } = req.body;
  if (!name) return res.status(400).json({ error: 'Group name is required' });

  const code = crypto.randomBytes(3).toString('hex').toUpperCase();
  const splits = loadSplits();
  splits[code] = {
    code,
    name,
    travelers: travelers || [{ id: 'T1', name: 'You' }],
    expenses: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  saveSplits(splits);
  res.status(201).json(splits[code]);
});

// GET /api/v1/split/:code - get split group by code
router.get('/:code', (req, res) => {
  const splits = loadSplits();
  const group = splits[req.params.code.toUpperCase()];
  if (!group) return res.status(404).json({ error: 'Split group not found' });

  // Calculate settlements
  const total = group.expenses.reduce((s, e) => s + e.amount, 0);
  const perPerson = group.travelers.length > 0 ? total / group.travelers.length : 0;
  const paidMap = {};
  group.travelers.forEach(t => { paidMap[t.id] = 0; });
  group.expenses.forEach(e => { if (paidMap[e.paidBy] !== undefined) paidMap[e.paidBy] += e.amount; });

  const balances = group.travelers.map(t => ({ ...t, balance: (paidMap[t.id] || 0) - perPerson }));
  const settlements = [];
  const debtors = balances.filter(b => b.balance < -0.01).map(b => ({ ...b, owed: Math.abs(b.balance) }));
  const creditors = balances.filter(b => b.balance > 0.01).map(b => ({ ...b, owed: b.balance }));

  let di = 0, ci = 0;
  while (di < debtors.length && ci < creditors.length) {
    const amt = Math.min(debtors[di].owed, creditors[ci].owed);
    if (amt > 0.01) settlements.push({ from: debtors[di].name, to: creditors[ci].name, amount: Math.round(amt * 100) / 100 });
    debtors[di].owed -= amt;
    creditors[ci].owed -= amt;
    if (debtors[di].owed < 0.01) di++;
    if (creditors[ci].owed < 0.01) ci++;
  }

  res.json({ ...group, total, perPerson: Math.round(perPerson), settlements });
});

// PUT /api/v1/split/:code/traveler - add traveler
router.put('/:code/traveler', (req, res) => {
  const splits = loadSplits();
  const group = splits[req.params.code.toUpperCase()];
  if (!group) return res.status(404).json({ error: 'Split group not found' });

  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Traveler name is required' });

  const id = `T${group.travelers.length + 1}`;
  group.travelers.push({ id, name });
  group.updatedAt = new Date().toISOString();
  saveSplits(splits);
  res.json(group);
});

// DELETE /api/v1/split/:code/traveler/:id - remove traveler
router.delete('/:code/traveler/:id', (req, res) => {
  const splits = loadSplits();
  const group = splits[req.params.code.toUpperCase()];
  if (!group) return res.status(404).json({ error: 'Split group not found' });

  group.travelers = group.travelers.filter(t => t.id !== req.params.id);
  group.expenses = group.expenses.filter(e => e.paidBy !== req.params.id);
  group.updatedAt = new Date().toISOString();
  saveSplits(splits);
  res.json(group);
});

// POST /api/v1/split/:code/expense - add expense
router.post('/:code/expense', (req, res) => {
  const splits = loadSplits();
  const group = splits[req.params.code.toUpperCase()];
  if (!group) return res.status(404).json({ error: 'Split group not found' });

  const { desc, amount, paidBy } = req.body;
  if (!desc || !amount || !paidBy) return res.status(400).json({ error: 'desc, amount, and paidBy are required' });

  group.expenses.push({ id: `E${Date.now()}`, desc, amount: Number(amount), paidBy });
  group.updatedAt = new Date().toISOString();
  saveSplits(splits);
  res.json(group);
});

// DELETE /api/v1/split/:code/expense/:expId - remove expense
router.delete('/:code/expense/:expId', (req, res) => {
  const splits = loadSplits();
  const group = splits[req.params.code.toUpperCase()];
  if (!group) return res.status(404).json({ error: 'Split group not found' });

  group.expenses = group.expenses.filter(e => e.id !== req.params.expId);
  group.updatedAt = new Date().toISOString();
  saveSplits(splits);
  res.json(group);
});

module.exports = router;
