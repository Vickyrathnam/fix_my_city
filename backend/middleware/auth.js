const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  console.log('Auth middleware - Token:', token ? 'Present' : 'Missing');

  // Check if not token
  if (!token) {
    console.log('Auth middleware - No token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware - Token valid, user:', decoded.user);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log('Auth middleware - Token invalid:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
