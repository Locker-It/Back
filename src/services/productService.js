const productRepository = require('../repositories/productRepository');
const { PRODUCT_NOT_FOUND } = require('../constants/errorMessages');

const createProduct = async (productData) => productRepository.createProduct(productData);

const getAllProducts = async () => productRepository.getAllProducts();

const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);
  if (!product) {
    throw new Error(PRODUCT_NOT_FOUND);
  }
  return product;
};

const updateProduct = async (id, updateData) => {
  const updatedProduct = await productRepository.updateProduct(id, updateData);
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

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
