const authService = require('../services/authService');

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const { sessionID } = req;
      const token = await authService.login(username, password, sessionID);

      res.cookie('sessionId', sessionID, { httpOnly: true, secure: true });
      res.json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: 'Logout failed' });
      res.clearCookie('sessionId');
      res.json({ message: 'Logged out successfully' });
    });
  },

  refreshToken: (req, res) => {
    const { session } = req;
    if (!session.userId) return res.status(401).json({ message: 'Session expired' });

    const token = authService.generateToken(session);
    res.json({ token });
  },
};
