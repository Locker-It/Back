const jwt = require('jsonwebtoken');
const authConstants = require('../constants/auth');
const errorMessages = require('../constants/errorMessages');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: errorMessages.UNAUTHORIZED });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env[authConstants.auth.JWT_ACCESS_SECRET_KEY],
    );
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: errorMessages.INVALID_TOKEN });
  }
};

module.exports = authMiddleware;
