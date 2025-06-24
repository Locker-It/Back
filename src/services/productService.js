const productRepository = require('../repositories/productRepository');
const {
  PRODUCT_NOT_FOUND,
  PRODUCT_ALREADY_RESERVED,
} = require('../constants/errorMessages');
const productStatuses = require('../constants/productStatuses');
const { StatusCodes } = require('http-status-codes');

const getUserCartFilter = (userId) => ({
  status: productStatuses.PENDING,
  reservedBy: userId,
});

const createProduct = async (productData) =>
  productRepository.createProduct(productData);

const getAllProducts = async (filters = {}) => {
  return productRepository.findProductByFilters(filters);
};

const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);
  if (!product) {
    throw new Error(PRODUCT_NOT_FOUND);
  }
  return product;
};

const updateProduct = async (id, updateData, filter = {}) => {
  const updated = await productRepository.updateProduct(id, updateData, filter);

  if (!updated) {
    const exists = await productRepository.getProductById(id);

    const err = new Error(
      exists ? PRODUCT_ALREADY_RESERVED : PRODUCT_NOT_FOUND,
    );
    err.status = exists ? StatusCodes.CONFLICT : StatusCodes.NOT_FOUND;
    throw err;
  }
  return updated;
};

const deleteProduct = async (id) => {
  const deletedProduct = await productRepository.deleteProduct(id);
  if (!deletedProduct) {
    throw new Error(PRODUCT_NOT_FOUND);
  }
  return deletedProduct;
};

const addToCart = async (productId, userId) => {
  const product = await getProductById(productId);

  return updateProduct(
    productId,
    {
      status: productStatuses.PENDING,
      reservedBy: userId,
      reservedAt: new Date(),
    },
    { status: productStatuses.AVAILABLE },
  );
};

const getUserCart = async (userId) => {
  return productRepository.findProductByFilters(getUserCartFilter(userId));
};

const removeFromCart = async (productId, userId) => {
  const updatedProduct = await updateProduct(
    productId,
    {
      status: productStatuses.AVAILABLE,
      reservedBy: null,
      reservedAt: null,
    },
    getUserCartFilter(userId),
  );

  return updatedProduct;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addToCart,
  getUserCart,
  removeFromCart,
};
