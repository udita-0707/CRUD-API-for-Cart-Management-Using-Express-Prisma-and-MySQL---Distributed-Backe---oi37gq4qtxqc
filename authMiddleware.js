const { API_KEY } = require('./authkey');

const authMiddleware = (req, res, next) => {
  const apiauthkey = req.headers['apiauthkey'];

  if (!apiauthkey || apiauthkey !== API_KEY) {
    return res.status(403).json({ error: 'apiauthkey is missing or invalid' });
  }

  next();
};

module.exports = authMiddleware;
