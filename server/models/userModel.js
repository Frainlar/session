const bcrypt = require('bcrypt');

module.exports = {
  findByUsername: async (username) => {
    // Mock user data; replace with database queries
    if (username === 'testuser') {
      return {
        id: '1',
        username: 'testuser',
        password: await bcrypt.hash('password123', 10),
        roles: ['user'],
        permissions: ['read', 'write'],
      };
    }
    return null;
  },
};
