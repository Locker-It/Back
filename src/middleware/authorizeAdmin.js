const errorMessages = require('../constants/errorMessages');

const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: errorMessages.UNAUTHORIZED });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: errorMessages.FORBIDDEN });
  }

  return next();
};

module.exports = authorizeAdmin;
