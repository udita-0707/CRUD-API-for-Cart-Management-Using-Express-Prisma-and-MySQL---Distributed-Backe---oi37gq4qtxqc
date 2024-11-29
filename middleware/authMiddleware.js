// const { API_KEY } = require('../authkey');

// const authMiddleware = (req, res, next) => {
//   const apiauthkey = req.headers['apiauthkey'];

//   if (!apiauthkey || apiauthkey !== API_KEY) {
//     return res.status(403).json({ error: 'apiauthkey is missing or invalid' });
//   }

//   next();
// };

// module.exports = authMiddleware;
const validApiAuthKey = '8a60348b-d4a4-564a-9b45-aab518adb7f4';

const authMiddleware = (req, res, next) => {
  const apiauthkey = req.headers['apiauthkey'];
  if (!apiauthkey) {
    return res.status(401).json({ message: 'Access denied, apiauthkey is missing' });
  }
  if (apiauthkey !== validApiAuthKey) {
    return res.status(403).json({ message: 'Forbidden, invalid apiauthkey' });
  }
  next();
};

module.exports = authMiddleware;

