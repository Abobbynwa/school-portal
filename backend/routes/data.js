const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secret = process.env.JWT_SECRET || 'YOUR_SECRET_HERE';

router.get('/data', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token missing' });

  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, secret);

    const result = await db.query('SELECT username, role FROM portal_users WHERE id = $1', [user.id]);

    if (user.role === 'student') {
      res.json({
        name: result.rows[0].username,
        role: 'student',
        dashboard: 'Here’s your classes, assignments, and grades.'
      });
    } else if (user.role === 'staff') {
      res.json({
        name: result.rows[0].username,
        role: 'staff',
        dashboard: 'Welcome to the admin panel.'
      });
    } else {
      res.status(400).json({ message: 'Unknown role' });
    }

  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
