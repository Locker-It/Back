const jwt = require('jsonwebtoken');
const authConstants = require('../constants/auth');
const errorMessages = require('../constants/errorMessages');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith(authConstants.auth.BEARER)) {
    return res.status(401).json({ error: errorMessages.UNAUTHORIZED });
  }

  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env[authConstants.auth.JWT_ACCESS_SECRET_KEY]);
    return next();
  } catch (error) {
    return res.status(401).json({ error: errorMessages.INVALID_TOKEN});
  }
};

module.exports = auth;
