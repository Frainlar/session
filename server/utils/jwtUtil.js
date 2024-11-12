const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = {
  generateToken: (payload, expiresIn = '15m') => jwt.sign(payload, jwtSecret, { expiresIn }),
  verifyToken: (token) => jwt.verify(token, jwtSecret),
};
