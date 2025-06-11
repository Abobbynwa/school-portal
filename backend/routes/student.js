const express = require('express');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.get('/', verifyToken, (req,res) => {
  if (req.user.role !== 'student') return res.status(403).send();
  res.json({
    name: 'John Doe', grade: 10, classes: 5,
    assignments: 2, grades: 'A',
    schedule: [
      { course: "Math", time: "8:00 AM", grade: "A" },
      { course: "History", time: "9:15 AM", grade: "B+" }
    ]
  });
});

module.exports = router;
