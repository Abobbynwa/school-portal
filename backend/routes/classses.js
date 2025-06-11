const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const router = express.Router();
const secret = process.env.JWT_SECRET || 'YOUR_SECRET_HERE';

// Middleware: admin-only
router.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const user = jwt.verify(token, secret);
    if (user.role !== 'staff') return res.sendStatus(403);
    next();
  } catch {
    res.sendStatus(403);
  }
});

// CREATE
router.post('/', async (req, res) => {
  const { name, schedule, teacher } = req.body;
  const r = await db.query(
    'INSERT INTO classes (name, schedule, teacher) VALUES ($1, $2, $3) RETURNING *',
    [name, schedule, teacher]
  );
  res.json(r.rows[0]);
});

// READ
router.get('/', async (req, res) => {
  const r = await db.query('SELECT * FROM classes');
  res.json(r.rows);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { name, schedule, teacher } = req.body;
  const { id } = req.params;
  const r = await db.query(
    'UPDATE classes SET name=$1, schedule=$2, teacher=$3 WHERE id=$4 RETURNING *',
    [name, schedule, teacher, id]
  );
  res.json(r.rows[0]);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM classes WHERE id = $1', [id]);
  res.json({ deleted: id });
});

module.exports = router;
