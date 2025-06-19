const productRepository = require('../repositories/productRepository');
const { PRODUCT_NOT_FOUND } = require('../constants/errorMessages');
const productStatuses = require('../constants/productStatuses');

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
  const updatedProduct = await productRepository.updateProduct(
    id,
    updateData,
    filter,
  );
  if (!updatedProduct) {
    throw new Error(PRODUCT_NOT_FOUND);
  }
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const deletedProduct = await productRepository.deleteProduct(id);
  if (!deletedProduct) {
    throw new Error(PRODUCT_NOT_FOUND);
  }
  return deletedProduct;
};

const getUserCart = async (userId) => {
  const products = await productRepository.findProductByFilters({
    status: productStatuses.PENDING,
    reservedBy: userId,
  });
  if (!products || products.length === 0) {
    throw new Error(PRODUCT_NOT_FOUND);
  }
  return products;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getUserCart,
};
