const jwtUtil = require('../utils/jwtUtil');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const user = jwtUtil.verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Forbidden' });
  }
};
