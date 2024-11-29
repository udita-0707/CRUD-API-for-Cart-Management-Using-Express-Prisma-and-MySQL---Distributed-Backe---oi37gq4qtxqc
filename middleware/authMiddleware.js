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

  // Case 1: Missing apiauthkey
  if (!apiauthkey) {
    return res.status(403).json({ error: 'apiauthkey is missing or invalid' });
  }

  // Case 2: Invalid apiauthkey
  if (apiauthkey !== validApiAuthKey) {
    return res.status(403).json({ error: 'Failed to authenticate apiauthkey' });
  }

  // If apiauthkey is valid, proceed to the next middleware or route
  next();
};

module.exports = authMiddleware;


