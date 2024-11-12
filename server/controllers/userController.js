module.exports = {
    profile: (req, res) => {
      res.json({ user: req.user });
    },
  };
  