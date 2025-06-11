// backend/auth.js
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

exports.signAccess = payload =>
  jwt.sign(payload, secret, { expiresIn: process.env.ACCESS_EXPIRES });
exports.signRefresh = payload =>
  jwt.sign(payload, refreshSecret, { expiresIn: process.env.REFRESH_EXPIRES });

exports.verifyAccess = token =>
  jwt.verify(token, secret);

exports.verifyRefresh = token =>
  jwt.verify(token, refreshSecret);
