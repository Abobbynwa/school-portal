const express = require('express');
const { verifyToken } = require('../middleware/auth');
const User = require('../models/User');
const Class = require('../models/Class');

const router = express.Router();

// List users/classes
router.get('/', verifyToken, async (req,res) => {
  if (req.user.role !== 'staff') return res.status(403).send();
  const users = await User.find().select('-password');
  const classes = await Class.find();
  res.json({ users, classes });
});

// CRUD for users
router.post('/user', verifyToken, async (req,res) => {
  const { username,password,role } = req.body;
  const hashed = await bcrypt.hash(password,12);
  const u = new User({ username, password: hashed, role });
  await u.save();
  res.json(u);
});

// similarly implement PUT DELETE routes...

// CRUD for classes
router.post('/class', verifyToken, async (req,res) => {
  const c = new Class(req.body);
  await c.save();
  res.json(c);
});

// etc...
module.exports = router;
