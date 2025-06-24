const { StatusCodes } = require('http-status-codes');
const { PRODUCT_NOT_FOUND , MISSING_USER_ID } = require('../constants/errorMessages');

const getUserId = (req) => {
  const userId = req.user?.userId;
  if (!userId) {
    const err = new Error(MISSING_USER_ID);
    err.status = StatusCodes.UNAUTHORIZED;
    throw err;
  }
  return userId;
};

const getProductId = (req) => {
  const productId = req.params?.id;
  if (!productId) {
    const err = new Error(PRODUCT_NOT_FOUND);
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }
  return productId;
};

module.exports = { getUserId, getProductId };
