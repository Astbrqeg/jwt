const tokensBlacklist = require('../database/initNodeCache');

module.exports = async (req, res) => {
  try {
    if (req.cookies && req.cookies.userToken) {
      res.clearCookie('userToken');
      tokensBlacklist.set(req.cookies.userToken, 1);
      res.json({ message: 'logged out' });
    } else {
      res.status(400).json({ message: 'No userToken cookie found' });
    }
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'failed to logout' });
  }
};
