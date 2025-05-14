const { StatusCodes } = require('http-status-codes');
const errorMessages = require('../constants/errorMessages');
const ROLES = require('../constants/roles');

const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: errorMessages.UNAUTHORIZED });
  }

  if (req.user.role !== ROLES.ADMIN) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: errorMessages.FORBIDDEN });
  }

  return next();
};

module.exports = authorizeAdmin;
