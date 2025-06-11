const express = require('express');
const db = require('../db');
const { verifyAccess } = require('../auth');
const router = express.Router();

// Middleware: check admin
router.use((req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);
  const payload = verifyAccess(header.split(' ')[1]);
  if (payload.role !== 'staff') return res.sendStatus(403);
  req.payload = payload;
  next();
});

// CRUD
router.post('/staff', async (req, res) => {
  const { username, password, name } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  const result = await db.query('INSERT INTO users(username, password, name, role) VALUES($1,$2,$3,$4) RETURNING *',
    [username, hash, name, 'staff']);
  res.json(result.rows[0]);
});

router.get('/staff', async (req, res) => {
  const r = await db.query('SELECT id, username, name FROM users WHERE role=$1', ['staff']);
  res.json(r.rows);
});

router.put('/staff/:id', async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const r = await db.query('UPDATE users SET name=$1 WHERE id=$2 RETURNING *', [name, id]);
  res.json(r.rows[0]);
});

router.delete('/staff/:id', async (req, res) => {
  await db.query('DELETE FROM users WHERE id=$1', [req.params.id]);
  res.json({ deleted: req.params.id });
});
