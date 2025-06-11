const express = require('express');
const { verifyToken } = require('../authMiddleware');
const db = require('../db');
const router = express.Router();

router.get('/data', verifyToken, async (req, res) => {
  try {
    if (req.user.role === 'student') {
      const { rows: student } = await db.query('SELECT name, grade FROM users WHERE id = $1', [req.user.id]);
      const { rows: classes } = await db.query('SELECT COUNT(*) FROM classes WHERE student_id = $1', [req.user.id]);
      res.json({
        type: 'student',
        name: student[0].name,
        grade: student[0].grade,
        totalClasses: classes[0].count
      });
    } else if (req.user.role === 'staff') {
      const { rows: counts } = await db.query(`
        SELECT 
          (SELECT COUNT(*) FROM users WHERE role = 'student') AS studentCount,
          (SELECT COUNT(*) FROM users WHERE role = 'staff') AS staffCount
      `);
      res.json({
        type: 'staff',
        studentCount: counts[0].studentcount,
        staffCount: counts[0].staffcount
      });
    } else {
      res.status(400).json({ message: 'Invalid role' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
