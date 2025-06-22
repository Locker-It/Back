const getUserId = (req) => req.user?.userId;
const getProductId = (req) => req.params?.id;

module.exports = {
  getUserId,
  getProductId,
};
