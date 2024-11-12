const userService = require('./userService');
const jwtUtil = require('../utils/jwtUtil');
const bcrypt = require('bcrypt');

module.exports = {
  login: async (username, password, sessionID) => {
    const user = await userService.findByUsername(username);
    if (!user) throw new Error('User not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');

    // Set session data
    const sessionData = {
      userId: user.id,
      roles: user.roles,
      permissions: user.permissions,
      loginTimestamp: new Date(),
    };

    // Store session data in Redis
    // Assuming redisClient is accessible here
    await redisClient.hSet(`sess:${sessionID}`, sessionData);

    // Generate JWT
    const token = jwtUtil.generateToken({ userId: user.id, roles: user.roles });
    return token;
  },

  generateToken: (session) => {
    return jwtUtil.generateToken({ userId: session.userId, roles: session.roles });
  },
};
