const userModel = require('../models/userModel');

module.exports = {
  findByUsername: async (username) => {
    return await userModel.findByUsername(username);
  },
};
