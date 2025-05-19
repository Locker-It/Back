const jwt = require('jsonwebtoken');
const authConstants = require('../constants/auth');
const errorMessages = require('../constants/errorMessages');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith(authConstants.BEARER)) {
    return res.status(401).json({ error: errorMessages.UNAUTHORIZED });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: errorMessages.INVALID_TOKEN});
  }
};

module.exports = auth;
